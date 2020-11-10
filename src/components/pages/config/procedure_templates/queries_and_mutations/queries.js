import gql          from 'graphql-tag';

export const PROCEDURE_TEMPLATES = gql`
  query proceduresTemplates (
      $page: Int,
      $per: Int,
      $sortDirection: String,
      $sortField: String,
      $searchField: String,
      $searchValue: String
    )
    {
      proceduresTemplates (
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
        tabs
      }
      proceduresTemplatesCount
    }
`

export const UPDATE_PROCEDURE_TEMPLATES = gql`
  mutation updateProceduresTemplates ($id: ID!,
    $name: String,
    $active: Boolean,
    $clientMutationId: String)
    {
    updateProceduresTemplate (input: 
      {
        id: $id,
        name: $name,
        active: $active,
        clientMutationId: $clientMutationId
      }
    )
    {
      proceduresTemplate{
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
    proceduresTemplate(id: $id){
      id
      name
      serialNumber
      active
      tabs {
        id
      }
    }
  }
`

export const CREATE_PROCEDURE_TEMPLATE = gql`
  mutation createProceduresTemplate ($name: String!){
    createProceduresTemplate (input: {name: $name} ) {
        proceduresTemplate {
          active
          id
          name
        }
    }
  }
`

export const GET_PROCEDURES_TEMPLATE_TABS = gql`
  query proceduresTemplateTabs($proceduresTemplateId: ID!){
    proceduresTemplateTabs(proceduresTemplateId: $proceduresTemplateId) {
      id
      name
    }
  }
`

export const GET_PROCEDURE_TEMPLATE_TAB_FIELDS = gql`
  query proceduresTemplateTabFields($proceduresTemplateTabId: ID!){
    proceduresTemplateTabFields(proceduresTemplateTabId: $proceduresTemplateTabId) {
      id
      favourite
      name
      style
    }
  }
`