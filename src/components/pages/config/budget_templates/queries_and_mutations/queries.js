import gql          from 'graphql-tag';

export const GET_BUDGETING_TEMPLATE = gql`
  query budgetingTemplate ($id: ID! ) {
    budgetingTemplate (id: $id) {
      active
      id
      name
      proceduresTemplate {
        id
        name
      }
    }
  }
`

export const CREATE_BUDGETING_TEMPLATE = gql`
  mutation createBudgetingTemplate ($name: String!){
    createBudgetingTemplate (input: {name: $name} ) {
      budgetingTemplate {
        active
        id
        name
        serialNumber
      }
    }
  }
`

export const UPDATE_BUDGETING_TEMPLATE = gql`
  mutation updateBudgetingTemplate (
    $id: ID!,
    $name: String,
    $active: Boolean,
    $clientMutationId: String)
    {
    updateBudgetingTemplate (input: 
      {
        id: $id,
        name: $name,
        active: $active,
        clientMutationId: $clientMutationId
      }
    )
    {
      budgetingTemplate{
        id
        name
        active
        serialNumber
      }
    }
  }
`

export const GET_BUDGETING_TEMPLATES = gql`
  query budgetingTemplates (
    $page: Int,
    $per: Int,
    $sortDirection: String,
    $sortField: String,
    $searchField: String,
    $searchValue: String
  )
  {
    budgetingTemplates (
      page: $page,
      per: $per,
      sortDirection: $sortDirection,
      sortField: $sortField,
      searchField: $searchField,
      searchValue: $searchValue
    )
    {
      active
      id
      name
      serialNumber
    }
    budgetingTemplatesCount
  }
`

export const GET_BUDGETING_TEMPLATES_QUICK_LIST = gql`
  query proceduresTemplatesQuickList{
    proceduresTemplatesQuickList{
      name
      id
    }
  }
`

