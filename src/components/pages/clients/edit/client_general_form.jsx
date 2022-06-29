import React, { useState }    from 'react';
import Grid                   from '@material-ui/core/Grid';
import TextField              from '@material-ui/core/TextField';
import SelectCountry          from './select_country'
import SelectState            from './select_state';
import { withStyles }         from '@material-ui/core/styles';
import { styles }             from '../styles';

const ClientGeneralForm = (props) => {
  const { classes, clientInfo, setClientInfo, setFormValue, errors } = props;

  const [initCountryCode, setInitCountryCode] = useState();
  const [initState, setInitState] = useState();

  const clearCitiesList = () => {
    if (clientInfo.countryCode) {
      setInitCountryCode(clientInfo.countryCode);
      setInitState(clientInfo.state)
      setClientInfo({ ...clientInfo, countryCode: "", state: "" });
    }
  }

  const returnCountryValue = () => {
    setClientInfo({ ...clientInfo, countryCode: initCountryCode, state: initState });
  }

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
          <SelectCountry 
            clearCitiesList={clearCitiesList}
            returnCountryValue={returnCountryValue}
            countryCode={clientInfo.countryCode}
            fieldName={"countryCode"}
            setFormValue={setFormValue}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingLeftRightTop}>
          <SelectState
            selectedCountry={clientInfo.countryCode}
            selectedState={clientInfo.state}
            fieldName={"state"}
            setFormValue={setFormValue}
            errors={errors}
          />
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
