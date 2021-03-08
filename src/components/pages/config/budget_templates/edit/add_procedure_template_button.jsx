import React, { useEffect }                           from 'react'
import Dialog                                         from '@material-ui/core/Dialog';
import DialogContent                                  from '@material-ui/core/DialogContent';
import DialogTitle                                    from '@material-ui/core/DialogTitle';
import DialogActions                                  from '@material-ui/core/DialogActions';
import ListToLinkOfProcedures                         from './list_to_link_of_procedures';
import { styles }                                     from '../styles';
import { withStyles }                                 from '@material-ui/core/styles';
import { useMutation }                                from '@apollo/react-hooks';
import { UPDATE_BUDGETING_TEMPLATE }                  from '../queries_and_mutations/queries';
import { GET_BUDGETING_TEMPLATE }                     from '../queries_and_mutations/queries';
import Divider                                        from '@material-ui/core/Divider';
import CircularProgress                               from '@material-ui/core/CircularProgress';
import Grid                                           from '@material-ui/core/Grid';
import Button                                         from '@material-ui/core/Button';
import ButtonGroup                                    from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon                              from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener                              from '@material-ui/core/ClickAwayListener';
import Grow                                           from '@material-ui/core/Grow';
import Paper                                          from '@material-ui/core/Paper';
import Popper                                         from '@material-ui/core/Popper';
import MenuItem                                       from '@material-ui/core/MenuItem';
import MenuList                                       from '@material-ui/core/MenuList';
import { useQuery }                                   from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATES_QUICK_LIST }         from '../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                             from '../../../../../resolvers/queries';
import client                                         from '../../../../../apollo';
import { Link }                                       from 'react-router-dom';
import Chip                                           from '@material-ui/core/Chip';
import Avatar                                         from '@material-ui/core/Avatar';

const AddProcedureTemplateButton = (props) => {

  const { classes, proceduresTemplatesData }= props
  const id = props.id
  const [proceduresTemplates, setProceduresTemplates] = React.useState()
  const [openDialog, setOpenDialog] = React.useState(false)
  const [procedureSelectedOption, setProcedureSelectedOption] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    setProceduresTemplates(proceduresTemplatesData)
  }, [proceduresTemplatesData])

  const [updateBudgetingTemplateMutation, updateProcessInfo] =
    useMutation(
      UPDATE_BUDGETING_TEMPLATE,
      {
        onError(apolloError) {
          setOpen(false)
          setOpenDialog(false)
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Ocurrió un error",
                type: "error",
                __typename: "globalMessage"
              }
            }
          })
        },
        update(store, cacheData) {
          setOpen(false)
          setOpenDialog(false)
        },
        refetchQueries: [{
          query: GET_BUDGETING_TEMPLATE,
          variables: { "id": id },
        }],
        awaitRefetchQueries: true
      }
    )

  const toSendIds = () => {
    procedureSelectedOption.map((item) => item.id)
    console.log(procedureSelectedOption.map((item) => item.id), "map")
  }

  const updateLinkedProcedureTemplate = (event) => {
    updateBudgetingTemplateMutation(
      { variables: 
        {
          "id": id, "proceduresTemplateId": toSendIds()
        }
      }
    )
  }

  const updateUnlinkProcedureTemplate = (event) => {
    updateBudgetingTemplateMutation({ variables: {"id": id, "proceduresTemplateId": null}})
  }

  const { loading, data, refetch } = useQuery(
    GET_BUDGETING_TEMPLATES_QUICK_LIST,
  );

  const handleClickOpenDialog = () => {
    setOpenDialog(true)
    setProcedureSelectedOption(false)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const proceduresSelected = () => {
    return (
      proceduresTemplatesData ? "No." + proceduresTemplatesData.map((procedureTemplate) => procedureTemplate.id) : "+ Tramite"
    )
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  console.log(procedureSelectedOption, "tiene")
  return(
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup color="primary" variant="contained" ref={anchorRef} aria-label="split button">
          <Button
            component={Link} 
            to={`/config/procedure_templates/${ proceduresTemplatesData ? proceduresTemplatesData.map((procedureTemplate) => procedureTemplate.id) : "" }/edit`}
            disabled={ !proceduresTemplates }
          >
            { proceduresSelected() }
          </Button>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    <MenuItem
                      onClick={ handleClickOpenDialog }
                    >
                      { proceduresTemplates ? "Cambiar tramite" : "Añadir tramite" }
                    </MenuItem>
                    <Divider/>
                    <MenuItem
                      onClick={ updateUnlinkProcedureTemplate }
                      disabled={ !proceduresTemplates }
                    >
                      Desvincular
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Dialog open={ openDialog } onClose={ handleCloseDialog } >
          <DialogTitle>
            Selecciona un Trámite para vincularlo
          </DialogTitle>
          <DialogContent>
            <ListToLinkOfProcedures
              procedureSelectedOption={ procedureSelectedOption }
              setProcedureSelectedOption={ setProcedureSelectedOption }
              data={ data }
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={ handleCloseDialog }
            >
              Cancelar
            </Button>
            <Button
              onClick={ updateLinkedProcedureTemplate }
              disabled={ !procedureSelectedOption || (procedureSelectedOption && updateProcessInfo.loading)}
            >
              {loading ? <CircularProgress/> : "Aceptar"}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(AddProcedureTemplateButton);
