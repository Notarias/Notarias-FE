import gql          from 'graphql-tag';

export const CREATE_BUDGETING_TEMPLATE = gql`
   mutation createBudget (
    $budgetingTemplateId: ID!,
  	$clientId: ID!,
  	$clientMutationId:String
  ){
    createBudget (
      input: {
        budgetingTemplateId: $budgetingTemplateId,
        clientId: $clientId,
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
  }
`
