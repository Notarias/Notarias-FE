
import React, { useState }                      from 'react';
import { styles }                               from '../styles';
import { withStyles }                           from '@material-ui/core/styles';
import Typography                               from '@material-ui/core/Typography';
import Grid                                     from '@material-ui/core/Grid';
import Button                                   from '@material-ui/core/Button';
import IconButton                               from '@material-ui/core/IconButton';
import Menu                                     from '@material-ui/core/Menu';
import MenuItem                                 from '@material-ui/core/MenuItem';
import MoreVertIcon                             from '@material-ui/icons/MoreVert';
import TextField                                from '@material-ui/core/TextField';
import CreateIcon                               from '@material-ui/icons/Create'
import Divider                                  from '@material-ui/core/Divider';
import DeleteForeverIcon                        from '@material-ui/icons/DeleteForever';
import MonetizationOnIcon                       from '@material-ui/icons/MonetizationOn';
import Dialog                                   from '@material-ui/core/Dialog';
import DialogContent                            from '@material-ui/core/DialogContent';
import DialogTitle                              from '@material-ui/core/DialogTitle';
import DialogActions                            from '@material-ui/core/DialogActions';
import ListItemIcon                             from '@material-ui/core/ListItemIcon';
import ListItemText                             from '@material-ui/core/ListItemText';
import RadioButtonUncheckedIcon                 from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon                   from '@material-ui/icons/RadioButtonChecked';
import { useMutation }                          from '@apollo/client';
import { GET_BUDGETING_TEMPLATES_TABS }         from '../queries_and_mutations/queries'
import { UPDATE_BUDGETING_TEMPLATE_TAB }        from '../queries_and_mutations/queries'
import { DESTROY_BUDGETING_TEMPLATE_TAB }       from '../queries_and_mutations/queries'
import { GLOBAL_MESSAGE }                       from '../../../../../resolvers/queries';
import client                                   from '../../../../../apollo';


const TabMenu = (props) => {
  const { classes, budgetingTemplateId, selected, active, setCurrentTab, calculable } = props;
  const [id] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState(false);
  const [error, setError] = useState(false);

  const inputsList = ["name"]

  const [updateBudgetingTemplateTabMutation, updateProcessInfo] =
  useMutation(
    UPDATE_BUDGETING_TEMPLATE_TAB,
    {
      onError(apolloError) {
        setErrors(apolloError)
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
        setError(false);
      },
      onCompleted(store, cacheData) {
        setOpenDialog(false);
      },
      refetchQueries: [{
        query: GET_BUDGETING_TEMPLATES_TABS,
        variables: { "id": budgetingTemplateId },
      }],
      awaitRefetchQueries: true
    }
  )

  const setErrors = (apolloError) => {
    let errorsList = {}
    let errorTemplateList = apolloError.graphQLErrors
    for ( let i = 0; i < errorTemplateList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorTemplateList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorTemplateList[i].message
        }
      }
    }
    setError(errorsList)
  }

  const updateTab = (event) => {
    updateBudgetingTemplateTabMutation(
      { 
        variables: { id: id , name: name}
      }
    )
  }

  const changeStatus = (event) => {

    updateBudgetingTemplateTabMutation(
      { 
        variables: { id: id , active: !active}
      }
    )
  }

  const changeCalculable = (event) => {
    updateBudgetingTemplateTabMutation(
      { 
        variables: { id: id , calculable: !calculable}
      }
    )
  }

  const [destroyBudgetingTemplateTabMutation] =
  useMutation(
    DESTROY_BUDGETING_TEMPLATE_TAB,
    {
      refetchQueries: [{
        query: GET_BUDGETING_TEMPLATES_TABS,
        variables: { "id": budgetingTemplateId },
      }],
      awaitRefetchQueries: true
    }
  )

  const deleteTabClick = () => {
    destroyBudgetingTemplateTabMutation(
      {
        variables: { id: id }
      },
      setCurrentTab(null)
    )
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  let open = Boolean(anchorEl);

  const openEditDialog = () => {
    setOpenDialog(true);
    setAction(true);
    setAnchorEl(null);
  }

  const openDeleteDialog = () => {
    setOpenDialog(true);
    setAction(false);
    setAnchorEl(null);
  }

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const dialogEditTab = () => {
    return(
      <>
        <DialogTitle id="alert-dialog-title">{"Editar Nombre de la Pestaña"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            className={ classes.inputSmall }
            size="small"
            id="standard-basic" 
            label="Nombre"
            value={ name }
            onChange={ handleNameChange }
            error={ !!error["name"] && true }
            errorskey={ "name" }
            name='name'
          />
        </DialogContent>
      </>
    )
  }

  const dialogDeleteTab = () => {
    return(
      <>
        <DialogTitle id="alert-dialog-title">{"Eliminar pestaña"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Se eliminará permanentemente la pestaña
            <strong style={ { color: "red", padding: "0 4px" }}>{ name }</strong>
            junto con sus <strong style={ { color: "blue", padding: "0 4px" }}>grupos y campos</strong>.
          </Typography>
        </DialogContent>
      </>
    )
  }

  const statusTemplate = () => { 
    return active ? " Desactivar" : " Activar"
  }

  return (
    <Grid container alignItems="center" justifyContent="flex-start">
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        disabled={ !selected }
        onClick={ handleClick }
        className={ selected ? classes.activeMenuTab : classes.menuTabDefault }
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        autoFocus={false}
        disableAutoFocusItem 
        id="long-menu"
        keepMounted
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
      >
        <MenuItem key="budgetingTabMenu1" onClick={ openEditDialog } className={ classes.tittleTabMenu } >
          <ListItemIcon >
            <CreateIcon className={ classes.defaultIcon } />
          </ListItemIcon>
          <ListItemText primary="Editar"/>
        </MenuItem>
        <Divider key="budgetingTabMenuDivider1"/>
        <MenuItem key="budgetingTabMenu2" onClick={ openDeleteDialog }>
          <ListItemIcon >
            <DeleteForeverIcon className={ classes.defaultIcon } />
          </ListItemIcon>
          <ListItemText primary="Borrar"/>
        </MenuItem>
        <Divider key="budgetingTabMenuDivider2"/>
        <MenuItem key="budgetingTabMenu3" disabled={updateProcessInfo.loading}>
          <Grid container item alignItems="center" >
            {
              active ? 
                <ListItemIcon>
                  <RadioButtonUncheckedIcon 
                    color="secondary"
                    className={ classes.defaultIcon }
                    onClick={ changeStatus }
                  />
                </ListItemIcon>
              :
                <ListItemIcon>
                  <RadioButtonCheckedIcon
                    className={classes.activeIconGreen}
                    onClick={ changeStatus }
                  />
                </ListItemIcon>
            }
            <ListItemText>
              { statusTemplate() }
            </ListItemText> 
          </Grid>
        </MenuItem>
        <Divider key="budgetingTabMenuDivider3"/>
        <MenuItem key="budgetingTabMenu4" onClick={changeCalculable}>
          <ListItemIcon>
            <MonetizationOnIcon color={calculable ? 'primary' : 'secondary'} fontSize="medium"/>
          </ListItemIcon>
          <ListItemText primary={calculable ? "Desactivar Calculo" : "Activar Calculo"}/>
        </MenuItem>
      </Menu>
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        { action ? dialogEditTab() : dialogDeleteTab() }
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancelar
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={ action ? updateTab : deleteTabClick }
          >
            { action ? 'Guardar' : 'Borrar' }
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default withStyles(styles)(TabMenu);
