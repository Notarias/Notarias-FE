import React                                from 'react';
import Drawer                               from '@material-ui/core/Drawer';
import Button                               from '@material-ui/core/Button';
import List                                 from '@material-ui/core/List';
import Divider                              from '@material-ui/core/Divider';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemIcon                         from '@material-ui/core/ListItemIcon';
import ListItemText                         from '@material-ui/core/ListItemText';
import InboxIcon                            from '@material-ui/icons/MoveToInbox';
import MailIcon                             from '@material-ui/icons/Mail';
import AccountBalanceIcon                   from '@material-ui/icons/AccountBalance';
import IconButton                           from '@material-ui/core/IconButton';
import { withStyles }                       from '@material-ui/core/styles';
import Tooltip                              from '@material-ui/core/Tooltip';
import { styles }                           from '../styles';
import TextField                            from '@material-ui/core/TextField';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import { useQuery }                         from '@apollo/client';
import { GET_BUDGET_TOTALS }                from '../queries_and_mutations/queries'


function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
 
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      decimalSeparator="."
      decimalScale={2}
      fixedDecimalScale

    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,

  onChange: PropTypes.func.isRequired,
};

const PaymentDrawer = (props) => {
  const { classes, budget } = props
  const [state, setState] = React.useState({
    right: false,
  });

  const { loading, data, refetch } = useQuery(
    GET_BUDGET_TOTALS, { variables: {"id": budget.id} }
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => {
    return(
      <div
        className={classes.drawerPaymentList}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItem button key={"drawer-1"}>
          <TextField
            label="Total por pagar"
            id="Total"
            value={data && data.budgetTotals ? data.budgetTotals.total / 100 : 0}
            disabled
            helperText="Cantidad"
            margin="normal"
            InputProps={{
              inputComponent: NumberFormatCustom,
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
          />
          </ListItem>
          <Divider />
          <ListItem button key={"drawer-2"}>
            <TextField
              label="Total Abonado"
              id="Total Abonado"
              value={data && data.budgetTotals ? data.budgetTotals.totalCredit / 100 : 0}
              disabled
              helperText="Cantidad"
              margin="normal"
              InputProps={{
                inputComponent: NumberFormatCustom,
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
          </ListItem>
          <Divider />
          <ListItem button key={"drawer-3"}>
          <TextField
            label="Total Distribuido"
            id="Total Distribuido"
            value={data && data.budgetTotals ? data.budgetTotals.totalPaid / 100 : 0}
            disabled
            helperText="Cantidad"
            margin="normal"
            InputProps={{
              inputComponent: NumberFormatCustom,
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
            />
          </ListItem>
          <Divider />
          <ListItem button key={"drawer-4"}>
          <TextField
            label="Deuda Total"
            id="Deuda Total"
            value={data && data.budgetTotals ? data.budgetTotals.totalDebt / 100 : 0}
            disabled
            helperText="Cantidad"
            margin="normal"
            InputProps={{
              inputComponent: NumberFormatCustom,
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
          />
          </ListItem>
          <Divider />
        </List>
      </div>
    )
  };

  return (
    <>
      <Tooltip title="Balance"><IconButton onClick={toggleDrawer('right', true)}><AccountBalanceIcon/></IconButton></Tooltip>
      <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
        { list('right') }
      </Drawer>
    </>
  );
}

export default withStyles(styles)(PaymentDrawer);
