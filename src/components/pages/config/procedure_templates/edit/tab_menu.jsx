
import React, { useEffect }                       from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Typography                   from '@material-ui/core/Typography';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';
import IconButton                   from '@material-ui/core/IconButton';
import Menu                         from '@material-ui/core/Menu';
import MenuItem                     from '@material-ui/core/MenuItem';
import MoreVertIcon                 from '@material-ui/icons/MoreVert';
import TextField                    from '@material-ui/core/TextField';
import SaveIcon                           from '@material-ui/icons/Save';
import CreateIcon                         from '@material-ui/icons/Create'
import { useMutation }                    from '@apollo/react-hooks';
import { GET_PROCEDURES_TEMPLATE_TABS }         from '../queries_and_mutations/queries'
import { UPDATE_PROCEDURES_TEMPLATE_TAB }     from '../queries_and_mutations/queries'
import Divider                      from '@material-ui/core/Divider';
import DeleteForeverIcon              from '@material-ui/icons/DeleteForever';
import StatusRadioButton              from '../index/statusRadioButton';

import Dialog                                                   from '@material-ui/core/Dialog';
import DialogContent                                            from '@material-ui/core/DialogContent';
import DialogTitle                                              from '@material-ui/core/DialogTitle';
import DialogActions                                            from '@material-ui/core/DialogActions';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';



//TODO: hacer el refetch del update mutation


const TabMenu = (props) => {
  const { classes, proceduresTemplateId, selected, active } = props;
  const [id, setId] = React.useState(props.id);
  const [name, setName] = React.useState(props.name);
  const [editing, setEditing] =  React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  // const [status, setStatus] = React.useState(procedureTemplate.active);

  // useEffect(
  //   () => {
  //     setName(templateData.name)
  //   },
  //   [templateData]
  // )

  const [updateProceduresTemplateTabMutation, updateProcessInfo] =
  useMutation(
    UPDATE_PROCEDURES_TEMPLATE_TAB,
    {
      // onError(apolloError) {
      //   setErrors(apolloError)
      // },
      onCompleted(cacheData) {
        // setError(false)
        // setEditing(!editing)
      },
      refetchQueries: [{
        query: GET_PROCEDURES_TEMPLATE_TABS,
        variables: { "proceduresTemplateId": proceduresTemplateId },
      }],
    }
  )

  // const statusTemplate = () => { 
  //   return status ? "Desactivar" : "Activar"
  // }


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

  const updateTab = (event) => {
    updateProceduresTemplateTabMutation(
      { 
        variables: { id: id , name: name},
        fetchPolicy: "no-cache"
      }
    )
    setEditing(!editing)
  }

  const changeStatus = (event) => {
    updateProceduresTemplateTabMutation(
      { 
        variables: { id: id , active: !active},
        fetchPolicy: "no-cache"
      }
    )
  }



  const loadingTab = updateProcessInfo.loading

  const renderTittleTextTab = () => {

    return(
      <>
        <ListItemIcon  onClick={ changeTittle }>
          <CreateIcon className={ classes.defaultIcon }/>
        </ListItemIcon>
        <ListItemText primary={name} onClick={ changeTittle }/>
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
            id="standard-basic" 
            label="&#8288;Nombre"
            value={ name }
            onChange={ handleNameChange }
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
        id="long-menu"
        keepMounted
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
      >
      <MenuItem className={ classes.tittleTabMenu } 
        // onClick={ editing ? changeTittle : updateTab }
      >
        { editing ? renderTittleTextTab() : renderTittleInputTab() }
      </MenuItem>
      <Divider/>
      <MenuItem onClick={ handleClickOpenDialog }>
        <ListItemIcon >
          <DeleteForeverIcon className={ classes.defaultIcon } />
        </ListItemIcon>
        <ListItemText primary="Borrar"/>
      </MenuItem>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar pestaña"}</DialogTitle>
        <DialogContent>
          Se eliminara de manera permantente esta Pestaña
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleCloseDialog } color="secondary">
            Cancelar
          </Button>
          <Button
            color="primary"
            autoFocus
            // onClick={ deleteFieldClick }
          >
            Borrar
          </Button>
        </DialogActions>
      </Dialog>

      <Divider/>
      <MenuItem>
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
