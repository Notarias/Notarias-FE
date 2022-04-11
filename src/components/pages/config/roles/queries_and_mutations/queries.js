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
    $name: String!,
    $permanentLink: String
  ){
    createRole(
      input: {
        name: $name,
        permanentLink: $permanentLink
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
    $id: ID!
    $name: String,
    $permanentLink: String
  ){
    updateRole(
      input: {
        id: $id,
        name: $name,
        permanentLink: $permanentLink
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
