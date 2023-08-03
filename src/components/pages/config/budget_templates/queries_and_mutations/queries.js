import gql          from 'graphql-tag';

export const GET_BUDGETING_TEMPLATE = gql`
  query budgetingTemplate ($id: ID! ) {
    budgetingTemplate (id: $id) {
      active
      version
      id
      name
      fields{
        active
        budgetingTemplateTabId
        defaultValue
        extendable
        fieldType
        id
        name
      }
      proceduresTemplates{
        id
        name
        budgetingTemplatesIds
        budgetingTemplates{
          id
        }
      }
      fields{
        id
        name
        active
        budgetingTemplateTabId
        defaultValue
        extendable
        fieldType
        operator
        taxableSelector
        categories {
          id
          name
        }
        taxes {
          id
          defaultValue
          active
          payable
          fieldType
          operator
          taxableSelector
          budgetingTemplateTabId
          createdAt
          updatedAt
        }
      }
    }
  }
`

export const CREATE_BUDGETING_TEMPLATE = gql`
  mutation createBudgetingTemplate ($name: String!){
    createBudgetingTemplate (input: {name: $name} ) {
      budgetingTemplate {
        active
        id
        name
        serialNumber
      }
    }
  }
`

export const UPDATE_BUDGETING_TEMPLATE = gql`
  mutation updateBudgetingTemplate (
    $id: ID!,
    $name: String,
    $active: Boolean,
    $proceduresTemplatesIds: [ID!],
    $clientMutationId: String)
    {
    updateBudgetingTemplate (input: 
      {
        id: $id,
        name: $name,
        active: $active,
        proceduresTemplatesIds: $proceduresTemplatesIds,
        clientMutationId: $clientMutationId
      }
    )
    {
      budgetingTemplate{
        id
        name
        active
        serialNumber
        proceduresTemplates{
          id
          name
          serialNumber
        }
      }
    }
  }
`

export const GET_BUDGETING_TEMPLATES = gql`
  query budgetingTemplates (
    $page: Int,
    $per: Int,
    $sortDirection: String,
    $sortField: String,
    $searchField: String,
    $searchValue: String
  )
  {
    budgetingTemplates (
      page: $page,
      per: $per,
      sortDirection: $sortDirection,
      sortField: $sortField,
      searchField: $searchField,
      searchValue: $searchValue
    )
    {
      active
      version
      id
      name
      serialNumber
    }
    budgetingTemplatesCount
  }
`

export const GET_PROCEDURES_TEMPLATES_QUICK_LIST = gql`
  query proceduresTemplatesQuickList{
    proceduresTemplatesQuickList{
      name
      id
      version
      active
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

export const CREATE_BUDGETING_TEMPLATES_TABS = gql`
  mutation createBudgetingTemplateTab ($name: String!, $templateId: ID!){
    createBudgetingTemplateTab (input: {name: $name, templateId: $templateId} ) {
      budgetingTemplateTab {
        active
        id
        name
        budgetingTemplateId
      }
    }
  }
`

export const UPDATE_BUDGETING_TEMPLATE_TAB = gql`
  mutation updateBudgetingTemplateTab ($id: ID!, $name: String, $active: Boolean, $calculable: Boolean){
    updateBudgetingTemplateTab (input: {id: $id, name: $name, active: $active, calculable: $calculable} ) {
      budgetingTemplateTab {
        active
        id
        name
        budgetingTemplateId
        calculable
      }
    }
  }
`

export const DESTROY_BUDGETING_TEMPLATE_TAB = gql`
  mutation destroyBudgetingTemplateTab ($id: ID!){
    destroyBudgetingTemplateTab (input: {id: $id} ) {
      destroyed
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
      printable
      calculable
      budgetingTemplateTabId
      defaultValue
      extendable
      fieldType
      operator
      taxableSelector
      categories {
        id
        name
      }
      taxes {
        id
        defaultValue
        active
        payable
        fieldType
        operator
        taxableSelector
        budgetingTemplateTabId
        createdAt
        updatedAt
      }
    }
  }
`

export const GET_BUDGETING_TEMPLATE_TAXED_FIELDS = gql`
  query getBudgetingTemplateTaxedFields(
    $fieldId: ID!
  )
  {
    budgetingTemplateTaxedFields(
      fieldId: $fieldId
    ) {
      id
      name
      defaultValue
      tax
    }
  }
`

export const CREATE_BUDGETING_TEMPLATE_TAB_FIELD = gql`
  mutation createBudgetingTemplateField (
    $tabId: ID!,
    $name: String!,
  ){
    createBudgetingTemplateField (
      input: {
        tabId: $tabId,
        name: $name,
      } 
    ) 
    {
      budgetingTemplateField {
        id
        name
        active
        budgetingTemplateTabId
        categories {
          id
          name
        }
      }
    }
  }
`

export const UPDATE_BUDGETING_TEMPLATE_TAB_FIELD = gql`
  mutation updateBudgetingTemplateField (
    $id: ID!,
    $name: String, 
    $active: Boolean, 
    $printable: Boolean,
    $calculable: Boolean, 
    $categoriesIds: [ID!]
  ){
    updateBudgetingTemplateField (input: {
      id: $id,
      name: $name,
      active: $active,
      printable: $printable,
      calculable: $calculable,
      categoriesIds: $categoriesIds
    } ) {
      budgetingTemplateField {
        active
        printable
        calculable
        id
        name
        categories {
          id
          name
        }
      }
    }
  }
`

export const DESTROY_BUDGETING_TEMPLATE_TAB_FIELD = gql`
  mutation destroyBudgetingTemplateField ($id: ID!){
    destroyBudgetingTemplateField (input: {id: $id} ) {
      destroyed
    }
  }
`

export const GET_BUDGETING_CATEGORIES = gql`
  query budgetingCategories
  {
    budgetingCategories
    {
        name
        id
    }
  }
`

export const CREATE_BUDGETING_CATEGORIES = gql`
  mutation createBudgetingCategory (
    $name: String!,
  ){
    createBudgetingCategory (
      input: {
        name: $name,
      } 
    ) 
    {
      budgetingCategory {
        id
        name
      }
    }
  }
`

export const GET_BUDGETING_TEMPLATES_QUICK_LIST = gql`
  query budgetingTemplatesQuickList{
    budgetingTemplatesQuickList{
      id
      name
      serial_number
      version
      active
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
        proceduresTemplatesIds
        proceduresTemplates{
          id
        }
      }
    }
  }
`

export const CREATE_TAX_FIELD = gql`
  mutation createTaxField(
    $name: String,
    $tabId: ID!,
    $defaultValue: Int,
    $taxedFieldsIds: [ID!]!,
    $operator: String!,
    $taxableSelector: String!
  ){
    createTaxField(input :{
      name: $name,
      tabId: $tabId,
      defaultValue: $defaultValue,
      taxedFieldsIds: $taxedFieldsIds,
      operator: $operator,
      taxableSelector: $taxableSelector
      }
    ){
      fieldTax{
        active
        budgetingTemplateTabId
        defaultValue
        extendable
        fieldType
        id
        name
        operator
        categories{
          id
          name
        }
      }
    }
  }
`
export const CLONE_BUDGETING_TEMPLATE = gql`
  mutation CloneBudgetingTemplate($id: ID!){
    cloneBudgetingTemplate(input:{budgetingTemplateId: $id}){
      budgetingTemplate{
        id
        name
        serialNumber
        active      
      }
    }
  }
`
