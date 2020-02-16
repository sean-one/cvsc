const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const _ = require('lodash');

const User = require('../data/models/user');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLID
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        instagram: { type: GraphQLString },
        pref_contact: { type: GraphQLString },
        imageLink: { type: GraphQLString }
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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});