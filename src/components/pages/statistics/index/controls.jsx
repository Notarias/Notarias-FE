import React                        from 'react';
import Grid                         from '@material-ui/core/Grid';
import TextField                    from '@material-ui/core/TextField';
import Button                       from '@material-ui/core/Button';
import FormGroup                    from '@material-ui/core/FormGroup';
import FormControlLabel             from '@material-ui/core/FormControlLabel';
import Checkbox                     from '@material-ui/core/Checkbox';
import TemplateControls             from './template_controls';
import StatusSelect                 from './status_select';
import SelectUsers                  from './select_users';
import ClientSearch                 from './client_search';

const Controls = (props) => {
  const {
    date,
    changeDate,
    triggerFiltering,
    switchIncome,
    switchTotal,
    switchPaid,
    switchDebt,
    switchPayable,
    changeSwitchIncome,
    changeSwitchTotal,
    changeSwitchPaid,
    changeSwitchDebt,
    changeSwitchPayable,
    templateId,
    templateTabsIds,
    userInfo,
    setUserInfo,
    clientInfo,
    setClientInfo,
    changeTemplateId,
    changeTemplateTabsIds,
    graphStatus,
    changeGraphStatus
  } = props

  const formatMonthDate = (dateObject) => {
    let date = new Date(dateObject)
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    month = month < 10 ? `0${month}` : `${month}`
  
    return (
      `${year}-${month}`
    )
  }

  return(
    <>
      <Grid item container direction='column'>
        <Grid item xs style={{ paddingTop: '30px' }}>
          <TextField
            fullWidth
            type='month'
            label="Fecha Inicial"
            value={formatMonthDate(date)}
            onChange={changeDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs style={{ paddingTop: '30px' }}>
          <SelectUsers userInfo={userInfo} setUserInfo={setUserInfo} clientInfo={clientInfo}/>
        </Grid>
        <Grid item xs style={{ paddingTop: '30px' }}>
          <ClientSearch clientInfo={clientInfo} setClientInfo={setClientInfo} userInfo={userInfo}/>
        </Grid>
        <Grid item xs style={{ paddingTop: '30px' }}>
          <StatusSelect graphStatus={graphStatus} changeGraphStatus={changeGraphStatus}/>
        </Grid>
        <Grid item xs style={{ paddingTop: '30px' }}>
          <TemplateControls 
            templateId={templateId}
            templateTabsIds={templateTabsIds}
            changeTemplateId={changeTemplateId}
            changeTemplateTabsIds={changeTemplateTabsIds}/>
        </Grid> 
        <Grid container item xs style={{ paddingTop: '30px' }}>
          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={switchIncome} onChange={changeSwitchIncome} name="income" />}
                label="Ingresos"
              />
              <FormControlLabel
                control={<Checkbox checked={switchTotal} onChange={changeSwitchTotal} name="total" />}
                label="Total a pagar"
              />
              <FormControlLabel
                control={<Checkbox checked={switchPayable} onChange={changeSwitchPayable} name="payable" />}
                label="Por saldar"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={switchPaid} onChange={changeSwitchPaid} name="paid" />}
                label="Egresos"
              />
              <FormControlLabel
                control={<Checkbox checked={switchDebt} onChange={changeSwitchDebt} name="debt" />}
                label="Por Pagar"
              />
            </FormGroup>
          </Grid>
          <Grid container item xs style={{ paddingTop: '30px' }} justifyContent="flex-end">
            <Grid item>
              <Button variant='contained'  color="primary" onClick={triggerFiltering}>Filtrar</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Controls;
