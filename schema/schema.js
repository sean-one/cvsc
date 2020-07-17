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
//#region <MODEL IMPORTS>
// const Location = require('../data/models/location');
// const Brand = require('../data/models/brand');
// const Dispensary = require('../data/models/dispensary');
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
        }
    })
});

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
                let user = new User({
                    username: args.username,
                    searchBy: args.username.toLowerCase(),
                    password: password
                });
                console.log(user);
                return user.save()
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