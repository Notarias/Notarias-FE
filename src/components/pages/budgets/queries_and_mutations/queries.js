import gql          from 'graphql-tag';

export const CREATE_BUDGET = gql`
 mutation createBudget (
    $proceduresTemplateId: ID!,
  	$clientId: ID!,
    $budgetingTemplateId: ID!,
  	$clientMutationId:String,
    $asigneeId: ID
  ){
    createBudget (
      input: {
        proceduresTemplateId: $proceduresTemplateId,
        clientId: $clientId,
        budgetingTemplateId: $budgetingTemplateId,
        clientMutationId: $clientMutationId,
        asigneeId: $asigneeId
      } 
    ) 
    {
      budget{
        asignee{
          firstName
          lastName
          avatarThumbUrl
          id
        }
        asigneeId
        reporter{
          firstName
          lastName
          avatarThumbUrl
          id
        }
        reporterId
      	budgetingTemplate{
        	active
        	id
        	name
          serialNumber
          proceduresTemplates{
            name
            id
          }
      	}
      	client{
        	firstName
        	lastName
          id
          email
          phone
      	}
      	id
      	serialNumber
        total
        totalDebt
        totalCredit
        totalPaid
      }
      clientMutationId
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
    }
    budgetsCount
  }
`

export const GET_PROCEDURES_TEMPLATES_QUICK_LIST = gql`
  query proceduresTemplatesQuickList{
    proceduresTemplatesQuickList{
      name
      id
      budgetingTemplatesIds
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

export const CREATE_CLIENT = gql`
  mutation createClient(
    $firstName: String!,
    $lastName: String!,
    $curp: String,
    $rfc: String
  ) {
    createClient(input: {
      firstName: $firstName,
      lastName: $lastName,
      curp: $curp,
      rfc: $rfc
    }
  ) 
    {
      client {
        id
        firstName
        lastName
        curp
        rfc
      }
    }
  }
`

export const BUDGETING_TEMPLATE_BY_PROCEDURE_ID = gql`
  query budgetingTemplatesByProcedureId (
    $proceduresTemplateId: ID!
  ){
    budgetingTemplatesByProcedureId(
       proceduresTemplateId: $proceduresTemplateId
    ){
      id
      name
      serialNumber
      active
    }
  }
`

export const GET_BUDGET = gql`
query budget(
    $id: ID!
  ){
  budget(
    id: $id
    ){
      asignee{
        firstName
        lastName
        avatarThumbUrl
        id
      }
      id
      asigneeId
      total
      totalCredit
      totalPaid
      totalDebt
      reporter{
        firstName
        lastName
        avatarThumbUrl
        id
      }
      reporterId
      budgetingTemplate{
        active
        id
        name
      },
      client{
        firstName
        lastName
        rfc
        curp
        id
      },
      proceduresTemplate{
        active
        name
        id
      },
      fieldValues{
        id
        value
        budgetId
        budgetingTemplateFieldId
        field{
          name
          id
          budgetingTemplateTabId
        }
      }
    }
  }
`

export const GET_BUDGETING_TEMPLATES_TABS = gql`
  query budgetingTemplateTabs ($id: ID! ) {
    budgetingTemplateTabs (id: $id) {
      active
      id
      name
      budgetingTemplateId
    }
  }
`

export const GET_BUDGETING_TEMPLATE_TAB_FIELDS = gql`
  query budgetingTemplateTabFields(
    $id: ID!
  )
  {
    budgetingTemplateTabFields(
      id: $id
    )
    {
      id
      name
      active
      categories {
        id
        name
      }
    }
  }
`

export const UPDATE_BUDGET_FIELD_VALUE = gql`
  mutation updateBudgetFieldValue(
    $id: ID!,
    $budgetingTemplateFieldId: ID,
    $budgetId: ID,
    $value: Int!,
  ){
    updateBudgetFieldValue(input:{
      id: $id,
      budgetingTemplateFieldId: $budgetingTemplateFieldId,
      budgetId: $budgetId,
      value: $value
      }
    ){
      budgetFieldValue{
        budgetId
        budgetingTemplateFieldId
        field{
          name
          id
          budgetingTemplateTabId
        }
        id
        value
      }
    }
  }
`

export const CREATE_BUDGET_FIELD_VALUE = gql`
  mutation createBudgetFieldValue(
    $budgetingTemplateFieldId: ID,
    $budgetId: ID,
    $value: Int!,
  ){
    createBudgetFieldValue(input:{
      budgetingTemplateFieldId: $budgetingTemplateFieldId,
      budgetId: $budgetId,
      value: $value
      }
    ){
      budgetFieldValue{
        budgetId
        budgetingTemplateFieldId
        field{
          name
          id
          budgetingTemplateTabId
        }
        id
        value
      }
    }
  }
`

export const GET_BUDGET_FIELD_VALUE = gql`
  query budgetFieldValue(
    $budgetingTemplateFieldId: ID!,
    $budgetId: ID!
  ){
  budgetFieldValue(
    budgetingTemplateFieldId: $budgetingTemplateFieldId
    budgetId: $budgetId
    ){
      id
      value
      budgetId
      budgetingTemplateFieldId
      totalDebt
      totalPaid
      field{
        id
        name
        budgetingTemplateTabId
      }
    }
  }
`

export const CREATE_CREDIT_PAYMENT = gql`
  mutation createCreditPayment(
    $note: String,
    $budgetId: ID!,
    $total: Int!,
  ){
    createCreditPayment(input:{
      note: $note,
      budgetId: $budgetId,
      total: $total,
      }
    ){
      creditPayment{
        budgetId
        id
        note
        total
      }
    }
  }
`

export const GET_BUDGET_TOTALS = gql`
  query budgetTotals(
    $id: ID!
  ){
    budgetTotals(
      id: $id
    ){
      total
      totalCredit
      totalPaid
      totalDebt
    }
  }
`

export const GET_CREDIT_PAYMENTS = gql`
  query creditPayments(
    $budgetId: ID!
  ){
    creditPayments(
      budgetId: $budgetId
    ){
      id
      note
      total
      voidAt
      createdAt
    }
  }
`

export const VOID_OR_INVOID = gql`
  mutation voidUnvoidCreditPayment(
    $id: ID!
  ){
    voidUnvoidCreditPayment(input:{
      id: $id
    }
    ){
      creditPayment{
        voidAt
      }
    }
  }
`

export const CREATE_PAYMENT = gql`
  mutation createPayment(
    $budgetId: ID!,
    $budgetFieldValueId: ID!,
    $total: Int!,
    $note: String
  ){
    createPayment(input:{
      budgetId: $budgetId,
      budgetFieldValueId: $budgetFieldValueId,
      total: $total,
      note: $note
    }
    ){
      payment{
        budgetFieldValueId
        budgetId
        id
        note
        total
        voidAt
      }
    }
  }
`

export const GET_PAYMENTS = gql`
query payments(
  $fieldValueId: ID!
){
  payments (
    fieldValueId: $fieldValueId
  ){
    budgetFieldValueId
    budgetId
    id
    note
    total
    voidAt
    createdAt
  }
}
`

export const VOID_OR_UNVOID_PAYMENT = gql`
  mutation voidUnvoidPayment(
    $id: ID!
  ){
    voidUnvoidPayment(input:{
      id: $id
    }
    ){
      payment{
        voidAt
      }
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation createComment(
    $commentableId: ID!,
    $commentableType:String!
    $body:String!
  ){
    createComment(input:{
      commentableId: $commentableId
      commentableType: $commentableType
      body: $body
    }
    ){
      comment{
        body
        commentableId
        commentableType
        id
      }
    }
  }
`

export const GET_COMMENTABLE_COMMENTS = gql`
  query commentableComments(
    $commentableType: String!
    $commentableId: ID!
  ){
    commentableComments (
      commentableType: $commentableType
      commentableId: $commentableId
    ){
      body
      commentableId
      commentableType
      id
      user{
        avatarThumbUrl
        avatarUrl
        id
        firstName
        lastName
        
      }
    }
  }
`

export const UPDATE_COMMENT = gql`
  mutation updateComment(
    $id: ID!,
    $body:String!
  ){
    updateComment(input:{
      id: $id
      body: $body
    }
    ){
      comment{
        body
        commentableId
        commentableType
        id
      }
    }
  }
`

export const DESTROY_COMMENT = gql`
  mutation destroyComment(
    $id: ID!,
  ){
    destroyComment(input:{
      id: $id
    }
    ){
      destroyed
    }
  }
`

export const LOAD_USERS = gql`
  query searchUsers(
      $page: Int,
      $per: Int,
      $sortField: String,
      $sortDirection: String,
      $searchField: String,
      $searchValue: String
    ) {
    users(
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
      avatarThumbUrl
    }
    usersCount
  }
`

export const UPDATE_BUDGET = gql`
  mutation updateBudget(
    $id: ID!,
    $clientId: ID,
    $proceduresTemplateId: ID,
    $budgetingTemplateId: ID,
    $asigneeId: ID,
  ){
    updateBudget(input :{
      id: $id
      clientId: $clientId
      budgetingTemplateId: $budgetingTemplateId
      proceduresTemplateId: $proceduresTemplateId
      asigneeId: $asigneeId
      }
    ){
      budget{
        id
        serialNumber
        total
        totalDebt
        totalPaid
        totalCredit
        asignee{
          firstName
          lastName
          id
          avatarThumbUrl
        }
        asigneeId
        reporter{
          firstName
          lastName
          id
          avatarThumbUrl
        }
        reporterId
        proceduresTemplate{
          active
          name
          id
          serialNumber
        }
        budgetingTemplate{
          active
          id
          name
          serialNumber
        }
        client{
          firstName
          lastName
          id
        }
        fieldValues{
          id
          budgetId
          value
        }
      }
    }
  }
`

export const GET_BUDGETS_AUDITLOG = gql`
query budgetAuditLogs(
    $budgetId: ID!
  ){
  budgetAuditLogs(
    budgetId: $budgetId
    ){
    	auditableId
      auditableType
      id
      createdAt
      updatedAt
      message
      user{
        firstName
        lastName
        avatarThumbUrl
        id
      }
    }
  }
`

export const GET_BUDGETING_TEMPLATE_FIELDS = gql`
  query budgetingTemplateFields ($id: ID! ) {
    budgetingTemplateFields (id: $id) {
      active
      id
      name
      extendable
      budgetingTemplateTabId
    }
  }
`
