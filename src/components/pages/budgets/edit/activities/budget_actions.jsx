import React, { useState }        from 'react';
import Grid                       from '@material-ui/core/Grid';
import Paper                      from '@material-ui/core/Paper';
import MoreHorizIcon              from '@material-ui/icons/MoreHoriz';
import MenuItem                   from '@material-ui/core/MenuItem';
import ListItemText               from '@material-ui/core/ListItemText';
import Dialog                     from '@material-ui/core/Dialog';
import DialogActions              from '@material-ui/core/DialogActions';
import DialogContent              from '@material-ui/core/DialogContent';
import DialogTitle                from '@material-ui/core/DialogTitle';
import FormControl                from '@material-ui/core/FormControl';
import InputLabel                 from '@material-ui/core/InputLabel';
import Select                     from '@material-ui/core/Select';
import TextField                  from '@material-ui/core/TextField';
import InputAdornment             from '@material-ui/core/InputAdornment';
import Button                     from '@material-ui/core/Button';
import Typography                 from '@material-ui/core/Typography';
import DescriptionIcon            from '@material-ui/icons/Description';
import CircularProgress           from '@material-ui/core/CircularProgress';
import { makeStyles }             from '@material-ui/core/styles';
import { useMutation }            from '@apollo/client'
import Dropzone                   from 'react-dropzone';
import PropTypes                  from 'prop-types';
import NumberFormat               from 'react-number-format';
import GenericDropdownMenu        from '../../../../ui/generic_dropdown_menu';
import CurrentUserAvatar          from '../../edit/current_user_avatar';
import CreditPaymentList          from '../../edit/credit_payment_list/credit_payment_list';
import { GLOBAL_MESSAGE }         from '../../../../../resolvers/queries';
import client                     from '../../../../../apollo';
import {
  BUDGET_UPLOAD_FILE,
  GET_CREDIT_PAYMENTS,
  GET_BUDGETS_AUDITLOG,
  GET_BUDGET_TOTALS,
  CREATE_CREDIT_PAYMENT,
  GET_BUDGET
} from '../../queries_and_mutations/queries';

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

export default (props) => {
  const { budget } = props;

  const [open, setOpen]                 = useState(false);
  const [pristine, setPristine]         = useState(true);
  const [paymentType, setPaymentType]   = useState("cash");
  const [paymentValue, setPaymentValue] = useState(0);
  const [paymentNote, setPaymentNote]   = useState("");
  const [errors, setErrors]             = useState(false);
  const [file, setFile]                 = useState();

  const classes = useStyles();
  const inputsList = ["total"]

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
    setPristine(false);
    setFile();
  }

  const [createCreditPaymentMutation, {loading: createCreditPaymentLoading}] =
  useMutation(
    CREATE_CREDIT_PAYMENT,
    {
      onError(apolloError) {
        setErrorsList(apolloError)
        setPristine(false)
      },
      onCompleted(cacheData) {
        setOpen(false);
      },
      refetchQueries: [
        {
          query: GET_BUDGET,
            variables: {"id": budget.id }
        },
        {
          query: GET_BUDGET_TOTALS,
            variables: {"id": budget.id }
        },
        {
          query: GET_CREDIT_PAYMENTS,
            variables: { "budgetId": budget.id }
        },
        {
          query: GET_BUDGETS_AUDITLOG,  
            variables: {"budgetId": budget.id}
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

  const rejectedFile = () => {
    client.writeQuery({
      query: GLOBAL_MESSAGE,
      data: {
        globalMessage: {
          message: "Formato de archivo no valido. Los formatos permitidos son: JPG, JPEG, PNG Y PDF",
          type: "error",
          __typename: "globalMessage"
        }
      }
    })
  }

  const getCurrentDate = (separator='/') => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return (`${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`)
  }

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value)
  }

  const handlePaymentValueChange = (event) => {
    setPaymentValue(event.target.value);
    setPristine(true)
    setErrors(false)
  }

  const handlePaymentNoteChange = (event) => {
    setPaymentNote(event.target.value);
  }

  const createNewCreditPayment = (event) => {
    createCreditPaymentMutation({
       variables:{
        "note": paymentNote,
        "budgetId": budget.id, 
        "total": (paymentValue * 100),
        "paymentType": paymentType,
        "budgetUploadId": file && file.id
       }
    })
  }

  const setErrorsList = (apolloError) => {
    let errorsList = {}
    let errorTemplateList = apolloError.graphQLErrors
    for ( let i = 0; i < errorTemplateList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorTemplateList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorTemplateList[i].message
        }
      }
    }
    setErrors(errorsList)
  }

  return(
    <>
      <GenericDropdownMenu icon={MoreHorizIcon}>
        <MenuItem key="1-abono" onClick={handleClickOpen}>
          <ListItemText primary="Nuevo Ingreso"/>
        </MenuItem>
        <MenuItem key="2-paymentList">
          <CreditPaymentList budget={budget}/>
        </MenuItem>
      </GenericDropdownMenu>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Grid container direction='row'>
            <Grid container item xs={6} justifyContent='flex-start' alignItems='center'>
              <Grid item>
                Datos del Ingreso
              </Grid>
            </Grid>
            <Grid container item xs={6} justifyContent='flex-end' alignItems='center'>
              <Grid item>
                Fecha: {getCurrentDate()}
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="row" justifyContent='space-between' alignItems="center" style={{paddingBottom: '20px'}}>
            <Grid container item xs={3} justifyContent="flex-start" alignItems="center">
              <FormControl >
                <InputLabel htmlFor="age-native-simple">Tipo de pago"</InputLabel>
                <Select
                  native
                  value={paymentType}
                  onChange={handlePaymentTypeChange}
                  label="Tipo de pago"
                >
                  <option value={"cash"}>Efectivo</option>
                  <option value={"deposit"}>Deposito</option>
                  <option value={"wire"}>Transferencia</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={4} justifyContent="center" alignItems="center" style={{paddingLeft: '15px'}}>
              <TextField
                onChange={handlePaymentValueChange}
                label="Ingreso"
                id="margin-normal"
                margin="normal"
                error={ !!errors["total"] && true }
                helperText={errors["total"] || "Cantidad"}
                errorskey={ "total" }
                required
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
            <Grid container item xs={5} justifyContent="flex-end" alignItems="center" style={{paddingLeft: '20px'}}>
              <Dropzone
                accept='file_extension/.jpg, .jpeg, .png, .pdf'
                onDrop={onDrop}
                onDropRejected={rejectedFile}
                multiple={false}
              >
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
                              <p>Arrastre su archivo aquí o Haga clic para seleccionar</p>
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
              <CurrentUserAvatar/>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                onChange={handlePaymentNoteChange}
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
          <Button onClick={createNewCreditPayment} disabled={!pristine || createCreditPaymentLoading}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
