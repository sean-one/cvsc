const graphql = require('graphql');
const GraphQLDate = require('graphql-date');

const User = require('../data/models/user');
const Brand = require('../data/models/brand');
// const Dispensary = require('../data/models/dispensary');
// const Event = require('../data/models/event');
// const Contact = require('../data/models/contact');
// const Location = require('../data/models/location');
// const Filter = require('../data/models/filter');
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
        password: { type: new GraphQLNonNull(GraphQLString) }
    })

});

const BrandType = new GraphQLObjectType({
    name: 'Brands',
    fields: () => ({
        _id: { type: GraphQLID },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        brandname: { type: new GraphQLNonNull(GraphQLString) },
        about: { type: GraphQLString }
    })
});

// const DispensaryType = new GraphQLObjectType({
//     name: 'Dispensaries',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         createdAt: { type: GraphQLDate },
//         updatedAt: { type: GraphQLDate },
//         dispensaryname: { type: new GraphQLNonNull(GraphQLString) },
//         about: { type: GraphQLString }
//     })
// });

// const EventType = new GraphQLObjectType({
//     name: 'Events',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         createdAt: { type: GraphQLDate },
//         updatedAt: { type: GraphQLDate },
//         title: { type: new GraphQLNonNull(GraphQLString) },
//         about: { type: GraphQLString },
//         author: { type: new GraphQLNonNull(UserType) },
//         startdate: { type: new GraphQLNonNull(GraphQLDate) },
//         enddate: { type: new GraphQLNonNull(GraphQLDate) },
//         brands: { type: new GraphQLList(BrandType) },
//         dispensaryId: { type: GraphQLNonNull(DispensaryType) }
//     })
// });

// const ContactType = new GraphQLObjectType({
//     name: 'Contacts',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         createdAt: { type: GraphQLDate },
//         updatedAt: { type: GraphQLDate },
//         phone: { type: GraphQLInt },
//         email: { type: GraphQLString },
//         url: { type: GraphQLString },
//         instagram: { type: GraphQLString },
//         primaryContact: { type: GraphQLString },
//         refId: { type: GraphQLID }
//     })
// });

// const LocationType = new GraphQLObjectType({
//     name: 'Locations',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         createdAt: { type: GraphQLDate },
//         updatedAt: { type: GraphQLDate },
//         formatted: { type: GraphQLString },
//         city: { type: GraphQLString },
//         lat: { type: GraphQLString },
//         lng: { type: GraphQLString },
//         refId: { type: GraphQLID },
//     })
// });

// const FilterType = new GraphQLObjectType({
//     name: 'Filters',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         createdAt: { type: GraphQLDate },
//         updatedAt: { type: GraphQLDate },
//         brandfilters: { type: GraphQLList(BrandType) },
//         dispensaryfilters: { type: GraphQLList(DispensaryType) },
//         refId: { type: GraphQLID }
//     })
// });

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
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent, args) {
                return Brand.find({});
            }
        },
        // user: {
        //     type: UserType,
        //     args: { id: { type: GraphQLString }},
        //     resolve(parent, args){
        //         return User.findOne({ _id: args.id })
        //     }
        // },
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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});