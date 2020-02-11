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
    name: 'Users',
    fields: () => ({
        id: { type: GraphQLString },
        created_at: { type: GraphQLDate },
        updated_at: { type: GraphQLDate },
        username: { type: GraphQLString },
        phone: { type: GraphQLInt },
        email: { type: GraphQLString },
        instagram: { type: GraphQLString },
        pref_contact: { type: GraphQLString },
        imageLink: { type: GraphQLString }
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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // user queries
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return;
            }
        },
        // user: {
        //     type: UserType,
        //     args: { id: { type: GraphQLString }},
        //     resolve(parent, args){
        //         // gets the data from the database
        //         return _.find(users, { id: args.id });
        //     }
        // },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});