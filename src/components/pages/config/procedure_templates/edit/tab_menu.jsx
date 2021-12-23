
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
  const [id] = React.useState(props.id);
  const [name, setName] = React.useState(props.name);
  const [editing, setEditing] =  React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [setUpdateLoading] = React.useState(false)

  const [error, setError] = React.useState(false)
  const inputsList = ["name"]

  const [updateProceduresTemplateTabMutation] =
  useMutation(
    UPDATE_PROCEDURES_TEMPLATE_TAB,
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
        query: GET_PROCEDURES_TEMPLATE_TABS,
        variables: { "proceduresTemplateId": proceduresTemplateId },
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
    setUpdateLoading(true)
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
        <ListItemText >
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

  return (
    <Grid className={ markStatus() } container alignItems="center" justifyContent="flex-start">
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
        <MenuItem key="budgetingTabMenu1" className={ classes.tittleTabMenu } >
          { editing ? renderTittleTextTab() : renderTittleInputTab() }
        </MenuItem>
        <Divider/>
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
        <Divider/>
        <MenuItem key="budgetingTabMenu3">
          <Grid container item alignItems="center" >
            <StatusRadioButton
                active={ active }
                changeStatus= { changeStatus }
              />
          </Grid>
      </MenuItem>
      </Menu>
    </Grid>
  )
}

export default withStyles(styles)(TabMenu);
