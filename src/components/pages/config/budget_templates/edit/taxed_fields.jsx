import React, { useState, useEffect } from 'react';
import Grid           from '@material-ui/core/Grid';
import { useQuery }   from '@apollo/client';
import { GET_BUDGETING_TEMPLATE_TAXED_FIELDS } from '../queries_and_mutations/queries'
import TaxedField from './taxed_field/taxed_field'

const TaxedFields = (props) => {
  const { parentField: taxField } = props

  const [taxedFields, setTaxedFields] = useState()
  const { loading, data, refetch } =
    useQuery(
      GET_BUDGETING_TEMPLATE_TAXED_FIELDS,
      { variables: { fieldId: taxField.id } });

  useEffect(() => {
    if (data) {
      setTaxedFields(data.budgetingTemplateTaxedFields)
    }
  }, [data && data.budgetingTemplateTaxedFields.length])

  const renderTaxedFields = () => {
    if(taxedFields) {
      return(
        taxedFields.map((taxedField, index) => {
          return(
            <TaxedField key={taxedField.id + '-taxed-field-' + taxField.id} taxedField={taxedField} taxField={taxField} refetchTaxedFields={refetch} />
          )
        })
      )
    }
  }

  return(
    <Grid container item>
      { loading ? "loading" : renderTaxedFields() }
    </Grid>
  )
}

export default TaxedFields