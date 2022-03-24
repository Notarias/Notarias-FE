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
import Dropzone                             from 'react-dropzone';
import DescriptionIcon                      from '@material-ui/icons/Description';
import Button                               from '@material-ui/core/Button';
import Avatar                               from './current_user_avatar';
import Paper                                from '@material-ui/core/Paper';
import Typography                           from '@material-ui/core/Typography';
import CircularProgress                     from '@material-ui/core/CircularProgress';
import { makeStyles }                       from '@material-ui/core/styles';
import { useMutation }                      from '@apollo/client';
import { BUDGET_UPLOAD_FILE }               from '../../../queries_and_mutations/queries';
import { CREATE_PAYMENT }                   from '../../../queries_and_mutations/queries';
import { GET_BUDGET_FIELD_VALUE }           from '../../../queries_and_mutations/queries';
import { GET_BUDGET_TOTALS }                from '../../../queries_and_mutations/queries';
import { GET_PAYMENTS }                     from '../../../queries_and_mutations/queries';
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Payment = (props) => {
  const { totalPayable, budget, budgetFieldValue, field } = props
  const [notePayment, setNotePayment] = useState("");
  const [valuePayment, setValuePayment] = useState(0.0);
  const [pristine, setPristine] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");

  const classes = useStyles();
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
        setError(false);
        setFile();
      },
      refetchQueries: [
        {
          query: GET_BUDGET_FIELD_VALUE,
          variables: { "budgetingTemplateFieldId": field.id , "budgetId": budget.id }
        },
        {
          query: GET_PAYMENTS,
          variables: { fieldValueId: budgetFieldValue.id }
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
  
  const onDrop = (files) => {
    uploadPaymentFile(
      {
        variables: {
          budgetId: budget.id,
          file: files[0]
        }
      }
    )
  }

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
        "budgetFieldValueId": budgetFieldValue.id,
        "total": (valuePayment * 100),
        "budgetUploadId": file.id
       }
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
    setPristine(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleNotePaymentChange = (event) => {
    setNotePayment(event.target.value);
  }

  const handleValuePaymentChange = (event) => {
    setValuePayment(event.target.value);
    setPristine(false);
    setError(false);
  }

  const totalPayableAmount = () => {
    return(
      <Typography variant="h6" gutterBottom>
        <NumberFormat 
          value={totalPayable} 
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
          <Grid container direction="row" style={{paddingBottom: '20px'}}>
            <Grid container item xs={3} alignItems="center" justifyContent="center">
              <Typography variant="button" display="block" gutterBottom>
                Total {totalPayableAmount()}
              </Typography>
            </Grid>
            <Grid  container item xs={4} alignItems="center" justifyContent="center">
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
            <Grid container item xs={5} justifyContent="flex-end" alignItems="center" style={{paddingLeft: '20px'}}>
              <Dropzone accept="image/*" multiple={false} onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Paper variant='outlined' style={{paddingLeft: '20px', paddingRight: '20px', borderWidth: 10, borderColor: "#CFCFCF"}}>
                        { file && file ?
                          <Grid container item direction='row'>
                            { uploadPaymentFileLoading ?
                              <div className={classes.root}>
                                <CircularProgress />
                              </div>
                            :
                              <>
                                <Grid item>
                                  <DescriptionIcon/>
                                </Grid>
                                <Grid item>
                                  <Typography>
                                    { file.fileName.substr(0,20) }
                                  </Typography>
                                </Grid>
                              </>
                            }
                          </Grid>
                        :
                          <>
                            { uploadPaymentFileLoading ?
                              <div className={classes.root}>
                                <CircularProgress />
                              </div>
                            :
                              <p>Arrastre su archivo aqui o Haga clic para seleccioanrlo</p>
                            }
                          </>
                        }
                      </Paper>
                    </div>
                  </section>
                )}
              </Dropzone>
            </Grid>
          </Grid>
          <Grid container direction='row'>
            <Grid container item xs justifyContent='flex-start'>
              <Avatar/>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                onChange={handleNotePaymentChange}
                id="outlined-textarea"
                placeholder="Comentarios"
                multiline
                variant="outlined"
              />
            </Grid>
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
