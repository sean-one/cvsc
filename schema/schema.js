const graphql = require('graphql');
const GraphQLDate = require('graphql-date');

// google geocoder for location
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GEOCODER_API_KEY,
    Promise: Promise
});

const User = require('../data/models/user');
const Brand = require('../data/models/brand');
const Dispensary = require('../data/models/dispensary');
const Event = require('../data/models/event');
const Contact = require('../data/models/contact');
const Location = require('../data/models/location');
const Filter = require('../data/models/filter');
// const Alert = require('../data/models/alert');
// const ImageStorage = require('../data/models/imagestorage');

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
            resolve(parent, args) {
                return Contact.findOne({ refId: parent._id })
            }
        },
        filters: {
            type: FilterType,
            resolve(parent, args) {
                return Filter.findOne({ userId: parent._id })
            }
        }
    })
});

const BrandType = new GraphQLObjectType({
    name: 'Brands',
    fields: () => ({
        _id: { type: GraphQLID },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        brandname: { type: new GraphQLNonNull(GraphQLString) },
        about: { type: GraphQLString },
        contact: {
            type: ContactType,
            resolve(parent, args) {
                return Contact.findOne({ refId: parent._id })
            }
        }
    })
});

const DispensaryType = new GraphQLObjectType({
    name: 'Dispensaries',
    fields: () => ({
        _id: { type: GraphQLID },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        dispensaryname: { type: new GraphQLNonNull(GraphQLString) },
        about: { type: GraphQLString },
        contact: {
            type: ContactType,
            resolve(parent, args) {
                return Contact.findOne({ refId: parent._id })
            }
        },
        location: {
            type: LocationType,
            resolve(parent, args) {
                return Location.findOne({ refId: parent._id })
            }
        }
    })
});

const EventType = new GraphQLObjectType({
    name: 'Events',
    fields: () => ({
        _id: { type: GraphQLID },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        title: { type: new GraphQLNonNull(GraphQLString) },
        about: { type: GraphQLString },
        author: { type: new GraphQLNonNull(UserType) },
        startdate: { type: new GraphQLNonNull(GraphQLDate) },
        enddate: { type: new GraphQLNonNull(GraphQLDate) },
        brands: { type: new GraphQLList(BrandType) },
        dispensaryId: { type: GraphQLNonNull(DispensaryType) }
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
        instagram: { type: GraphQLString },
        primary: { type: GraphQLString },
        refId: { type: GraphQLID }
    })
});

const LocationType = new GraphQLObjectType({
    name: 'Locations',
    fields: () => ({
        _id: { type: GraphQLID },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        formatted: { type: GraphQLString },
        city: { type: GraphQLString },
        lat: { type: GraphQLString },
        lng: { type: GraphQLString },
        refId: { type: GraphQLID },
    })
});

const FilterType = new GraphQLObjectType({
    name: 'Filters',
    fields: () => ({
        _id: { type: GraphQLID },
        brandfilters: { type: GraphQLList(GraphQLID) },
        dispensaryfilters: { type: GraphQLList(GraphQLID) },
        userId: { type: GraphQLID }
    })
});

// const AlertType = new GraphQLObjectType({
//     name: 'Alerts',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         createdAt: { type: GraphQLDate },
//         updatedAt: { type: GraphQLDate },
//         alertusers: { type: GraphQLList(UserType) },
//         refId: { type: GraphQLID }
//     })
// });

// const ImageStorageType = new GraphQLObjectType({
//     name: 'ImageStorage',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         createdAt: { type: GraphQLDate },
//         updatedAt: { type: GraphQLDate },
//         profile: { type: GraphQLString },
//         refdefault: { type: GraphQLString },
//         eventprimary: { type: GraphQLString },
//         refId: { type: GraphQLID }
//     })
// });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // user queries
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return User.findOne({ _id: args.id })
            }
        },
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent, args) {
                return Brand.find({});
            }
        },
        dispensaries: {
            type: new GraphQLList(DispensaryType),
            resolve(parent, args) {
                return Dispensary.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                // PASSWORD WILL NEED ENCRYPTION
                password: { type: GraphQLString },
            },
            resolve(parent, args){
                let user = new User({
                    username: args.username,
                    password: args.password
                });
                return user.save()
            }
        },
        addBrand: {
            type: BrandType,
            args: {
                brandname: { type: GraphQLString },
                about: { type: GraphQLString }
            },
            resolve(parent, args) {
                let brand = new Brand({
                    brandname: args.brandname,
                    about: args.about
                });
                return brand.save()
            }
        },
        addDispensary: {
            type: DispensaryType,
            args: {
                dispensaryname: { type: GraphQLString },
                about: { type: GraphQLString }
            },
            resolve(parent, args) {
                let dispensaryname = new Dispensary({
                    dispensaryname: args.dispensaryname,
                    about: args.about
                });
                return dispensaryname.save()
            }
        },
        addContact: {
            type: ContactType,
            args: {
                phone: { type: GraphQLString },
                email: { type: GraphQLString },
                url: { type: GraphQLString },
                instagram: { type: GraphQLString },
                primary: { type: GraphQLString },
                refId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let contact = new Contact({
                    phone: args.phone,
                    email: args.email,
                    url: args.url,
                    instagram: args.instagram,
                    primary: args.primary,
                    refId: args.refId
                });
                return contact.save()
            }
        },
        addLocation: {
            type: LocationType,
            args: {
                addressString: { type: GraphQLString },
                refId: { type: GraphQLID }
            },
            resolve(parent, args){
                googleMapsClient.geocode({ address: args.addressString })
                    .asPromise()
                    .then((response) => {
                        let location = new Location({
                            formatted: response.json.results[0].formatted_address,
                            city: response.json.results[0].address_components[2].long_name,
                            lat: response.json.results[0].geometry.location.lat,
                            lng: response.json.results[0].geometry.location.lng,
                            refId: args.refId
                        })
                        return location.save()
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                return
            }
        },
        addEvent: {
            type: EventType,
            args: {
                title: { type: GraphQLString },
                about: { type: GraphQLString },
                author: { type: GraphQLID },
                startdate: { type: GraphQLDate },
                enddate: { type: GraphQLDate },
                brands: { type: GraphQLID },
                dispensaryId: { type: GraphQLID }
            },
            resolve(parent, args) {
                const start = new Date(args.startdate)
                console.log(start)
                let event = new Event({
                    title: args.title,
                    about: args.about,
                    author: args.author,
                    startdate: args.startdate,
                    enddate: args.enddate,
                    brands: args.brands,
                    dispensaryId: args.dispensaryId
                });
                event.save()
            }
        },
        addFilter: {
            type: FilterType,
            args: {
                brandfilters: { type: GraphQLID },
                dispensaryfilters: { type: GraphQLID },
                userId: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Filter.updateOne(
                    { userId: args.userId },
                    { $addToSet: {"brandfilters": args.brandfilters, "dispensaryfilters": args.dispensaryfilters}, userId: args.userId },
                    { upsert: true, omitUndefined: true, timestamps: true }
                );
                // return filter.findBy()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});