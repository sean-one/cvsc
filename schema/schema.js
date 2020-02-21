const graphql = require('graphql');
const GraphQLDate = require('graphql-date');

const User = require('../data/models/user');
const Brand = require('../data/models/brand');
const Dispensary = require('../data/models/dispensary');
const Event = require('../data/models/event');

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
        brandname: { type: new GraphQLNonNull(GraphQLString) },
        about: { type: GraphQLString },
        contact: {
            phone: { type: GraphQLInt },
            email: { type: GraphQLString },
            instagram: { type: GraphQLString}
        },
        images: {
            profile: { type: GraphQLString },
            eventdefault: { type: GraphQLString }
        },
        events: { type: GraphQLList(EventType) },
        alerts: { type: GraphQLList(UserType) },
        editors: { type: GraphQLList(UserType) },
        updated: {
            updated_at: { type: GraphQLNonNull(GraphQLDate) },
            updated_by: { type: GraphQLNonNull(UserType) }
        }
    })
});

const DispensaryType = new GraphQLObjectType({
    name: 'Dispensaries',
    fields: () => ({
        _id: { type: GraphQLID },
        dispensaryname: { type: new GraphQLNonNull(GraphQLString) },
        about: { type: GraphQLString },
        contact: {
            address: {
                street: { type: new GraphQLNonNull(GraphQLString) },
                city: { type: new GraphQLNonNull(GraphQLString) },
                state: { type: new GraphQLNonNull(GraphQLString) },
                zip: { type: new GraphQLNonNull(GraphQLInt) }
            },
            // NOT SURE WHAT TYPE THIS WILL BE // ALSO SHOULD BE NON NULL
            location: { type: GraphQLString },
            phone: { type: GraphQLInt },
            email: { type: GraphQLString },
            instagram: { type: GraphQLString }
        },
        images: {
            profile: { type: GraphQLString },
            eventdefault: { type: GraphQLString }
        },
        events: { type: new GraphQLList(EventType) },
        alerts: { type: new GraphQLList(UserType) },
        editors: { type: new GraphQLList(UserType) },
        updated: {
            updated_at: { type: GraphQLNonNull(GraphQLDate) },
            updated_by: { type: GraphQLNonNull(UserType) }
        }
    })
});

const EventType = new GraphQLObjectType({
    name: 'Events',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(UserType) },
        startdate: { type: new GraphQLNonNull(GraphQLDate) },
        enddate: { type: new GraphQLNonNull(GraphQLDate) },
        images: {
            primary: { type: GraphQLString }
        },
        brands: { type: new GraphQLList(BrandType) },
        dispensary: { type: GraphQLNonNull(DispensaryType) },
        updated: {
            updated_at: { type: GraphQLNonNull(GraphQLDate) },
            updated_by: { type: GraphQLNonNull(UserType) }
        }
    })
});

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
            args: { id: { type: GraphQLString }},
            resolve(parent, args){
                return User.findOne({ _id: args.id })
            }
        },
        username: {
            type: UserType,
            args: { username: { type: GraphQLString }},
            resolve(parent, args){
                return User.findOne({ username: args.username })
            }
        },
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent, args) {
                return Brand.find({});
            }
        },
        brand: {
            type: BrandType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args) {
                return Brand.findOne({ _id: args.id })
            }
        },
        brandname: {
            type: BrandType,
            args: { brandname: { type: GraphQLString }},
            resolve(parent, args) {
                return Brand.findOne({ brandname: args.brandname })
            }
        },
        dispensaries: {
            type: new GraphQLList(DispensaryType),
            resolve(parent, args) {
                return Dispensary.find({})
            }
        },
        dispensary: {
            type: DispensaryType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args) {
                return Dispensary.findOne({ _id: args.id })
            }
        },
        dispensaryname: {
            type: DispensaryType,
            args: { dispensaryname: { type: GraphQLString }},
            resolve(parent, args) {
                return Dispensary.findOne({ dispensaryname: args.dispensaryname })
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args){
                return Event.find({});
            }
        },
        event: {
            type: EventType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args){
                return Event.findOne({ _id: args.id })
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
                contact: {
                    phone: { type: GraphQLInt },
                    email: { type: GraphQLString },
                    instagram: { type: GraphQLString }
                },
                alertmethod: { type: GraphQLString },
                images: {
                    profile: { type: GraphQLString }
                },
                filters: {
                    brand: [{ type: GraphQLID }],
                    dispensary: [{ type: GraphQLID }],
                    location: [{ type: GraphQLID }]
                },
                created: { type: GraphQLID }
            },
            resolve(parent, args){
                let user = new User({
                    username: args.username,
                    password: args.password,
                    contact: {
                        phone: args.contact.phone,
                        email: args.contact.email,
                        instagram: args.contact.instagram
                    },
                    alertmethod: args.alertmethod,
                    images: {
                        profile: args.images.profile
                    },
                    filters: {
                        brand: args.filters.brand,
                        dispensary: args.filters.dispensary,
                        location: args.filters.location
                    },
                    created: args.created
                    
                });
                return user.save()
            }
        },
        addBrand: {
            type: BrandType,
            args: {
                brandname: { type: GraphQLString },
                phone: { type: GraphQLString },
                email: { type: GraphQLString },
                instagram: { type: GraphQLString },
                pref_contact: { type: GraphQLString },
                imageLink: { type: GraphQLString }
            },
            resolve(parent, args){
                let brand = new Brand({
                    brandname: args.brandname,
                    phone: args.phone,
                    email: args.email,
                    instagram: args.instagram,
                    pref_contact: args.pref_contact,
                    imageLink: args.imageLink
                });
                return brand.save()
            }
        },
        addDispensary: {
            type: DispensaryType,
            args: {
                dispensaryname: { type: GraphQLString },
                street: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                zip: { type: GraphQLInt },
                phone: { type: GraphQLString },
                email: { type: GraphQLString },
                instagram: { type: GraphQLString },
                pref_contact: { type: GraphQLString },
                imageLink: { type: GraphQLString }
            },
            resolve(parent, args) {
                let dispensary = new Dispensary({
                    dispensaryname: args.dispensaryname,
                    street: args.street,
                    city: args.city,
                    state: args.state,
                    zip: args.zip,
                    phone: args.phone,
                    email: args.email,
                    instagram: args.instagram,
                    pref_contact: args.pref_contact,
                    imageLink: args.imageLink
                });
                return dispensary.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});