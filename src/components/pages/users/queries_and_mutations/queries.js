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
      roles{
        id
        name
        permanentLink
      }
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
        roles{
          id
          name
          permanentLink
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
      roles{
        id
        name
        permanentLink
      }
    }
  }
`

export const LOAD_USERS = gql`
  query searchClients(
    $page: Int,
    $per: Int,
    $sortField: String,
    $sortDirection: String,
    $searchField: String,
    $searchValue: String
  ) {
  users(
    page: $page,
    per: $per,
    sortField: $sortField,
    sortDirection: $sortDirection,
    searchField: $searchField,
    searchValue: $searchValue
    ) {
      id
      firstName
      lastName
      email
      lockedAt
      roles {
        name
        permanentLink
        createdAt
        updatedAt
      }
    }
    usersCount
  }
`
