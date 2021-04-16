import React                          from 'react';
import Grid                           from '@material-ui/core/Grid';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import GenericDropdownMenu            from '../../../../ui/generic_dropdown_menu';
import Chip                           from '@material-ui/core/Chip';
import Button                         from '@material-ui/core/Button';
import CreateIcon                     from '@material-ui/icons/Create';
import MenuItem                       from '@material-ui/core/MenuItem';
import RadioButtonUncheckedIcon       from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon         from '@material-ui/icons/RadioButtonChecked';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import Dialog                         from '@material-ui/core/Dialog';
import DialogActions                  from '@material-ui/core/DialogActions';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogContentText              from '@material-ui/core/DialogContentText';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import useMediaQuery                  from '@material-ui/core/useMediaQuery';
import { useTheme }                   from '@material-ui/core/styles';
import { Link }                       from 'react-router-dom';
import { useMutation }                from '@apollo/react-hooks';
import { UPDATE_BUDGETING_TEMPLATE }  from '../queries_and_mutations/queries'
import { useQuery }                   from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATE }     from '../queries_and_mutations/queries'


const TemplateRow = (props) => {

  const budgetingTemplate  = props.data
  const { classes } = props
  const [active, setActive] = React.useState(budgetingTemplate.active);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const id = budgetingTemplate.id;

  const { data } = useQuery(GET_BUDGETING_TEMPLATE,
    { variables: {"id": id } } 
  );


  const folioNumber = (serial) => {
    return serial.toString().padStart(5, "0")
  }

  const [updateBudgetingTemplateMutation] =
  useMutation(
    UPDATE_BUDGETING_TEMPLATE,
    {
      update(store, cacheData) {
        setActive(cacheData.data.updateBudgetingTemplate.budgetingTemplate.active)
      }
    }
  )

  const changeStatus = (e) => {
    updateBudgetingTemplateMutation({ variables: { id: id, active: !active } })
    setOpen(false);
  }

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const markStatus = () => {
    if(!active) {
      return  classes.statusTemplateRow 
    }
  }

  const statusTemplate = () => { 
    return active ? "Desactivar" : "Activar"
  }

  const statusBadgetTemplate = () => {
    return(
      budgetingTemplate.active ? "Activo" : "Inactivo"
    )
  }

  const procedureLinked = () => {
    return data ? data.budgetingTemplate.proceduresTemplates.map((item) => item.id ) : "" 
  }

  return(
    <TableRow key={ budgetingTemplate.id + "-row" }  className={ markStatus() } >
      <TableCell align= "center">{ budgetingTemplate.name }</TableCell>
      <TableCell align= "center">{ folioNumber(budgetingTemplate.serialNumber) }</TableCell>
      <TableCell align= "center">
        { 
          <Chip
            size="small" label={ statusBadgetTemplate() }
            classes={{colorPrimary: classes.activeGreen}}
            color={ active ? "primary" : "secondary"} 
          />
        }
      </TableCell>
      <TableCell align= "center">{ procedureLinked() }</TableCell>
      <TableCell align= "center">2.0</TableCell>
      <TableCell align= "center">
        <Grid>
          <GenericDropdownMenu>
            <MenuItem key={ budgetingTemplate.id + "-edit" }>
              <Link
                to={`/config/budget_templates/${ budgetingTemplate.id }/edit`}
                color="inherit"
                underline="none"
                className={ classes.linkDefault }
              >
                <Grid container>
                  <ListItemIcon>
                    <CreateIcon className={ classes.defaultIcon }/>
                  </ListItemIcon>
                  <ListItemText primary="Editar" />
                </Grid>
              </Link>
            </MenuItem>
            <MenuItem 
              key={ budgetingTemplate.id + "-status" }
            >
              <Grid container onClick={ handleClickOpen }>
                <ListItemIcon>
                  {
                    active ? 
                      <RadioButtonUncheckedIcon color="secondary" className={ classes.defaultIcon }/> 
                    : 
                      <RadioButtonCheckedIcon className={classes.activeIconGreen} /> 
                  }
                </ListItemIcon>
                <ListItemText primary={ statusTemplate() } />
              </Grid>
              <Dialog
                fullScreen={ fullScreen }
                open={ open }
                onClose={ handleClose }
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">{"Confirmar " + statusTemplate() }</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    ¿Realmente deseas { statusTemplate() } está plantilla de presupuesto ?
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

export default TemplateRow;
