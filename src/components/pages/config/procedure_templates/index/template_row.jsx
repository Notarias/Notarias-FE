import React                          from 'react';
import Button                         from '@material-ui/core/Button';
import Grid                           from '@material-ui/core/Grid';
import GenericDropdownMenu            from '../../../../ui/generic_dropdown_menu';
import CreateIcon                     from '@material-ui/icons/Create';
import MenuItem                       from '@material-ui/core/MenuItem';
import { Link }                       from 'react-router-dom';
import Typography                     from '@material-ui/core/Typography';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import { UPDATE_PROCEDURE_TEMPLATES } from '../queries_and_mutations/queries';
import { useMutation }                from '@apollo/react-hooks';
import Dialog                         from '@material-ui/core/Dialog';
import DialogActions                  from '@material-ui/core/DialogActions';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogContentText              from '@material-ui/core/DialogContentText';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import useMediaQuery                  from '@material-ui/core/useMediaQuery';
import { useTheme }                   from '@material-ui/core/styles';
import RadioButtonUncheckedIcon       from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon         from '@material-ui/icons/RadioButtonChecked';


const TempleteRow = (props) => {

  const procedureTemplate  = props.data
  const { classes } = props

  const [id, setId] = React.useState(procedureTemplate.id);
  const [active, setActive] = React.useState(procedureTemplate.active);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);

  const folioNumber = (serial) => {
    return serial.toString().padStart(5, "0")
  }

  const [updateProcedureTemplatesMutation, updateProcessInfo] =
  useMutation(
    UPDATE_PROCEDURE_TEMPLATES,
    {
      update(store, cacheData, id) {
        setActive(cacheData.data.updateProcedureTemplate.proceduresTemplate.active)
      }
    }
  )

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeStatus = (e) => {
    updateProcedureTemplatesMutation({ variables: { id: id, active: !active } })
    setOpen(false);
  }

  const statusTemplate = () => { 
    return active ? "Desactivar" : "Activar"
  }

  const markStatus = () => {
    if(!active) {
      return  classes.statusTemplateRow 
    }
  }

  return(
    <TableRow key={ procedureTemplate.id + "-row" }  className={ markStatus() } >
      <TableCell align= "center">{ procedureTemplate.name }</TableCell>
      <TableCell align= "center">{ folioNumber(procedureTemplate.serialNumber) }</TableCell>
      <TableCell align= "center">tramites abiertos</TableCell>
      <TableCell align= "center">costo de presupuesto</TableCell>
      <TableCell align= "center">
        <Grid>
          <GenericDropdownMenu>
            <MenuItem key={ procedureTemplate.id + "-edit" }>
              <Link
                to={`/config/procedure_templates/${ procedureTemplate.id }/edit`}
                color="inherit"
                underline="none"
                className={ classes.linkDefault }
              >
                <Grid container>
                  <CreateIcon  className={ classes.defaultIcon }/>
                  <Typography 
                    variant="button" 
                    display="block" 
                    gutterBottom
                    className={ classes.textIconDefault }
                  >
                    Editar
                  </Typography>
                </Grid>
              </Link>
            </MenuItem>
            <MenuItem 
              key={ procedureTemplate.id + "-status" }
            >
              <Grid container onClick={ handleClickOpen }>
                {active ? <RadioButtonUncheckedIcon color="secondary" className={ classes.defaultIcon }/> : <RadioButtonCheckedIcon className={classes.activeIconGreen} /> }
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
                      ¿Realmente deseas { statusTemplate() } está plantilla de trámite ?
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
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default TempleteRow;
