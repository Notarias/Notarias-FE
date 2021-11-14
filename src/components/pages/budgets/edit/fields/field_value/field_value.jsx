import React, { useState, useEffect }               from 'react';
import { withStyles }                               from '@material-ui/core/styles';
import { styles }                                   from '../../../styles';
import { useQuery }                                 from '@apollo/client';
import { GET_BUDGET_FIELD_VALUE }                   from '../../../queries_and_mutations/queries'
import GenericDropdownMenu                          from '../../../../../ui/generic_dropdown_menu';
import AddFieldValue                                from './add_field_value';
import TotalValue                                   from './total_value'
import Payment                                      from './payment'
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
import PaymentList                                  from './payment_list/payment_list';


const FieldValue = (props) => {
  const { classes, currentBudget, field: templateField } = props
  const [pristine, setPristine] = useState(false)
  const [initialFieldValue, setInitialFieldValue] = useState(0)
  const [withValue, setWithValue] = useState(data && data.budgetFieldValue ? true : false )
  const [changeInputStatus, setChangeInputStatus] = useState(false)
  const [changeFieldValue, setChangeFieldValue] = useState(initialFieldValue);
  const [totalDebt, setTotalDebt] = useState(0)
  const [field] = useState(templateField)


  const { data } = useQuery(
    GET_BUDGET_FIELD_VALUE,
    {
      variables: { "budgetingTemplateFieldId": field.id , "budgetId": currentBudget }
    }
  );

  useEffect(() => {
    let value = data && data.budgetFieldValue ? 
                  data.budgetFieldValue.value / 100
                : 
                  0
    let withId = data && data.budgetFieldValue ?
                    true
                  :
                    false
    let debt = data && data.budgetFieldValue ? 
                data.budgetFieldValue.totalDebt / 100
              :
                0
    setInitialFieldValue(value);
    setWithValue(withId)
    setTotalDebt(debt)
  }, [data])

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
        { field.fieldType == "tax" ? <AccountBalanceIcon style={{ color: green[500] }}/> : <AccountBalanceWalletIcon color="action"/> }
      </Grid>
      <Grid item xs={3}>
        <Typography variant="subtitle2" gutterBottom align='left'>
          {field.name}
        </Typography>
      </Grid>
      <Grid item xs={3} justifyContent="flex-start">
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
      <Grid item xs={3} justifyContent="center">
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
        </Grid>
        <Grid item xs={3}>
          <GenericDropdownMenu>
            <MenuItem key="1-pago">
              <Payment
                initialFieldValue={initialFieldValue}
                totalDebt={totalDebt}
                currentBudget={currentBudget}
                fieldValueId={ data && data.budgetFieldValue ? data.budgetFieldValue.id : ""}
                fieldId={field.id}
              />
            </MenuItem>
            <MenuItem key="2-pago">
              <PaymentList
                totalDebt={totalDebt}
                initialDebt={initialFieldValue}
                fieldValueId={data && data.budgetFieldValue ? data.budgetFieldValue.id : ""}
                budgetingTemplateFieldId={data && data.budgetFieldValue ? data.budgetFieldValue.budgetingTemplateFieldId : ""}
              />
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(FieldValue);
