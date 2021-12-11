import React, { useState, useEffect }        from 'react';
import Grid                                  from '@material-ui/core/Grid';
import Typography                            from '@material-ui/core/Typography';
import { useQuery }                          from '@apollo/client';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS } from '../../queries_and_mutations/queries';
import { GET_BUDGETING_TAB_TOTALS }          from '../../queries_and_mutations/queries';
import Field                                 from './field';

export default (props) => {
  const [tab]               = useState(props.tab)
  const [budget]            = useState(props.budget)
  const [fields, setFields] = useState()
  const [totals, setTotals] = useState()

  const { loading, data, refetch } = useQuery(
    GET_BUDGETING_TEMPLATE_TAB_FIELDS, { variables: { "id": tab.id } }
  );

  const { loading: totalsLoading, data: totalsData } = useQuery(
    GET_BUDGETING_TAB_TOTALS, { variables: { id: tab.id, budgetId: budget.id } }
  )

  useEffect(() => {
    if(data) {
      setFields(data.budgetingTemplateTabFields)
    }
  }, [loading, data])

  useEffect(() => {
    if(totalsData) {
      setTotals(totalsData.budgetTotals)
    }
  }, [totalsLoading, totalsData])

  return(
    <Grid item container direction='column' spacing={1}>
      <Grid item>
        <Typography align='left' variant='h6'>
          {tab.name}
        </Typography>
      </Grid>
      {
        fields && fields.map((field) => {
          return(
            <Field key={field.id + 'print-field'} field={field} budget={budget}/>
          )
        })
      }
      <Grid item>
        <Typography align='right' variant='h6'>
          ${((totalsData.tabTotals.total * 1.0) / 100).toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  )
}
