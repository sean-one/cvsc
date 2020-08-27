const { mergeTypeDefs } = require('graphql-tools');

const User = require('./User/');
const Contact = require('./Contact/');
const Business = require('./Business/');

const typeDefs = [User, Contact, Business];

module.exports = mergeTypeDefs(typeDefs);