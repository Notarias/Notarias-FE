import React                                from 'react'
import Grid                                 from '@material-ui/core/Grid';
import TextField                            from '@material-ui/core/TextField';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';
import Paper                                from '@material-ui/core/Paper';
import Button                               from '@material-ui/core/Button';

const AdvancedSearchBudget = (props) => {
  const {
    setClientNameValue,
    setSerialNumberValue,
    setMoreThanValue,
    setLessThanValue,
    clientNameInputRef,
    serialNumberInputRef,
    moreThanInputRef,
    lessThanInputRef,
    setSetTimeout,
    timeout,
    setRunAdvancedSearch,
  } = props

  const onChangeClientName = (event) => {
    setClientNameValue(event.target.value)
  }

  const onChangeSerialNumber = (event) => {
    const onlyString = event.target.value.toString()
    const onlyNums = onlyString.replace(/[^0-9]/g, '');
    event.target.value = onlyNums

    timeout && clearTimeout(timeout)
    let value = event.target.value

    setSetTimeout(setTimeout(() => {
      setSerialNumberValue(Number(value))
      setRunAdvancedSearch(true)
    }, 2000))
  }

  const onChangeMoreThan = (event) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = onlyNums
    
    timeout && clearTimeout(timeout)
    let value = event.target.value

    setSetTimeout(setTimeout(() => {
      setMoreThanValue(Number(value) * 100)
      setRunAdvancedSearch(true)
    }, 2000))
  }

  const onChangeLessThan = (event) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = onlyNums

    timeout && clearTimeout(timeout)
    let value = event.target.value

    setSetTimeout(setTimeout(() => {
      setLessThanValue(Number(value) * 100)
      setRunAdvancedSearch(true)
    }, 2000))
  }

  const startAdvanceSearch = () => {
    setRunAdvancedSearch(true)
  }

  
  return(
    <Grid container justifyContent="flex-end">
      <Grid container item xs={6} direction="row" justifyContent="flex-end" style={{marginTop: "20px"}}>
        <Paper style={{ padding: "20px" }}>
          <Grid item xs={12}>
            <TextField
              inputRef={clientNameInputRef}
              onChange={onChangeClientName}
              id="client_name"
              label="Nombre del cliente"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid container item xs={12} style={{ paddingTop: '15px' }}>
            <Grid item xs={4} style={{ paddingRight: '15px' }}>
              <TextField
                inputRef={serialNumberInputRef}
                onChange={onChangeSerialNumber}
                id="serial_number"
                label="No. serie"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={4} style={{ paddingRight: '15px' }}>
              <TextField
                inputRef={moreThanInputRef}
                onChange={onChangeMoreThan}
                id="more_than"
                label="Total mayor a:"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                inputRef={lessThanInputRef}
                onChange={onChangeLessThan}
                id="less_than"
                label="Total menor a:"
                variant="outlined"
                size="small"
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

export default withStyles(styles)(AdvancedSearchBudget);
