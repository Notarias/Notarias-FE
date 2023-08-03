import { gql } from '@apollo/client';

export const CREATE_BUDGET = gql`
 mutation createBudget(
    $proceduresTemplateId: ID!,
  	$clientId: ID!,
    $budgetingTemplateId: ID!,
  	$clientMutationId:String,
    $asigneeId: ID,
    $attorneyId: ID
  ){
    createBudget (
      input: {
        proceduresTemplateId: $proceduresTemplateId,
        clientId: $clientId,
        budgetingTemplateId: $budgetingTemplateId,
        clientMutationId: $clientMutationId,
        asigneeId: $asigneeId,
        attorneyId: $attorneyId
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
        totalPayable
      }
      clientMutationId
    }
  }
`

export const CREATE_BUDGET_FROM_BUDGET = gql`
 mutation createBudgetFromBudget(
    $proceduresTemplateId: ID!,
  	$clientId: ID!,
    $budgetingTemplateId: ID!,
  	$clientMutationId:String,
    $asigneeId: ID,
    $attorneyId: ID,
    $procedureId: ID!,
  ){
    createBudgetFromBudget (
      input: {
        proceduresTemplateId: $proceduresTemplateId,
        clientId: $clientId,
        budgetingTemplateId: $budgetingTemplateId,
        clientMutationId: $clientMutationId,
        asigneeId: $asigneeId,
        attorneyId: $attorneyId,
        procedureId: $procedureId
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
        totalPayable
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
        version
      }
      proceduresTemplate{
        name
        id
        active
        serialNumber
        version
      }
      procedures{
        id
        serialNumber
        writingNumber
        proceedingNumber
      }
      client{
        firstName
        lastName
        fullName
        id
        email
        phone
      }
      id
      serialNumber
      total
      totalCredit
      totalDebt
      totalPaid
      totalPayable
      completedAt
    }
    budgetsCount(
      search: $search
    )
  }
`

export const GET_PROCEDURES_TEMPLATES_QUICK_LIST = gql`
  query proceduresTemplatesQuickList{
    proceduresTemplatesQuickList{
      id
      name
      version
      active
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
      fullName
      rfc
      curp
    }
    clientsCount
  }
`

export const LOAD_ATTORNEYS = gql`
  query searchAttorneys(
      $page: Int,
      $per: Int,
      $sortField: String,
      $sortDirection: String,
      $searchField: String,
      $searchValue: String
    ) {
    attorneys(
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
      fullName
      rfc
      curp
      attorney
    }
    attorneysCount
  }
`

export const CREATE_CLIENT = gql`
  mutation createClient(
    $firstName: String!,
    $lastName: String!,
    $curp: String,
    $rfc: String,
    $moral: Boolean,
    $attorney: Boolean
  ) {
    createClient(input: {
      firstName: $firstName,
      lastName: $lastName,
      curp: $curp,
      rfc: $rfc,
      moral: $moral,
      attorney: $attorney
    }
  ) 
    {
      client {
        id
        firstName
        lastName
        curp
        rfc
        moral
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
      version
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
      totalPayable
      serialNumber
      completedAt
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
        version
      },
      client {
        firstName
        lastName
        rfc
        curp
        id
      },
      attorney {
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
        version
      },
      procedures {
        id
        serialNumber
        writingNumber
        proceedingNumber
        proceduresTemplate{
          name
          id
          version
        }
      }
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

export const GET_PRINT_BUDGET = gql`
query budget(
    $id: ID!
  ){
  budget(
    id: $id
    ){
      id
      total
      totalCredit
      totalPaid
      totalDebt
      totalPayable
      serialNumber
      createdAt
      asignee {
        fullName
        avatarThumbUrl
        id
      }
      procedures {
        id
        serialNumber
        writingNumber
        proceedingNumber
      }
      budgetingTemplate {
        active
        id
        name
      }
      proceduresTemplate {
        id
        name
        active
      }
      client {
        fullName
        rfc
        curp
        id
      }
      attorney {
        fullName
        rfc
        curp
        id
      }
      tabs {
        id
        name
      }
    }
  }
`

export const GET_BUDGET_PROCEDURE_PRINTABLE_FIELDS = gql`
  query budgetProcedurePrintableFields($budgetId: ID!) {
    budgetProcedurePrintableFields(budgetId: $budgetId) {
      id
      name
      printable
      style
      active
      printPosition
    }
  }
`

export const GET_BUDGETING_TEMPLATE_PRINTABLE_FIELDS = gql`
  query budgetingTemplatePrintableFields($budgetId: ID!) {
    budgetingTemplatePrintableFields(id: $budgetId){
      id
      name
      active
      printable
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
      calculable
    }
  }
`

export const GET_BUDGETING_TAB_TOTALS = gql`
  query budgetingTemplateTabTotals ($id: ID!, $budgetId: ID!) {
    tabTotals (id: $id, budgetId: $budgetId) {
      total
      totalPayable
      totalPaid
    }
  }
`

export const GET_BUDGETING_TEMPLATE_TAB_FIELDS = gql`
  query budgetingTemplateTabFields(
    $id: ID!,
    $active: Boolean
  )
  {
    budgetingTemplateTabFields(
      id: $id,
      active: $active
    )
    {
      id
      name
      active
      printable
      calculable
      fieldType
      operator
      taxableSelector
      defaultValue
      categories {
        id
        name
      }
    }
  }
`

export const UPDATE_PROCEDURE_FIELD_VALUE = gql`
  mutation updateProcedureFieldValue(
    $id: ID,
    $proceduresTemplateFieldId: ID,
    $procedureId: ID,
    $value: String,
    $active: Boolean,
  ){
    updateProcedureFieldValue(input:{
      id: $id,
      proceduresTemplateFieldId: $proceduresTemplateFieldId,
      procedureId: $procedureId,
      value: $value,
      active: $active,
      }
    ){
      procedureFieldValue{
        id
        value
        active
      }
    }
  }
`

export const UPDATE_BUDGET_FIELD_VALUE = gql`
  mutation updateBudgetFieldValue(
    $id: ID!,
    $budgetingTemplateFieldId: ID,
    $budgetId: ID,
    $value: Int,
    $active: Boolean
  ){
    updateBudgetFieldValue(input:{
      id: $id,
      budgetingTemplateFieldId: $budgetingTemplateFieldId,
      budgetId: $budgetId,
      value: $value,
      active: $active
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
        active
      }
    }
  }
`

export const UPDATE_BUDGET_FIELD_VALUE_ACTIVE = gql`
  mutation updateBudgetFieldValue(
    $id: ID!,
    $active: Boolean
  ){
    updateBudgetFieldValue(input:{
      id: $id,
      active: $active
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
        active
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
      totalPayable
      totalPaid
      active
      taxes {
        id
      }
    }
  }
`

export const GET_PROCEDURE_FIELD_VALUE = gql`
  query procedureFieldValue(
    $proceduresTemplateFieldId: ID!,
    $procedureId: ID!
  ){
  procedureFieldValue(
    proceduresTemplateFieldId: $proceduresTemplateFieldId,
    procedureId: $procedureId
  ) {
      id
      value
      procedureId
      proceduresTemplateFieldId
      active
    }
  }
`

export const CREATE_CREDIT_PAYMENT = gql`
  mutation createCreditPayment(
    $note: String,
    $budgetId: ID!,
    $total: Int!,
    $paymentType: String!
    $budgetUploadId: ID
  ){
    createCreditPayment(input:{
      note: $note,
      budgetId: $budgetId,
      total: $total,
      paymentType: $paymentType
      budgetUploadId: $budgetUploadId
      }
    ){
      creditPayment{
        budgetId
        id
        note
        total
        paymentType
        lastBudgetUpload{
          id
          file
          fileName
          fileUrl
        }
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
      totalPayable
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
      paymentType
      lastBudgetUpload{
        id
        file
        fileName
        fileUrl
      }
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
    $note: String,
    $budgetUploadId: ID
  ){
    createPayment(input:{
      budgetId: $budgetId,
      budgetFieldValueId: $budgetFieldValueId,
      total: $total,
      note: $note
      budgetUploadId: $budgetUploadId
    }
    ){
      payment{
        budgetFieldValueId
        budgetId
        id
        note
        total
        voidAt
        lastBudgetUpload {
          id
          file
          fileName
          transactionableId
          transactionableType
          userId
          budgetId
        }
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
    lastBudgetUpload{
      id
      file
      fileName
      fileUrl
    }
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
    $per: Int
  ){
    commentableComments (
      commentableType: $commentableType,
      commentableId: $commentableId,
      per: $per
    ){
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

export const UPDATE_BUDGET = gql`
  mutation updateBudget(
    $id: ID!,
    $clientId: ID,
    $proceduresTemplateId: ID,
    $budgetingTemplateId: ID,
    $asigneeId: ID,
    $completedAt: ISO8601DateTime
  ){
    updateBudget(input :{
      id: $id
      clientId: $clientId
      budgetingTemplateId: $budgetingTemplateId
      proceduresTemplateId: $proceduresTemplateId
      asigneeId: $asigneeId
      completedAt: $completedAt
      }
    ){
      budget{
        id
        serialNumber
        total
        totalDebt
        totalPaid
        totalCredit
        totalPayable
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
        procedures{
          id
          serialNumber
          writingNumber
          proceedingNumber
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
      printable
      calculable
      id
      name
      extendable
      budgetingTemplateTabId
    }
  }
`

export const GET_BUDGET_TAB_TOTALS = gql`
  query budgetTabsTotals ($id: ID! ) {
    budgetTabsTotals (id: $id)
  }
`

export const BUDGET_TAXED_FIELDS_FOR_FIELD = gql`
  query budgetTaxedFieldsForField(
    $fieldId: ID!,
    $budgetId: ID!
  )
  {
    budgetTaxedFieldsForField(
      fieldId: $fieldId,
      budgetId: $budgetId
    ) {
      id
      name
      defaultValue
      tax
      fieldValue {
        id
        value
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
      roles {
        id
        name
        permanentLink
      }
      permissions {
        id
        name
        permanentLink
      }
    }
  }
`

export const BUDGET_UPLOAD_FILE = gql`
  mutation budgetUpload(
    $budgetId: ID!,
    $file: Upload!,
    $transactionableId: ID,
    $transactionableType: String,
  ){ 
    budgetUpload(
      input:{
        budgetId: $budgetId
        file: $file
        transactionableId: $transactionableId
        transactionableType: $transactionableType
      }
    ){
      budgetUpload{
        id,
        file,
        fileName,
        fileUrl,
        transactionableId,
        transactionableType
      }
    }
  }
`

export const GET_BUDGETING_TEMPLATES_QUICK_LIST = gql`
  query budgetingTemplatesQuickList{
    budgetingTemplatesQuickList{
      id
      name
      version
      active
    }
  }
`

export const UPDATE_PROCEDURE = gql`
  mutation updateProcedure(
    $id: ID!,
    $clientId: ID,
    $asigneeId: ID,
    $proceedingNumber: String,
    $writingNumber: String,
    $completedAt: ISO8601DateTime,
  ){
    updateProcedure (
      input:{
        id: $id
        clientId: $clientId
        asigneeId: $asigneeId
        proceedingNumber: $proceedingNumber
        writingNumber: $writingNumber
        completedAt: $completedAt
      }
    ){
      procedure {
        id
        serialNumber
        proceedingNumber
        writingNumber
        client{ fullName }
        attorney{ fullName }
        budgetingTemplate { name }
        proceduresTemplate { name }
        asignee { avatarThumbUrl }
        reporter { avatarThumbUrl }
        createdAt
        updatedAt
        completedAt
      }
    }
  }
`
