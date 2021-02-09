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
        serialNumber
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
    $proceduresTemplateId: ID,
    $clientMutationId: String)
    {
    updateBudgetingTemplate (input: 
      {
        id: $id,
        name: $name,
        active: $active,
        proceduresTemplateId: $proceduresTemplateId
        clientMutationId: $clientMutationId
      }
    )
    {
      budgetingTemplate{
        id
        name
        active
        serialNumber
        proceduresTemplate{
          id
          name
          serialNumber
        }
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

export const CREATE_BUDGETING_TEMPLATES_TABS = gql`
  mutation createBudgetingTemplateTab ($name: String!, $templateId: ID!){
    createBudgetingTemplateTab (input: {name: $name, templateId: $templateId} ) {
      budgetingTemplateTab {
        active
        id
        name
        budgetingTemplateId
      }
    }
  }
`

export const UPDATE_BUDGETING_TEMPLATE_TAB = gql`
  mutation updateBudgetingTemplateTab ($id: ID!, $name: String, $active: Boolean){
    updateBudgetingTemplateTab (input: {id: $id, name: $name, active: $active} ) {
      budgetingTemplateTab {
        active
        id
        name
        budgetingTemplateId
      }
    }
  }
`

export const DESTROY_BUDGETING_TEMPLATE_TAB = gql`
  mutation destroyBudgetingTemplateTab ($id: ID!){
    destroyBudgetingTemplateTab (input: {id: $id} ) {
      destroyed
    }
  }
`
