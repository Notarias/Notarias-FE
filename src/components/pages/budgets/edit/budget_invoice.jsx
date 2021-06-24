import React, {useState}                    from 'react';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import Grid                                 from '@material-ui/core/Grid';
import Paper                                from '@material-ui/core/Paper';
import Typography                           from '@material-ui/core/Typography';
import logo_notaria                         from '../../../../images/logo_notaria.JPG'
import TextField                            from '@material-ui/core/TextField';
import Button                               from '@material-ui/core/Button';



const BudgetInvoice = (props) => {
  const { classes } = props
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <Paper>
      <Grid container>
          <Grid container item justify="center" alignItems="center">
            <img className={classes.logoInInvoice} src={logo_notaria} alt="Logo"/>
          </Grid>
          <Grid container item direction="row" className={classes.marginTopGridInvoice}>
            <Grid container item xs={1} direction="column" justify="flex-end" alignItems="flex-end">

            </Grid>
            <Grid container item xs={1} direction="column" justify="flex-start" alignItems="flex-start">
              <Typography>Causante:</Typography>
              <Typography>Interesado:</Typography>
              <Typography>Operación:</Typography>
              <Typography>Abogado:</Typography>
            </Grid>
            <Grid container item xs={6} direction="column" justify="flex-start" alignItems="flex-start">
              <Typography variant="button">Alguien apellio apellido</Typography>
              <Typography variant="button">Alguien apellio apellido</Typography>
              <Typography variant="button">Alguien apellio apellido</Typography>
              <Typography variant="button">Alguien apellio apellido</Typography>
            </Grid>
            <Grid container item xs={1} direction="column" justify="flex-start" alignItems="flex-start">
              <Typography>Presupuesto:</Typography>
              <Typography>Fecha:</Typography>
              <Typography>Expediente:</Typography>
              <Typography>Escritura:</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justify="flex-start" alignItems="flex-start">
              <Typography>0000</Typography>
              <Typography>00/00/0000</Typography>
              <Typography>0000</Typography>
              <Typography>0000</Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row">
            <Grid container item xs={1}>

            </Grid>
            <Grid 
              container 
              item 
              xs={7} 
              direction="column" 
              justify="flex-start" 
              alignItems="flex-start" 
              className={classes.marginTopGridInvoice}
            >
              <Typography variant="button">Valor de contraprestación:</Typography>
              <Typography variant="button">Valor de Avalúo:</Typography>
              <Typography variant="button">Valor de terreno:</Typography>
              <Typography variant="button">Valor de las construcciones:</Typography>
              <Typography variant="button">Base para crédito:</Typography>
            </Grid>
            <Grid 
              container 
              item 
              xs={4}
              direction="column" 
              justify="flex-start" 
              alignItems="flex-start"
              className={classes.marginTopGridInvoice}
            >
              <Typography >$ 0.00</Typography>
              <Typography >$ 0.00</Typography>
              <Typography >$ 0.00</Typography>
              <Typography >$ 0.00</Typography>
              <Typography >$ 0.00</Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row">
            <Grid container item xs={1}>

            </Grid>
            <Grid
              container 
              item 
              xs={1} 
              direction="column" 
              justify="flex-start" 
              alignItems="flex-start" 
            >
              <Typography variant="button">Imueble:</Typography>
            </Grid>
            <Grid
              container 
              item 
              xs={5} 
              direction="column" 
              justify="flex-start" 
              alignItems="flex-start"
            >
              <a href="#" onClick={handleClickOpen}>
                <Typography>
                  Agregar a ficha. En este espacio se pondría la descripción del inmueble 
                    (Ej. Departamento 205 condominio Las Flores, Tulum, Q. Roo)
                </Typography>
              </a>
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
                  <Button>
                    Cancelar
                  </Button>
                  <Button>
                    Aceptar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Grid container item direction="row" className={classes.marginTopGridInvoice}>
            <Grid container item xs={1}></Grid>
            <Grid
              container 
              item 
              xs={7} 
              direction="column" 
              justify="flex-start" 
              alignItems="flex-start"
            >
              <h3>CONCEPTO:</h3>
            </Grid>
            <Grid
              container 
              item 
              xs={4} 
              direction="column" 
              justify="flex-start" 
              alignItems="flex-start"
            >
              <h3>CANTIDAD:</h3>
            </Grid>
          </Grid>
      </Grid>
    </Paper>
  )

}

export default withStyles(styles)(BudgetInvoice);