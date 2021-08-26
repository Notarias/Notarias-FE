import gql from 'graphql-tag';

export const GET_LATEST_COMMENTS = gql`
  query latestComments($searchField: String, $searchValue: String, $per: Int){
    comments(searchField: $searchField, searchValue: $searchValue, per: $per){
      id
      body
      commentableId
      commentableType
      user{
        id
        avatarMidUrl
        firstName
        createdAt
      }
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
        fullName
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
      total
      totalCredit
      totalDebt
      totalPaid
      createdAt
      asigneeId
      asignee{
        firstName
        lastName
        avatarThumbUrl
      }
    }
    budgetsCount
  }
`
