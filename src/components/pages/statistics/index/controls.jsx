import React from 'react';
import Grid                         from '@material-ui/core/Grid';
import TextField                    from '@material-ui/core/TextField';
import Button                       from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import TemplateControls from './template_controls';
import StatusSelect from './status_select';

export default (props) => {
  const {
    initDate,
    endDate,
    changeInitDate,
    changeEndDate,
    triggerFiltering,
    switchIncome,
    switchTotal,
    switchPaid,
    switchDebt,
    changeSwitchIncome,
    changeSwitchTotal,
    changeSwitchPaid,
    changeSwitchDebt,
    templateId,
    templateTabsIds,
    changeTemplateId,
    changeTemplateTabsIds,
    graphStatus,
    changeGraphStatus
  } = props

  return(
    <>
      <Grid item container direction='column'>
        <Grid item xs style={{ paddingTop: '30px' }}>
          <TextField type='date' fullWidth label="Fecha Inicial" value={initDate} onChange={changeInitDate}/>
        </Grid>
        <Grid item xs style={{ paddingTop: '30px' }}>
          <TextField type='date' fullWidth label="Fecha Final" value={endDate} onChange={changeEndDate}/>
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
                label="Ingreso"
              />
              <FormControlLabel
                control={<Checkbox checked={switchTotal} onChange={changeSwitchTotal} name="total" />}
                label="Total a pagar"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={switchPaid} onChange={changeSwitchPaid} name="pagado" />}
                label="Egreso"
              />
              <FormControlLabel
                control={<Checkbox checked={switchDebt} onChange={changeSwitchDebt} name="debt" />}
                label="Saldo"
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