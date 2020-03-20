import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext }     from 'apollo-link-context'
import { resolvers, typeDefs } from './resolvers/resolvers'

const cache = new InMemoryCache();
const httpLink = new createHttpLink({
  //uri: 'https://peaceful-eyrie-59851.herokuapp.com/graphql'
  uri: 'http://localhost:3000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken")
  return {
    headers: {
      ...headers,
      authorization: token || ``
    },
  }
})

const apolloClient = new ApolloClient(
  {
    cache,
    link: authLink.concat(httpLink),
    typeDefs,
    resolvers
  }
);

cache.writeData({
  data: {
    globalMessage: {
      message: "pito pito",
      type: "error",
      __typename: "GlobalMessage"
    }
  }
});

export default apolloClient