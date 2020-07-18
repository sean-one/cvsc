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
const Event = require('../data/models/event');
//#region <MODEL IMPORTS>
// const Location = require('../data/models/location');
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
        brandsFollowed: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args) {
                return Business.where('_id').in(parent.following).where({ businessType: 'brand' })
            }
        },
        dispensariesFollowed: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args) {
                return Business.where('_id').in(parent.following).where({ businessType: 'dispensary' })
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
        },
        //! THIS IS NOT RETURNING WHAT I AM LOOKING FOR
        events: {
            type: new GraphQLList(EventType),
            async resolve(parent, args){
                return await Event.find({in: { brands: parent.id }});
            }
        }
    })
});

const EventType = new GraphQLObjectType({
    name: 'Events',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        about: { type: GraphQLString },
        author: { 
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.author)
            }
        },
        day: {
            type: GraphQLString,
            resolve(parent, args){
                return parent.startdate.toDateString();
            }
        },
        starttime: {
            type: GraphQLString,
            resolve(parent, args){
                return parent.startdate.toLocaleTimeString('en-US');
            }
        },
        endtime: {
            type: GraphQLString,
            resolve(parent, args) {
                return parent.enddate.toLocaleTimeString();
            }
        },
        brands: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args){
                return Business.where('_id').in(parent.brands)
            }
        },
        dispensary: {
            type: BusinessType,
            resolve(parent, args){
                return Business.findById(parent.dispensaryId);
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
        // business queries
        businesses: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args) {
                return Business.find({});
            }
        },
        businessById: {
            type: BusinessType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                return Business.findById(args.id);
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
        },
        // event queries
        // NEED - eventByCity, eventByDispensary, eventByBrand, eventByDate
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args){
                return Event.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // user CRUD operations
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
                return newUser.save()
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
        // add & remove business ids from user follow list
        follow: {
            type: BusinessType,
            args: {
                userId: { type: GraphQLID },
                businessId: { type: GraphQLID },
            },
            async resolve(parent, args){
                await User.findByIdAndUpdate(args.userId, { $addToSet: { following: args.businessId } }, { new: true });
                return Business.findById(args.businessId);
            }
        },
        unfollow: {
            type: BusinessType,
            args: {
                userId: {type: GraphQLID },
                businessId: {type: GraphQLID }
            },
            async resolve(parent, args){
                await User.findByIdAndUpdate(args.userId, { $pull: { following: args.businessId} }, { new: true} );
                return Business.findById(args.businessId);
            }
        },
        // business CRUD operations
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
        updateBusiness: {
            type: BusinessType,
            args: {
                id: { type: GraphQLID },
                businessname: { type: GraphQLString },
                about: { type: GraphQLString }
            },
            async resolve(parent, args){
                return await Business.findByIdAndUpdate(args.id, {
                    businessname: args.businessname,
                    about: args.about
                }, { omitUndefined: true, new: true });
            }
        },
        removeBusiness: {
            type: BusinessType,
            args: {
                id: { type: GraphQLID }
            },
            // ! after this is removed there needs to be something that removes the business from users follow arrays
            async resolve(parent, args){
                return await Business.findByIdAndDelete(args.id);
            }
        },
        // contact CRUD operations
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
        },
        removeUserContact: {
            type: ContactType,
            args: {
                userId: { type: GraphQLID }
            },
            async resolve(parent, args){
                await User.findByIdAndUpdate(args.userId, { contact: null }, { new: true });
                return await Contact.findOneAndDelete({ contactFor: args.userId });
            }
        },
        removeBusinessContact: {
            type: ContactType,
            args: {
                businessId: { type: GraphQLID }
            },
            async resolve(parent, args){
                await Business.findByIdAndUpdate(args.businessId, { contact: null }, { new: true });
                return await Contact.findOneAndDelete({ contactFor: args.businessId });
            }
        },
        // event CRUD operations
        // NEED - addBrand, removeBrand, updateStarttime, updateEndtime, deleteEvent
        createEvent: {
            type: EventType,
            args: {
                title: { type: GraphQLString },
                about: { type: GraphQLString },
                author: { type: GraphQLID },
                startdate: { type: GraphQLDateTime },
                enddate: { type: GraphQLDateTime },
                brands: { type: GraphQLList(GraphQLID) },
                dispensaryId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let newEvent = new Event({
                    title: args.title,
                    about: args.about,
                    author: args.author,
                    startdate: args.startdate,
                    enddate: args.enddate,
                    brands: args.brands,
                    dispensaryId: args.dispensaryId
                });
                console.log(newEvent);
                return newEvent.save();
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});