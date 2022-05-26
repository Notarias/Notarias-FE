import React, {useState}                    from 'react'
import PropTypes                            from 'prop-types';
import NumberFormat                         from 'react-number-format';
import Grid                                 from '@material-ui/core/Grid';
import TextField                            from '@material-ui/core/TextField';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';
import Paper                                from '@material-ui/core/Paper';
import Button                               from '@material-ui/core/Button';
import InputAdornment                       from '@material-ui/core/InputAdornment';

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

const AdvancedSearchBudget = (props) => {
  const {
    setClientNameValue,
    setSerialNumberValue,
    setWritingNumberValue,
    setBudgetTemplateNameValue,
    setMoreThanValue,
    setLessThanValue,
    clientNameInputRef,
    serialNumberInputRef,
    writingNumberInputRef,
    budgetTemplateInputRef,
    moreThanInputRef,
    lessThanInputRef,
    setRunAdvancedSearch,
  } = props

  const [clientName, setClientName] = useState();
  const [serialNumber, setSerialNumber] = useState();
  const [writingNumber, setWritingNumber] = useState();
  const [budgetTemplateName, setBudgetTemplateName] = useState();
  const [moreThanPristine, setMoreThanPristine] = useState(false);
  const [lessThanPristine, setLessThanPristine] = useState(false);
  const [moreThan, setMoreThan] = useState(0);
  const [lessThan, setLessThan] = useState(0);


  const onChangeClientName = (event) => {
    setClientName(event.target.value)
  }

  const onChangeSerialNumber = (event) => {
    setSerialNumber(event.target.value)
  }

  const onChangeWritingNumber = (event) => {
    setWritingNumber(event.target.value)
  }

  const onChangeBudgetTemplateName = (event) => {
    setBudgetTemplateName(event.target.value)
  }

  const onChangeMoreThan = (event) => {
    setMoreThan(parseInt(event.target.value))
    event.target.value = 0 ? 
      setMoreThanPristine(false)
    : 
      setMoreThanPristine(true)
  }

  const onChangeLessThan = (event) => {
    setLessThan(parseInt(event.target.value))
    event.target.value = 0 ? 
      setLessThanPristine(false)
    : 
      setLessThanPristine(true)
  }

  const startAdvanceSearch = () => {
    setClientNameValue(clientName);
    setSerialNumberValue(serialNumber);
    setWritingNumberValue(writingNumber);
    setBudgetTemplateNameValue(budgetTemplateName);
    setMoreThanValue(moreThanPristine ? moreThan * 100 : null);
    setLessThanValue(lessThanPristine ? lessThan * 100 : null);
    setRunAdvancedSearch(true);
  }

  
  return(
    <Grid container justifyContent="flex-end">
      <Grid container item xs={6} direction="row" justifyContent="flex-end" style={{marginTop: "20px"}}>
        <Paper style={{ padding: "20px" }}>
          <Grid container item xs={12} justifyContent="flex-end">
            <Grid item xs={6} style={{ paddingRight: '15px' }}>
              <TextField
                inputRef={clientNameInputRef}
                onChange={onChangeClientName}
                id="client_name"
                label="Nombre del cliente"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} >
              <TextField
                inputRef={budgetTemplateInputRef}
                onChange={onChangeBudgetTemplateName}
                id="budget_name"
                label="Presupuesto"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end" style={{ paddingTop: '15px' }}>
            <Grid item xs={2} style={{ paddingRight: '15px' }}>
              <TextField
                inputRef={serialNumberInputRef}
                onChange={onChangeSerialNumber}
                id="serial_number"
                label="No.Serie"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={4} style={{ paddingRight: '15px' }}>
              <TextField
                inputRef={writingNumberInputRef}
                onChange={onChangeWritingNumber}
                id="writing_number"
                label="No.Escritura"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={3} style={{ paddingRight: '15px' }}>
              <TextField
                inputRef={moreThanInputRef}
                onChange={onChangeMoreThan}
                id="more_than"
                label="Total mayor a:"
                value={moreThan}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                inputRef={lessThanInputRef}
                onChange={onChangeLessThan}
                id="less_than"
                label="Total menor a:"
                value={lessThan}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
          </Grid>
          <Grid container item xs alignItems="center" justifyContent="flex-end" style={{ paddingTop: '15px' }}>
            <Button variant="outlined" color="primary" onClick={startAdvanceSearch}>Buscar</Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(AdvancedSearchBudget);
