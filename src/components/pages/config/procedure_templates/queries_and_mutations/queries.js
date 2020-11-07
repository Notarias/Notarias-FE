import gql          from 'graphql-tag';

export const PROCEDURE_TEMPLATES = gql`
  query procedureTemplates (
      $page: Int,
      $per: Int,
      $sortDirection: String,
      $sortField: String,
      $searchField: String,
      $searchValue: String
    )
    {
      procedureTemplates (
        page: $page,
        per: $per,
        sortDirection: $sortDirection,
        sortField: $sortField,
        searchField: $searchField,
        searchValue: $searchValue
      ) 
      {
        id
        name
        active
        serialNumber
      }
      procedureTemplatesCount
    }
`

export const UPDATE_PROCEDURE_TEMPLATES = gql`
  mutation updateProcedureTemplates ($id: ID!,
    $name: String,
    $active: Boolean,
    $clientMutationId: String)
    {
    updateProcedureTemplate (input: 
      {
        id: $id,
        name: $name,
        active: $active,
        clientMutationId: $clientMutationId
      }
    )
    {
      procedureTemplate{
        id
        name
        active
        serialNumber
      }
    }
  }
`

export const GET_PROCEDURE_TEMPLATE = gql`
  query getTemplate ($id: ID!){
	  procedureTemplate(id: $id){
      id
      name
      serialNumber
      active
    }
  }
`

export const CREATE_PROCEDURE_TEMPLATE = gql`
  mutation createProcedureTemplate ($name: String!){
    createProceduresTemplate (input: {name: $name} ) {
        proceduresTemplate {
          active
          id
          name
        }
    }
  }
`