
import { gql } from '@apollo/client';

export const GLOBAL_MESSAGE = gql`
  query {
    globalMessage @client {
      message
      type
    }
  }
`;

export const REMOVE_MESSAGE_MUTATION = gql`
  mutation removeMessage($message: String, $type: String) {
    removeMessage(message: $message, type: $type) @client
  }
`

export const GET_CURRENT_USER = gql`
  query currentUser{
    currentUser{
      firstName
      lastName
      id
      address
      email
      lockedAt
      phone
      avatarThumbUrl
      avatarMidUrl
      avatarUrl
      updatedAt
      roles {
        id
        name
        permanentLink
      }
      permissions {
        id
        name
        permanentLink
      }
    }
  }
`

export const SET_BREADCRUMBS = gql`
  mutation setBreadcrumbs($input: [CreateBreadcrumbInput]) {
    setBreadcrumbs(input: $input) @client {
      breadcrumbs {
        name
        path
      }
    }
  }
`

export const GET_BREADCRUMBS = gql`
  query getBreadcrumbs {
    breadcrumbs @client {
      name
      path
    }
  }
`
