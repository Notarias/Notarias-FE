import gql from 'graphql-tag';

export const CREATE_PROCEDURE = gql`
mutation createProcedure(
  $clientId: ID!,
  $causantId: ID,
  $proceduresTemplateId: ID!,
  $budgetingTemplateId: ID!,
  $asigneeId: ID,
){
  createProcedure (
    input:{
	    clientId: $clientId
      causantId: $causantId
      proceduresTemplateId: $proceduresTemplateId
      budgetingTemplateId: $budgetingTemplateId
      asigneeId: $asigneeId
    }
  ){
    procedure {
      id
      serialNumber
      client{ fullName }
      causant{ fullName }
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
    search: $search)
  {
    id
    serialNumber
    client{ fullName }
    budgetingTemplate { name }
    proceduresTemplate { name }
    asignee { avatarThumbUrl }
    reporter { avatarThumbUrl }
    createdAt
    updatedAt
    completedAt
  }
  proceduresCount
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

export const LOAD_CAUSANTS = gql`
  query searchCausants(
      $page: Int,
      $per: Int,
      $sortField: String,
      $sortDirection: String,
      $searchField: String,
      $searchValue: String
    ) {
    causants(
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
      causant
    }
    causantsCount
  }
`

export const CREATE_CLIENT = gql`
  mutation createClient(
    $firstName: String!,
    $lastName: String!,
    $curp: String,
    $rfc: String,
    $moral: Boolean,
    $causant: Boolean
  ) {
    createClient(input: {
      firstName: $firstName,
      lastName: $lastName,
      curp: $curp,
      rfc: $rfc,
      moral: $moral,
      causant: $causant
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
      name
      id
      budgetingTemplatesIds
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
      client{
        firstName
        lastName
        rfc
        curp
        id
      }
      causant{
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
      proceduresTemplate{
        active
        name
        id
      }
      budgetingTemplate{
        active
        name
        id
      }
    }
  }
`

export const UPDATE_PROCEDURE = gql`
  mutation updateProcedure(
    $id: ID!,
    $clientId: ID
    $asigneeId: ID
  ){
    updateProcedure (
      input:{
        id: $id
        clientId: $clientId
        asigneeId: $asigneeId
      }
    ){
      procedure {
        id
        serialNumber
        client{ fullName }
        causant{ fullName }
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
        printable
        proceduresTemplateFieldsGroupId
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
        printable
      }
      procedureFieldValue{
        id
        value
        active
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
  ){
    createProcedureFieldValue(input:{
      proceduresTemplateFieldId: $proceduresTemplateFieldId,
      procedureId: $procedureId,
      value: $value,
      }
    ){
      procedureFieldValue{
        procedureId
        proceduresTemplateFieldId
        id
        value
        active
      }
    }
  }
`

export const UPDATE_PROCEDURE_FIELD_VALUE = gql`
  mutation updateProcedureFieldValue(
    $id: ID!,
    $value: String,
    $active: Boolean,
  ){
    updateProcedureFieldValue(input:{
      id: $id,
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
