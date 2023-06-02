import React                                from 'react';
import IconButton                           from '@material-ui/core/IconButton';
import Grid                                 from '@material-ui/core/Grid';
import Tooltip                              from '@material-ui/core/Tooltip';
import DescriptionIcon                      from '@material-ui/icons/Description';
import PublishIcon                          from '@material-ui/icons/Publish';
import CachedIcon                           from '@material-ui/icons/Cached';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import TextField                            from '@material-ui/core/TextField';
import Typography                           from '@material-ui/core/Typography';
import CircularProgress                     from '@material-ui/core/CircularProgress';
import Dropzone                             from 'react-dropzone';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import VoidOrInvoid                         from './void_or_invoid';
import { makeStyles }                       from '@material-ui/core/styles';
import { Link }                             from '@material-ui/core';
import { useMutation }                      from '@apollo/client';
import { BUDGET_UPLOAD_FILE }               from '../../queries_and_mutations/queries';
import { GET_CREDIT_PAYMENTS }              from '../../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                   from '../../../../../resolvers/queries';
import client                               from '../../../../../apollo';

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

const CreditPaymentRow = (props) => {
  const {creditPayment, budget} = props

  const classes = useStyles();

  const [uploadPaymentFile, { loading: uploadPaymentFileLoading}] =
  useMutation(
    BUDGET_UPLOAD_FILE,
      {
        context: { hasUpload: true },
        onCompleted(cacheData) {
        },
        refetchQueries: [
          {
            query: GET_CREDIT_PAYMENTS,
            variables: { "budgetId": budget.id }
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const  renderpaymentType = () => {
    switch (creditPayment.paymentType) {
      case "cash" :

        return(
          "Efectivo"
        )
      case "deposit" :

        return(
          "Deposito"
        )
      case "wire" :

        return(
          "Transferencia"
        )
      default :
        return(
          "NA"
        )
    }
  }

  const onDrop = (files) => {
    uploadFile(files, creditPayment)
  }

  const rejectedFile = () => {
    client.writeQuery({
      query: GLOBAL_MESSAGE,
      data: {
        globalMessage: {
          message: "Formato de archivo, no valido, permitidos: JPG, JPEG, PNG Y PDF",
          type: "error",
          __typename: "globalMessage"
        }
      }
    })
  }

  const uploadFile = (files, creditPayment) => {
    uploadPaymentFile(
      {
        variables: {
          budgetId: budget.id,
          transactionableId: creditPayment.id,
          transactionableType: "CreditPayment",
          file: files[0]
        }
      }
    )
  }

  const getCurrentDate = (separator='/') => {
    let newDate = new Date(Date.parse(creditPayment.createdAt))
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return (`${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`)
  }

  return (
    <>
      <Grid container item xs={1} direction="column" alignItems="center" justifyContent="center">
        <Grid>
          # Folio
        </Grid>
        <Grid>
          0000{creditPayment.id}
        </Grid>
      </Grid>
      <Grid container item xs={2} direction="column" alignItems="center" justifyContent="center">
        {renderpaymentType()}
      </Grid>
      <Grid item xs={2}>
        <TextField
          key={creditPayment.id + "creditPayment"}
          label="Ingreso"
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
          budget={budget}
        />
      </Grid>
      <Grid container item xs={1} alignItems="center" justifyContent="center">
        <Dropzone
          accept='file_extension:, .jpg, .jpeg, .png, .pdf'
          onDrop={onDrop}
          onDropRejected={rejectedFile}
          multiple={false}
        >
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Tooltip title={creditPayment.lastBudgetUpload ? "Cambiar Comprobante" : "Subir Comprobante"}>
                  <IconButton color='primary' >
                    { creditPayment.lastBudgetUpload ?
                      <CachedIcon/>
                    :
                      <PublishIcon/>
                    }
                  </IconButton>
                </Tooltip>
              </div>
            </section>
          )}
        </Dropzone>
      </Grid>
      <Grid container item xs={3} alignItems='center' justifyContent='flex-start'>
          { !!creditPayment.lastBudgetUpload ?
            <>
              { uploadPaymentFileLoading ?
                <div className={classes.root}>
                  <CircularProgress />
                </div>
              :
                <>
                  <DescriptionIcon/>
                  <Tooltip title='Ver Comprobante'>
                    <Link href={creditPayment.lastBudgetUpload.fileUrl} 
                      target='_blank' 
                      color='inherit' 
                      underline='none'
                    >
                      <Typography>
                        { creditPayment.lastBudgetUpload.fileName.substr(0,20) }
                      </Typography>
                    </Link>
                  </Tooltip>
                </>
              }
            </>
            :
            <>
              { uploadPaymentFileLoading ?
                <div className={classes.root}>
                  <CircularProgress />
                </div>
              :
                <>
                  <DescriptionIcon color='disabled'/>
                  <Typography>
                    Sin Recibo
                  </Typography>
                </>
              }
            </>
          }
      </Grid>
    </>
  )
}
export default CreditPaymentRow;
