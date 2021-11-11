import React, { useEffect }         from 'react'
import { withStyles }               from '@material-ui/core/styles';
import { styles }                   from '../../styles';
import { useQuery }                 from '@apollo/client';
import { GET_BUDGET_FIELD_VALUE }   from '../../queries_and_mutations/queries';
import NumberFormat                 from 'react-number-format';
import Typography                   from '@material-ui/core/Typography';
import Grid                         from '@material-ui/core/Grid';


const ValuesFromFields = (props) => {
  const { classes, budget, field} = props

  const { data } = useQuery(
    GET_BUDGET_FIELD_VALUE,
    {
      variables: { "budgetingTemplateFieldId": Number(field.id) , "budgetId": Number(budget.id) },fetchPolicy: "no-cache" 
    }
  );

  const fieldValue = (data && data.budgetFieldValue ? data.budgetFieldValue.value / 100 : 0)

  useEffect(() => {
    (fieldValue !== 0 ? setShowWhitValue(true) : setShowWhitValue(false))
  }, [data])

  const [showWhitValue, setShowWhitValue] = React.useState(true)

  
  return(
    showWhitValue && (
      <>
        <Grid container item xs={1}></Grid>
          <Grid
            container 
            item 
            xs={7} 
            direction="column" 
            justifyContent="flex-start" 
            alignItems="flex-start"
          >
            <Typography>{field.name}</Typography>
          </Grid>
          <Grid
            container 
            item 
            xs={4} 
            direction="column" 
            justifyContent="flex-start" 
            alignItems="flex-start"
          >
          <Typography>
            <NumberFormat 
              value={fieldValue}
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={'$ '}
              decimalScale={2}
            />
          </Typography> 
        </Grid>
      </>
    )
  )

}

export default withStyles(styles)(ValuesFromFields)
