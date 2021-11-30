import React, { useState }                    from 'react'
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
    setSerialNumberValue,
    setBudgetTemplateNameValue,
    setProcedureTemplateNameValue,
    setCreatedAtValue,
    clientNameInputRef,
    serialNumberInputRef,
    budgetTempalteInputRef,
    procedureTemplateInputRef,
    createdAtInputRef
  } = props
 
  const [changeClientName, setChangeClientName] = useState(null)
  const [changeSerialNumber, setChangeSerialNumber] = useState(null)
  const [changeBudgetTemplateName, setChangeBudgetTemplateName] = useState(null)
  const [changeProcedureTemplateName, setChangeProcedureTemplateName]  = useState(null)
  const [changeCreatedAt, setChangeCreatedAt] = useState(null)
  

  const onChangeClientName = (event) => {
    setChangeClientName(event.target.value)
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
    setSerialNumberValue(changeSerialNumber > 0 ? changeSerialNumber : null)
    setBudgetTemplateNameValue(changeBudgetTemplateName)
    setProcedureTemplateNameValue(changeProcedureTemplateName)
    setCreatedAtValue(changeCreatedAt)
  }

  return(
    <Grid container justifyContent="flex-end" 
      className={changeAdvanceSearch ? classes.gridInputAdvancedSearchHide : classes.gridInputAdvancedSearch}>
      <Paper className={classes.paperAdvancedSearch}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={8}>
            <TextField
              inputRef={clientNameInputRef}
              onChange={onChangeClientName}
              size="small" 
              id="client_name" 
              label="Nombre del cliente" 
              variant="outlined" 
              fullWidth
              className={classes.advancedSearchImputs}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              inputRef={serialNumberInputRef}
              onChange={onChangeSerialNumber}
              size="small"
              id="serial_number"
              label="No. serie"
              variant="outlined"
              fullWidth
              className={classes.advancedSearchImputs}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              inputRef={budgetTempalteInputRef}
              onChange={onChangeBudgetTemplateName}
              size="small"
              id="budget_templrate_name"
              label="Presupuesto"
              variant="outlined"
              fullWidth
              className={classes.advancedSearchImputs}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              inputRef={procedureTemplateInputRef}
              onChange={onChangeProcedureTemplateName}
              size="small"
              id="procedure_template_name"
              label="Tramite"
              variant="outlined"
              fullWidth
              className={classes.advancedSearchImputs}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              inputRef={createdAtInputRef}
              onChange={onChangeCreatedAtName}
              size="small"
              id="created_at"
              label="Fecha Iicial"
              variant="outlined"
              fullWidth
              className={classes.advancedSearchImputs}
            />
          </Grid>
          <Grid item xs={4} >
            <Button variant="outlined" className={classes.advancedSearchImputs} onClick={startAdvanceSearch}>Buscar</Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(AdvancedSearchProcedure);
