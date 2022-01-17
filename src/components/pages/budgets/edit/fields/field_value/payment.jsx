import React, { useState }                  from 'react'
import ListItemText                         from '@material-ui/core/ListItemText';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import Grid                                 from '@material-ui/core/Grid';
import TextField                            from '@material-ui/core/TextField';
import Button                               from '@material-ui/core/Button';
import Avatar                               from './current_user_avatar';
import Typography                           from '@material-ui/core/Typography';
import { useMutation }                      from '@apollo/client'
import { CREATE_PAYMENT }                   from '../../../queries_and_mutations/queries'
import { GET_BUDGET_FIELD_VALUE }           from '../../../queries_and_mutations/queries'
import { GET_BUDGET_TOTALS }                from '../../../queries_and_mutations/queries'
import { GET_PAYMENTS }                     from '../../../queries_and_mutations/queries'
import { GET_BUDGETS_AUDITLOG }             from '../../../queries_and_mutations/queries';


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

const Payment = (props) => {
  const { totalDebt, budget, fieldValueId, fieldId } = props
  const [notePayment, setNotePayment] = React.useState("")
  const [valuePayment, setValuePayment] = React.useState(0)
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = useState(false)

  const inputsList = ["total"]

  const [createPaymentMutation, {loading: createPaymentLoading}] =
  useMutation(
    CREATE_PAYMENT,
    {
      onError(apolloError) {
        setErrors(apolloError)
        setPristine(false)
      },
      onCompleted(cacheData) {
        setOpen(false);
        setError(false)
      },
      refetchQueries: [
        {
        query: GET_BUDGET_FIELD_VALUE,
          variables: { "budgetingTemplateFieldId": fieldId , "budgetId": budget.id }
        },
        {
          query: GET_PAYMENTS,
          variables: { "fieldValueId": fieldValueId }
        },
        {
          query: GET_BUDGET_TOTALS,
          variables: { "id": budget.id }
        },
        {
          query: GET_BUDGETS_AUDITLOG,  
            variables: {"budgetId": budget.id }
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const setErrors = (apolloError) => {
    let errorsList = {}
    let errorTemplateList = apolloError.graphQLErrors
    for ( let i = 0; i < errorTemplateList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorTemplateList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorTemplateList[i].message
        }
      }
    }
    setError(errorsList)
  }

  const createNewPayment = (event) => {
    createPaymentMutation({
       variables:{
        "note": notePayment,
        "budgetId": budget.id,
        "budgetFieldValueId":fieldValueId,
        "total": (valuePayment * 100)
       }
    })
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
    setPristine(true)
  };

  const handleClose = () => {
    setOpen(false);
    setError(false)
  };

  const handleNotePaymentChange = (event) => {
    setNotePayment(event.target.value);
  }

  const handleValuePaymentChange = (event) => {
    setValuePayment(event.target.value);
    setPristine(false)
    setError(false)
  }

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


  return(
    <>
      <ListItemText primary="Pagar" onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          Agregar Egreso
        </DialogTitle>
        <DialogContent>
          <Grid container >
            <Grid container direction="row" item xs={6} alignItems="center" justifyContent="center">
              <Typography variant="button" display="block" gutterBottom>
                Total {totalDebtAmount()}
              </Typography>
            </Grid>
              <Grid  container item xs={6} alignItems="center" justifyContent="center">
                <TextField
                  key={"payment"}
                  onChange={handleValuePaymentChange}
                  label="Egreso"
                  autoFocus
                  error={ !!error["total"] && true }
                  helperText={ error["total"] || "Cantidad"}
                  errorskey={ "total" }
                  required
                  id="margin-normal"
                  margin="normal"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Grid>
            </Grid>
            <Avatar/>
          <Grid>
            <TextField
              fullWidth
              onChange={handleNotePaymentChange}
              id="outlined-textarea"
              placeholder="Comentarios"
              multiline
              variant="outlined"
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={createNewPayment} disabled={pristine || createPaymentLoading}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Payment;
