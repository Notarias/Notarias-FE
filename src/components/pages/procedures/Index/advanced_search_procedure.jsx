import React, {useState}                    from 'react'
import Grid                                 from '@material-ui/core/Grid';
import TextField                            from '@material-ui/core/TextField';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';
import Paper                                from '@material-ui/core/Paper';
import Button                               from '@material-ui/core/Button';

const AdvancedSearchProcedure = (props) => {
  const {
    setClientNameValue,
    setSerialNumberValue,
    setWritingNumberValue,
    setProcedureTemplateName,
    setBudgetTemplateName,
    setInitDateValue,
    setEndDateValue,
    clientNameInputRef,
    serialNumberInputRef,
    writingNumberInputRef,
    procedureTemplateInputRef,
    budgetTempalteInputRef,
    createdAtInputRef,
    setRunAdvancedSearch
  } = props

  const [clientName, setClientName] = useState();
  const [serialNumber, setSerialNumber] = useState();
  const [writingNumber, setWritingNumber] = useState();
  const [procedureTemplate, setProcedureTemplate] = useState();
  const [budgetTemplate, setBudgetTemplate] = useState();
  const [initDate, setInitDate] = useState();
  const [endDate, setEndDate] = useState();

  const onChangeClientName = (event) => {
    setClientName(event.target.value);
  }

  const onChangeSerialNumber = (event) => {
    setSerialNumber(event.target.value);
  }

  const onChangeWritingNumber = (event) => {
    setWritingNumber(event.target.value);
  }

  const onChangeProcedureTemplateName = (event) => {
    setProcedureTemplate(event.target.value);
  }

  const onChangeBudgetTemplateName = (event) => {
    setBudgetTemplate(event.target.value);
  }

  const onChangeInitDate = (event) => {
    setInitDate(event.target.value);
  }

  const onChangeEndDate = (event) => {
    setEndDate(event.target.value);
  }

  const startAdvanceSearch = () => {
    setClientNameValue(clientName);
    setSerialNumberValue(serialNumber);
    setWritingNumberValue(writingNumber);
    setProcedureTemplateName(procedureTemplate);
    setBudgetTemplateName(budgetTemplate);
    setInitDateValue(new Date(`${initDate} 00:00:00`));
    setEndDateValue(new Date(`${endDate} 23:59:59`));
    setRunAdvancedSearch(true);
  }

  return(
    <Grid container justifyContent="flex-end" style={{paddingTop:'23px'}}>
      <Grid container item xs={6} direction="row" justifyContent="flex-end">
        <Paper style={{padding: "20px"}}>
          <Grid container item xs={12} direction="row" justifyContent="flex-end">
            <Grid item xs={6} style={{paddingRight: "15px"}}>
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
            <Grid item xs={3} style={{paddingRight: "15px"}}>
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
            <Grid item xs={3}>
              <TextField
                inputRef={createdAtInputRef}
                onChange={onChangeInitDate}
                size="small"
                id="created_at"
                label="Fecha Inicial"
                variant="outlined"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} direction="row" justifyContent="flex-end" style={{ paddingTop: '15px' }}>
            <Grid item xs={2} style={{paddingRight: "15px"}}>
              <TextField
                inputRef={serialNumberInputRef}
                onChange={onChangeSerialNumber}
                size="small"
                id="serial_number"
                label="No.Serie"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4} style={{paddingRight: "15px"}}>
              <TextField
                inputRef={writingNumberInputRef}
                onChange={onChangeWritingNumber}
                size="small"
                id="writing_number"
                label="No.Escritura"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={3} style={{paddingRight: "15px"}}>
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
            <Grid item xs={3}>
              <TextField
                inputRef={createdAtInputRef}
                onChange={onChangeEndDate}
                size="small"
                id="created_at"
                label="Fecha Final"
                variant="outlined"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
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

export default withStyles(styles)(AdvancedSearchProcedure);
