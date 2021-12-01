import React, { useState }                from 'react'
import Grid                               from '@material-ui/core/Grid';
import CircularProgress                   from '@material-ui/core/CircularProgress';
import Dialog                             from '@material-ui/core/Dialog';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import DialogActions                      from '@material-ui/core/DialogActions';
import TextField                          from '@material-ui/core/TextField'
import Button                             from '@material-ui/core/Button';
import PostAddIcon                        from '@material-ui/icons/PostAdd';
import { styles }                         from '../styles';
import { withStyles }                     from '@material-ui/core/styles';
import StepperBudget                      from './stepper_budget';


const CreateBudgetButton = (props) => {
  const {classes} = props
  const [open, setOpen] = useState(false)

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  }

  return(
    <>
      <Button 
        variant="contained" 
        color="primary"
        className={classes.newButton}
        onClick={ handleClickOpen }
      >
        <PostAddIcon/>
      </Button>
      <Dialog 
        open={open} 
        onClose={ handleClose }
      >
      <DialogTitle>
        Crear un presupuesto.
      </DialogTitle>
      <DialogContent>
        <StepperBudget/>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={ handleClose }
          variant="text" 
          size="small" 
        >
          cancelar
        </Button>
        {/* <Button
          //onClick={ createNewBudgetingTemplate }
          variant="text"
          color="primary"
          size="small"
          // disabled={ pristine }
        >
          Agregar
        </Button> */}
      </DialogActions>
    </Dialog>
  </>
  )
}

export default withStyles(styles)(CreateBudgetButton);
