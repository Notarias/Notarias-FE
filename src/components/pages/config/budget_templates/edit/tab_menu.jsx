
import React                                    from 'react';
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
import SaveIcon                                 from '@material-ui/icons/Save';
import CreateIcon                               from '@material-ui/icons/Create'
import Divider                                  from '@material-ui/core/Divider';
import DeleteForeverIcon                        from '@material-ui/icons/DeleteForever';
import Dialog                                   from '@material-ui/core/Dialog';
import DialogContent                            from '@material-ui/core/DialogContent';
import DialogTitle                              from '@material-ui/core/DialogTitle';
import DialogActions                            from '@material-ui/core/DialogActions';
import ListItemIcon                             from '@material-ui/core/ListItemIcon';
import ListItemText                             from '@material-ui/core/ListItemText';
import RadioButtonUncheckedIcon                 from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon                   from '@material-ui/icons/RadioButtonChecked';
import { useMutation }                          from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATES_TABS }         from '../queries_and_mutations/queries'
import { UPDATE_BUDGETING_TEMPLATE_TAB }        from '../queries_and_mutations/queries'
import { DESTROY_BUDGETING_TEMPLATE_TAB }       from '../queries_and_mutations/queries'


const TabMenu = (props) => {
  const { classes, budgetingTemplateId, selected, active, setCurrentTab } = props;
  const [id, setId] = React.useState(props.id);
  const [name, setName] = React.useState(props.name);
  const [editing, setEditing] =  React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false)

  const [error, setError] = React.useState(false)
  const inputsList = ["name"]

  const [updateBudgetingTemplateTabMutation, updateProcessInfo] =
  useMutation(
    UPDATE_BUDGETING_TEMPLATE_TAB,
    {
      onError(apolloError) {
        setErrors(apolloError)
      },
      update(store, cacheData) {
        setError(false)
        setEditing(!editing)
        setUpdateLoading(false)
      },
      refetchQueries: [{
        query: GET_BUDGETING_TEMPLATES_TABS,
        variables: { "id": budgetingTemplateId },
      }],
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
    setUpdateLoading(true)
    updateBudgetingTemplateTabMutation(
      { 
        variables: { id: id , active: !active},
        fetchPolicy: "no-cache"
      }
    )
  }

  const [destroyBudgetingTemplateTabMutation, destroyProcessInfo] =
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
        variables: { id: id },
        fetchPolicy: "no-cache"
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

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const changeTittle = () => {
    setEditing(!editing)
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const renderTittleTextTab = () => {

    return(
      <>
        <ListItemIcon  onClick={ changeTittle }>
          <CreateIcon className={ classes.defaultIcon }/>
        </ListItemIcon>
        <Typography onClick={ changeTittle } noWrap>
          { name }
        </Typography>
      </>
    )
  }

  
  const renderTittleInputTab = () => {

    return(
      <>
        <ListItemIcon>
          <SaveIcon color="primary" className={ classes.defaultIcon } onClick={ updateTab }/>
        </ListItemIcon>
        <ListItemText>
          <TextField
            className={ classes.inputSmall }
            size="small"
            id="standard-basic" 
            label="&#8288;Nombre"
            value={ name }
            onChange={ handleNameChange }
            error={ !!error["name"] && true }
            errorskey={ "name" }
            name='name'
          />
        </ListItemText>
      </>
    )
  }

  const markStatus = () => {
    if(!active) {
      return  classes.statusTemplateRow 
    }
  }

  const statusTemplate = () => { 
    return active ? " Desactivar" : " Activar"
  }

  return (
    <Grid className={ markStatus() } container alignItems="center" justify="flex-start">
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
        <MenuItem key="budgetingTabMenu1" className={ classes.tittleTabMenu } 
        >
          { editing ? renderTittleTextTab() : renderTittleInputTab() }
        </MenuItem>
        <Divider key="budgetingTabMenuDivider1"/>
        <MenuItem key="budgetingTabMenu2" onClick={ handleClickOpenDialog }>
          <ListItemIcon >
            <DeleteForeverIcon className={ classes.defaultIcon } />
          </ListItemIcon>
          <ListItemText primary="&#8288;Borrar"/>
        </MenuItem>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Eliminar pestaña"}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Se eliminará permanentemente la pestaña
              <strong style={ { color: "red", padding: "0 4px" }}>{ name }</strong>
              junto con sus <strong style={ { color: "blue", padding: "0 4px" }}>grupos y campos</strong>.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleCloseDialog } color="secondary">
              Cancelar
            </Button>
            <Button
              color="primary"
              autoFocus
              onClick={ deleteTabClick }
            >
              Borrar
            </Button>
          </DialogActions>
        </Dialog>
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
              &#8288; { statusTemplate() }
            </ListItemText> 
          </Grid>
        </MenuItem>
      </Menu>
    </Grid>
  )
}

export default withStyles(styles)(TabMenu);
