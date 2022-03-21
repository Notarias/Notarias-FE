import React, { useState, useEffect }       from 'react'
import ListItemText                         from '@material-ui/core/ListItemText';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import Button                               from '@material-ui/core/Button';
import IconButton                           from '@material-ui/core/IconButton';
import Grid                                 from '@material-ui/core/Grid';
import Tooltip                              from '@material-ui/core/Tooltip';
import DescriptionIcon                      from '@material-ui/icons/Description';
import PublishIcon                          from '@material-ui/icons/Publish';
import CachedIcon                           from '@material-ui/icons/Cached';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import TextField                            from '@material-ui/core/TextField';
import Typography                           from '@material-ui/core/Typography';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import VoidOrInvoidPayment                  from './void_unvoid_payment';
import { useQuery, useMutation }            from '@apollo/client';
import { GET_PAYMENTS }                     from '../../../../queries_and_mutations/queries';
import { BUDGET_UPLOAD_FILE }               from '../../../../queries_and_mutations/queries';

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
  const {budget, fieldValueId, budgetingTemplateFieldId, totalDebt, initialDebt} = props
  const [open, setOpen] = useState(false);
  const [payments, setpayments] = useState([]);
  const [file, setFile] = useState("");

  const { data } = useQuery(
    GET_PAYMENTS, { variables: { "fieldValueId": fieldValueId } }
  );

  useEffect(() => {
    data && setpayments(data.payments);;
  }, [data])

  const [uploadPaymentFile, { loading: uploadPaymentFileLoading}] =
  useMutation(
    BUDGET_UPLOAD_FILE,
      {
        context: { hasUpload: true },
        onCompleted(cacheData) {
          setFile(cacheData.budgetUpload.budgetUpload)
        },
      }
    )

  const uploadFile = (files, payment) => {
    uploadPaymentFile(
      {
        variables: {
          budgetId: budget.id,
          transactionable_id: payment.id,
          transactionable_type: payment._type,
          file: files[0]
        }
      }
    )
  }

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
                  const getCurrentDate = (separator='/') => {
                    let newDate = new Date(Date.parse(payment.createdAt))
                    let date = newDate.getDate();
                    let month = newDate.getMonth() + 1;
                    let year = newDate.getFullYear();
                
                    return (`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`)
                    }
                  return(
                    <React.Fragment key={payment.id + "fragment"}>
                      <Grid container item xs={2} direction="column" alignItems="center" justifyContent="center">
                        <Grid>
                          Folio
                        </Grid>
                        <Grid>
                          0000{payment.id}
                        </Grid>
                      </Grid>
                      <Grid item xs={3}>
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
                        <Tooltip title={ payment.lastBudgetUpload ? "Remplazar Recbo" : "Cargar Recibo" }>
                          <IconButton color='primary' onClick={uploadFile(file, payment)}>
                          { payment.lastBudgetUpload ?  
                            <CachedIcon/>
                          :
                            <PublishIcon/> 
                          }
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid container item xs={3} alignItems="center" justifyContent="flex-start">
                          { !!payment.lastBudgetUpload ?
                            <>
                              <DescriptionIcon/>
                              <Typography>
                                { payment.lastBudgetUpload.fileName }
                              </Typography>
                            </>
                            :
                            <>
                              <DescriptionIcon color='disabled'/>
                              <Typography>
                                Sin Recibo
                              </Typography>
                            </>
                          }
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
