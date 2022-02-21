import React from 'react';
import Grid                         from '@material-ui/core/Grid';
import TextField                    from '@material-ui/core/TextField';
import Typography                   from '@material-ui/core/Typography';
import Divider                      from '@material-ui/core/Divider';
import Button                       from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const formatDate = (dateObject) => {
  let date = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  let year = dateObject.getFullYear();

  date = date < 10 ? `0${date}` : `${date}`
  month = month < 10 ? `0${month}` : `${month}`

  return (
    `${year}-${month}-${date}`
  )
}

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
    changeSwitchDebt
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