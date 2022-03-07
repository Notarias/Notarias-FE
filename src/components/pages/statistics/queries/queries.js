import { gql } from '@apollo/client';

export const STATISTICS_QUERY = gql`
  query statistics (
    $startDate: String!
    $endDate: String!
    $timeFrame: String
    $timeZone: String!
    $status: String
  ){
    statistics(
      startDate: $startDate
      endDate: $endDate
      timeFrame: $timeFrame
      timeZone: $timeZone
      status: $status
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
    $startDate: String!
    $endDate: String!
    $timeFrame: String
    $timeZone: String!
    $status: String
    $budgetingTemplateId: ID!
    $tabIds: [ID!]!
  ){
    tabStatistics(
      startDate: $startDate
      endDate: $endDate
      timeFrame: $timeFrame
      timeZone: $timeZone
      budgetingTemplateId: $budgetingTemplateId
      tabIds: $tabIds,
      status: $status
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