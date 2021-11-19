import React, { useState, useEffect }               from 'react';
import { withStyles }                               from '@material-ui/core/styles';
import { styles }                                   from '../../../styles';
import { useQuery }                                 from '@apollo/client';
import { GET_BUDGET_FIELD_VALUE }                   from '../../../queries_and_mutations/queries'
import GenericDropdownMenu                          from '../../../../../ui/generic_dropdown_menu';
import SaveButton                                   from './save_button';
import TotalValue                                   from './total_value';
// import Payment                                      from './payment'
import MenuItem                                     from '@material-ui/core/MenuItem';
import AccountBalanceIcon                           from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon                     from '@material-ui/icons/AccountBalanceWallet';
import TextField                                    from '@material-ui/core/TextField';
import InputAdornment                               from '@material-ui/core/InputAdornment';
import Box                                          from '@material-ui/core/Box';
import Typography                                   from '@material-ui/core/Typography';
import Grid                                         from '@material-ui/core/Grid';
import { green }                                    from '@material-ui/core/colors';
import PropTypes                                    from 'prop-types';
import NumberFormat                                 from 'react-number-format';
// import PaymentList                                  from './payment_list/payment_list';


const FieldValue = (props) => {
  const { classes, budget, field } = props

  const [pristine, setPristine] = useState(true)
  const [value, setValue] = useState(0)
  const [totalDebt, setTotalDebt] = useState(0)
  const [editing, setEditing] = useState(false)
  const [editingValue, setEditingValue] = useState()
  const [budgetFieldValue, setBudgetFieldValue] = useState()
  // const [withValue, setWithValue] = useState(false)
  const [templateField] = useState(field)


  const { loading, data } = useQuery(
    GET_BUDGET_FIELD_VALUE,
    {
      variables: { "budgetingTemplateFieldId": templateField.id , "budgetId": budget.id }
    }
  );

  const fieldValueCalculation = (budgetFieldValue) => {
    if(budgetFieldValue) {
      return budgetFieldValue.value / 100 
    } else if(templateField.defaultValue) {
      return templateField.defaultValue / 100
    } else {
      return 0
    }
  }

  const totalDebtCalculation = (budgetFieldValue) => {
    return(budgetFieldValue ? budgetFieldValue.totalDebt / 100 : 0)
  }

  useEffect(() => {
    if (data) {
      let value = fieldValueCalculation(data.budgetFieldValue);
      let debt = totalDebtCalculation(data.budgetFieldValue);
      setBudgetFieldValue(data.budgetFieldValue);
      setValue(value);
      setEditingValue(value)
      setTotalDebt(debt);
    }
  }, [loading, data])

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  return(
    <Grid 
      container
      item
      alignItems="center"
      className={classes.budgetTabPanelFields}
    >
      <Grid item xs={1}>
        <AccountBalanceIcon style={{ color: green[500] }}/>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="subtitle2" gutterBottom align='left'>
          {templateField.name}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        { (value == 0 || value >= 0) && 
            <TotalValue
              pristine
              setPristine={setPristine}
              editing={editing}
              setEditing={setEditing}
              editingValue={editingValue}
              setEditingValue={setEditingValue}
              setValue={setValue}
              value={value}
              budgetFieldValue={budgetFieldValue}
            />
        }
      </Grid>
      <Grid item xs={3}>
        <Typography gutterBottom align='center'>
          <NumberFormat 
            value={totalDebt} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$ '}
            decimalScale={2}
          />
        </Typography>
      </Grid>
      <Grid container item xs={2} direction='row' justifyContent="flex-start" alignItems="center">
        <Grid item xs={3}>
          <SaveButton
            budget={budget}
            templateField={templateField}
            pristine={pristine}
            setPristine={setPristine}
            budgetFieldValue={budgetFieldValue}
            value={value}
            editingValue={editingValue}
            setEditingValue={setEditingValue}
            setEditing={setEditing}
          />
        </Grid>
        <Grid item xs={3}>
          <GenericDropdownMenu>
            <MenuItem key="1-pago">
              {/* <Payment
                initialFieldValue={initialFieldValue}
                totalDebt={totalDebt}
                budget={budget}
                fieldValueId={ data && data.budgetFieldValue ? data.budgetFieldValue.id : ""}
                fieldId={templateField.id}
              /> */}
            </MenuItem>
            <MenuItem key="2-pago">
              {/* <PaymentList
                totalDebt={totalDebt}
                initialDebt={initialFieldValue}
                fieldValueId={data && data.budgetFieldValue ? data.budgetFieldValue.id : ""}
                budgetingTemplateFieldId={data && data.budgetFieldValue ? data.budgetFieldValue.budgetingTemplateFieldId : ""}
              /> */}
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(FieldValue);
