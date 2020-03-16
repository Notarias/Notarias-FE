import { ApolloClient } from 'apollo-boost';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        Authorization: localStorage.jwtToken
      }
    })
  }
});

const apolloClient = new ApolloClient({ cache, link });

export default apolloClient