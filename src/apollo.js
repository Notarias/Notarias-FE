import { ApolloClient }         from '@apollo/client';
import { InMemoryCache }        from '@apollo/client';
import { onError }              from 'apollo-link-error';
import { ApolloLink, from }     from '@apollo/client/core';
import { BatchHttpLink }        from 'apollo-link-batch-http';

import history                  from './history'
import { resolvers, typeDefs }  from './resolvers/resolvers';
import { createUploadLink }     from 'apollo-upload-client';
import { createConsumer }       from "@rails/actioncable"
import ActionCableLink          from 'graphql-ruby-client/dist/subscriptions/ActionCableLink'

export const cache = new InMemoryCache();

export const BASE_URI = 'peaceful-eyrie-59851.herokuapp.com'

// Change protocol https to http for localhost
const URI = `https://${BASE_URI}/graphql`;

const uploadLink = new createUploadLink({ uri: URI });
// Change protocol wss to ws for localhost

const cableTokenUriAssignation = function() {
  return(`https://${BASE_URI}/cable?token=${localStorage.getItem('jwtToken')}`)
}

const cable = createConsumer(cableTokenUriAssignation)

const batchLinkHttp = new BatchHttpLink({ uri: URI })

let httpLink = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  uploadLink,
  batchLinkHttp
)

let httpLinkConnection = ApolloLink.split(
  ({ query: { definitions } }) => {
    return definitions.some(
      ({ kind, operation }) => {
        return(kind === 'OperationDefinition' && operation === 'subscription')
      }
    )
  },
  new ActionCableLink({cable}),
  httpLink
)

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => {
    const result = {
      headers: {
        ...headers,
        Authorization: localStorage.getItem('jwtToken') || null,
      }
    }
    return(result)
  });

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
    link: from([authMiddleware, logoutLink, httpLinkConnection]),
    typeDefs,
    resolvers
  }
);

export default apolloClient
