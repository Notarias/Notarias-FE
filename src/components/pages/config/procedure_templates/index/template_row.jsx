import React, { useState }            from 'react';
import Button                         from '@material-ui/core/Button';
import Grid                           from '@material-ui/core/Grid';
import GenericDropdownMenu            from '../../../../ui/generic_dropdown_menu';
import Chip                           from '@material-ui/core/Chip';
import CreateIcon                     from '@material-ui/icons/Create';
import FileCopyIcon                   from '@material-ui/icons/FileCopy';
import MenuItem                       from '@material-ui/core/MenuItem';
import { Link }                       from 'react-router-dom';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import { UPDATE_PROCEDURE_TEMPLATES } from '../queries_and_mutations/queries';
import { useMutation }                from '@apollo/client';
import Dialog                         from '@material-ui/core/Dialog';
import DialogActions                  from '@material-ui/core/DialogActions';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogContentText              from '@material-ui/core/DialogContentText';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import useMediaQuery                  from '@material-ui/core/useMediaQuery';
import { useTheme }                   from '@material-ui/core/styles';
import RadioButtonUncheckedIcon       from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon         from '@material-ui/icons/RadioButtonChecked';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import { useQuery }                   from '@apollo/client';
import { GET_PROCEDURE_TEMPLATE }     from '../queries_and_mutations/queries';
import { CLONE_PROCEDURES_TEMPLATE }  from '../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }             from '../../../../../resolvers/queries';
import client                         from '../../../../../apollo';



const TempleteRow = (props) => {

  const procedureTemplate  = props.data
  const { classes } = props
  const [active, setActive] = useState(procedureTemplate.active);
  const [activeDialog, setActiveDialog] = useState(false);
  const [duplicateDialog, setDuplicateDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const id = procedureTemplate.id;

  const { data } = useQuery(GET_PROCEDURE_TEMPLATE,
    { variables: {"id": id } } 
  );

  const folioNumber = (serial) => {
    return serial.toString().padStart(5, "0")
  }

  const [updateProcedureTemplatesMutation] =
  useMutation(
    UPDATE_PROCEDURE_TEMPLATES,
    {
      update(store, cacheData) {
        setActive(cacheData.data.updateProceduresTemplate.proceduresTemplate.active)
      }
    }
  )

  const [cloneProceduresTemplateMutation] =
  useMutation(
    CLONE_PROCEDURES_TEMPLATE,
    {
      onComplete(cacheData) {
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "La plantilla se duplico con exito.",
              type: "success",
              __typename: "globalMessage"
            }
          }
        })
      }
    }
  )

  const openActiveDialog = (event) => {
    setActiveDialog(true);
  };

  const closeActiveDialog = () => {
    setActiveDialog(false);
  };

  const changeStatus = (e) => {
    updateProcedureTemplatesMutation({ variables: { id: id, active: !active } })
    setActiveDialog(false);
  }

  const duplicateTemplate = (e) => {
    cloneProceduresTemplateMutation({ variables: { id: id } })
    setDuplicateDialog(false);
  }

  const openDuplicateDialog = (event) => {
    setDuplicateDialog(true);
  };

  const closeDuplicateDialog = () => {
    setDuplicateDialog(false);
  };

  const statusTemplate = () => { 
    return active ? "Desactivar" : "Activar"
  }

  const statusProcedureTemplate = () => {
    return(
      procedureTemplate.active ? "Activo" : "Inactivo"
    )
  }


  const markStatus = () => {
    if(!active) {
      return  classes.statusTemplateRow 
    }
  }

  const budgetingLinked = () => {
    return data ? data.proceduresTemplate.budgetingTemplates.length  : "" 
  }

  return(
    <TableRow key={ procedureTemplate.id + "-row" }  className={ markStatus() } >
      <TableCell align= "center">{ procedureTemplate.name }</TableCell>
      <TableCell align= "center">{ folioNumber(procedureTemplate.serialNumber) }</TableCell>
      <TableCell align= "center">
        { 
          <Chip
            size="small" label={ statusProcedureTemplate() }
            classes={{colorPrimary: classes.activeGreen}}
            color={ active ? "primary" : "secondary"} 
          />
        }
      </TableCell>
      <TableCell align= "center">{ budgetingLinked() }</TableCell>
      <TableCell align= "center">{data ? data.proceduresTemplate.budgetingTemplates.map((item) => item.id) + " " : ""}</TableCell>
      <TableCell align= "center">
        { procedureTemplate.version ? procedureTemplate.version : "0" }
        .0
      </TableCell>
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
                  <ListItemIcon>
                    <CreateIcon className={ classes.defaultIcon }/>
                  </ListItemIcon>
                  <ListItemText primary="Editar" />
                </Grid>
              </Link>
            </MenuItem>
            <MenuItem key={ procedureTemplate.id + "-clone" } >
              <Grid container onClick={ openDuplicateDialog }>
                <ListItemIcon>
                  <FileCopyIcon className={ classes.defaultIcon }/>
                </ListItemIcon>
                <ListItemText primary="Duplicar" />
              </Grid>
              <Dialog
                fullScreen={ fullScreen }
                open={ duplicateDialog }
                onClose={ closeDuplicateDialog }
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title"> Confirmar Duplicar </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    ¿Realmente deseas duplicar está plantilla de presupuesto ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={ closeDuplicateDialog } color="primary">
                    Cancelar
                  </Button>
                  <Button autoFocus onClick={ duplicateTemplate } color="primary">
                    Duplicar
                  </Button>
                </DialogActions>
              </Dialog>
            </MenuItem>
            <MenuItem key={ procedureTemplate.id + "-status" } >
              <Grid container onClick={ openActiveDialog }>
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
                  open={ activeDialog }
                  onClose={ closeActiveDialog }
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">{"Confirmar " + statusTemplate() }</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      ¿Realmente deseas { statusTemplate() } está plantilla de trámite ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={ closeActiveDialog } color="primary">
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
