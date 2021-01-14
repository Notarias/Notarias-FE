import gql          from 'graphql-tag';

export const GET_BUDGETING_TEMPLATE = gql`
  query budgetingTemplate ($id: ID! ) {
    budgetingTemplate (id: $id) {
      active
      id
      name
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
    proceduresTemplatesCount
  }
`
