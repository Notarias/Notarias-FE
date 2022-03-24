import React, { useState, useEffect }       from 'react'
import Button                               from '@material-ui/core/Button';
import ListItemText                         from '@material-ui/core/ListItemText';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import Grid                                 from '@material-ui/core/Grid';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import CreditPaymentRow                     from './credit_payment_row';
import { useQuery }                         from '@apollo/client';
import { GET_CREDIT_PAYMENTS }              from '../../queries_and_mutations/queries'

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


const CreditPaymentList = (props) => {
  const { budget } = props
  const [open, setOpen] = useState(false)
  const [creditPayments, setCreditPayments] = useState([])

  const { data } = useQuery(
    GET_CREDIT_PAYMENTS, { variables: { "budgetId": budget.id } }
  );

  useEffect(() => {
    data && setCreditPayments(data.creditPayments);;
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (data && data.creditPayments.length === 0) {
    return(
      <ListItemText primary="No hay Ingresos" />
    )
  } else {
    return(
      <>
        <ListItemText primary="Lista de Ingresos" onClick={handleClickOpen}/>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
          <DialogTitle>
            <Grid container direction="row" justifyContent='center'>
              Lista de Ingresos
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container direction="row">
              {
                creditPayments.map((creditPayment) => {
                  return(
                    <React.Fragment key={`${creditPayment.id}-creditPayment`}>
                      <CreditPaymentRow
                        creditPayment={creditPayment}
                        budget={budget}
                      />
                      {console.log(creditPayment)}
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

export default CreditPaymentList
