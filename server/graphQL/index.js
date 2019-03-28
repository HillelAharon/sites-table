const {makeExecutableSchema} = require("graphql-tools");
const typeDefs = require('./type');
const resolvers = require('./resolver');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
