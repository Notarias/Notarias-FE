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
import { GET_PROCEDURE_TEMPLATE }                     from '../queries_and_mutations/queries';
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
import List                                 from '@material-ui/core/List';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemText                         from '@material-ui/core/ListItemText';


const AddButgetingTemplateButton = (props) => {

  const { classes, budgetingTemplatesData }= props
  const id = props.id
  const [budgetingTemplates, setBudgetingTemplates] = React.useState()
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openBudgetingLinkedList, setOpenBudgetingLinkedList] = React.useState(false)
  const [toLinkSelectedOption, setToLinkSelectedOption] = React.useState(budgetingTemplatesData || [])
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    setBudgetingTemplates(budgetingTemplatesData)
  }, [budgetingTemplatesData])

  const [updateBudgetingTemplateMutation, updateProcessInfo] =
    useMutation(
      UPDATE_PROCEDURE_TEMPLATES,
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
          query: GET_PROCEDURE_TEMPLATE,
          variables: { "id": id },
        }],
        awaitRefetchQueries: true
      }
    )

    const toSendIds = () => {
      return toLinkSelectedOption.map((item) => item.id)
    }

  const updateLinkedProcedureTemplate = (event) => {
    updateBudgetingTemplateMutation({ variables: {"id": id, "budgetingTemplatesIds": toSendIds()}})
  }

  const updateUnlinkBudgetingTemplate = (event) => {
    updateBudgetingTemplateMutation({ variables: {"id": id, "budgetingTemplatesIds": []}})
  }

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

  const handleClickOpenBudgetingLinkedList = () => {
    setOpenBudgetingLinkedList(true)
  }

  const handleCloseBudgetingLinkedList = () => {
    setOpenBudgetingLinkedList(false)
    console.log("cancelando")
  }

  // const budgetingSelected = () => {
  //   return (
  //     (budgetingTemplates && budgetingTemplates.length > 0) 
  //       ? 
  //       "No." + budgetingTemplates.map((budgetingTemplate) => budgetingTemplate.id) 
  //       : 
  //         "presupuesto"
  //   )
  // }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // const clickHandler = (event) => {
  //   const ejemp = props.setProcedureSelectedOptions([template])
  //   setThisOne(event.target.value);
  // }

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  const showBudgetingLinkedList = () => {
    return(
      <List>
        {
          budgetingTemplatesData.map(
            (budgetingTemplate) =>
                <ListItem
                button
                data-item-id={budgetingTemplate.id}
                component={Link} 
                to={`/config/budget_templates/${budgetingTemplate.id}/edit`}
                // onClick={ clickHandler }
                key={budgetingTemplate.id + "-budgetingTemplate"}
                // selected={props.procedureSelectedOptions && props.procedureSelectedOptions.id == template.id}
                // selected={ tab.id === (currentTab && currentTab.id ) }
                // selected={ }
              >
                <ListItemText primary={budgetingTemplate.name} />
              </ListItem>
          )
        }
      </List>
    )
  }

  const withBudgetingLinkedClass = () => {
    return (budgetingTemplates && budgetingTemplates.length > 0)  ? classes.avatarBudgetingLinkedCount : classes.avatarBudgetingLinkedCountIsZero
  }

  const colorOfButtonWhenBudgetingLinked = () => {
    return(
      (budgetingTemplates && budgetingTemplates.length > 0) ?
        "primary"
      :
        "default"
    )
  }

  console.log(toSendIds(), "ids")

  return(
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup color={ colorOfButtonWhenBudgetingLinked() } ref={anchorRef} aria-label="split button">
          <Button 
            size="small"
            disabled={ budgetingTemplatesData && (budgetingTemplatesData == 0) }
            onClick={ handleClickOpenBudgetingLinkedList }
          >
            <Avatar
              className={ withBudgetingLinkedClass() }
              variant="rounded"
            >
              { (budgetingTemplates && budgetingTemplates.length > 0) ? budgetingTemplatesData.length : "+" }
            </Avatar>
            Presupuesto
          </Button>
          <Button
            variant="contained"
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
                      onClick={ updateUnlinkBudgetingTemplate }
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
              toLinkSelectedOption={ toLinkSelectedOption }
              setToLinkSelectedOption={ setToLinkSelectedOption }
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
              // disabled={ !procedureSelectedOption || (procedureSelectedOption && updateProcessInfo.loading)}
            >
              {/* {loading ? <CircularProgress/> : "Aceptar"} */}
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog  open={ openBudgetingLinkedList } onClose={ handleCloseBudgetingLinkedList }>
          <DialogTitle>
            Ir a la plantilla de presupuesto
          </DialogTitle>
          <DialogContent>
            { showBudgetingLinkedList() }
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleCloseBudgetingLinkedList }>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(AddButgetingTemplateButton);
