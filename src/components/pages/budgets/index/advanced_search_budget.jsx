import React, {useState}                    from 'react'
import Grid                                 from '@material-ui/core/Grid';
import TextField                            from '@material-ui/core/TextField';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';
import Paper                                from '@material-ui/core/Paper';
import Button                               from '@material-ui/core/Button';

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
    const onlyString = event.target.value.toString()
    const onlyNums = onlyString.replace(/[^0-9]/g, '');
    event.target.value = onlyNums
    setChangeSerialNumber(Number(event.target.value))
  }

  const onChangeMoreThan = (event) => {
    const onlyString = event.target.value.toString()
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = onlyNums
    setChangeMoreThan(Number(event.target.value))
  }

  const onChangeLessThan = (event) => {
    const onlyString = event.target.value.toString()
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = onlyNums
    setChangeLessThan(Number(event.target.value))
  }

  const startAdvanceSearch = () => {
    setClientNameValue(changeClientName)
    // setProcedureNameValue(changeProcedureName)
    setSerialNumberValue(changeSerialNumber > 0 ? changeSerialNumber : null)
    setMoreThanValue(changeMoreThan > 0 ? changeMoreThan * 100 : null)
    setLessThanValue(changeLessThan > 0 ? changeLessThan * 100 : null)
  }


  return(
    <Grid container justifyContent="flex-end" className={changeAdvanceSearch ? 
                                        classes.GridInputAdvancedSearchHide : classes.GridInputAdvancedSearch}
    >
      <Grid container item xs={6} direction="row" justifyContent="flex-end">
        <Paper className={classes.paperAdvancedSearch}>
        <Grid container item justifyContent="flex-start">
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
          {/* </Grid> */}
            {/* <TextField
              inputRef={procedureInputRef}
              onChange={onChangeProcedureName}
              size="small"
              id="budgeting"
              label="Presupuesto"
              variant="outlined"
              className={classes.inputInAdvancedSearch}
            /> */}
            {/* <Grid item xs={10}> */}
            <TextField
              inputRef={serialNumberInputRef}
              onChange={onChangeSerialNumber}
              size="small"
              id="serial_number"
              label="No. serie"
              variant="outlined"
              className={classes.serialInAdvancedSearch}
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
            <TextField
              inputRef={lessThanInputRef}
              onChange={onChangeLessThan}
              size="small"
              id="less_than"
              label="Monto menor a:"
              variant="outlined"
              className={classes.inputInAdvancedSearch}
            />
          </Grid>
          <Grid container item xs={2} alignItems="center" justifyContent="center">
            <Button variant="outlined" onClick={startAdvanceSearch}>Buscar</Button>
          </Grid>
        </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(AdvancedSearchBudget);
