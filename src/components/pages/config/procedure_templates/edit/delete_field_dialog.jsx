import React                    from 'react';
import Button                   from '@material-ui/core/Button';
import Dialog                   from '@material-ui/core/Dialog';
import DialogActions            from '@material-ui/core/DialogActions';
import DialogContent            from '@material-ui/core/DialogContent';
import DialogTitle              from '@material-ui/core/DialogTitle';
import Typography               from '@material-ui/core/Typography';
import { withStyles }           from '@material-ui/core/styles';
import { styles }               from '../styles';

const DeleteFieldDialog = (props) => {

  const { classes, deleteDialog, closeDeleteDialog, deleteFieldClick, fieldName } = props

  return(
    <Dialog open={deleteDialog} onClose={closeDeleteDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Eliminar campo"}</DialogTitle>
      <DialogContent>
        Se eliminara de manera permantente el campo: 
        <Typography variant="subtitle2" className={ classes.texPlainTittleName }>
          {fieldName}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={ closeDeleteDialog } color="secondary">
          Cancelar
        </Button>
        <Button color="primary" autoFocus onClick={ deleteFieldClick }>
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default  withStyles(styles)(DeleteFieldDialog);
