import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const renderTextComment = (props) => {
  const { 
    classes, 
    comment, 
    open, 
    changingInputComment, 
    handleClickOpen, 
    handleClose, 
    destroyComment, 
    destroyCommentloading 
  } = props

  return(
    <Grid container item>
      <Grid container item>
        <Typography variant="caption" align="left">
          {comment.body}
        </Typography>
      </Grid>
      <Grid container item>
        <a
          href="#"
          onClick={changingInputComment}
          className={classes.buttonTextComments}
        >
          Editar
        </a>
        <a
          href="#"
          className={classes.buttonTextComments}
          onClick={handleClickOpen}
        >
          Eliminar
        </a>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Se eliminará este comentario
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={destroyComment} disabled={destroyCommentloading}>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}