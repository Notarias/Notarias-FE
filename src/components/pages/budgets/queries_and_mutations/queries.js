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
      }
      client{
        firstName
        lastName
        id
        email
        phone
      }
      proceduresTemplate{
        name
        id
        active
        serialNumber
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
      total
      totalCredit
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
      },
      fieldValues{
        id
        value
        budgetId
        budgetingTemplateFieldId
        field{
          name
          id
          budgetingTemplateTabId
        }
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

export const UPDATE_BUDGET_FIELD_VALUE = gql`
  mutation updateBudgetFieldValue(
    $id: ID!,
    $budgetingTemplateFieldId: ID,
    $budgetId: ID,
    $value: Int!,
  ){
    updateBudgetFieldValue(input:{
      id: $id,
      budgetingTemplateFieldId: $budgetingTemplateFieldId,
      budgetId: $budgetId,
      value: $value
      }
    ){
      budgetFieldValue{
        budgetId
        budgetingTemplateFieldId
        field{
          name
          id
          budgetingTemplateTabId
        }
        id
        value
      }
    }
  }
`

export const CREATE_BUDGET_FIELD_VALUE = gql`
  mutation createBudgetFieldValue(
    $budgetingTemplateFieldId: ID,
    $budgetId: ID,
    $value: Int!,
  ){
    createBudgetFieldValue(input:{
      budgetingTemplateFieldId: $budgetingTemplateFieldId,
      budgetId: $budgetId,
      value: $value
      }
    ){
      budgetFieldValue{
        budgetId
        budgetingTemplateFieldId
        field{
          name
          id
          budgetingTemplateTabId
        }
        id
        value
      }
    }
  }
`

export const GET_BUDGET_FIELD_VALUE = gql`
  query budgetFieldValue(
    $budgetingTemplateFieldId: ID!,
    $budgetId: ID!
  ){
  budgetFieldValue(
    budgetingTemplateFieldId: $budgetingTemplateFieldId
    budgetId: $budgetId
    ){
      budgetingTemplateFieldId
      id
      value
      budgetId
      budgetingTemplateFieldId
      field{
        id
        name
        budgetingTemplateTabId
      }
    }
  }
`

export const CREATE_CREDIT_PAYMENT = gql`
  mutation createCreditPayment(
    $note: String,
    $budgetId: ID!,
    $total: Int!,
  ){
    createCreditPayment(input:{
      note: $note,
      budgetId: $budgetId,
      total: $total,
      }
    ){
      creditPayment{
        budgetId
        id
        note
        total
      }
    }
  }
`

export const GET_BUDGET_TOTALS = gql`
  query budgetTotals(
    $id: ID!
  ){
    budgetTotals(
      id: $id
    ){
      total
      totalCredit
      totalDistributed
      totalDebt
    }
  }
`