import { gql } from '@apollo/client';

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment(
    $assignedIds: [ID!]!,
    $initDate: ISO8601DateTime!,
    $endDate: ISO8601DateTime!,
    $place: String!,
    $extraData: String!
  ) {
    createAppointment(
      input: {
        assignedIds: $assignedIds,
        initDate: $initDate,
        endDate: $endDate,
        place: $place,
        extraData: $extraData}
    ) {
      appointment {
        users {
          id
          fullName
          avatarThumbUrl          
        }
        initDate
        endDate
        place
        extraData
      }
    }
  }
`

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser @client {
      firstName
      lastName
      id
      address
      email
      lockedAt
      phone
      avatarThumbUrl
      avatarMidUrl
      avatarUrl
      updatedAt
      role {
        name
        permanentLink
      }
    }
  }
`

export const GET_APPOINTMENTS = gql`
  query appoitments (
    $page: Int,
    $per: Int
    $sortDirection: String,
    $sortField: String,
    $searchField: String,
    $searchValue: String
  ){
    appointments(
      page: $page, 
      per: $per,
      sortDirection: $sortDirection,
      sortField: $sortField,
      searchField: $searchField,
      searchValue: $searchValue
    ){
      id
      creatorId
      place
      extraData
      initDate
      endDate
      users{
        id
        fullName
        avatarThumbUrl
      }
    }
  }
`

export const USERS_QUICK_LIST = gql`
  query usersQuickList{
    usersQuickList{
      id
      firstName
      lastName
      avatarThumbUrl
    }
  }
`

export const GET_USER = gql`
  query getuser($id: ID!){
    user(id: $id) {
      id
      firstName
      lastName
      email
      avatarThumbUrl
    }
  }
`
