import { ApolloClient }   from 'apollo-boost';
import { InMemoryCache }  from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { onError }        from 'apollo-link-error';
import   history          from './history'
import { ApolloLink, from }    from 'apollo-link';
import { resolvers, typeDefs } from './resolvers/resolvers';
import { persistCache }        from 'apollo-cache-persist';

export const cache = new InMemoryCache();

const httpLink = new createHttpLink({
  uri: 'https://peaceful-eyrie-59851.herokuapp.com/graphql'
  //uri: 'http://localhost:3000/graphql'
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
    }
  }));

  return forward(operation);
})

const logoutLink = onError(({ networkError, forward, operation }) => {
  if (networkError && networkError.statusCode === 401) {
    localStorage.clear();
    history.push(`/sign_in`)
  }
})

const apolloClient = new ApolloClient(
  {
    cache,
    link: from([authMiddleware, logoutLink, httpLink]),
    typeDefs,
    resolvers
  }
);

export default apolloClient