const path = require('path');
const {readFileSync} = require('fs');
const {ApolloServer, gql} = require('apollo-server-express');
const {context} = require('./context');


const {QueryResolver} = require('../resolver/queryResolver');


const pathSchema = path.join(__dirname, "../graphql/main.graphql");
const schemaContent = readFileSync(pathSchema, {encoding: 'utf8'});
const typeDefs = gql`${ schemaContent }`;


const resolvers = {
  Query: {
    requestProfile: () => QueryResolver.requestProfileResolver,
  }
};


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  tracing: true
});

module.exports.apolloGatewayInitialization = (app) => {
  apolloServer.applyMiddleware({
    app,
    path: "/graphql/gateway"
  });
}
