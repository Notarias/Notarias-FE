import React, { useState, useEffect } from 'react';
import { withStyles }                 from '@material-ui/core/styles';
import { styles }                     from '../../../styles';
import { useQuery }                   from '@apollo/client';
import { GET_BUDGET_FIELD_VALUE }     from '../../../queries_and_mutations/queries'
import GenericDropdownMenu            from '../../../../../ui/generic_dropdown_menu';
import TotalValue                     from './total_value';
import TaxedFields                    from './taxed_fields';
import Payment                        from './payment';
import PaymentList                    from './payment_list';
import ActiveSwitch                   from './active_switch';
import MenuItem                       from '@material-ui/core/MenuItem';
import AccountBalanceIcon             from '@material-ui/icons/AccountBalance';
import Typography                     from '@material-ui/core/Typography';
import Grid                           from '@material-ui/core/Grid';
import { green }                      from '@material-ui/core/colors';
import ExpandMoreIcon                 from '@material-ui/icons/ExpandMore';
import IconButton                     from '@material-ui/core/IconButton';
import Tooltip                        from '@material-ui/core/Tooltip';
import { grey }                       from '@material-ui/core/colors';
import NumberFormat                   from 'react-number-format';

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
  const { budget, field } = props

  const [value, setValue] = useState(0)
  const [totalPayable, setTotalPayable] = useState(0)
  const [editing, setEditing] = useState(false)
  const [editingValue, setEditingValue] = useState()
  const [budgetFieldValue, setBudgetFieldValue] = useState()
  const [expandTaxedFields, setExpandTaxedFields] = useState(false)
  const [templateField] = useState(field)

  const { loading, data, refetch } = useQuery(
    GET_BUDGET_FIELD_VALUE,
    {
      variables: { "budgetingTemplateFieldId": templateField.id , "budgetId": budget.id }
    }
  );

  const fieldValueCalculation = (budgetFieldValue) => {
    if(budgetFieldValue) {
      return ((budgetFieldValue.value * 1.0) / 100).toFixed(2)
    } else if(templateField.defaultValue) {
      if (templateField.operator === 'percentile') {
        return (templateField.defaultValue * 1.0).toFixed(2)
      } else {
        return ((templateField.defaultValue * 1.0) / 100.0).toFixed(2)
      }
    } else {
      return 0
    }
  }

  const totalPayableCalculation = (budgetFieldValue) => {
    return((budgetFieldValue ? (budgetFieldValue.totalPayable * 1.0) / 100 : 0.0).toFixed(2))
  }

  const totalsCalculation = () => {
    let value = fieldValueCalculation(data.budgetFieldValue);
    let debt = totalPayableCalculation(data.budgetFieldValue);
    setBudgetFieldValue(data.budgetFieldValue);
    setValue(value);
    setEditingValue(value)
    setTotalPayable(debt);
  }

  useEffect(() => {
    if (data && data.budgetFieldValue) {
      totalsCalculation()
    }
  }, [loading, data && data.budgetFieldValue, data && data.budgetFieldValue && data.budgetFieldValue.totalPayable])

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  const handleExpandTaxedFields = (e) => {
    setExpandTaxedFields(!expandTaxedFields)
  }

  return(
    <Grid 
      container
      item
      direction='column'
      justifyContent='center'
      style={ budgetFieldValue && budgetFieldValue.active ? {} : { backgroundColor: grey[300]}}
    >
      <Grid item container alignItems="center" style={{ minHeight: '70px' }} key={`fields-${budget.id}`}>
        <Grid item xs={1}>
          <AccountBalanceIcon style={{ color: green[500] }}/>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2" gutterBottom align='left'>
            {templateField.name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          { (value === 0 || value >= 0) && 
              <TotalValue
                pristine
                editing={editing}
                setEditing={setEditing}
                editingValue={editingValue}
                setEditingValue={setEditingValue}
                setValue={setValue}
                value={value}
                templateField={templateField}
                budgetFieldValue={budgetFieldValue}
              />
          }
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
          {/* <SaveButton
            budget={budget}
            templateField={templateField}
            pristine={pristine}
            setPristine={setPristine}
            budgetFieldValue={budgetFieldValue}
            value={value}
            editingValue={editingValue}
            setEditingValue={setEditingValue}
            setEditing={setEditing}
          /> */}
        </Grid>
        <Grid item xs={3}>
          <GenericDropdownMenu>
            <MenuItem key="1-pago">
              {
                budgetFieldValue &&
                  <Payment
                    value={value}
                    totalPayable={totalPayable}
                    budget={budget}
                    budgetFieldValue={budgetFieldValue}
                    field={templateField}
                  />
              }
            </MenuItem>
            <MenuItem key="2-pago">
              {
                budgetFieldValue &&
                  <PaymentList
                    budget={budget}
                    totalPayable={totalPayable}
                    value={value}
                    budgetFieldValue={budgetFieldValue}
                    field={templateField}
                  />
              }
            </MenuItem>
            <MenuItem key="activar-desactivar">
              { 
                budgetFieldValue &&
                  <ActiveSwitch
                    refetch={refetch}
                    budgetFieldValue={budgetFieldValue}
                    templateField={templateField}
                    budget={budget}/> 
              }
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
        <Grid item xs={3}>
          <IconButton  color="primary" onClick={handleExpandTaxedFields}>
            <ExpandMoreIcon/>
          </IconButton>
        </Grid>
      </Grid>
      </Grid>
      <Grid item key={`taxed-fields-${budget.id}`}>
        <TaxedFields budget={budget} templateField={templateField} expandTaxedFields={expandTaxedFields} setExpandTaxedFields={setExpandTaxedFields}/>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(FieldValue);
