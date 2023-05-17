import gql from 'graphql-tag';

export const CREATE_PROCEDURE = gql`
mutation createProcedure(
  $clientId: ID!,
  $attorneyId: ID,
  $proceduresTemplateId: ID!,
  $budgetingTemplateId: ID!,
  $asigneeId: ID,
){
  createProcedure (
    input:{
	    clientId: $clientId
      attorneyId: $attorneyId
      proceduresTemplateId: $proceduresTemplateId
      budgetingTemplateId: $budgetingTemplateId
      asigneeId: $asigneeId
    }
  ){
    procedure {
      id
      serialNumber
      client{ fullName }
      attorney{ fullName }
      budgetingTemplate { name }
      proceduresTemplate { name }
      asignee { avatarThumbUrl }
      createdAt
      updatedAt
      completedAt
    }
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

export const GET_PROCEDURES = gql`
  query procedures(
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
      search: $search)
    {
      id
      serialNumber
      writingNumber
      proceedingNumber
      client{ fullName }
      budgetingTemplate { name }
      proceduresTemplate { name }
      asignee { 
        firstName
        lastName
        avatarThumbUrl
      }
      reporter { avatarThumbUrl }
      createdAt
      updatedAt
      completedAt
    }
    proceduresCount(
      search: $search
    )
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

export const GET_PROCEDURES_TEMPLATES_QUICK_LIST = gql`
  query proceduresTemplatesQuickList{
    proceduresTemplatesQuickList{
      id
      name
      version
      active
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

export const GET_PROCEDURE = gql`
query procedure(
    $id: ID!
  ){
  procedure(
    id: $id
    ){
      id
      serialNumber
      proceedingNumber
      writingNumber
      completedAt
      client{
        firstName
        lastName
        rfc
        curp
        id
      }
      attorney{
        firstName
        lastName
        rfc
        curp
        id
      }
      asignee{
        firstName
        lastName
        avatarThumbUrl
        id
      }
      reporter{
        firstName
        lastName
        avatarThumbUrl
        id
      }
      budgets{
        id
        serialNumber
        createdAt
        budgetingTemplate {
          name
        }
      }
      proceduresTemplate{
        active
        name
        id
        version
      }
      budgetingTemplate{
        active
        name
        id
        version
      }
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

export const UPDATE_BUDGET = gql`
  mutation updateBudget(
    $id: ID!,
    $clientId: ID,
    $proceduresTemplateId: ID,
    $budgetingTemplateId: ID,
    $asigneeId: ID
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
        procedure{
          proceedingNumber
          writingNumber
        }
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
      commentableType: $commentableType
      commentableId: $commentableId
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

export const GET_PROCEDURES_AUDITLOG = gql`
query procedureAuditLogs(
    $procedureId: ID!
  ){
    procedureAuditLogs(
    procedureId: $procedureId
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

export const GET_PROCEDURES_TEMPLATES_TABS = gql`
  query proceduresTemplateTabs ($id: ID! ) {
    proceduresTemplateTabs (proceduresTemplateId: $id) {
      active
      id
      name
      proceduresTemplateId
    }
  }
`

export const GET_PROCEDURES_TEMPLATE_TAB_FIELDS = gql`
  query proceduresTemplateTabFields($id: ID!){
    proceduresTemplateTabFields(tabId: $id) {
      proceduresTemplateTabId
      id
      name
      style
      favourite
      printable
      proceduresTemplateFieldsGroupId
      defaultValue
    }
  }
`

export const GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS = gql`
  query proceduresTemplateTabFieldsGroups($id: ID!){
    proceduresTemplateTabFieldsGroups(tabId: $id) {
      id
      name
      tabId
      fields{
        id
        name
        style
        printable
        proceduresTemplateFieldsGroupId
        defaultValue
      }
    }
  }
`

export const GET_PROCEDURE_FIELD_GROUP_VALUES = gql`
  query ProcedureFieldGroupValues(
    $fieldGroupId: ID!,
    $procedureId: ID!
  ){
    procedureFieldGroupValues(
      fieldGroupId: $fieldGroupId, 
      procedureId: $procedureId
    ){
      id
      duplicate
      proceduresTemplateField{
        id
        name
        style
        printable
        defaultValue
      }
      procedureFieldValue{
        id
        value
        active
        file
        fileName
        fileUrl
        proceduresTemplateFieldId
      }
    }
  }
`

export const CREATE_PROCEDURE_FIELD_VALUE = gql`
  mutation createProcedureFieldValue(
    $proceduresTemplateFieldId: ID,
    $procedureId: ID,
    $value: String!,
    $file: Upload
  ){
    createProcedureFieldValue(input:{
      proceduresTemplateFieldId: $proceduresTemplateFieldId,
      procedureId: $procedureId,
      value: $value,
      file: $file
      }
    ){
      procedureFieldValue{
        procedureId
        proceduresTemplateFieldId
        id
        value
        active
        file
        fileName
        fileUrl
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
    $file: Upload
  ){
    updateProcedureFieldValue(input:{
      id: $id,
      proceduresTemplateFieldId: $proceduresTemplateFieldId,
      procedureId: $procedureId,
      value: $value,
      active: $active,
      file: $file
      }
    ){
      procedureFieldValue{
        id
        value
        active
        file
        fileName
        fileUrl
      }
    }
  }
`

export const GET_PROCEDURE_FIELD_VALUES = gql`
  query ProcedureFieldValues(
    $proceduresTemplateFieldId: ID!,
    $procedureId: ID!
  ){
    procedureFieldValue(
      proceduresTemplateFieldId: $proceduresTemplateFieldId, 
      procedureId: $procedureId
    ){
      id
      value
      procedureId
      proceduresTemplateFieldId
      active
      file
      fileName
      fileUrl
    }
  }
`

export const CREATE_PROCEDURE_FIELD_GROUP_VALUE = gql`
  mutation CreateProcedureFieldGroupValues(
    $proceduresTemplateFieldsGroupId: ID!,
    $procedureId: ID!
  ){
    createProcedureFieldGroupValues(input:{
      proceduresTemplateFieldsGroupId: $proceduresTemplateFieldsGroupId,
      procedureId: $procedureId
      }
    ){
      procedureFieldGroupValues{
        procedureFieldValue{
          id
        }
        proceduresTemplateField{
          id
        }
      }
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation createComment(
    $commentableId: ID!,
    $commentableType: String!,
    $body: String!
  ){
    createComment(input:{
      commentableId: $commentableId,
      commentableType: $commentableType,
      body: $body,
    }
    ){
      comment{
        id
        commentableId
        commentableType
        body
      }
    }
  }
`

export const DESTROY_PROCEDURE_FIELD_GROUP_VALUES = gql`
  mutation destroyProcedureFieldGroupValues ($id: ID!){
    destroyProcedureFieldGroupValues (input:{id: $id}){
      destroyed
    }
  }
`

export const GET_BUDGETING_TEMPLATES_QUICK_LIST = gql`
  query budgetingTemplatesQuickList{
    budgetingTemplatesQuickList{
      name
      id
      version
      active
    }
  }
`
