import { gql } from '@apollo/client';

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment(
    $creatorId: ID!,
    $assignedId: ID!,
    $initDate: ISO8601DateTime!,
    $endDate: ISO8601DateTime!,
    $place: String!,
    $extraData: String!
  ) {
    createAppointment(
      input: {
        creatorId: $creatorId,
        assignedId: $assignedId,
        initDate: $initDate,
        endDate: $endDate,
        place: $place,
        extraData: $extraData}
    ) {
      appointment {
        creatorId
        assignedId
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

export const GET_APPOINTMENTS = gql `
  query currentAppoitments (
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
      assignedId
      place
      extraData
      initDate
      endDate
    }
  }
`
export const CREATE_APPOINTENTS = gql`
  mutation createAppointment(
    $creatorId: ID!,
    $assignedId: ID!,
    $initDate: ISO8601DateTime!,
    $endDate: ISO8601DateTime!,
    $place: String!,
    $extraData: String!
  ){
    createAppointment(
      input: {
        creatorId: $creatorId,
        assignedId: $assignedId,
        initDate: $initDate,
        endDate: $endDate,
        place: $place,
        extraData: $extraData
      }
    ) {
      appointment {
        creatorId
        assignedId
        initDate
        endDate
        place
        extraData
      }
    }
  }
`