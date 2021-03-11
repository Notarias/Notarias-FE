import gql          from 'graphql-tag';

export const PROCEDURE_TEMPLATES = gql`
  query proceduresTemplates (
    $page: Int,
    $per: Int,
    $sortDirection: String,
    $sortField: String,
    $searchField: String,
    $searchValue: String
  )
  {
    proceduresTemplates (
      page: $page,
      per: $per,
      sortDirection: $sortDirection,
      sortField: $sortField,
      searchField: $searchField,
      searchValue: $searchValue
    ) 
    {
      id
      name
      active
      serialNumber
      tabs {
        id
      }
    }
    proceduresTemplatesCount
  }
`

export const UPDATE_PROCEDURE_TEMPLATES = gql`
  mutation updateProceduresTemplates (
    $id: ID!,
    $name: String,
    $active: Boolean,
    $clientMutationId: String)
    {
    updateProceduresTemplate (input: 
      {
        id: $id,
        name: $name,
        active: $active,
        clientMutationId: $clientMutationId
      }
    )
    {
      proceduresTemplate{
        id
        name
        active
        serialNumber
      }
    }
  }
`

export const GET_PROCEDURE_TEMPLATE = gql`
  query proceduresTemplate ($id: ID! ) {
    proceduresTemplate (id: $id) {
      active
      id
      name
      serialNumber
      budgetingTemplates{
        id
        name
      }
    }
  }
`

export const CREATE_PROCEDURE_TEMPLATE = gql`
  mutation createProceduresTemplate ($name: String!){
    createProceduresTemplate (input: {name: $name} ) {
      proceduresTemplate {
        active
        id
        name
      }
    }
  }
`

export const GET_BUDGETING_TEMPLATES_QUICK_LIST = gql`
query budgetingTemplatesQuickList{
  budgetingTemplatesQuickList{
    name
      id
    }
  }
`

export const GET_PROCEDURES_TEMPLATE_TABS = gql`
  query proceduresTemplateTabs($proceduresTemplateId: ID!){
    proceduresTemplateTabs(proceduresTemplateId: $proceduresTemplateId) {
      id
      name
      active
    }
  }
`
export const CREATE_PROCEDURES_TEMPLATE_TAB = gql`
  mutation createProceduresTemplateTab ($id: ID!, $name: String!){
    createProceduresTemplateTab (input: {templateId: $id, name: $name} ) {
      proceduresTemplateTab {
        id
        name
        proceduresTemplateId
      }
    }
  }
`

export const UPDATE_PROCEDURES_TEMPLATE_TAB = gql`
mutation updateProceduresTemplateTab ($id: ID!, $name: String, $active: Boolean){
  updateProceduresTemplateTab (input: {id: $id, name: $name, active: $active} ) {
    proceduresTemplateTab {
      id
      name
      proceduresTemplateId
      active
    }
  }
}
`

export const DESTROY_PROCEDURES_TEMPLATE_TAB = gql`
  mutation destoryProceduresTemplateTab ($id: ID! ) {
    destoryProceduresTemplateTab (input: { id: $id}) {
      destroyed
    }
  }
`

export const GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS = gql`
  query proceduresTemplateTabFieldsGroups(
    $id: ID!
  ){
    proceduresTemplateTabFieldsGroups(tabId: $id){
      id
      name
      active
    }
  }
`

export const CREATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS = gql`
  mutation createProceduresTemplateFieldsGroup (
    $tabId: ID!,
    $name: String
  )
    {
      createProceduresTemplateFieldsGroup (
        input: {
          tabId: $tabId,
          name: $name
        } 
      ) 
    {
      proceduresTemplateFieldsGroup 
      {
        id
        name
        tabId
        active
      }
    }
  }
`

export const UPDATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS = gql`
mutation updateProceduresTemplateFieldsGroup (
  $id: ID!,
  $name: String,
  $active: Boolean
)
  {
    updateProceduresTemplateFieldsGroup (
      input: {
        id: $id,
        name: $name,
        active: $active,
      } 
    ) 
  {
    proceduresTemplateFieldsGroup
    {
      id
      name
      tabId
      active
    }
  }
}
`

export const DESTROY_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS = gql`
  mutation destroyProceduresTemplateFieldsGroup ($id: ID! ) {
    destroyProceduresTemplateFieldsGroup (input: { id: $id}) {
      destroyed
    }
  }
`

export const GET_PROCEDURE_TEMPLATE_TAB_FIELDS = gql`
  query proceduresTemplateTabFields(
    $id: ID!
  )
    {
      proceduresTemplateTabFields(
        tabId: $id
      )
      {
        id
        favourite
        name
        style
        active
      }
    }
`

export const CREATE_PROCEDURES_TEMPLATE_TAB_FIELD = gql`
mutation createProceduresTemplateTabField (
  $tabId: ID!,
  $name: String!, 
  $fieldsGroupId: ID,
  $style: String,
){
  createProceduresTemplateField (
    input: {
      tabId: $tabId, 
      name: $name, 
      fieldsGroupId: $fieldsGroupId,
      style: $style,
    } 
  ) 
  {
    proceduresTemplateField {
      id
      name
      favourite
      style
      proceduresTemplateTabId
    }
  }
}
`

export const UPDATE_PROCEDURES_TEMPLATE_TAB_FIELD = gql`
  mutation updateProceduresTemplateField (
    $id: ID!,
    $name: String,
    $favourite: Boolean,
    $style: String,
    $active: Boolean
  )
    {
      updateProceduresTemplateField (
        input: {
          id: $id,
          name: $name,
          favourite: $favourite,
          style: $style,
          active: $active
        } 
      ) 
    {
      proceduresTemplateField {
        id
        name
        favourite
        style
        active
        proceduresTemplateTabId
        proceduresTemplateFieldsGroupId
      }
    }
  }
`

export const DESTROY_PROCEDURES_TEMPLATE_TAB_FIELD = gql`
  mutation destroyProceduresTemplateField ($id: ID! ) {
    destroyProceduresTemplateField (input: { id: $id}) {
      destroyed
    }
  }
`

export const GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS = gql`
  query proceduresTemplateFieldsGroupFields(
    $id: ID!
  ){
    proceduresTemplateFieldsGroupFields(fieldsGroupId: $id){
      id
      name
      favourite
      style
      active
    }
  }
`
