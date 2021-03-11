import React, { useEffect }                           from 'react'
import Dialog                                         from '@material-ui/core/Dialog';
import DialogContent                                  from '@material-ui/core/DialogContent';
import DialogTitle                                    from '@material-ui/core/DialogTitle';
import DialogActions                                  from '@material-ui/core/DialogActions';
import ListToLinkOfBudgeting                          from './list_to_link_of_budgeting';
import { styles }                                     from '../styles';
import { withStyles }                                 from '@material-ui/core/styles';
import { useMutation }                                from '@apollo/react-hooks';
import { UPDATE_PROCEDURE_TEMPLATES }                  from '../queries_and_mutations/queries';
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

const AddButgetingTemplateButton = (props) => {

  const { classes, budgetingTemplatesData }= props
  const id = props.id
  const [budgetingTemplates, setBudgetingTemplates] = React.useState()
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openBudgetingList, setOpenBudgetingList] = React.useState()
  // const [procedureSelectedOption, setProcedureSelectedOption] = React.useState()
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    setBudgetingTemplates(budgetingTemplatesData)
  }, [budgetingTemplatesData])

  // const [updateBudgetingTemplateMutation, updateProcessInfo] =
  //   useMutation(
  //     UPDATE_BUDGETING_TEMPLATE,
  //     {
  //       onError(apolloError) {
  //         setOpen(false)
  //         setOpenDialog(false)
  //         client.writeQuery({
  //           query: GLOBAL_MESSAGE,
  //           data: {
  //             globalMessage: {
  //               message: "Ocurrió un error",
  //               type: "error",
  //               __typename: "globalMessage"
  //             }
  //           }
  //         })
  //       },
  //       update(store, cacheData) {
  //         setOpen(false)
  //         setOpenDialog(false)
  //       },
  //       refetchQueries: [{
  //         query: GET_BUDGETING_TEMPLATE,
  //         variables: { "id": id },
  //       }],
  //       awaitRefetchQueries: true
  //     }
  //   )

  // const updateLinkedProcedureTemplate = (event) => {
  //   updateBudgetingTemplateMutation({ variables: {"id": id, "proceduresTemplateId": procedureSelectedOption.id}})
  // }

  // const updateUnlinkProcedureTemplate = (event) => {
  //   updateBudgetingTemplateMutation({ variables: {"id": id, "proceduresTemplateId": null}})
  // }

  const { loading, data, refetch } = useQuery(
    GET_BUDGETING_TEMPLATES_QUICK_LIST,
  );

  const handleClickOpenDialog = () => {
    setOpenDialog(true)
    // setProcedureSelectedOption(false)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const budgetingSelected = () => {
    return (
      (budgetingTemplates && budgetingTemplates.length > 0) 
        ? 
        "No." + budgetingTemplates.map((budgetingTemplate) => budgetingTemplate.id) 
        : 
          "presupuesto"
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

  const showBudgetingLinkedList = () => {
    console.log("si")
  }

  const withBudgetingLinkedClass = () => {
    return budgetingTemplatesData && (budgetingTemplatesData > 0)  ? classes.avatarBudgetingLinkedCount : "default"
  }

  console.log(withBudgetingLinkedClass)
  return(
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup color="primary" ref={anchorRef} aria-label="split button">
          <Button 
            size="small"
          >
            <Avatar
              className={ classes.avatarBudgetingLinkedCount }
              variant="rounded"
            >
              { budgetingTemplatesData ? budgetingTemplatesData.length : 0 }
            </Avatar>
          {/* <Chip
            avatar={<Avatar>{ budgetingTemplatesData ? budgetingTemplatesData.length : 0 }</Avatar>}
            label={ ` Presupuestos` }
            color={ budgetingTemplatesData.length > 0 ? "primary" : "default" }
            onClick={ showBudgetingLinkedList }
          /> */}
            Presupuesto
          </Button>
          {/* <Dialog>
            <DialogTitle>
              Ir a la plantilla de presupuesto
            </DialogTitle>
            <DialogContent>
              Una lista despegable
            </DialogContent>
            <DialogActions>
              <Button>
                Cancelar
              </Button>
              <Button>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog> */}
          <Button
            variant="contained"
            color="primary"
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
                      { 
                        (budgetingTemplates && budgetingTemplates.length > 0) ? 
                          "Cambiar Presupuesto" 
                        : 
                          "Añadir Preupuesto" 
                      }
                    </MenuItem>
                    <Divider/>
                    <MenuItem
                      // onClick={ updateUnlinkProcedureTemplate }
                      // disabled={ !(budgetingTemplates && budgetingTemplates.length > 0) }
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
            <ListToLinkOfBudgeting
              // procedureSelectedOption={ procedureSelectedOption }
              // setProcedureSelectedOption={ setProcedureSelectedOption }
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
              // onClick={ updateLinkedProcedureTemplate }
              // disabled={ !procedureSelectedOption || (procedureSelectedOption && updateProcessInfo.loading)}
            >
              {/* {loading ? <CircularProgress/> : "Aceptar"} */}
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(AddButgetingTemplateButton);
