import React, { useState, useEffect }    from 'react';
import Grid                              from '@material-ui/core/Grid';
import TextField                         from '@material-ui/core/TextField';
import MenuItem                          from '@material-ui/core/MenuItem';
import { withStyles }                    from '@material-ui/core/styles';
import { styles }                        from '../styles';

const ClientGeneralForm = (props) => {
  const { classes, clientInfo, setClientInfo, setFormValue, errors } = props;

  const [pristine, setPristine] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const clearCitiesList = () => {
    if (pristine) {
      setClientInfo({ ...clientInfo, countryCode: "", state: "" });
      setStates([]);
    }
  }

  useEffect(() => {
    fetch("https://www.universal-tutorial.com/api/countries/",
    {headers:{
      "Authorization": `Bearer ${window.localStorage.wwToken}`,
      "Accept": "application/json"
    }}
    )
    .then(response => response.json())
    .then(response => setCountries(response));
    setPristine(true);
  }, [pristine]);

  useEffect(() =>{
    if (pristine && clientInfo.countryCode) {
      fetch(`https://www.universal-tutorial.com/api/states/${clientInfo.countryCode}`,
        {headers:{
          "Authorization": `Bearer ${window.localStorage.wwToken}`,
          "Accept": "application/json"
        }}
      )
      .then(response => response.json())
      .then(response => setStates(response))
    }
  }, [clientInfo.countryCode])

  return (
    <>
      <Grid container item direction='row' alignItems='flex-start'>
        <Grid item xs={12} sm={6} className={classes.clientFieldsPaddingRight}>
          <TextField
            id='client-firstName'
            name='firstName'
            label="Nombre"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.firstName == null ? "" : clientInfo.firstName}
            onChange={setFormValue}
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.clientFieldsPaddingLeft}>
          <TextField
            id='client-lastName'
            name='lastName'
            label="Apellido"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.lastName == null ? "" : clientInfo.lastName}
            onChange={setFormValue}
            error={!!errors.last_name}
            helperText={errors.last_name}
          />
        </Grid>
      </Grid>
      <Grid container item direction='row' alignItems='flex-start'>
        <Grid item xs={12} sm={6} className={classes.clientFieldsPaddingRightTop}>
          <TextField
            id='client-email'
            name='email'
            label="Correo"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.email == null ? "" : clientInfo.email}
            onChange={setFormValue}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.clientFieldsPaddingLeftTop}>
          <TextField
            id='client-phone'
            name='phone'
            label="Telefono"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.phone == null ? "" : clientInfo.phone}
            onChange={setFormValue}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
      </Grid>
      <Grid container item direction='row' alignItems='flex-start'>
        <Grid item xs={12} sm={8} className={classes.clientFieldsPaddingRightTop}>
          <TextField
            id='client-curp'
            name='curp'
            label="CURP"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.curp == null ? "" : clientInfo.curp.toUpperCase()}
            onChange={setFormValue}
            error={!!errors.curp}
            helperText={errors.curp}
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingLeftTop}>
          <TextField
            id='client-zip-code'
            name='zipCode'
            label="Codigo Postal"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.zipCode == null ? "" : clientInfo.zipCode}
            onChange={setFormValue}
            error={!!errors.zipCode}
            helperText={errors.zipCode}
          />
        </Grid>
      </Grid>
      <Grid container item direction='row' alignItems='flex-start'>
        <Grid item xs={12} className={classes.clientFieldsPaddingTop}>
          <TextField
            id='client-address'
            name='address'
            label="Direccion"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            multiline
            value={clientInfo.address == null ? "" : clientInfo.address}
            onChange={setFormValue}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>
      </Grid>
      <Grid container item direction='row' alignItems='flex-start'>
        <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingRightTop}>
          <TextField
            id='client-country-code'
            name='countryCode'
            label="Pais"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            select
            value={clientInfo.countryCode == null ? "" : clientInfo.countryCode}
            onChange={setFormValue}
            error={!!errors.countryCode}
            helperText={errors.countryCode}
            SelectProps={{
              onOpen: clearCitiesList,
            }}
          >
            <MenuItem key={"country-00"} value={""}>
              Seleccione un Pais
            </MenuItem>
            { countries ?
              countries.map(country => (
                <MenuItem key={`country-${country.country_short_name}`} value={country.country_name}>
                  {country.country_name}
                </MenuItem>
              ))
              :
              <></>
            }
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingLeftRightTop}>
          <TextField
            id='client-state'
            name='state'
            label="Estado"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            select
            value={clientInfo.state == null ? "" : clientInfo.state}
            onChange={setFormValue}
            error={!!errors.state}
            helperText={errors.state}
          >
            <MenuItem key={"city-00"} value={""}>
              Seleccione un Estado
            </MenuItem>
            { states ?
              states.map(state => (
                <MenuItem key={`city-${state.state_name}`} value={state.state_name}>
                  {state.state_name}
                </MenuItem>
              ))
              :
              <></>
            }
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingLeftTop}>
          <TextField
            id='client-city'
            name='city'
            label="Ciudad"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.city == null ? "" : clientInfo.city}
            onChange={setFormValue}
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(ClientGeneralForm);
