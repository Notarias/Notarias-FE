import React, {useState}                    from 'react'
import Grid                                 from '@material-ui/core/Grid';
import TextField                            from '@material-ui/core/TextField';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';
import Paper                                from '@material-ui/core/Paper';
import Button                               from '@material-ui/core/Button';

const AdvancedSearchProcedure = (props) => {
  const { 
    classes,
    changeAdvanceSearch,
    setClientNameValue,
    setCausantNameValue,
    setSerialNumberValue,
    setBudgetTemplateNameValue,
    setProcedureTemplateNameValue,
    setCreatedAtValue,
    clientNameInputRef,
    causantNameInputRef,
    serialNumberInputRef,
    budgetTempalteInputRef,
    procedureTemplateInputRef,
    createdAtInputRef
  } = props
 
  const [changeClientName, setChangeClientName] = React.useState(null)
  const [changeCausantName, setChangeCausantName] = React.useState(null)
  const [changeSerialNumber, setChangeSerialNumber] = React.useState(null)
  const [changeBudgetTemplateName, setChangeBudgetTemplateName] = React.useState(null)
  const [changeProcedureTemplateName, setChangeProcedureTemplateName]  = React.useState(null)
  const [changeCreatedAt, setChangeCreatedAt] = React.useState(null)
  

  const onChangeClientName = (event) => {
    setChangeClientName(event.target.value)
  }

  const onChangeCausantName = (event) => {
    setChangeCausantName(event.target.value)
  }

  const onChangeSerialNumber = (event) => {
    const onlyString = event.target.value.toString()
    const onlyNums = onlyString.replace(/[^0-9]/g, '');
    event.target.value = onlyNums
    setChangeSerialNumber(Number(event.target.value))
  }

  const onChangeBudgetTemplateName = (event) => {
    setChangeBudgetTemplateName(event.target.value)
  }

  const onChangeProcedureTemplateName = (event) => {
    setChangeProcedureTemplateName(event.target.value)
  }

  const onChangeCreatedAtName = (event) => {
    setChangeCreatedAt(event.target.value)
  }

  const startAdvanceSearch = () => {
    setClientNameValue(changeClientName)
    setCausantNameValue(changeCausantName)
    setSerialNumberValue(changeSerialNumber)
    setBudgetTemplateNameValue(changeBudgetTemplateName)
    setProcedureTemplateNameValue(changeProcedureTemplateName)
    setSerialNumberValue(changeSerialNumber > 0 ? changeSerialNumber : null)
    setCreatedAtValue(changeCreatedAt)
  }

  return(
    <Grid container justifyContent="flex-end" 
      className={changeAdvanceSearch ? classes.GridInputAdvancedSearchHide : classes.GridInputAdvancedSearch}>
      <Grid container item xs={10} direction="row" justifyContent="flex-end">
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
              <TextField
                inputRef={causantNameInputRef}
                onChange={onChangeCausantName}
                size="small" 
                id="causant_name" 
                label="Nombre del Causante" 
                variant="outlined" 
                className={classes.inputClientNameInAdvancedSearch}
              />
            </Grid>
            <Grid item xs={10}>
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
                inputRef={budgetTempalteInputRef}
                onChange={onChangeBudgetTemplateName}
                size="small"
                id="budget_templrate_name"
                label="Presupuesto"
                variant="outlined"
                className={classes.serialInAdvancedSearch}
              />
              <TextField
                inputRef={procedureTemplateInputRef}
                onChange={onChangeProcedureTemplateName}
                size="small"
                id="procedure_template_name"
                label="Tramite"
                variant="outlined"
                className={classes.serialInAdvancedSearch}
              />
              <TextField
                inputRef={createdAtInputRef}
                onChange={onChangeCreatedAtName}
                size="small"
                id="created_at"
                label="Fecha Iicial:"
                variant="outlined"
                className={classes.serialInAdvancedSearch}
              />
            </Grid>
          </Grid>
          <Grid container item xs={10} alignItems="center" justifyContent="center">
            <Button variant="outlined" onClick={startAdvanceSearch}>Buscar</Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(AdvancedSearchProcedure);
