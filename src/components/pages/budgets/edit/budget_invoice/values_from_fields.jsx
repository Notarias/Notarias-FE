import React, { useEffect }                 from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../styles';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_BUDGET_FIELD_VALUE }           from '../../queries_and_mutations/queries';
import NumberFormat                         from 'react-number-format';
import Typography                           from '@material-ui/core/Typography';

const ValuesFromFields = (props) => {
  const { classes, budget, fieldId, totalTab } = props

  const { data } = useQuery(
    GET_BUDGET_FIELD_VALUE,
    {
      variables: { "budgetingTemplateFieldId": Number(fieldId) , "budgetId": Number(budget.id) }
    }
  );

  const fieldValue = data && data.budgetFieldValue.value

  useEffect(() => {
    totalTab.push(fieldValue / 100)
    console.log(totalTab, "useE")
  }, [data])

  // const [fieldValues, setFieldValues] = []

  // console.log(data , "dat")

  

  // console.log(totalTab,"asas")
  return(
    <Typography>
      <NumberFormat 
        value={fieldValue / 100} 
        displayType={'text'} 
        thousandSeparator={true} 
        prefix={'$ '}
        decimalScale={2}
      />
    </Typography> 
  )
}

export default withStyles(styles)(ValuesFromFields)