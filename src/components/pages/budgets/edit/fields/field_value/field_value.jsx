import React, { useState, useEffect }   from 'react';
import { withStyles }                   from '@material-ui/core/styles';
import { styles }                       from '../../../styles';
import { useQuery }                     from '@apollo/client';
import { GET_BUDGET_FIELD_VALUE }       from '../../../queries_and_mutations/queries'
import GenericDropdownMenu              from '../../../../../ui/generic_dropdown_menu';
import AddFieldValue                    from './add_field_value';
import TotalValue                       from './total_value'
import Payment                          from './payment'
import MenuItem                         from '@material-ui/core/MenuItem';
import AccountBalanceIcon               from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon         from '@material-ui/icons/AccountBalanceWallet';
import MoneyOffIcon                     from '@material-ui/icons/MoneyOff';
import Typography                       from '@material-ui/core/Typography';
import Grid                             from '@material-ui/core/Grid';
import Tooltip                          from '@material-ui/core/Tooltip';
import Avatar                           from '@material-ui/core/Avatar';
import { green }                        from '@material-ui/core/colors';
import NumberFormat                     from 'react-number-format';
import PaymentList                      from './payment_list';

const payableTooltipText = (totalPayable) => {
  if(totalPayable === '0.00' || totalPayable === 0) {
    return('Sin adeudo')
  } else if(totalPayable < 0) {
    return('Saldo a favor')
  } else if(totalPayable > 0) {
    return('Monto por pagar')
  }
}

const FieldValue = (props) => {
  const { classes, budget, field: templateField } = props

  const [pristine, setPristine] = useState(false);
  const [initialFieldValue, setInitialFieldValue] = useState(0);
  const [statusChange, setStatusChange] = useState(true);
  const [withValue, setWithValue] = useState(false);
  const [changeInputStatus, setChangeInputStatus] = useState(false);
  const [changeFieldValue, setChangeFieldValue] = useState(initialFieldValue);
  const [totalPayable, setTotalPayable] = useState(0);
  const [field] = useState(templateField);

  const { data } = useQuery(
    GET_BUDGET_FIELD_VALUE,
    {
      variables: { "budgetingTemplateFieldId": field.id , "budgetId": budget.id }
    }
  );

  useEffect(() => {
    setInitialFieldValue(data && data.budgetFieldValue ? ((data.budgetFieldValue.value * 1.0) / 100).toFixed(2) : 0.0);
    setTotalPayable(data && data.budgetFieldValue ? ((data.budgetFieldValue.totalPayable * 1.0) / 100).toFixed(2) : 0.0);
    setWithValue(data && data.budgetFieldValue ? true : false);
  }, [data])

  return(
    <Grid 
      container
      item
      alignItems="center"
      style={{ minHeight: '70px' }}
    >
      <Grid item xs={1}>
        { field.fieldType === "tax" ? <AccountBalanceIcon style={{ color: green[500] }}/> : <AccountBalanceWalletIcon color="action"/> }
      </Grid>
      <Grid item xs={3}>
        <Typography variant="subtitle2" gutterBottom align='left'>
          {field.name}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <TotalValue
          setPristine={setPristine}
          statusChange={statusChange}
          setStatusChange={setStatusChange}
          initialFieldValue={initialFieldValue}
          changeInputStatus={changeInputStatus}
          setChangeInputStatus={setChangeInputStatus}
          changeFieldValue={changeFieldValue}
          setChangeFieldValue={setChangeFieldValue}
        />
      </Grid>
      <Grid item xs={3}>
        <Tooltip title={payableTooltipText(totalPayable)}>
          <Typography gutterBottom align='center' style={{ color: totalPayable < 0 ? green[500] : 'primary' }}>
            <NumberFormat
              value={Math.abs(totalPayable)}
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={'$ '}
              decimalScale={2}
            />
          </Typography>
        </Tooltip>
      </Grid>
      <Grid container item xs={2} direction='row' justifyContent="flex-start" alignItems="center">
        <Grid item xs={3}>
          <AddFieldValue
            budget={budget}
            fieldId={field.id}
            withValue={withValue}
            statusChange={statusChange}
            setStatusChange={setStatusChange}
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
                initialPayable={initialFieldValue}
                totalPayable={totalPayable}
                budget={budget}
                fieldValueId={ data && data.budgetFieldValue ? data.budgetFieldValue.id : ""}
                fieldId={field.id}
              />
            </MenuItem>
            <MenuItem key="2-pago">
              <PaymentList
                budget={budget}
                totalPayable={totalPayable}
                initialPayable={initialFieldValue}
                fieldValueId={data && data.budgetFieldValue ? data.budgetFieldValue.id : ""}
                budgetingTemplateFieldId={data && data.budgetFieldValue ? data.budgetFieldValue.budgetingTemplateFieldId : ""}
              />
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
        <Grid container item xs={6} justifyContent='flex-end' style={{paddingRight: "20px"}}>
            {!field.calculable?
              <Tooltip title="Campo no calculable" >
                <Avatar className={classes.avatarSizeSmall}>
                  <MoneyOffIcon/>
                </Avatar>
              </Tooltip>
            :
              ""
            }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(FieldValue);
