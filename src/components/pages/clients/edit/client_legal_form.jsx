import React, { useState, useEffect }    from 'react';
import Grid                              from '@material-ui/core/Grid';
import TextField                         from '@material-ui/core/TextField';
import MenuItem                          from '@material-ui/core/MenuItem';
import { withStyles }                    from '@material-ui/core/styles';
import { styles }                        from '../styles';

const ClientLegalForm = (props) => {
  const { classes, clientInfo, setClientInfo, setFormValue, errors } = props;

  const [legalPristine, setLegalPristine] = useState(false);
  const [legalCountries, setLegalCountries] = useState([]);
  const [legalStates, setLegalStates] = useState([]);

  const clearLegalCitiesList = () => {
    if (legalPristine) {
      setClientInfo({ ...clientInfo, legalCountryCode: "", legalState: "" });
      setLegalStates([]);
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
    .then(response => setLegalCountries(response));
    setLegalPristine(true);
  }, [legalPristine]);
  
  useEffect(() =>{
    if (legalPristine && clientInfo.legalCountryCode) {
      fetch(`https://www.universal-tutorial.com/api/states/${clientInfo.legalCountryCode}`,
        {headers:{
          "Authorization": `Bearer ${window.localStorage.wwToken}`,
          "Accept": "application/json"
        }}
      )
      .then(response => response.json())
      .then(response => setLegalStates(response))
    }
  }, [clientInfo.legalCountryCode])

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
        <TextField
          id='client-legal-country-code'
          name='legalCountryCode'
          label="Pais"
          type='text'
          variant="outlined"
          size="small"
          fullWidth
          select
          value={clientInfo.legalCountryCode == null ? "" : clientInfo.legalCountryCode}
          onChange={setFormValue}
          error={!!errors.legal_country_code}
          helperText={errors.legal_country_code}
          SelectProps={{
            onOpen: clearLegalCitiesList,
          }}
        >
          <MenuItem key={"legal-country-00"} value={""}>
            Seleccione un Pais
          </MenuItem>
          { legalCountries ?
            legalCountries.map(legalCountry => (
              <MenuItem key={`legal-country-${legalCountry.country_short_name}`} value={legalCountry.country_name}>
                {legalCountry.country_name}
              </MenuItem>
            ))
            :
            <></>
          }
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4} className={classes.clientFieldsPaddingLeftRightTop}>
        <TextField
          id='client-legal-state'
          name='legalState'
          label="Estado"
          type='text'
          variant="outlined"
          size="small"
          fullWidth
          select
          value={clientInfo.legalState == null ? "" : clientInfo.legalState}
          onChange={setFormValue}
          error={!!errors.legal_state}
          helperText={errors.legal_state}
        >
          <MenuItem key={"legal-city-00"} value={""}>
            Seleccione un Estado
          </MenuItem>
          { legalStates ?
            legalStates.map(legalState => (
              <MenuItem key={`legal-city-${legalState.state_name}`} value={legalState.state_name}>
                {legalState.state_name}
              </MenuItem>
            ))
            :
            <></>
          }
        </TextField>
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
