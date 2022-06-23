import React                                    from 'react';
import Grid                                     from '@material-ui/core/Grid';
import Button                                   from '@material-ui/core/Button';
import FormGroup                                from '@material-ui/core/FormGroup';
import FormControlLabel                         from '@material-ui/core/FormControlLabel';
import Checkbox                                 from '@material-ui/core/Checkbox';
import TemplateControls                         from './template_controls';
import StatusSelect                             from './status_select';
import SelectUsers                              from './select_users';
import ClientSearch                             from './client_search';
import DateFnsUtils                             from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker }  from "@material-ui/pickers";
import "date-fns";

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

  return(
    <>
      <Grid container item direction='column' alignItems='stretch'>
        <Grid container item xs direction='row' justifyContent='center' style={{ paddingTop: '30px' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              fullWidth
              variant="inline"
              openTo="year"
              views={["year", "month"]}
              label="Mes y Año"
              helperText="Empieza por seleccionar el año"
              value={date}
              onChange={changeDate}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs style={{ paddingTop: '35px' }}>
          <SelectUsers userInfo={userInfo} setUserInfo={setUserInfo} clientInfo={clientInfo}/>
        </Grid>
        <Grid item xs style={{ paddingTop: '35px' }}>
          <ClientSearch clientInfo={clientInfo} setClientInfo={setClientInfo} userInfo={userInfo}/>
        </Grid>
        <Grid item xs style={{ paddingTop: '35px' }}>
          <StatusSelect graphStatus={graphStatus} changeGraphStatus={changeGraphStatus}/>
        </Grid>
        <Grid item xs style={{ paddingTop: '35px' }}>
          <TemplateControls 
            templateId={templateId}
            templateTabsIds={templateTabsIds}
            changeTemplateId={changeTemplateId}
            changeTemplateTabsIds={changeTemplateTabsIds}/>
        </Grid> 
        <Grid container item xs style={{ paddingTop: '45px' }}>
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
          <Grid container item xs style={{ minHeight:'100%', paddingTop: '25px' }} justifyContent="flex-end" alignItems='flex-end'>
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
