const graphql = require('graphql');

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
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        contact: {
            phone: { type: GraphQLInt },
            email: { type: GraphQLString},
            instagram: { type: GraphQLString }
        },
        alertmethod: { type: GraphQLString },
        images: {
            profile: { type: GraphQLString }
        },
        filters: {
            brand: { type: GraphQLList(BrandType)},
            dispensary: { type: GraphQLList(DispensaryType)},
            location: { type: GraphQLList(DispensaryType)}
        },
        created: { type: GraphQLList(EventType) }
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
        editors: { type: GraphQLList(UserType) }
    })
});

const DispensaryType = new GraphQLObjectType({
    name: 'Dispensaries',
    fields: () => ({
        _id: { type: GraphQLID },
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
    })
});

const EventType = new GraphQLObjectType({
    name: 'Events',
    fields: () => ({
        _id: { type: GraphQLID },
        eventname: { type: GraphQLString },
        date: { type: GraphQLString },
        starttime: { type: GraphQLString },
        endtime: { type: GraphQLString },
        details: { type: GraphQLString },
        imageLink: { type: GraphQLString },
        dispensaryId: { type: GraphQLString },
        brandId: { type: GraphQLString }
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
                phone: { type: GraphQLString },
                email: { type: GraphQLString },
                instagram: { type: GraphQLString },
                pref_contact: { type: GraphQLString },
                imageLink: { type: GraphQLString }
            },
            resolve(parent, args){
                let user = new User({
                    username: args.username,
                    phone: args.phone,
                    email: args.email,
                    instagram: args.instagram,
                    pref_contact: args.pref_contact,
                    imageLinke: args.imageLink
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