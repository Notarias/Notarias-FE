import React                          from 'react';
import Button                         from '@material-ui/core/Button';
import Dialog                         from '@material-ui/core/Dialog';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import DialogActions                  from '@material-ui/core/DialogActions';
import Radio                          from '@material-ui/core/Radio';
import Grid                           from '@material-ui/core/Grid';
import Typography                     from '@material-ui/core/Typography';
import { styles }                     from '../styles';
import { withStyles }                 from '@material-ui/core/styles';

const DialogSelect = ({
  open,
  handleClose,
  addNewFieldsGroup,
  addNewField,
  ...props
}) => {


  const [value, setValue] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);

  const { classes } = props

  const handleChange = (event) => {
    setValue(event.target.value);
    setDisabled(false);
  };

  const radioSelect = () => {
      if (value === "field" || value === "fieldsGroup") {
        return (
          "Añadir"
        )
      } else {
        return "Elige una opcion"
      }
  };

  return (

    <Dialog open={open} onClose={ handleClose }>
      <DialogTitle 
        id="simple-dialog-title"
        className={ classes.tittleDialogWidth }
      >
        Crear Campos
      </DialogTitle >
      <DialogContent>
        <Grid container alignItems="center"  >
          <Grid 
            container 
            direction="column" 
            // item xs={6} 
            justify="center" 
            alignItems="center" 
            className={ value === 'field' ?  classes.roundedBorderDialog : classes.roundedBorderDialogSelected  }
          >
          <Typography
            variant="button"
          >
            Campo
          </Typography>
          <Radio
            checked={value === 'field'}
            onChange={handleChange}
            value="field"
            name="radio-button-field"
            color="primary"
          />
          <Typography
            variant="caption"
          >
            Agrega un campo a la hoja.
          </Typography>
          </Grid>
          <Grid 
            container 
            direction="column" 
            // item xs={6} 
            justify="center" 
            alignItems="center" 
            className={ value === 'fieldsGroup' ?  classes.roundedBorderDialog : classes.roundedBorderDialogSelected }>
          <Typography
            variant="button"
          >
            Grupo de Campos
          </Typography>
          <Radio
            checked={value === 'fieldsGroup'}
            onChange={handleChange}
            value="fieldsGroup"
            name="radio-button-group"
            color="primary"
          />
          <Typography
            variant="caption"
          >
            Agrega un Grupo de campos a la hoja.
          </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container direction="row" justify="flex-end">
          <Button onClick={ handleClose } color="secondary" >
            Cancelar
          </Button>
          <Button 
            onClick={ value === 'field' ? addNewField : addNewFieldsGroup } 
            color="primary"
            variant="contained"
            disabled={ disabled }
          >
            { radioSelect() }
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default  withStyles(styles)(DialogSelect);
