import { ApolloClient }         from 'apollo-client';
import { InMemoryCache }        from 'apollo-cache-inmemory';
import { onError }              from 'apollo-link-error';
import { ApolloLink, from }     from 'apollo-link';
import { BatchHttpLink }        from 'apollo-link-batch-http';

import history                  from './history'
import { resolvers, typeDefs }  from './resolvers/resolvers';
import { createUploadLink }     from 'apollo-upload-client';
import ActionCable              from 'actioncable'
import ActionCableLink          from 'graphql-ruby-client/dist/subscriptions/ActionCableLink'

export const cache = new InMemoryCache();

const BASE_URI = 'localhost:3001'
// Change protocol https to http for localhost
const URI = `http://${BASE_URI}/graphql`;

const uploadLink = new createUploadLink({ uri: URI });
// Change protocol wss to ws for localhost
const cable = ActionCable.createConsumer(`http://${BASE_URI}/cable?token=${localStorage.getItem('jwtToken')}`)
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