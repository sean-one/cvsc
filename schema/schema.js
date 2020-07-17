const graphql = require('graphql');
const { GraphQLDate, GraphQLDateTime } = require('graphql-iso-date');
const bcrypt = require('bcrypt');

// google geocoder for location
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GEOCODER_API_KEY,
    Promise: Promise
});

const User = require('../data/models/user');
const Contact = require('../data/models/contact');
const Business = require('../data/models/business');
//#region <MODEL IMPORTS>
// const Location = require('../data/models/location');
// const Event = require('../data/models/event');
// const Contact = require('../data/models/contact');
// const ImageStorage = require('../data/models/imagestorage');
//#endregion

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        _id: { type: GraphQLID },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        contact: {
            type: ContactType,
            resolve(parent, args){
                return Contact.findOne({ contactFor: parent._id })
            }
        },
        following: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args){
                return Business.where('_id').in(parent.following)
            }
        }
    })
});

const BusinessType = new GraphQLObjectType({
    name: 'Businesses',
    fields: () => ({
        _id: { type: GraphQLID },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        businessname: { type: GraphQLString },
        about: { type: GraphQLString },
        businessType: { type: GraphQLString },
        contact: {
            type: ContactType,
            resolve(parent, args){
                return Contact.findOne({ contactFor: parent._id })
            }
        }
    })
})

const ContactType = new GraphQLObjectType({
    name: 'Contacts',
    fields: () => ({
        _id: { type: GraphQLID },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        url: { type: GraphQLString },
        instagram: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // user queries
        userByUsername: {
            type: UserType,
            args: {
                searchBy: { type: GraphQLString }
            },
            resolve(parent, args) {
                const searchBy = args.searchBy.toLowerCase();
                return User.findOne({ searchBy })
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        businesses: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args) {
                return Business.find({});
            }
        },
        brands: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args) {
                return Business.find({ businessType: 'brand'})
            }
        },
        dispensaries: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args) {
                return Business.find({ businessType: 'dispensary'})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args){
                const password = bcrypt.hashSync(args.password, 10);
                let newUser = new User({
                    username: args.username,
                    searchBy: args.username.toLowerCase(),
                    password: password
                });
                console.log(user);
                return newUser.save()
            }
        },
        deleteUserByUsername: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
            },
            async resolve(parent, args){
                const searchBy = args.username.toLowerCase();
                return await User.findOneAndDelete({ searchBy })
            }

        },
        deleteUserById: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args){
                return await User.findByIdAndDelete(args.id)
            }
        },
        updateUserPassword: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                password: { type: GraphQLString }
            },
            async resolve(parent, args){
                const password = bcrypt.hashSync(args.password, 10);
                return await User.findByIdAndUpdate(args.id, { password: password }, { new: true } );
            }
        },
        follow: {
            type: BusinessType,
            args: {
                userId: { type: GraphQLID },
                businessId: { type: GraphQLID },
            },
            async resolve(parent, args){
                return await User.findByIdAndUpdate(args.userId, { $push: { following: args.businessId } }, { new: true });
            }
        },
        createBusiness: {
            type: BusinessType,
            args: {
                businessname: { type: GraphQLString },
                about: { type: GraphQLString },
                businessType: { type: GraphQLString }
            },
            resolve(parent, args){
                let newBusiness = new Business({
                    businessname: args.businessname,
                    about: args.about,
                    businessType: args.businessType
                });
                return newBusiness.save();
            }
        },
        createContact: {
            type: ContactType,
            args: {
                id: { type: GraphQLID },
                phone: { type: GraphQLString },
                email: { type: GraphQLString },
                url: { type: GraphQLString },
                instagram: { type: GraphQLString },
            },
            resolve(parent, args){
                const newContact = new Contact({
                    phone: args.phone,
                    email: args.email,
                    url: args.url,
                    instagram: args.instagram,
                    contactFor: args.id
                });
                return newContact.save();
            }
        },
        updateContact: {
            type: ContactType,
            args: {
                id: { type: GraphQLID },
                phone: { type: GraphQLString },
                email: { type: GraphQLString },
                url: { type: GraphQLString },
                instagram: { type: GraphQLString },
            },
            async resolve(parent, args){
                return await Contact.findOneAndUpdate(
                    { contactFor: args.id },
                    { $set: {
                        "email": args.email,
                        "phone": args.phone,
                        "url": args.url,
                        "instagram": args.instagram
                    }},
                    { omitUndefined: true, new: true }
                    )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});