import { gql } from '@apollo/client';

export const STATISTICS_QUERY = gql`
query statistics (
  $startDate: String!
  $endDate: String!
  $timeFrame: String
  $timeZone: String!
){
  statistics(
    startDate: $startDate
    endDate: $endDate
    timeFrame: $timeFrame
    timeZone: $timeZone
  ){
    name
    total
    income
    paid
    debt
  }
}
`