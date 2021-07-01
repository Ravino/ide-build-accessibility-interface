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
    requestReport: () => QueryResolver.requestReportResolver,
  },

  RequestProfile: {
    get: (parent, args, context) => parent.get(context.user.userId)
  },


  RequestReport: {
    get: (parent, args, context) => parent.get(1, args.id),
    getList: (parent, args, context) => parent.getList(1, args.size),
    select: (parent, args, context) => parent.select(context.user.userId, args.cursor, args.offset)
  },


  ListReport: {
    items: (parent) => parent.items(),
    count: (parent) => parent.count()
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
