import { gql } from 'apollo-boost';
//import { GLOBAL_MESSAGE } from './queries'

export const typeDefs = gql`
  type GlobalMessage {
    message: String
    type: String
  }

  extend type Query {
    globalMessage: GlobalMessage
  }

  extend type Mutation {
    removeMessage(message: String, type: String ): GlobalMessage!
  }

  extend type Query {
    currentUser: User
  }

  type Breadcrumb {
    name: String
    path: String
  }

  extend type Query {
    breadcrumbs: [Breadcrumb]
  }

  input CreateBreadcrumbInput {
    name: String
    path: String
  }

  type CreateBreadcrumbsPayload {
    breadcrumbs: [Breadcrumb]
  }

  extend type Mutation {
    setBreadcrumbs(input: [CreateBreadcrumbInput]): CreateBreadcrumbsPayload
  }
`

export const resolvers = {
  Mutation: {
    removeMessage: (_, { message, type }, { cache }) => {
      //const globalMessage = cache.readQuery({ query: GLOBAL_MESSAGE })

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
    // setBreadcrumbs: (_, { input }, { cache }) => {
    //   //const globalMessage = cache.readQuery({ query: GLOBAL_MESSAGE })
    //   cache.writeData({
    //     data: {
    //       __typename: "CreateBreadcrumbsPayload",
    //       breadcrumbs: (
    //         input.map(breadcrumb => (
    //             {
    //               name: breadcrumb.name,
    //               path: breadcrumb.path,
    //               __typename: "Breadcrumb"
    //             }
    //           )
    //         )
    //       )
    //     }
    //   });
    // }
  }
};