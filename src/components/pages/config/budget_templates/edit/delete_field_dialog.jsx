import React                                         from 'react';
import Button                                        from '@material-ui/core/Button';
import Dialog                                        from '@material-ui/core/Dialog';
import DialogActions                                 from '@material-ui/core/DialogActions';
import DialogContent                                 from '@material-ui/core/DialogContent';
import DialogTitle                                   from '@material-ui/core/DialogTitle';
import Typography                                    from '@material-ui/core/Typography';

const DeleteFieldDialog = (props) => {

  const { fieldName, deleteDialog, openDeleteDialog, deleteFieldClick } = props

  return (
    <Dialog
      open={deleteDialog}
      onClose={openDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">Eliminar campo</DialogTitle>
      <DialogContent>
        Se eliminara de manera permantente el campo: 
        <Typography variant="subtitle2">
          { fieldName }
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={ openDeleteDialog } color="secondary">
          Cancelar
        </Button>
        <Button color="primary" autoFocus onClick={ deleteFieldClick }>
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteFieldDialog;
