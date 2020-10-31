import React                        from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Button                       from '@material-ui/core/Button';
import Grid                         from '@material-ui/core/Grid';
import Dialog                         from '@material-ui/core/Dialog';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import DialogActions                  from '@material-ui/core/DialogActions';


const ActiveTemplateButton = (props) => {

  const { classes } = props
  const [value, setValue] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const statusChange = () => {
    setValue(!value)
    setOpen(false);
  }

  const renderActivedButton = () => {

    return (
      <Grid item>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          className={ classes.buttonHeight } 
          onClick={ handleClickOpen }
        >
          Activar
        </Button>
      </Grid>
    )
  }

  const renderDesactivedButton = () => {

    return (
      <Grid item>
        <Button 
          variant="contained" 
          size="small" 
          className={ classes.buttonHeight } 
          onClick={ handleClickOpen }
        >
          Desactivar
        </Button>
      </Grid>
    )
}



  return(
    <>
    <Grid container item justify="center" >
      { value ? renderDesactivedButton() : renderActivedButton() }
    </Grid>
    <Dialog open={open} onClose={ handleClose }>
      <DialogTitle>
      { value ? "Desactivar Plantilla" : "Activar Plantilla" }
      </DialogTitle>
      <DialogContent>
      { value ? "Desactivar la Plantilla dejará de ser editable o funcional" : "Activar esta plantilla permitirá poder trabajar en ella." }
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={ handleClose }
          variant="overline" 
          size="small" 
        >
          cancelar
        </Button>
        <Button
          onClick={ statusChange }
          variant="overline" 
          color="primary" 
          size="small" 
        >
          { value ? "Desactivar" : "Activar" }
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default withStyles(styles)(ActiveTemplateButton);
