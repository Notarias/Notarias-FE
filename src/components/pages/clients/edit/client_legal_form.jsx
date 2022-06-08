import React                          from 'react';
import Grid                           from '@material-ui/core/Grid';
import TextField                      from '@material-ui/core/TextField';
import MenuItem                       from '@material-ui/core/MenuItem';

const ClientLegalForm = (props) => {
  const { clientInfo, setFormValue, errors } = props;

  return (
    <>
      <Grid item xs={12}>
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
        <Grid item xs={8} style={{paddingRight:'10px', paddingTop:'20px'}}>
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
          />{console.log(errors)}
        </Grid>
        <Grid item xs={4} style={{paddingLeft:'10px', paddingTop:'20px'}}>
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
        <Grid item xs={8} style={{paddingRight:'10px', paddingTop:'20px'}}>
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
        <Grid item xs={4} style={{paddingLeft:'10px', paddingTop:'20px'}}>
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
      <Grid item xs={12} style={{paddingTop:'20px'}}>
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
      <Grid item xs={4} style={{paddingRight:'10px', paddingTop:'20px'}}>
        <TextField
          id='client-legal-country-code'
          name='legalCountryCode'
          label="Pais"
          type='text'
          variant="outlined"
          size="small"
          fullWidth
          value={clientInfo.legalCountryCode == null ? "" : clientInfo.legalCountryCode}
          onChange={setFormValue}
          error={!!errors.legal_country_code}
          helperText={errors.legal_country_code}
        />
      </Grid>
      <Grid item xs={4} style={{paddingLeft:'10px', paddingRight:'10px', paddingTop:'20px'}}>
        <TextField
          id='client-legal-state'
          name='legalState'
          label="Estado"
          type='text'
          variant="outlined"
          size="small"
          fullWidth
          multiline
          value={clientInfo.legalState == null ? "" : clientInfo.legalState}
          onChange={setFormValue}
          error={!!errors.legal_state}
          helperText={errors.legal_state}
        />
      </Grid>
      <Grid item xs={4} style={{paddingLeft:'10px', paddingTop:'20px'}}>
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

export default ClientLegalForm;
