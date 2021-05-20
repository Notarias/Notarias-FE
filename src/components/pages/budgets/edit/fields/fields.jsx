import React, { useState, useEffect }               from 'react';
import { useQuery }                                 from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }        from '../../queries_and_mutations/queries'
import Typography                                   from '@material-ui/core/Typography';
import Box                                          from '@material-ui/core/Box';
import PropTypes                                    from 'prop-types';
import Grid                                         from '@material-ui/core/Grid';
import TextField                                    from '@material-ui/core/TextField';
import InputAdornment                               from '@material-ui/core/InputAdornment';
import { withStyles }                               from '@material-ui/core/styles';
import { styles }                                   from '../../styles';
import FieldValue                                   from './field_value/field_value';
import FieldTotalValues                             from './field_total_values';



const Fields = (props) => {
  const {value, setValue, currentTab, tabList, budgetInfo, classes, budgetId} = props;
  const currentBudget = budgetId
  const [currentFieldId, setCurrentFieldId] =  React.useState(null)



  // function TabPanel(props) {
  //   const { children, value, index, ...other } = props;
  
  //   return (
  //     <div
  //       role="tabpanel"
  //       hidden={value !== index}
  //       id={`simple-tabpanel-${index}`}
  //       aria-labelledby={`simple-tab-${index}`}
  //       {...other}
  //     >
  //       {value === index && (
  //         <Box p={3}>
  //           <Typography>{children}</Typography>
  //         </Box>
  //       )}
  //     </div>
  //   );
  // }
  
  // TabPanel.propTypes = {
  //   children: PropTypes.node,
  //   index: PropTypes.any.isRequired,
  //   value: PropTypes.any.isRequired,
  // };

  const { data } = useQuery(
    GET_BUDGETING_TEMPLATE_TAB_FIELDS,
    {
      variables: { "id": currentTab.id }
    }
  );

  const [fields, setFields] = React.useState(data ? data.budgetingTemplateTabFields : [])

  useEffect(() => {
    data && setFields(data.budgetingTemplateTabFields);;
  }, [data])

  const renderFieldValues = () => {
    return(
      budgetInfo.fieldValues 
      ? 
      budgetInfo.fieldValues.map(
        (field) =>{
          return(
            field.value
          )
      }) : "S/N" 
    )
  }

  // const fieldVal = () => {
  //     for (var i = 0; i < fields.length; i++) {
  //       for (var x = 0; x < fields.length; x++) {
  //         n += i;
  //         mifuncion(n);
  //      }
  //    }
  // }

  const printValue = () => {
    return(
      "0"
    )
  }

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
        <Grid container justify="flex-end" className={ classes.totalsGrid }>
          <Grid container item xs={5} alignItems="center">
            <FieldTotalValues
              budgetId={budgetId}
            />
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
