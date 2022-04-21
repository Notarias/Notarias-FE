import gql          from 'graphql-tag';

export const LOAD_PERMISSIONS = gql`
  query permissions {
    permissions{
      id
      name
      permanentLink
      updatedAt
    }
  }
`

export const GET_PERMISSION = gql`
  query getPermission($id: ID!){
    permission(id: $id) {
      id
      name
      permanentLink
      updatedAt
    }
  }
`

export const CREATE_PERMISSION = gql`
  mutation createPermission (
    $name: String!
  ){
    createPermission(
      input: {
        name: $name
      }
    ){
      permission{
        id
        name
        permanentLink
      }
    }
  }
`

export const UPDATE_PERMISSION = gql`
  mutation updatePermission (
    $id: ID!,
    $name: String!
  ){
    updatePermission(
      input: {
        id: $id,
        name: $name
      }
    ){
      permission{
        id
        name
        permanentLink
      }
    }
  }
`

export const DESTROY_PERMISSION = gql`
  mutation destroyPermission($id: ID!){
    destroyPermission(input:{id: $id}){
      clientMutationId
    }
  }
`
