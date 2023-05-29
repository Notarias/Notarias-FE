import React, { useEffect }                           from 'react'
import Dialog                                         from '@material-ui/core/Dialog';
import DialogContent                                  from '@material-ui/core/DialogContent';
import DialogTitle                                    from '@material-ui/core/DialogTitle';
import DialogActions                                  from '@material-ui/core/DialogActions';
import ProceduresTemplatesList                         from './procedures_templates_list';
import { styles }                                     from '../styles';
import { withStyles }                                 from '@material-ui/core/styles';
import { useMutation }                                from '@apollo/client';
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
import { useQuery }                                   from '@apollo/client';
import { GET_PROCEDURES_TEMPLATES_QUICK_LIST  }       from '../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                             from '../../../../../resolvers/queries';
import client                                         from '../../../../../apollo';
import { Link }                                       from 'react-router-dom';
import Avatar                                         from '@material-ui/core/Avatar';
import List                                           from '@material-ui/core/List';
import ListItem                                       from '@material-ui/core/ListItem';
import ListItemText                                   from '@material-ui/core/ListItemText';

const ProcedureTemplateLinkButton = (props) => {

  const { classes, proceduresTemplatesData }= props
  const id = props.id
  const [proceduresTemplates, setProceduresTemplates] = React.useState()
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openProcedureLinkedList, setOpenProcedureLinkedList] = React.useState(false)
  const [toLinkSelectedOption, setToLinkSelectedOption] = React.useState(proceduresTemplatesData || [])
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const disabledButton = proceduresTemplatesData && (Number(proceduresTemplatesData) === 0)

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
        refetchQueries: [
          {
            query: GET_BUDGETING_TEMPLATE,
            variables: { "id": id },
          }
        ],
        awaitRefetchQueries: true,
      }
    )

  const toSendIds = () => {
    return toLinkSelectedOption.map((item) => item.id)
  }

  const updateLinkedProcedureTemplate = (event) => {
    updateBudgetingTemplateMutation(
      { 
        variables: { "id": id, "proceduresTemplatesIds": toSendIds() }
      }
    )
  }

  const updateUnlinkProcedureTemplate = (event) => {
    updateBudgetingTemplateMutation({ variables: {"id": id, "proceduresTemplatesIds": []}})
  }

  const { data } = useQuery(
    GET_PROCEDURES_TEMPLATES_QUICK_LIST , { fetchPolicy: 'no-cache' }
  );

  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleClickOpenProcedureLinkedList = () => {
    setOpenProcedureLinkedList(true)
  }

  const handleCloseProcedureLinkedList = () => {
    setOpenProcedureLinkedList(false)
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

  const showProceduresLinkedList = () => {
    return proceduresTemplatesData ?
      (
        <List className={ classes.LinkedListToShow}>
          {
            proceduresTemplatesData.map(
              (procedureTemplate) =>
                <React.Fragment key={procedureTemplate.id + "fragment"}>
                  <ListItem
                    button
                    data-item-id={procedureTemplate.id}
                    component={Link} 
                    to={`/config/procedure_templates/${procedureTemplate.id}/edit`}
                    key={procedureTemplate.id + "-budgetingTemplate"}
                  >
                    <ListItemText primary={procedureTemplate.name} />
                  </ListItem>
                  <Divider/>
                </React.Fragment>
            )
          }
        </List>
      ) : ""
  }

  const withTemplateLinkedClass = () => {
    return (proceduresTemplates && proceduresTemplates.length > 0)
      ? 
        classes.avatarLinkedCount
      : 
        classes.avatarLinkedCountIsZero
  }

  const colorOfButtonWhenTemplateIsLinked = () => {
    return(
      (proceduresTemplates && proceduresTemplates.length > 0) ?
        "primary"
      :
        "default"
    )
  }

  return(
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup color={ colorOfButtonWhenTemplateIsLinked() } ref={anchorRef} aria-label="split button">
        <Button 
            size="small"
            disabled={ disabledButton }
            onClick={ handleClickOpenProcedureLinkedList }
          >
            <Avatar
              className={ withTemplateLinkedClass() }
              variant="rounded"
            >
              { (proceduresTemplates && proceduresTemplates.length > 0) ? proceduresTemplatesData.length : "+" }
            </Avatar>
            Trámite
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
                        (proceduresTemplates && proceduresTemplates.length > 0) ? 
                          "Cambiar trámite" 
                        :
                          "Añadir trámite" 
                      }
                    </MenuItem>
                    <Divider/>
                    <MenuItem
                      onClick={ updateUnlinkProcedureTemplate }
                      disabled={ disabledButton }
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
          <DialogTitle className={ classes.DialogTittleOfListToLink }>
            Selecciona un Trámite para vincularlo
          </DialogTitle>
          <DialogContent>
            <ProceduresTemplatesList
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
              disabled={ updateProcessInfo.loading }
              className={ classes.buttonToAceptLinkedTemplate }
            >
              { updateProcessInfo.loading ? <CircularProgress size={ "18px" }/> : "Aceptar"}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog  open={ openProcedureLinkedList } onClose={ handleCloseProcedureLinkedList }>
          <DialogTitle>
            Ir a la plantilla de presupuesto
          </DialogTitle>
          <DialogContent>
            { showProceduresLinkedList() }
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleCloseProcedureLinkedList }>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(ProcedureTemplateLinkButton);
