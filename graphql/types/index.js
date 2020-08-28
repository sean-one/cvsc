const { mergeTypeDefs } = require('graphql-tools');

const User = require('./User/');
const Contact = require('./Contact/');
const Business = require('./Business/');
const Location = require('./Location/');

const typeDefs = [User, Contact, Business, Location];

module.exports = mergeTypeDefs(typeDefs);