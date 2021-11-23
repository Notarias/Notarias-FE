import React, { useEffect, useState }       from 'react';
import Grid                       from '@material-ui/core/Grid';
import { grey }                   from '@material-ui/core/colors';
import Divider                    from '@material-ui/core/Divider';
import Collapse                   from '@material-ui/core/Collapse';
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

  //boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'

 // style={{ height: expandTaxedFields ? `${taxedFields ? (30 * taxedFields.length) : 0}px` : '0px', overflow: 'hidden', transition: 'height 0.19s ease-out' }} 
  // style={{ height: '30px', backgroundColor: grey[300] }}
 return(
    <Grid item container direction='column' style={{ backgroundColor: grey[100]}}>
      <Collapse in={expandTaxedFields}>
      <Divider/>
      {
        taxedFields && taxedFields.map((taxedField) => {
          return(
            <>
              <Grid container item key={ `${taxedField.id}-taxed-field-${templateField.id}` } style={{ padding: '10px' }}>
                {taxedField.tax}
              </Grid>
              <Divider/>
            </>
          )
        })
      }
      </Collapse>
    </Grid>
  )
}