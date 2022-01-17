import React from 'react';
import { Divider } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const ConfirmDialog = (props) => {
  const { createNewProcedure, closeSaveConfirm, redirect } = props
  return(
    <>
      <DialogTitle>
        <Typography>
          Confirmar Nuevo Tramite
        </Typography>
      </DialogTitle>
      <Divider/>
      <DialogContent>
        <DialogContentText>
          Se esta creando un nuevo tramite. Verifique que los datos sean correctos. Presione en ACEPTAR si esta conforme.
        </DialogContentText>
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
