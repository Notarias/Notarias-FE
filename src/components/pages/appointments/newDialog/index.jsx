import React, { useState } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import { styles }                   from './../styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'react-calendar/dist/Calendar.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PlaceIcon from '@material-ui/icons/Place';
import DialogActions from '@material-ui/core/DialogActions';

const NewDialog = (props) => {

  const { classes, openNewDialog, handleCloseNewDialog } = props

  return(
    <Grid>
      <Dialog open={openNewDialog} aria-labelledby="simple-dialog-title" >
        <Paper className={classes.widthDialog}>
            <DialogTitle id="alert-dialog-title">
              <Grid container>
                  <Grid item xs={6} >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.centerText}>
                      Abogado 1
                    </Typography>
                  </Grid>
              </Grid>
            </DialogTitle>
          <Grid container className={classes.marginTopStartAndEnd}>
            <Grid item xs={2} className={classes.centerText}>
              <Typography>
                Inicio
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="date"
                label="Fecha"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
              id="time"
              label="Horario"
              type="time"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.marginTopStartAndEnd}>
            <Grid item xs={2} className={classes.centerText}>
              <Typography>
                Fin
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="date"
                label="Fecha"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
              id="time"
              label="Horario"
              type="time"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            </Grid>
          </Grid>
          <Grid container className={classes.marginTopStartAndEnd}>
            <Grid item xs={10}>
              <TextField
                label="Lugar"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={2} container justifyContent="center">
              <PlaceIcon/>
            </Grid>
          </Grid>
          <Grid className={classes.marginTopStartAndEnd}>
            <TextField
              id="outlined-multiline-static"
              label="Información adicional"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Paper>
        <DialogActions>
          <Button onClick={handleCloseNewDialog} color="primary">
            Cancelar
          </Button>
          <Button color="primary" autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
export default withStyles(styles)(NewDialog);