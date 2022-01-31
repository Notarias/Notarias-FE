import { gql } from '@apollo/client';

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

export const GET_APPOINTMENTS = gql`
  query appoitments (
    $page: Int,
    $per: Int
    $sortDirection: String,
    $sortField: String
  ){
    appointments(
      page: $page, 
      per: $per,
      sortDirection: $sortDirection,
      sortField: $sortField
    ){
      id
      creatorId
      place
      extraData
      initDate
      endDate
      createdAt
      users{
        id
        firstName
        lastName
        avatarThumbUrl
      }
    }
  }
`

export const GET_USER = gql`
  query getuser($id: ID!){
    user(id: $id) {
      id
      firstName
      lastName
      avatarThumbUrl
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
      comments{
        body
        commentableId
        commentableType
        id
        createdAt
        updatedAt
        user{
          avatarThumbUrl
          avatarUrl
          id
          firstName
          lastName
        }
      }
      id
      serialNumber
      total
      totalCredit
      totalDebt
      totalPaid
      createdAt
      asigneeId
      completedAt
      asignee {
        id
        firstName
        lastName
        avatarThumbUrl
      }
    }
    budgetsCount
  }
`

export const GET_PROCEDURES = gql`
  query Procedures(
    $page: Int
    $per: Int
    $sortDirection: String
    $sortField: String
    $search: PROCEDURES_SEARCH_INPUT
  ){
    procedures(
      page: $page
      per: $per
      sortDirection: $sortDirection
      sortField: $sortField
      search: $search
    ){
      id
      serialNumber
      client{ fullName }
      budgetingTemplate { name }
      proceduresTemplate { name }
      asignee { 
        avatarThumbUrl,
        firstName,
        lastName }
      reporter { avatarThumbUrl,
        firstName,
        lastName }
      comments{
        body
        commentableId
        commentableType
        id
        createdAt
        updatedAt
        user{
          avatarThumbUrl
          avatarUrl
          id
          firstName
          lastName
        }
      }
      createdAt
      updatedAt
      completedAt
    }
    proceduresCount
  }
`

export const GET_CREDIT_PAYMENTS = gql`
  query dashboardCreditPayments(
    $page: Int
    $per: Int
    $sortDirection: String
    $sortField: String
  ){
    dashboardCreditPayments(
      page: $page,
      per: $per,
      sortDirection: $sortDirection,
      sortField: $sortField
    ){
      budget{
      	id,
      	budgetingTemplate{
          name
        }
        client{
          fullName
        }
        asignee{
          avatarThumbUrl,
          firstName,
          lastName
        }
        proceduresTemplate{
          name
        }
      },
      createdAt,
      id,
      note,
      paymentType,
      total,
      updatedAt,
      voidAt
    }
  }
`

export const GET_PAYMENTS = gql`
  query dashboardPayments(
    $page: Int
    $per: Int
    $sortDirection: String
    $sortField: String
  ){
    dashboardPayments(
      page: $page,
      per: $per,
      sortDirection: $sortDirection,
      sortField: $sortField
    ){
      budget{
        id,
        budgetingTemplate{
          name,
        }
        proceduresTemplate{
          name
        }
        client{
          fullName
        }
        asignee{
          avatarThumbUrl,
          firstName,
          lastName
        }
      },
      budgetFieldValue{
        id,
        active,
        field{
          name,
          
        },
        totalDebt,
        totalPaid
        value
      }
      createdAt,
      id,
      note,
      total,
      updatedAt,
      voidAt
    }
  }
`
