import React, { useState, useEffect }        from 'react';
import Grid                                  from '@material-ui/core/Grid';
import Typography                            from '@material-ui/core/Typography';
import { useQuery }                          from '@apollo/client';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS } from '../../queries_and_mutations/queries';
import Field                                 from './field';

export default (props) => {
  const [tab]               = useState(props.tab)
  const [budget]            = useState(props.budget)
  const [fields, setFields] = useState()

  const { loading, data, refetch } = useQuery(
    GET_BUDGETING_TEMPLATE_TAB_FIELDS, { variables: { "id": tab.id } }
  );

  useEffect(() => {
    if(data) {
      setFields(data.budgetingTemplateTabFields)
    }
  }, [loading])

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
    </Grid>
  )
}
