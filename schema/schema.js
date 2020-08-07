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
        // location: { type: new GraphQLList(GraphQLInt) },
        contact: {
            type: ContactType,
            resolve(parent, args) {
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
            resolve(parent, args) {
                return Contact.findOne({ contactFor: parent._id })
            }
        },
        events: {
            type: new GraphQLList(EventType),
            async resolve(parent, args) {
                if (parent.businessType == 'dispensary') {
                    return await Event.find({ dispensaryId: parent.id });
                } else {
                    return await Event.find({ brands: { $all: [parent.id] } });
                }
            }
        },
        // address: {
        //     formatted: { type: GraphQLString },
        //     city: { type: GraphQLString },
        //     coordinates: { type: new GraphQLList(GraphQLInt) }
        // }
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
            resolve(parent, args) {
                return User.findById(parent.author)
            }
        },
        day: {
            type: GraphQLString,
            resolve(parent, args) {
                return parent.startdate.toDateString();
            }
        },
        starttime: {
            type: GraphQLString,
            resolve(parent, args) {
                return parent.startdate.toLocaleTimeString();
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
            resolve(parent, args) {
                return Business.where('_id').in(parent.brands)
            }
        },
        dispensary: {
            type: BusinessType,
            resolve(parent, args) {
                return Business.findById(parent.dispensaryId);
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
        // NEED - eventByCity
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args){
                return Event.find({})
            }
        },
        eventById: {
            type: EventType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Event.findById(args.id);
            }
        },
        eventsByDispensary: {
            type: new GraphQLList(EventType),
            args: {
                dispensaryId: { type: GraphQLID }
            },
            async resolve(parent, args){
                return await Event.find({ dispensaryId: args.dispensaryId })
            }
        },
        eventsByBrand: {
            type: new GraphQLList(EventType),
            args: {
                brandId: { type: GraphQLID }
            },
            async resolve(parent, args){
                return await Event.find({ brands: { $all: [args.brandId] } })
            }
        },
        eventByDate: {
            type: new GraphQLList(EventType),
            args: {
                startdate: { type: GraphQLString },
                enddate: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Event.find({
                    startdate: {
                        '$gt': new Date(args.startdate),
                        '$lt': new Date(args.enddate)
                    }
                })
            }
        },
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
        getUserLocation: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                coordinates: { type: new GraphQLList(GraphQLInt) }
            },
            async resolve(parent, args){
                console.log(args)
                return await User.findByIdAndUpdate(args.id, { location: { $addToSet: { coordinates: args.coordinates } } }, { new: true });
            }
        },
        updateUserPassword: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                newPassword: { type: GraphQLString }
            },
            async resolve(parent, args){
                const password = bcrypt.hashSync(args.newPassword, 10);
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
            async resolve(parent, args){
                await User.findOneAndUpdate({ following: { $in: [args.id] } }, { $pull: { following: [args.id] } }, { new: true });
                const businessDoc = await Business.findById(args.id);
                if (businessDoc.businessType == 'brand') {
                    await Event.findOneAndUpdate({ brands: { $in: [args.id] } }, { $pull: { brands: [args.id] } }, { new: true });
                } else {
                    await Event.deleteMany({ dispensaryId: args.id })
                }
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
        createEvent: {
            type: EventType,
            args: {
                title: { type: GraphQLString },
                about: { type: GraphQLString },
                author: { type: GraphQLID },
                startdate: { type: GraphQLString },
                enddate: { type: GraphQLString },
                brands: { type: new GraphQLList(GraphQLID) },
                dispensaryId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let startdate = new Date(args.startdate);
                let enddate = new Date(args.enddate);
                let newEvent = new Event({
                    title: args.title,
                    about: args.about,
                    author: args.author,
                    startdate: startdate,
                    enddate: enddate,
                    brands: args.brands,
                    dispensaryId: args.dispensaryId
                });
                return newEvent.save();
            }
        },
        updateDateTime: {
            type: EventType,
            args: {
                id: { type: GraphQLID },
                startdate: { type: GraphQLString },
                enddate: { type: GraphQLString }
            },
            async resolve(parent, args){
                let startdate = new Date(args.startdate);
                let enddate = new Date(args.enddate);
                return await Event.findOneAndUpdate(
                    { _id: args.id },
                    { $set: {
                        "startdate": startdate,
                        "enddate": enddate
                    }},
                    { omitUndefined: true, new: true }
                )
                 
            }
        },
        addBrandToEvent: {
            type: EventType,
            args: {
                eventId: { type: GraphQLID },
                brandId: { type: GraphQLID }
            },
            async resolve(parent, args) {
               return await Event.findByIdAndUpdate(args.eventId, { $addToSet: { brands: args.brandId }}, { new: true });
            }
        },
        removeBrandFromEvent: {
            type: EventType,
            args: {
                eventId: { type: GraphQLID },
                brandId: { type: GraphQLID }
            },
            async resolve(parent, args) {
                return await Event.findByIdAndUpdate(args.eventId, { $pull: { brands: args.brandId } }, { new: true });
                
            }

        },
        removeEvent: {
            type: EventType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                return await Event.findByIdAndDelete(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});