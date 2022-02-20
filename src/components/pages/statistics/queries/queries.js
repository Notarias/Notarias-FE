import { gql } from '@apollo/client';

export const GET_STATISTICS = gql`
  query getStatistics($startDate: String!, $endDate: String!) {
    statistics(startDate: $startDate, endDate: $endDate) {
      statistics {
        a
      }
    }
  }
`