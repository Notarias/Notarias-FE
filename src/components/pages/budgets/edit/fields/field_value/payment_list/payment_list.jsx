import React, { useEffect }                 from 'react'
import ListItemText                         from '@material-ui/core/ListItemText';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import Button                               from '@material-ui/core/Button';
import Grid                                 from '@material-ui/core/Grid';
import { useQuery }                         from '@apollo/client';
import { GET_PAYMENTS }                     from '../../../../queries_and_mutations/queries'
import PrintIcon                            from '@material-ui/icons/Print';
import TextField                            from '@material-ui/core/TextField'
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import VoidOrInvoidPayment                  from './void_unvoid_payment'
import Typography                           from '@material-ui/core/Typography';

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
  const {fieldValueId, budgetingTemplateFieldId, totalDebt, initialDebt} = props
  const [open, setOpen] = React.useState(false)
  const [payments, setpayments] = React.useState([])

  const { data } = useQuery(
    GET_PAYMENTS, { variables: { "fieldValueId": fieldValueId } }
  );

  useEffect(() => {
    data && setpayments(data.payments);;
  }, [data])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const totalDebtAmount = () => {
    return(
      <Typography variant="h6" gutterBottom>
        <NumberFormat 
          value={totalDebt} 
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </Typography>
    )
  }

  const initialDebtAmount = () => {
    return(
      <Typography variant="h6" gutterBottom>
        <NumberFormat 
          value={initialDebt} 
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </Typography>
    )
  }

  if (data && data.payments.length === 0) {
    return(
      <ListItemText primary="No hay Pagos" />
    )
  } else {
    return(
      <>
        <ListItemText primary="Lista de pagos" onClick={handleClickOpen}/>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>
            <Grid container direction="column">
              <Grid item>
                Lista de pagos
              </Grid>
              <Grid container item>
                <Grid item xs={6}>
                  <Typography variant="button" display="block" gutterBottom>
                    Monto inicial {initialDebtAmount()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="button" display="block" gutterBottom>
                    A pagar {totalDebtAmount()}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container direction="row">
              {
                payments.map((payment) => {
                  const getCurrentDate = (separator='/') => {
                    let newDate = new Date(Date.parse(payment.createdAt))
                    let date = newDate.getDate();
                    let month = newDate.getMonth() + 1;
                    let year = newDate.getFullYear();
                
                    return (`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`)
                    }
                  return(
                    <React.Fragment key={payment.id + "fragment"}>
                      <Grid container item xs={3} direction="column" alignItems="center" justifyContent="center">
                        <Grid>
                          Numero de Folio
                        </Grid>
                        <Grid>
                          0000{payment.id}
                        </Grid>
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          key={payment.id + "creditPayment"}
                          label="Abono"
                          id="margin-normal"
                          helperText="Cantidad"
                          margin="normal"
                          disabled
                          value={payment.total / 100}
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
                        <VoidOrInvoidPayment
                          voidAt={payment.voidAt}
                          payment={payment}
                          fieldValueId={fieldValueId}
                          budgetingTemplateFieldId={budgetingTemplateFieldId}
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
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default PaymentList;
