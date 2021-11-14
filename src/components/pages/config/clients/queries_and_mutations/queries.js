import { gql } from '@apollo/client';

export const CREATE_CLIENT_ATTRIBUTE = gql`
  mutation createClientAttribute ($name: String!, $style: String!, $active: Boolean! ) {
    createClientAttribute(input: { name: $name, style: $style, active: $active }) {
      clientAttribute{
        id
        name
        style
        active
        permanentLink
      }
    }
  }
`

export const GET_CLIENT_ATTRIBUTES = gql`
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

export const DESTROY_CLIENT_ATTRIBUTE = gql`
  mutation destroyClientAttribute ($id: ID! ) {
    destroyClientAttribute (input: { id: $id}) {
      clientAttribute{
        id
      }
    }
  }
`
export const UPDATE_CLIENT_ATTRIBUTE = gql`
  mutation updateClientAttribute ($active: Boolean!, $id: ID!, $name: String!, $style: String! ) {
    updateClientAttribute (input: { id: $id, name: $name, style: $style, active: $active}) {
      clientAttribute{
        id
        name
        style
        active
      }
    }
  }
`