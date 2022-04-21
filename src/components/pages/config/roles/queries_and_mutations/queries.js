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

export const GET_ROLE = gql`
  query getRole($id: ID!){
    role(id: $id) {
      id
      name
      permanentLink
      updatedAt
      permissions{
        id
        name
        permanentLink
      }
    }
  }
`

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

export const ADD_REMOVE_ROLE_PERMISSIONS = gql`
  mutation addRemoveRolePermission (
    $roleId: ID!,
    $permissionId: ID!,
    $validate: Boolean!,
  ){
    addRemoveRolePermission(
      input: {
        roleId: $roleId
        permissionId: $permissionId
        validate: $validate
      }
    ){
      rolePermission{
        role{
          id
          name
          permanentLink
        }
        permission{
          id
          name
          permanentLink
        }      
      }
    }
  }
`
