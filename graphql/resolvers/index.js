const { mergeResolvers } = require('graphql-tools');

const User = require('./User/');
const Contact = require('./Contact/');
const Business = require('./Business/');

const resolvers = [User, Contact, Business];

module.exports = mergeResolvers(resolvers);