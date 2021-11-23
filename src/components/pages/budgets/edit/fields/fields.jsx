import React, { useState, useEffect }         from 'react';
import { useQuery }                           from '@apollo/client';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }  from '../../queries_and_mutations/queries'
import Grid                                   from '@material-ui/core/Grid';
import { withStyles }                         from '@material-ui/core/styles';
import Divider                                from '@material-ui/core/Divider';
import { styles }                             from '../../styles';
import FieldValue                             from './field_value';
import TaxFieldValue                          from './tax_field_value';
import FieldTotalValues                       from './field_total_values';
import CreateComments                         from './create_comments';



const Fields = (props) => {
  const { currentTab, budget, classes} = props;
  const [currentFieldId, setCurrentFieldId] =  React.useState(null)
  const [scrollHeight, setScrollHeight] = useState()

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

  // useEffect(() => {
  //   if (parentRef.current && !scrollHeight) {
  //     setScrollHeight(parentRef.current.scrollHeight)
  //   }
  // }, [parentRef.current && parentRef.current.scrollHeight])

  const renderFields = () => {

    return(
      <Grid item container style={{ flex: '1 1 auto' }} direction='column' alignItems="stretch" justifyContent="flex-start" >
        <Grid item container justifyContent="flex-start">
          {
            fields.map((field) => {
              return(
                <Grid container item style={{ minHeight: '70px' }} key={field.id + 'field-row'}>
                  {
                    field.fieldType == "tax" ?
                    <TaxFieldValue
                      budget={budget}
                      field={field}
                      key={field.id + "-field"}
                    /> :
                    <FieldValue
                      budget={budget}
                      field={field}
                      key={field.id + "-field"}
                    />
                  }
                </Grid>
              )
            })
          }
        </Grid>
        <Divider variant="middle"/>
        <Grid container  justifyContent="flex-end" item style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <Grid container item direction="row" xs={8}>
              <CreateComments budget={budget}/>
            </Grid>
            <Grid container item xs={4} alignItems="center" className={classes.totalValuesGridContainer}>
              <FieldTotalValues budget={budget}/>
            </Grid>
          </Grid>
      </Grid>
    )
  }

  return(
    renderFields()
  )
}

export default withStyles(styles)(Fields);
