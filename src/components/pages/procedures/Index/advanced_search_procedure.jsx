import React, { useState }                  from 'react'
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
    <Grid container justifyContent="flex-end" className={changeAdvanceSearch ? classes.gridInputAdvancedSearchHide : classes.gridInputAdvancedSearch}>
      <Grid container item xs={6} direction="row" justifyContent="flex-end">
        <Paper style={{padding: "20px"}}>
          <Grid container item xs={12} direction="row">
            <Grid item xs={8} style={{paddingRight: "15px"}}>
              <TextField
                inputRef={clientNameInputRef}
                onChange={onChangeClientName}
                size="small" 
                id="client_name" 
                label="Nombre del cliente" 
                variant="outlined" 
                fullWidth
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
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} direction="row" style={{ paddingTop: '15px' }}>
            <Grid item xs={4} style={{paddingRight: "15px"}}>
              <TextField
                inputRef={budgetTempalteInputRef}
                onChange={onChangeBudgetTemplateName}
                size="small"
                id="budget_templrate_name"
                label="Presupuesto"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4} style={{paddingRight: "15px"}}>
              <TextField
                inputRef={procedureTemplateInputRef}
                onChange={onChangeProcedureTemplateName}
                size="small"
                id="procedure_template_name"
                label="Trámite"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                inputRef={createdAtInputRef}
                onChange={onChangeCreatedAtName}
                size="small"
                id="created_at"
                label="Fecha Inicial"
                variant="outlined"
                fullWidth
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

export default withStyles(styles)(AdvancedSearchProcedure);
