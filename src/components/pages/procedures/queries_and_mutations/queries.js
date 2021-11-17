import gql          from 'graphql-tag';

export const CREATE_PROCEDURES = gql`

mutation CreateProcedures(
  $clientId: ID!,
  $causantId: ID,
  $proceduresTemplateId: ID!,
  $budgetingTemplateId: ID!,
  $asigneeId: ID,
  $reporterId: ID
){
  createProcedure (
    input:{
	    clientId: $clientId
      causantId: $causantId
      proceduresTemplateId: $proceduresTemplateId
      budgetingTemplateId: $budgetingTemplateId
      asigneeId: $asigneeId
      reporterId: $reporterId
    }
  ){
    procedure {
      id
      serialNumber
      client{ fullName }
      causant{ fullName }
      budgetingTemplate { name }
      proceduresTemplate { name }
      asignee { avatarThumbUrl }
      reporter { avatarThumbUrl }
      createdAt
      updatedAt
      completedAt
    }
  }
}
`
export const GET_PROCEDURES = gql`
  
query Procedures(
  $page: Int
  $per: Int
  $sortDirection: String
  $sortField: String
  $search: PROCEDURES_SEARCH_INPUT
){
  procedures(
    page: $page
    per: $per
    sortDirection: $sortDirection
    sortField: $sortField
    search: $search)
  {
    id
    serialNumber
    client{ fullName }
    budgetingTemplate { name }
    proceduresTemplate { name }
    reporter { avatarThumbUrl }
    createdAt
    updatedAt
    completedAt
  }
  proceduresCount
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
      curp
    }
    clientsCount
  }
`

export const LOAD_CAUSANTS = gql`
  query searchCausants(
      $page: Int,
      $per: Int,
      $sortField: String,
      $sortDirection: String,
      $searchField: String,
      $searchValue: String
    ) {
    causants(
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
      curp
      causant
    }
    causantsCount
  }
`
export const GET_PROCEDURES_TEMPLATES_QUICK_LIST = gql`
  query proceduresTemplatesQuickList{
    proceduresTemplatesQuickList{
      name
      id
      budgetingTemplatesIds
    }
  }
`