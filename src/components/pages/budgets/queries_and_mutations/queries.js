import gql          from 'graphql-tag';

export const CREATE_BUDGET = gql`
 mutation createBudget (
    $proceduresTemplateId: ID!,
  	$clientId: ID!,
    $budgetingTemplateId: ID!,
  	$clientMutationId:String
  ){
    createBudget (
      input: {
        proceduresTemplateId: $proceduresTemplateId,
        clientId: $clientId,
        budgetingTemplateId: $budgetingTemplateId,
        clientMutationId: $clientMutationId
      } 
    ) 
    {
      budget{
      	budgetingTemplate{
        	active
        	id
        	name
          serialNumber
          proceduresTemplates{
            name
            id
          }
      	}
      	client{
        	firstName
        	lastName
          id
          email
          phone
      	}
      	id
      	serialNumber
      }
      clientMutationId
    }
  }
`

export const GET_BUDGETS = gql`
  query budgets (
    $page: Int,
    $per: Int,
    $sortDirection: String,
    $sortField: String,
    $search: BUDGET_SEARCH_INPUT
  )
  {
    budgets (
      page: $page,
      per: $per,
      sortDirection: $sortDirection,
      sortField: $sortField,
      search: $search,
    )
    {
      budgetingTemplate{
        name
        id
        active
        serialNumber
        proceduresTemplates{
          name
          id
        }
      }
      client{
        firstName
        lastName
        id
        email
        phone
      }
      id
      serialNumber
    }
    budgetsCount
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

export const CREATE_CLIENT = gql`
  mutation createClient(
    $firstName: String!,
    $lastName: String!,
    $curp: String,
    $rfc: String
  ) {
    createClient(input: {
      firstName: $firstName,
      lastName: $lastName,
      curp: $curp,
      rfc: $rfc
    }
  ) 
    {
      client {
        id
        firstName
        lastName
        curp
        rfc
      }
    }
  }
`

export const BUDGETING_TEMPLATE_BY_PROCEDURE_ID = gql`
  query budgetingTemplatesByProcedureId (
    $proceduresTemplateId: ID!
  ){
    budgetingTemplatesByProcedureId(
       proceduresTemplateId: $proceduresTemplateId
    ){
      id
      name
      serialNumber
      active
    }
  }
`

export const GET_BUDGET = gql`
  query budget(
    $id: ID!
  ){
  budget(
    id: $id
    ){
      budgetingTemplate{
        active
        id
        name
      },
      client{
        firstName
        lastName
        rfc
        curp
        id
      },
      proceduresTemplate{
        active
        name
        id
      }
    }
  }
`

export const GET_BUDGETING_TEMPLATES_TABS = gql`
  query budgetingTemplateTabs ($id: ID! ) {
    budgetingTemplateTabs (id: $id) {
      active
      id
      name
      budgetingTemplateId
    }
  }
`

export const GET_BUDGETING_TEMPLATE_TAB_FIELDS = gql`
  query budgetingTemplateTabFields(
    $id: ID!
  )
  {
    budgetingTemplateTabFields(
      id: $id
    )
    {
      id
      name
      active
      categories {
        id
        name
      }
    }
  }
`
