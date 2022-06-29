import React, { useState }    from 'react';
import Grid                   from '@material-ui/core/Grid';
import TextField              from '@material-ui/core/TextField';
import SelectCountry          from './select_country'
import SelectState            from './select_state';
import MenuItem               from '@material-ui/core/MenuItem';
import { withStyles }         from '@material-ui/core/styles';
import { styles }             from '../styles';

const ClientLegalForm = (props) => {
  const { classes, clientInfo, setClientInfo, setFormValue, errors } = props;

  const [initLegalCountryCode, setInitLegalCountryCode] = useState();
  const [initLegalState, setInitLegalState] = useState();

  const clearCitiesList = () => {
    if (clientInfo.countryCode) {
      setInitLegalCountryCode(clientInfo.legalCountryCode);
      setInitLegalState(clientInfo.legalState)
      setClientInfo({ ...clientInfo, legalCountryCode: "", legalState: "" });
    }
  }

  const returnCountryValue = () => {
    setClientInfo({ ...clientInfo, legalCountryCode: initLegalCountryCode, legalState: initLegalState });
  }

  return (
    <>
      <Grid item xs={12} className={classes.clientFieldsPaddingXS}>
        <TextField
          id='client-business'
          name='business'
          label="Rason Social"
          type='text'
          variant="outlined"
          size="small"
          fullWidth
          value={clientInfo.business == null ? "" : clientInfo.business}
          onChange={setFormValue}
          error={!!errors.business}
          helperText={errors.business}
        />
      </Grid>
      <Grid container item direction='row' alignItems='flex-start'>
        <Grid item xs={12} sm={8} className={classes.clientFieldsPaddingRightTop}>
          <TextField
            id='client-rfc'
            name='rfc'
            label="RFC"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.rfc == null ? "" : clientInfo.rfc.toUpperCase()}
            onChange={setFormValue}
            error={!!errors.rfc}
            helperText={errors.rfc}
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingLeftTop}>
          <TextField
            id='client-moral'
            name='moral'
            label="Tipo de Persona"
            variant="outlined"
            size="small"
            fullWidth
            select
            value={clientInfo.moral == null ? "" : clientInfo.moral}
            onChange={setFormValue}
            error={!!errors.moral}
            helperText={errors.moral}
          >
            <MenuItem key={'moral-false'} value={false}>
              Fisica
            </MenuItem>
            <MenuItem key={'moral-true'} value={true}>
              Moral
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container item direction='row' alignItems='flex-start'>
        <Grid item xs={12} sm={8} className={classes.clientFieldsPaddingRightTop}>
          <TextField
            id='client-legal-phone'
            name='legalPhone'
            label="Telefono"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            multiline
            value={clientInfo.legalPhone == null ? "" : clientInfo.legalPhone}
            onChange={setFormValue}
            error={!!errors.legal_phone}
            helperText={errors.legal_phone}
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingLeftTop}>
          <TextField
            id='client-legal-zip-code'
            name='legalZipCode'
            label="Codigo Postal"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.legalZipCode == null ? "" : clientInfo.legalZipCode}
            onChange={setFormValue}
            error={!!errors.legal_zip_code}
            helperText={errors.legal_zip_code}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.clientFieldsPaddingTop}>
        <TextField
          id='client-legal-address'
          name='legalAddress'
          label="Direccion Fiscal"
          type='text'
          variant="outlined"
          size="small"
          fullWidth
          multiline
          value={clientInfo.legalAddress == null ? "" : clientInfo.legalAddress}
          onChange={setFormValue}
          error={!!errors.legal_address}
          helperText={errors.legal_address}
        />
      </Grid>
      <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingRightTop}>
        <SelectCountry 
          clearCitiesList={clearCitiesList}
          returnCountryValue={returnCountryValue}
          countryCode={clientInfo.legalCountryCode}
          fieldName={"legalCountryCode"}
          setFormValue={setFormValue}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingLeftRightTop}>
        <SelectState
          selectedCountry={clientInfo.legalCountryCode}
          selectedState={clientInfo.legalState}
          fieldName={"legalState"}
          setFormValue={setFormValue}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingLeftTop}>
        <TextField
          id='client-legal-city'
          name='legalCity'
          label="Ciudad"
          type='text'
          variant="outlined"
          size="small"
          fullWidth
          value={clientInfo.legalCity == null ? "" : clientInfo.legalCity}
          onChange={setFormValue}
          error={!!errors.legal_city}
          helperText={errors.legal_city}
        />
      </Grid>
    </>
  )
}

export default withStyles(styles)(ClientLegalForm);
