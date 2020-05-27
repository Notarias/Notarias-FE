import { ApolloClient }         from 'apollo-client';
import { InMemoryCache }        from 'apollo-cache-inmemory';
import { onError }              from 'apollo-link-error';
import { ApolloLink, from }     from 'apollo-link';
import { BatchHttpLink }        from 'apollo-link-batch-http';

import history                  from './history'
import { resolvers, typeDefs }  from './resolvers/resolvers';
import { createUploadLink }     from 'apollo-upload-client';

export const cache = new InMemoryCache();

const URI = 'https://peaceful-eyrie-59851.herokuapp.com/graphql';

const uploadLink = new createUploadLink({
  uri: URI
  //
});

const batchLinkHttp = new BatchHttpLink({ uri: URI })

const httpLink = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  uploadLink,
  batchLinkHttp
)

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('jwtToken') || null,
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