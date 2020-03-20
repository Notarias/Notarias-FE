import React   from 'react';
import { gql } from 'apollo-boost';
import { GLOBAL_MESSAGE } from './queries'

export const typeDefs = gql`
  extend type Query {
    globalMessage: GlobalMessage
  }

  type GlobalMessage {
    message: String
    type: String
  }

  type Mutation {
    removeMessage(message: String, type: String ): GlobalMessage!
  }
`

export const resolvers = {
  Mutation: {
    removeMessage: (_, { message, type }, { cache }) => {
      console.log(message, type, cache, _)
      const globalMessage = cache.readQuery({ query: GLOBAL_MESSAGE })

      cache.writeData({
        data: {
          globalMessage: {
            message: null,
            type: null,
            __typename: "GlobalMessage"
          }
        }
      });
    }
  }
};