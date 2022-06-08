import React                          from 'react';
import Grid                           from '@material-ui/core/Grid';
import TextField                      from '@material-ui/core/TextField';

const ClientGeneralForm = (props) => {
  const { clientInfo, setFormValue, errors } = props;

  return (
    <>
      <Grid container item direction='row' alignItems='flex-start'>
        <Grid item xs={6} style={{paddingRight:'10px'}}>
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
        <Grid item xs={6} style={{paddingLeft:'10px'}}>
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
        <Grid item xs={6} style={{paddingRight:'10px', paddingTop:'20px'}}>
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
        <Grid item xs={6} style={{paddingLeft:'10px', paddingTop:'20px'}}>
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
        <Grid item xs={8} style={{paddingRight:'10px', paddingTop:'20px'}}>
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
        <Grid item xs={4} style={{paddingLeft:'10px', paddingTop:'20px'}}>
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
        <Grid item xs={12} style={{ paddingTop:'20px'}}>
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
        <Grid item xs={4} style={{paddingRight:'10px', paddingTop:'20px'}}>
          <TextField
            id='client-country-code'
            name='countryCode'
            label="Pais"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.countryCode == null ? "" : clientInfo.countryCode}
            onChange={setFormValue}
            error={!!errors.countryCode}
            helperText={errors.countryCode}
          />
        </Grid>
        <Grid item xs={4} style={{paddingLeft:'10px', paddingRight:'10px', paddingTop:'20px'}}>
          <TextField
            id='client-state'
            name='state'
            label="Estado"
            type='text'
            variant="outlined"
            size="small"
            fullWidth
            value={clientInfo.state == null ? "" : clientInfo.state}
            onChange={setFormValue}
            error={!!errors.state}
            helperText={errors.state}
          />
        </Grid>
        <Grid item xs={4} style={{paddingLeft:'10px', paddingTop:'20px'}}>
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

export default ClientGeneralForm;
