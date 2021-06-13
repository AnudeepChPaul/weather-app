const { ApolloServer } = require('apollo-server')
const { WeatherAPI } = require('./graphql_apis')
const { LocationAPI } = require('./graphql_apis')
const { resolvers } = require('./graphql_apis')
const { typeDefs } = require('./graphql_apis')

const AppServer = new ApolloServer({
  typeDefs, resolvers,
  dataSources: () => ({
    locationAPI: new LocationAPI(),
    weatherAPI: new WeatherAPI()
  })
});

AppServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


