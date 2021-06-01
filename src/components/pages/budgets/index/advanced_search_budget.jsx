import React, {useState, createRef}         from 'react'
import Grid                                 from '@material-ui/core/Grid';
import TextField                            from '@material-ui/core/TextField';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';
import Paper                                from '@material-ui/core/Paper';
import Button                               from '@material-ui/core/Button';

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
  onChange: PropTypes.func.isRequired,
};

const AdvancedSearchBudget = (props) => {
  const { 
    classes,
    changeAdvanceSearch,
    setClientNameValue,
    setProcedureNameValue,
    setSerialNumberValue,
    setMoreThanValue,
    setLessThanValue,
    clientNameInputRef,
    procedureInputRef,
    serialNumberInputRef,
    moreThanInputRef,
    lessThanInputRef,
  } = props
  const [changeClientName, setChangeClientName] = React.useState(null)
  const [changeProcedureName, setChangeProcedureName]  = React.useState(null)
  const [changeSerialNumber, setChangeSerialNumber] = React.useState(null)
  const [changeMoreThan, setChangeMoreThan] = React.useState(null)
  const [changeLessThan, setChangeLessThan] = React.useState(null)

  const onChangeClientName = (event) => {
    setChangeClientName(event.target.value)
  }

  const onChangeProcedureName = (event) => {
    setChangeProcedureName(event.target.value)
  }

  const onChangeSerialNumber = (event) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = onlyNums
    setChangeSerialNumber(event.target.value)
  }

  const onChangeMoreThan = (event) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = onlyNums
    setChangeMoreThan(Number(event.target.value))
  }

  const onChangeLessThan = (event) => {
    const onlyNums = event.target.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    event.target.value = onlyNums
    setChangeLessThan(Number(event.target.value))
  }

  const startAdvanceSearch = () => {
    setClientNameValue(changeClientName)
    setProcedureNameValue(changeProcedureName)
    setSerialNumberValue(changeSerialNumber)
    setMoreThanValue(changeMoreThan * 100)
    setLessThanValue(changeLessThan * 100)
  }

  return(
    <Grid container justify="flex-end" className={changeAdvanceSearch ? classes.GridInputAdvancedSearchHide : classes.GridInputAdvancedSearch}>
      <Grid container item xs={8} direction="row" justify="flex-end">
        <Paper className={classes.paperAdvancedSearch}>
        <Grid container item direction="row" justify="flex-end">
          <Grid item xs={10}>
            <TextField
              inputRef={clientNameInputRef}
              onChange={onChangeClientName}
              size="small" 
              id="client_name" 
              label="Nombre del cliente" 
              variant="outlined" 
              className={classes.inputClientNameInAdvancedSearch}
            />
            <TextField
              inputRef={procedureInputRef}
              onChange={onChangeProcedureName}
              size="small"
              id="procedure"
              label="Tramite"
              variant="outlined"
              className={classes.inputInAdvancedSearch}
            />
            <TextField
              inputRef={serialNumberInputRef}
              onChange={onChangeSerialNumber}
              size="small"
              id="serial_number"
              label="Numero de serie"
              variant="outlined"
              className={classes.inputInAdvancedSearch}
            />
          <TextField
            inputRef={moreThanInputRef}
            onChange={onChangeMoreThan}
            size="small"
            id="more_than"
            label="Monto mayor a:"
            variant="outlined"
            className={classes.inputInAdvancedSearch}
          />
            {/* <CurrencyTextField
            inputRef={moreThanInputRef}
              label="Monto mayor a:"
              variant="outlined"
              size="small"
              id="more_than"
              decimalCharacter="."
              digitGroupSeparator=","
              outputFormat="string"
              // currencySymbol={false}
              CurrencyTextField="string"
              onChange={onChangeMoreThan}
            /> */}
          <TextField
            inputRef={lessThanInputRef}
            onChange={onChangeLessThan}
            size="small"
            id="less_than"
            label="Monto menor a:"
            variant="outlined"
            className={classes.inputInAdvancedSearch}
            // InputProps={{
            //   inputComponent: NumberFormatCustom,
            //   inputRef: lessThanInputRef
            // }}

          />
            {/* <CurrencyTextField
            inputRef={lessThanInputRef}
              label="Monto menor a:"
              variant="outlined"
              size="small"
              id="less_than"
              decimalCharacter="."
              digitGroupSeparator=","
              outputFormat="string"
              // currencySymbol={false}
              onChange={onChangeLessThan}
            /> */}
          </Grid>
          <Grid container item xs={2} alignItems="center" justify="center">
            <Button variant="outlined" onClick={startAdvanceSearch}>Buscar</Button>
          </Grid>
        </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(AdvancedSearchBudget);
