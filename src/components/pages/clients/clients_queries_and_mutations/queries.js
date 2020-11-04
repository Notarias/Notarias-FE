import gql from 'graphql-tag';

export const GET_CLIENT = gql`
  query getClient($id: ID! ){
    client(id: $id){
      id
      firstName
      lastName
      email
      phone
      address
      business
      category
      rfc
      serialNumber
    }
  }
`

export const UPDATE_CLIENT_MUTATION = gql`
  mutation updateClient($id: ID!, $firstName: String, $lastName:String,$email: String, $rfc: String, $phone: String, $address: String, $business: String, $category: String){
    updateClient(input: {id: $id, firstName: $firstName, lastName: $lastName, email: $email, rfc: $rfc, phone: $phone, address: $address, business: $business, category: $category }){
      client{
        id
        firstName
        lastName
        email
        phone
        address
        business
        category
        rfc
      }
      errors
      pointers
    }
  }
`

export const CREATE_CLIENT_MUTATION = gql`
  mutation createClient($firstName: String, $lastName: String) {
    createClient(input: { firstName: $firstName, lastName: $lastName }) {
      client {
        id
        firstName
        lastName
      }
      errors
      pointers
    }
  }
`

export const LOAD_CLIENTS = gql`
  query searchClients(
      $page: Int,
      $per: Int,
      $sortField: String,
      $sortDirection: String,
      $searchField: String,
      $searchValue: String
    ) {
    clients(
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
      rfc
    }
  }
`

export const LOAD_CLIENT_COMMENTS = gql `
  query clientComments($clientId: ID!,
    $page: Int,
    $per: Int
    $sortDirection: String,
    $sortField: String,
    $searchField: String,
    $searchValue: String)
    {
      clientComments(clientId: $clientId,
        page: $page, 
        per: $per,
        sortDirection: $sortDirection,
        sortField: $sortField,
        searchField: $searchField,
        searchValue: $searchValue)
        {
          id
          commentableId
          commentableType
          body
          user{
            id
            avatarThumbUrl
          }
        }
    }
`

export const CREATE_CLIENT_COMMENT_MUTATION = gql `
  mutation createComments($commentableId: ID!, $commentableType: String!, $body: String!){
    createComment(input:{ commentableId: $commentableId,commentableType: $commentableType, body: $body}){
      comment{
        commentableId
        commentableType
        body
      }
      errors
      pointers
    }
  }
`

export const GET_CLIENT_ATTRIBUTE = gql`
  query clientAttributes {
    clientAttributes {
      id
      name
      permanentLink
      style
      active
    }
  }
`
