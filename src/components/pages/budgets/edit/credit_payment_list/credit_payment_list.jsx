import React, { useState, useEffect }       from 'react'
import Button                               from '@material-ui/core/Button';
import ListItemText                         from '@material-ui/core/ListItemText';
import MenuItem                             from '@material-ui/core/MenuItem';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_CREDIT_PAYMENTS }              from '../../queries_and_mutations/queries'
import Grid                                 from '@material-ui/core/Grid';
import TextField                            from '@material-ui/core/TextField';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import VoidOrInvoid                         from './void_or_invoid'
import PrintIcon                            from '@material-ui/icons/Print';


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


const PaymentList = (props) => {
  const {budgetId} = props
  const [open, setOpen] = React.useState(false)
  const [creditPayments, setCreditPayments] = React.useState(data ? data.creditPayments : [])

  const { loading, data, refetch } = useQuery(
    GET_CREDIT_PAYMENTS, { variables: { "budgetId": budgetId } }
  );

  useEffect(() => {
    data && setCreditPayments(data.creditPayments);;
  }, [data])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  if (data && data.creditPayments.length === 0) {
    return(
      <ListItemText primary="No hay abonos" />
    )
  } else {
    return(
      <>
        <ListItemText primary="Lista de abonos" onClick={handleClickOpen}/>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>
            Lista de abonos
          </DialogTitle>
          <DialogContent>
            <Grid container direction="row">
              {
                creditPayments.map((creditPayment) => {
                  const getCurrentDate = (separator='/') => {
                    
                    let newDate = new Date(Date.parse(creditPayment.createdAt))
                    let date = newDate.getDate();
                    let month = newDate.getMonth() + 1;
                    let year = newDate.getFullYear();
                
                    return (`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`)
                    }
                  return(
                    <React.Fragment key={creditPayment.id + "fragment"}>
                      <Grid container item xs={3} direction="column" alignItems="center" justifyContent="center">
                        <Grid>
                          Numero de Folio
                        </Grid>
                        <Grid>
                          0000{creditPayment.id}
                        </Grid>
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          key={creditPayment.id + "creditPayment"}
                          label="Abono"
                          id="margin-normal"
                          helperText="Cantidad"
                          margin="normal"
                          disabled
                          value={creditPayment.total / 100}
                          // error={ !!error["total"] && true }
                          // helperText={error["total"] || " "}
                          // errorskey={ "total" }
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                          }}
                        />
                      </Grid>
                      <Grid container item xs={2} alignItems="center" justifyContent="center">
                        {getCurrentDate()}
                      </Grid>
                      <Grid container item xs={1} alignItems="center" justifyContent="center">
                        <VoidOrInvoid
                          voidAt={creditPayment.voidAt}
                          paymentId={creditPayment.id}
                          budgetId={budgetId}
                        />
                      </Grid>
                      <Grid container item xs={1} alignItems="center" justifyContent="center">
                        <Button>
                          <PrintIcon/>
                        </Button>
                      </Grid>
                    </React.Fragment>
                  )
                })
              }
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default PaymentList
