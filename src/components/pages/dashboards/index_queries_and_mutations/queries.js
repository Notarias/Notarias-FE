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
