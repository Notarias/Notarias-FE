import React, { useEffect }                 from 'react'
import ListItemText                         from '@material-ui/core/ListItemText';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import Button                               from '@material-ui/core/Button';
import IconButton                           from '@material-ui/core/IconButton';
import DescriptionIcon                      from '@material-ui/icons/Description';
import Grid                                 from '@material-ui/core/Grid';
import Tooltip                              from '@material-ui/core/Tooltip';
import { useQuery }                         from '@apollo/client';
import { GET_PAYMENTS }                     from '../../../../queries_and_mutations/queries';
import PublishIcon                          from '@material-ui/icons/Publish';
import CachedIcon                           from '@material-ui/icons/Cached';
import TextField                            from '@material-ui/core/TextField';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import VoidOrInvoidPayment                  from './void_unvoid_payment';
import Typography                           from '@material-ui/core/Typography';
import PaymentRow                           from './payment_row';

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
  const {budget, budgetFieldValue, field, budgetingTemplateFieldId , totalDebt, value} = props
  const [open, setOpen] = React.useState(false)
  const [payments, setpayments] = React.useState([])

  const { data } = useQuery(
    GET_PAYMENTS, { variables: { "fieldValueId": budgetFieldValue.id } }
  );  

  useEffect(() => {
    data && setpayments(data.payments);
  }, [data]);

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
          value={value} 
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
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
          <DialogTitle>
            <Grid container direction="column" alignItems='center'>
              <Grid item>
                Lista de pagos
              </Grid>
              <Grid container item>
                <Grid container item xs={6} justifyContent='center'>
                  <Grid item>
                    <Typography variant="button" display="block" gutterBottom>
                      Monto inicial {initialDebtAmount()}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={6} justifyContent='center'>
                  <Grid item>
                    <Typography variant="button" display="block" gutterBottom>
                      A pagar {totalDebtAmount()}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container direction="row">
              {
                payments.map((payment) => {
                  return(
                    <React.Fragment key={`${payment.id}-payment`}>
                      <PaymentRow 
                        payment={payment}
                        budget={budget}
                        budgetingTemplateFieldId={budgetingTemplateFieldId}
                        totalDebt={totalDebt}
                        budgetFieldValue={budgetFieldValue}
                        field={field}
                      />
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
