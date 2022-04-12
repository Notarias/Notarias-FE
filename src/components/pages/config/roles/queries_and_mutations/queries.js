import gql          from 'graphql-tag';

export const LOAD_ROLES = gql`
  query roles {
    roles{
      id
      name
      permanentLink
      updatedAt
    }
  }
`

export const CREATE_ROLE = gql`
  mutation createRole (
    $name: String!
  ){
    createRole(
      input: {
        name: $name
      }
    ){
      role{
        id
        name
        permanentLink
      }
    }
  }
`

export const UPDATE_ROLE = gql`
  mutation updateRole (
    $id: ID!,
    $name: String!
  ){
    updateRole(
      input: {
        id: $id,
        name: $name
      }
    ){
      role{
        id
        name
        permanentLink
      }
    }
  }
`

export const DESTROY_ROLE = gql`
  mutation destroyRole($id: ID!){
    destroyRole(input:{id: $id}){
      clientMutationId
    }
  }
`
