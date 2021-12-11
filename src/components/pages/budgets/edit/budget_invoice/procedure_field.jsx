import React, { useState } from 'react';
import Dialog               from '@material-ui/core/Dialog';
import DialogActions        from '@material-ui/core/DialogActions';
import DialogContent        from '@material-ui/core/DialogContent';
import DialogTitle          from '@material-ui/core/DialogTitle';
import TextField            from '@material-ui/core/TextField';
import Button               from '@material-ui/core/Button';
import Grid                 from '@material-ui/core/Grid';
import Typography           from '@material-ui/core/Typography';
import NumberFormat         from 'react-number-format';

export default (props) => {
  const { field } = props.field

  const [open, setOpen] = useState(false)

  const handleClickOpen = (event) => {

  }

  const handleClose = (event) => {

  }

  return(
    <Grid container item xs={8} direction="row">
      <Grid container item xs={9}>
        <Grid
          item 
          xs={2}
        >
          <Typography style={{ fontWeight: 600 }} align='left'>Inmueble:</Typography>
        </Grid>
        <Grid
          container
          item
          xs={10}
        >
          <Typography align='left'>
            <a href="#" onClick={handleClickOpen}>
              Descripción del inmueble
            </a>
          </Typography>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>
              Datos del inmueble
            </DialogTitle>
            <DialogContent>
              <TextField
                // onChange={handleValuePaymentChange}
                label="Rellenar campo"
                id="margin-normal"
                helperText="Descripción del inmueble"
                margin="normal"
                fullWidth
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>
                Cancelar
              </Button>
              <Button>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  )
}
