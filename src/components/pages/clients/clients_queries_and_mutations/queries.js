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
