import React, { useState }                  from 'react';
import IconButton                           from '@material-ui/core/IconButton';
import Grid                                 from '@material-ui/core/Grid';
import Tooltip                              from '@material-ui/core/Tooltip';
import DescriptionIcon                      from '@material-ui/icons/Description';
import PublishIcon                          from '@material-ui/icons/Publish';
import CachedIcon                           from '@material-ui/icons/Cached';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import TextField                            from '@material-ui/core/TextField';
import Typography                           from '@material-ui/core/Typography';
import Link                                 from '@material-ui/core/Link';
import Dropzone                             from 'react-dropzone';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import VoidOrInvoidPayment                  from './void_unvoid_payment';
import { useMutation }                      from '@apollo/client';
import { BUDGET_UPLOAD_FILE }               from '../../../../queries_and_mutations/queries';
import { GET_PAYMENTS }                     from '../../../../queries_and_mutations/queries';

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
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,

  onChange: PropTypes.func.isRequired,
};

const PaymentRow = (props) => {
  const { payment, budget, budgetFieldValue, field } = props
  const [file, setFile] = useState("");

  const [uploadPaymentFile, { loading: uploadPaymentFileLoading}] =
  useMutation(
    BUDGET_UPLOAD_FILE,
      {
        context: { hasUpload: true },
        onCompleted(cacheData) {
          setFile(cacheData.budgetUpload.budgetUpload)
        },
        refetchQueries: [
          {
            query: GET_PAYMENTS,
            variables: { "fieldValueId": budgetFieldValue.id }
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const onDrop = (files) => {
    uploadFile(files, payment)
  }
  
  const uploadFile = (files, payment) => {
    uploadPaymentFile(
      {
        variables: {
          budgetId: budget.id,
          transactionableId: payment.id,
          transactionableType: "Payment",
          file: files[0]
        }
      }
    )
  }

  const getCurrentDate = (separator='/') => {
    let newDate = new Date(Date.parse(payment.createdAt))
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return (`${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`)
    }

  return(
    <>
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
          budgetFieldValue={budgetFieldValue}
          field={field}
        />
      </Grid>
      <Grid container item xs={1} alignItems="center" justifyContent="flex-start">
        <Dropzone accept="image/*" multiple={false} onDrop={onDrop}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Tooltip title={payment.lastBudgetUpload ? "Cambiar Comprobante" : "Subir Comprobante"}>
                  <IconButton color='primary' >
                    { payment.lastBudgetUpload ?
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
      <Grid container item xs={3} alignItems="center" justifyContent="flex-start">
          { !!payment.lastBudgetUpload ?
            <>
              <DescriptionIcon/>
              <Tooltip title='Ver Comprobante'>
                <Link href={payment.lastBudgetUpload.fileUrl} 
                  target='_blank' 
                  color='inherit' 
                  underline='none'
                >
                  <Typography>
                    { payment.lastBudgetUpload.fileName.substr(0,20) }
                  </Typography>
                </Link>
              </Tooltip>
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
    </>
  )
}

export default PaymentRow;
