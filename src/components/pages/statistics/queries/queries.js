import { gql } from '@apollo/client';

export const STATISTICS_QUERY = gql`
  query statistics (
    $date: String!
    $timeFrame: String
    $timeZone: String!
    $status: String
    $userId: ID
    $clientId: ID
  ){
    statistics(
      date: $date
      timeFrame: $timeFrame
      timeZone: $timeZone
      status: $status
      userId: $userId
      clientId: $clientId
    ){
      name
      total
      income
      paid
      debt
    }
  }
`

export const TAB_STATISTICS_QUERY = gql`
  query tabStatistics (
    $date: String!,
    $timeFrame: String,
    $timeZone: String!,
    $status: String,
    $budgetingTemplateId: ID!,
    $tabIds: [ID!]!,
    $userId: ID,
    $clientId: ID
  ){
    tabStatistics(
      date: $date,
      timeFrame: $timeFrame,
      timeZone: $timeZone,
      budgetingTemplateId: $budgetingTemplateId,
      tabIds: $tabIds,
      status: $status,
      userId: $userId,
      clientId: $clientId
    ){
      name
      total
      paid
      debt
    }
  }
`

export const GET_STATISTICS_BUDGETING_TEMPLATES = gql`
  query statisticsBudgetingTemplates {
    statisticsBudgetingTemplates {
      id
      name
    }
  }
`

export const GET_STATISTICS_BUDGETING_TEMPLATE_TABS = gql`
  query statisticsBudgetingTemplateTabs(
    $templateId: ID!
  ) {
    statisticsBudgetingTemplateTabs(templateId: $templateId) {
      id
      name
    }
  }
`
export const USERS_QUICK_LIST = gql`
  query usersQuickList{
    usersQuickList{
      id
      firstName
      lastName
      fullName
      avatarThumbUrl
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
