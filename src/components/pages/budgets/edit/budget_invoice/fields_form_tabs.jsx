import React, { useEffect } from 'react'
import { withStyles }                         from '@material-ui/core/styles';
import { styles }                             from '../../styles';
import Grid                                   from '@material-ui/core/Grid';
import { useQuery }                           from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }  from '../../queries_and_mutations/queries';
import Typography                             from '@material-ui/core/Typography';
import ValuesFromFields                       from './values_from_fields';

const FieldFromTabs = (props) => {
  const { classes, tabId, budgetId, budget } = props
  const totalTab = []

    const { data: dataFields } = useQuery(
    GET_BUDGETING_TEMPLATE_TAB_FIELDS,
    {
      variables: { "id": tabId }
    }
  );

  const [fields, setFields] = React.useState(dataFields ? dataFields.budgetingTemplateTabFields : [])

  useEffect(() => {
    dataFields && setFields(dataFields.budgetingTemplateTabFields);;
  }, [dataFields])

  const suma = () => {
    
  }

  // console.log(totalTab,"///")
  return(
    fields.map(
      (field) => {
        return(
          <React.Fragment key={field.id + "fragment"}>
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
              <ValuesFromFields
                fieldId={field.id}
                budget={budget}
                totalTab={totalTab}
              />
            </Grid>
          </React.Fragment>
        )
      }
    )
  )
}

export default  withStyles(styles)(FieldFromTabs);
