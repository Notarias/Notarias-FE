import React, { useState, useEffect }        from 'react';
import Grid                                  from '@material-ui/core/Grid';
import Typography                            from '@material-ui/core/Typography';
import { useQuery }                          from '@apollo/client';
import { GET_BUDGET_FIELD_VALUE } from '../../queries_and_mutations/queries'



export default (props) => {
  const [field] = useState(props.field)
  const [value, setValue] = useState()

  const { loading, data, refetch } = useQuery(
    GET_BUDGET_FIELD_VALUE,
    { variables: { budgetingTemplateFieldId: field.id, budgetId: props.budget.id }}
  )

  useEffect(() => {
    if(data) {
      setValue(data.budgetFieldValue)
    }
  }, [loading])

  const formatValue = () => {
    let valueByOne = (value.value * 1.0)

    return((valueByOne / 100).toFixed(2))
  }

  return(
    <>
      {
        value && value.value ? (
          <Grid container item>
            <Grid xs={6} item>
              <Typography align='left'>{field.name}</Typography>
            </Grid>
            <Grid xs={6} item>
              <Typography align='right'>{value && formatValue()}</Typography>
            </Grid>
          </Grid>
        ) : ("")
      }
    </>
  )
}