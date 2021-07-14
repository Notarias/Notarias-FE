import React, { useState, useEffect }         from 'react';
import { useQuery }                           from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }  from '../../queries_and_mutations/queries'
import Grid                                   from '@material-ui/core/Grid';
import { withStyles }                         from '@material-ui/core/styles';
import { styles }                             from '../../styles';
import FieldValue                             from './field_value/field_value';
import FieldTotalValues                       from './field_total_values';
import CreateComments                         from './create_comments';



const Fields = (props) => {
  const {value, setValue, currentTab, tabList, budgetInfo, classes, budgetId} = props;
  const currentBudget = budgetId
  const [currentFieldId, setCurrentFieldId] =  React.useState(null)

  const { data } = useQuery(
    GET_BUDGETING_TEMPLATE_TAB_FIELDS,
    {
      variables: { "id": currentTab && currentTab.id }
    }
  );

  const [fields, setFields] = React.useState(data ? data.budgetingTemplateTabFields : [])

  useEffect(() => {
    data && setFields(data.budgetingTemplateTabFields);;
  }, [data])

  const renderFields = () => {

    return(
      <>
        {
          fields.map((field) => {
            return(
              <FieldValue
                currentBudget={currentBudget}
                field={field}
                key={field.id + "-field"}
              />
            )
          })
        }
        <Grid container justifyContent="flex-end" className={ classes.totalsGrid }>
          <Grid container item direction="row" xs={8}>
            <CreateComments
              budgetId={budgetId}
            />
          </Grid>
          <Grid container item xs={4} >
            <Grid container item alignItems="center" className={classes.totalValuesGridContainer}>
              <FieldTotalValues
                budgetId={budgetId}
              />
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }

  return(
    renderFields()
  )
}

export default withStyles(styles)(Fields);
