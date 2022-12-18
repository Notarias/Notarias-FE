
import React, {useState}                                    from 'react';
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
import { useMutation }                          from '@apollo/client';
import { GET_PROCEDURES_TEMPLATE_TABS }         from '../queries_and_mutations/queries'
import { UPDATE_PROCEDURES_TEMPLATE_TAB }       from '../queries_and_mutations/queries'
import { DESTROY_PROCEDURES_TEMPLATE_TAB }      from '../queries_and_mutations/queries'
import Divider                                  from '@material-ui/core/Divider';
import DeleteForeverIcon                        from '@material-ui/icons/DeleteForever';
import StatusRadioButton                        from '../index/statusRadioButton';
import Dialog                                   from '@material-ui/core/Dialog';
import DialogContent                            from '@material-ui/core/DialogContent';
import DialogTitle                              from '@material-ui/core/DialogTitle';
import DialogActions                            from '@material-ui/core/DialogActions';
import ListItemIcon                             from '@material-ui/core/ListItemIcon';
import ListItemText                             from '@material-ui/core/ListItemText';


const TabMenu = (props) => {
  const { classes, proceduresTemplateId, selected, active, setCurrentTab } = props;
  const [id] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState(false);
  const [error, setError] = useState(false);
  const inputsList = ["name"]

  const [updateProceduresTemplateTabMutation] =
  useMutation(
    UPDATE_PROCEDURES_TEMPLATE_TAB,
    {
      onError(apolloError) {
        setErrors(apolloError)
      },
      update(store, cacheData) {
        setError(false);
      },
      onCompleted(store, cacheData) {
        setOpenDialog(false);
      },
      refetchQueries: [{
        query: GET_PROCEDURES_TEMPLATE_TABS,
        variables: { "proceduresTemplateId": proceduresTemplateId },
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
    updateProceduresTemplateTabMutation(
      { 
        variables: { id: id , name: name}
      }
    )
  }

  const changeStatus = (event) => {
    updateProceduresTemplateTabMutation(
      { 
        variables: { id: id , active: !active}
      }
    )
  }

  const [destroyProceduresTemplateTabMutation] =
  useMutation(
    DESTROY_PROCEDURES_TEMPLATE_TAB, 
    {
      refetchQueries: [{
        query: GET_PROCEDURES_TEMPLATE_TABS,
        variables: { "proceduresTemplateId": proceduresTemplateId },
      }],
      awaitRefetchQueries: true
    }
  )

  const deleteTabClick = () => {
    destroyProceduresTemplateTabMutation(
      { variables: { id: id } },
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
        id="long-menu"
        keepMounted
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
      >
        <MenuItem key="budgetingTabMenu1" onClick={openEditDialog} className={ classes.tittleTabMenu } >
        <ListItemIcon>
          <CreateIcon className={classes.defaultIcon}/>
        </ListItemIcon>
          <ListItemText primary="Editar"/>
        </MenuItem>
        <Divider/>
        <MenuItem key="budgetingTabMenu2" onClick={openDeleteDialog}>
          <ListItemIcon >
            <DeleteForeverIcon className={classes.defaultIcon}/>
          </ListItemIcon>
          <ListItemText primary="Borrar"/>
        </MenuItem>
        <Divider/>
        <MenuItem key="budgetingTabMenu3">
          <Grid item>
            <StatusRadioButton
                active={ active }
                changeStatus= { changeStatus }
              />
          </Grid>
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
            { action ? "Guardar" : "Borrar" }
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default withStyles(styles)(TabMenu);
