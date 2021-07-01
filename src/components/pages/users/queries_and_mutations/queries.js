import gql          from 'graphql-tag';

export const GET_USER = gql`
  query getuser($id: ID!){
    user(id: $id) {
      id
      firstName
      lastName
      email
      address
      phone
      lockedAt
      roleId
      role {
        name
        permanentLink
        createdAt
        updatedAt
      }
    }
    roles{
      name
      createdAt
      permanentLink
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $locked: Boolean) {
    updateUser(input: {id:$id, locked: $locked}){
      user{
        firstName
        lastName
        lockedAt
        role{
          name
        }
      }
    }
  }
`

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser @client {
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
      role {
        name
        permanentLink
      }
    }
  }
`
