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
    runAdvancedSearch,
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
      <Grid container item xs={6} direction="row" justifyContent="flex-end">
        <Paper style={{ padding: "20px" }}>
          <Grid container>
            <Grid container item xs={10}>
              <Grid item xs={12}>
                <TextField
                  inputRef={clientNameInputRef}
                  onChange={onChangeClientName}
                  id="client_name"
                  label="Nombre del cliente"
                  fullWidth
                />
              </Grid>
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
              <Grid container item xs={12} style={{ paddingTop: '10px' }}>
                <Grid item xs={4} style={{ paddingRight: '10px' }}>
                  <TextField
                    inputRef={serialNumberInputRef}
                    onChange={onChangeSerialNumber}
                    id="serial_number"
                    label="No. serie"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4} style={{ paddingRight: '10px' }}>
                  <TextField
                    inputRef={moreThanInputRef}
                    onChange={onChangeMoreThan}
                    id="more_than"
                    label="Total mayor a:"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    inputRef={lessThanInputRef}
                    onChange={onChangeLessThan}
                    id="less_than"
                    label="Total menor a:"
                    fullWidth
                  />
                </Grid>
              </Grid>
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
