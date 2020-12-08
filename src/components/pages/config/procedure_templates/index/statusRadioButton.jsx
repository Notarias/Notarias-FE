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


const StatusRadioButton = (props) => {

  const { classes, status, changeStatus } = props

  const [active, setActive] = React.useState(props.status)
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


  return(
    <>
      <Grid container alignItems="center" justify="flex-start" onClick={ handleClickOpen }>
        {
          active ?
            <Button>
              <RadioButtonUncheckedIcon color="secondary" className={ classes.defaultIcon }/>
            </Button>
          :
            <Button>
              <RadioButtonCheckedIcon className={classes.radioButtonActiveGreen} />
            </Button>
        }
      <Typography 
        variant="button" 
        display="block" 
        gutterBottom
        key="activar"
        className={ classes.textIconDefault }
      >
        { statusTemplate() }
      </Typography>
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
          <Button autoFocus onClick={ changeStatus } color="primary">
            { statusTemplate() }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withStyles(styles)(StatusRadioButton);
