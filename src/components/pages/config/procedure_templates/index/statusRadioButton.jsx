import React                          from 'react';
import { styles }                     from '../styles';
import { withStyles }                 from '@material-ui/core/styles';
import Button                         from '@material-ui/core/Button';
import Grid                           from '@material-ui/core/Grid';
import Dialog                         from '@material-ui/core/Dialog';
import Typography                     from '@material-ui/core/Typography';
import DialogActions                  from '@material-ui/core/DialogActions';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogContentText              from '@material-ui/core/DialogContentText';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import RadioButtonUncheckedIcon       from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon         from '@material-ui/icons/RadioButtonChecked';
import { useTheme }                   from '@material-ui/core/styles';
import useMediaQuery                  from '@material-ui/core/useMediaQuery';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const StatusRadioButton = (props) => {

  const { classes, active, changeStatus } = props

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const statusTemplate = () => { 
    return active ? "Desactivar" : "Activar"
  }

  const changeStatusValidation = () => {
    setOpen(false)
    changeStatus()
  }


  return(
    <>
      <Grid container direction="row" onClick={ handleClickOpen }>
        {
          active ?
            // <Button>
            <ListItemIcon>
              <RadioButtonUncheckedIcon color="secondary" className={ classes.defaultIcon }/>
            </ListItemIcon>
            // {/* </Button> */}
          :
            //<Button>
            <ListItemIcon>
              <RadioButtonCheckedIcon className={classes.radioButtonActiveGreen} />
            </ListItemIcon>
            //</Button>
        }
      {/* <Typography 
        variant="overline"
        display="block" 
        gutterBottom
        key="activar"
        className={ classes.textIconDefault }
      > */}
      <ListItemText>
        { statusTemplate() }
      </ListItemText>
      {/* </Typography> */}
    </Grid>
    <Dialog
        fullScreen={ fullScreen }
        open={ open }
        onClose={ handleClose }
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Confirmar ", statusTemplate() }</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Realmente deseas { statusTemplate() } ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
            Cancelar
          </Button>
          <Button autoFocus onClick={ changeStatusValidation } color="primary">
            { statusTemplate() }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withStyles(styles)(StatusRadioButton);
