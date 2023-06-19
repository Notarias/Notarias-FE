import React, { useEffect }                   from 'react'
import { withStyles }                         from '@material-ui/core/styles';
import { styles }                             from '../../styles';
import { useQuery }                           from '@apollo/client';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }  from '../../queries_and_mutations/queries';
import ValuesFromFields                       from './values_from_fields';
import Grid                                   from '@material-ui/core/Grid';
import NumberFormat                           from 'react-number-format';

const FieldFromTabs = (props) => {
  const { classes, tab, budget, tabTotals } = props

    const { data: dataFields } = useQuery(
    GET_BUDGETING_TEMPLATE_TAB_FIELDS,
    {
      variables: {
        "id": tab.id,
        "active": true
      }
    }
  );

  const [fields, setFields] = React.useState(dataFields ? dataFields.budgetingTemplateTabFields : [])

  useEffect(() => {
    dataFields && setFields(dataFields.budgetingTemplateTabFields);;
  }, [dataFields])


  return(
    <>
    <Grid container item xs={1}></Grid>
    <Grid
      container 
      item 
      xs={8} 
      direction="column" 
      justifyContent="flex-start" 
      alignItems="flex-start"
    >
      <h3 >Total {tab.name}</h3>
    </Grid>
    <Grid
      container 
      item 
      xs={3} 
      direction="column" 
      justifyContent="flex-start" 
      alignItems="flex-start"
    >
      <h3 >
        <NumberFormat 
          value={tabTotals / 100} 
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </h3>
    </Grid>
      {      
        fields.map(
          (field) => {
            return(
              <React.Fragment key={field.id + "fragment"}>
                <ValuesFromFields
                  field={field}
                  budget={budget}
                />
              </React.Fragment>
            )
          }
        )
      }
    </>
  )
}

export default withStyles(styles)(FieldFromTabs);
