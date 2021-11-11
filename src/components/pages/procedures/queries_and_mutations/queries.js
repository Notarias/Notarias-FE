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
  }
  proceduresCount
}  
`