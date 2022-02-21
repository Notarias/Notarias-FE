import { gql } from '@apollo/client';

export const STATISTICS_QUERY = gql`
query statistics (
  $startDate: String!
  $endDate: String!
  $timeFrame: String
){
  statistics(
    startDate: $startDate
    endDate: $endDate
    timeFrame: $timeFrame
  ){
    name
    total
    income
    paid
    debt
  }
}
`