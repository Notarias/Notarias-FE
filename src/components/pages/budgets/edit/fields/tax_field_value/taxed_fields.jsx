import React, { useEffect, useState }       from 'react';
import Grid                       from '@material-ui/core/Grid';
import { useQuery }               from '@apollo/client';
import { BUDGET_TAXED_FIELDS_FOR_FIELD } from '../../../queries_and_mutations/queries';

export default (props) => {
  const { setExpandTaxedFields, expandTaxedFields, templateField, budget } = props
  const [taxedFields, setTaxedFields] = useState()

  const { loading, data } = useQuery(
    BUDGET_TAXED_FIELDS_FOR_FIELD,
    {
      variables: {
        "fieldId": templateField.id,
        "budgetId": budget.id
      },
      fetchPolicy: 'no-cache'
    }
  );

  useEffect(() => {
    data && setTaxedFields(data.budgetTaxedFieldsForField)
  }, [!!data])



  return(
    <Grid item container style={{ display: expandTaxedFields ? 'flex' : 'none' }} direction='column'>
      {
        taxedFields && taxedFields.map((taxedField) => {
          return(
            <Grid container item key={ `${taxedField.id}-taxed-field` }>
              {taxedField.tax}
            </Grid>
          )
        })
      }
    </Grid>
  )
}