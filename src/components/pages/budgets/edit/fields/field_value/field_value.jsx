import React, { useState, useEffect }               from 'react';
import { withStyles }                               from '@material-ui/core/styles';
import { styles }                                   from '../../../styles';
import { useQuery }                                 from '@apollo/react-hooks';
import { GET_BUDGET_FIELD_VALUE }                   from '../../../queries_and_mutations/queries'

import Typography                                   from '@material-ui/core/Typography';
import Box                                          from '@material-ui/core/Box';
import PropTypes                                    from 'prop-types';
import Grid                                         from '@material-ui/core/Grid';
import TextField                                    from '@material-ui/core/TextField';
import InputAdornment                               from '@material-ui/core/InputAdornment';
import GenericDropdownMenu                          from '../../../../../ui/generic_dropdown_menu';
import AddFieldValue                                from './add_field_value';
import TotalValue                                   from './total_value'


const FieldValue = (props) => {
  const{classes, currentBudget, field } = props
  const [pristine, setPristine] = React.useState(false)
  const [initialFieldValue, setInitialFieldValue] = React.useState(0)
  const [withValue, setWithValue] = React.useState(data && data.budgetFieldValue ? true : false )
  const [changeInputStatus, setChangeInputStatus] =React.useState(false)
  const [changeFieldValue, setChangeFieldValue] = React.useState(initialFieldValue);


  const { data } = useQuery(
    GET_BUDGET_FIELD_VALUE,
    {
      variables: { "budgetingTemplateFieldId": field.id , "budgetId": currentBudget }
    }
  );

  // const [fieldValue, setFieldValue] = React.useState(data ? data.budgetFieldValue.value : "0")

  useEffect(() => {
    let value = data && data.budgetFieldValue ? 
                  data.budgetFieldValue.value / 100
                : 
                  0
    let withId = data && data.budgetFieldValue ?
                    true
                  :
                    false

    setInitialFieldValue(value);
    setWithValue(withId)
  }, [data])

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  console.log(data)
  return(
    <Grid 
      container
      alignItems="center"
      className={classes.budgetTabPanelFields}
    >
      <Grid container item xs={3} justify="flex-start" >
        <Typography variant="subtitle2" gutterBottom>
          {field.name}
        </Typography>
        -{field.id}
      </Grid>
      <Grid container item xs={3} justify="flex-start">
        <TotalValue
          setPristine={setPristine}
          withValue={withValue}
          initialFieldValue={initialFieldValue}
          changeInputStatus={changeInputStatus}
          setChangeInputStatus={setChangeInputStatus}
          changeFieldValue={changeFieldValue}
          setChangeFieldValue={setChangeFieldValue}
        />
      </Grid>
      <Grid container item xs={3} justify="center">
        {/* {renderFieldValues(data.budgetFieldValue.value)} */}
        0
      </Grid>
      <Grid container item xs={3} justify="center">
        <AddFieldValue
          currentBudget={currentBudget}
          fieldId={field.id}
          withValue={withValue}
          setWithValue={setWithValue}
          pristine={pristine}
          setPristine={setPristine}
          initialFieldValue={initialFieldValue}
          changeFieldValue={changeFieldValue}
          currentId={ data && data.budgetFieldValue}
          setChangeInputStatus={setChangeInputStatus}
          haveId={data && data.budgetFieldValue ? data.budgetFieldValue.id : "s/n"}
        />
        <GenericDropdownMenu>
        </GenericDropdownMenu>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(FieldValue);
