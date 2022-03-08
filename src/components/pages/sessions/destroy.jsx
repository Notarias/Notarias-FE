import React, { useState }       from 'react';
import ListItem                  from '@material-ui/core/ListItem';
import ListItemText             from '@material-ui/core/ListItemText';
import ListItemIcon              from '@material-ui/core/ListItemIcon';
import ExitToAppIcon             from '@material-ui/icons/ExitToApp';
import Dialog                    from '@material-ui/core/Dialog';
import DialogContent             from '@material-ui/core/DialogContent';
import DialogContentText         from '@material-ui/core/DialogContentText';
import DialogActions             from '@material-ui/core/DialogActions';
import Button                    from '@material-ui/core/Button';

const SessionsDestroy = (props) => {
  const { setLogOut } = props;

  const [dialog, setDialog] = useState(false);

  const openDialog = () => {
    setDialog(!dialog);
  }

  return(
    <>
      <ListItem button onClick={openDialog}>
        <ListItemIcon>
          <ExitToAppIcon color='secondary' />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItem>
      <Dialog open={dialog} onClose={openDialog}>
        <DialogContent>
          <DialogContentText>
            { 'Presione ACEPTAR para cerrar su sesión' }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={openDialog}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={setLogOut}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SessionsDestroy;
