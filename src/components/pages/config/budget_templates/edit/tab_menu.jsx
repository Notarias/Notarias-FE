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


const TabMenu = (props) => {
  const { classes, budgetingTemplateId, selected, active } = props;
  const [id, setId] = React.useState(props.id);
  const [name, setName] = React.useState(props.name);
  const [editing, setEditing] =  React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClose = () => {
    setAnchorEl(null)
  };

  let open = Boolean(anchorEl);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const renderTittleTextTab = () => {

    return(
      <>
        <ListItemIcon>
          <CreateIcon className={ classes.defaultIcon }/>
        </ListItemIcon>
        <Typography noWrap>
          { name }
        </Typography>
      </>
    )
  }

  const renderTittleInputTab = () => {

    return(
      <>
        <ListItemIcon>
          <SaveIcon color="primary" className={ classes.defaultIcon }/>
        </ListItemIcon>
        <ListItemText>
          <TextField
            className={ classes.inputSmall }
            size="small"
            id="standard-basic" 
            label="&#8288;Nombre"
            value={ name }
            onChange={ handleNameChange }
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
    <Grid className={ markStatus() } container alignItems="center" justify="flex-start">
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        disabled={ !selected }
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
        <MenuItem className={ classes.tittleTabMenu }>
          { editing ? renderTittleTextTab() : renderTittleInputTab() }
        </MenuItem>
        <Divider/>
        <MenuItem >
          <ListItemIcon >
            <DeleteForeverIcon className={ classes.defaultIcon } />
          </ListItemIcon>
          <ListItemText primary="Borrar"/>
        </MenuItem>
        <Dialog
          open={openDialog}
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
            <Button color="secondary">
              Cancelar
            </Button>
            <Button
              color="primary"
              autoFocus
            >
              Borrar
            </Button>
          </DialogActions>
        </Dialog>
        <Divider/>
        <MenuItem>
          <Grid container item alignItems="center" >
          </Grid>
        </MenuItem>
      </Menu>
    </Grid>
  )
}

export default withStyles(styles)(TabMenu);
