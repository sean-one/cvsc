const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        // contactId: {
        //     type: ContactType,
        //     resolve(parent, args){
        //         return _.find(contacts, { id: parent.contactId });
        //     }
        // },
        // profileId: {
        //     type: ProfileType,
        //     resolve(parent, args){
        //         return _.find(portfolios, { id: parent.profileId });
        //     }
        // }
    })

});

// const DispensaryType = new GraphQLObjectType({
//     name: 'Dispensary',
//     fields: () => ({
//         id: { type: GraphQLString },
//         dispensaryName: { type: GraphQLString },
//         contactId: {
//             type: ContactType,
//             resolve(parent, args){
//                 return _.find(contacts, { id: parent.contactId });
//             }
//         },
//         locationId: {
//             type: LocationType,
//             resolve(parent, args){
//                 return _.find(locations, { id: parent.locationId });
//             }
//         },
//         profileId: {
//             type: ProfileType,
//             resolve(parent, args) {
//                 return _.find(portfolios, { id: parent.profileId });
//             }
//         }
//     })
// });

// const BrandType = new GraphQLObjectType({
//     name: 'Brand',
//     fields: () => ({
//         id: { type: GraphQLString },
//         brandName: { type: GraphQLString },
//         contactId: {
//             type: ContactType,
//             resolve(parent, args) {
//                 return _.find(contacts, { id: parent.contactId });
//             }
//         },
//         profileId: {
//             type: ProfileType,
//             resolve(parent, args) {
//                 return _.find(portfolios, { id: parent.profileId });
//             }
//         }
//     })
// })

// const EventType = new GraphQLObjectType({
//     name: 'Event',
//     fields: () => ({
//         id: { type: GraphQLString },
//         eventName: { type: GraphQLString },
//         eventDate: { type: GraphQLDate },
//         eventStart: { type: GraphQLInt },
//         eventEnd: { type: GraphQLInt },
//         eventDetails: { type: GraphQLString },
//         brandId: {
//             type: BrandType,
//             resolve(parent, args){
//                 return _.find(brands, { id: parent.brandId })
//             }

//         },
//         dispensaryId: {
//             type: DispensaryType,
//             resolve(parent, args){
//                 return _.find(dispensaries, { id: parent.dispensaryId })
//             }
//         },
//         profileId: {
//             type: ProfileType,
//             resolve(parent, args) {
//                 return _.find(portfolios, { id: parent.profileId });
//             }
//         }
//     })
// });

// const LocationType = new GraphQLObjectType({
//     name: 'Locations',
//     fields: () => ({
//         id: { type: GraphQLString },
//         street: { type: GraphQLString },
//         city: { type: GraphQLString },
//         state: { type: GraphQLString },
//         zip: { type: GraphQLInt },
//     })
// });

// const ContactType = new GraphQLObjectType({
//     name: 'Contact',
//     fields: () => ({
//         id: { type: GraphQLString },
//         email: { type: GraphQLString },
//         phone: { type: GraphQLString },
//         social: { type: GraphQLString },
//         pref: { type: GraphQLString }
//     })
// });

// const ProfileType = new GraphQLObjectType({
//     name: 'ProfilePic',
//     fields: () => ({
//         id: { type: GraphQLString },
//         imgLink: { type: GraphQLString }
//     })
// })

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // user queries
        // user: {
        //     type: UserType,
        //     args: { id: { type: GraphQLString }},
        //     resolve(parent, args){
        //         // gets the data from the database
        //         return _.find(users, { id: args.id });
        //     }
        // },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return;
            }
        },
        // dispensary queries
        // dispensary: {
        //     type: DispensaryType,
        //     args: { id: { type: GraphQLString }},
        //     resolve(parent, args){
        //         return _.find(dispensaries, { id: args.id });
        //     }
        // },
        // dispensaries: {
        //     type: new GraphQLList(DispensaryType),
        //     resolve(parent, args){
        //         return dispensaries
        //     }
        // },
        // brands: {
        //     type: new GraphQLList(BrandType),
        //     resolve(parent, args){
        //         return brands
        //     }

        // },
        // brand: {
        //     type: BrandType,
        //     args: { id: { type: GraphQLString} },
        //     resolve(parent, args){
        //         return _.find(brands, { id: args.id });
        //     }
        // },
        // event queries
        // event: {
        //     type: EventType,
        //     args: { id: { type: GraphQLString }},
        //     resolve(parent, args){
        //         return _.find(events, { id: args.id });
        //     }
        // },
        // events: {
        //     type: new GraphQLList(EventType),
        //     resolve(parent, args){
        //         return events
        //     }
        // },
        // contact: {
        //     type: ContactType,
        //     args: { id: { type: GraphQLString }},
        //     resolve(parent, args) {
        //         return _.find(contacts, { id: args.id });
        //     }
        // },
        // location: {
        //     type: LocationType,
        //     args: { id: { type: GraphQLString }},
        //     resolve(parent, args) {
        //         return _.find(locations, { id: args.id });
        //     }
        // }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});