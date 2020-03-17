import { ApolloClient } from 'apollo-boost';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext }     from 'apollo-link-context'

const cache = new InMemoryCache();
const httpLink = new createHttpLink({
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

const apolloClient = new ApolloClient({ cache, link: authLink.concat(httpLink) });

export default apolloClient