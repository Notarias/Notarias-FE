import React from 'react';
import { Redirect } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const ConfirmDialog = (props) => {
  const { createNewProcedure, closeSaveConfirm, redirect } = props
  return(
    <>
      <DialogTitle>
        <Grid container direction="row" alignItems="center">
          <Grid item sx={5} justifyContent="flex-start">
            <Typography>
              Confirmar Nuevo Tramite
            </Typography>
          </Grid>
          <Grid item sx={5} justifyContent="flex-end">
            <IconButton aria-label="close" onClick={closeSaveConfirm}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider/>
      <DialogContent>
        <DialogContentText>
          Se esta creando un nuevo tramite.
          Verifique  los  datos en  la  columna  de la  derecha,
          y asigne a un colaborador responsable para el tramite.
          si esta deacuerdo haga clic en confirmar y presione
          el boton guardar.
        </DialogContentText>
        {/* <AddAsigneed
          setAsignee={setAsignee}
          asignee={asignee}
          defaultUser={defaultUser}
        /> */}
      </DialogContent>
      <Divider/>
      <DialogActions>
        <Button
          variant="contained"
          onClick={closeSaveConfirm}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={createNewProcedure}
        >
          { redirect }
          Aceptar
        </Button>
      </DialogActions>
    </>
  )

} 

export default ConfirmDialog
