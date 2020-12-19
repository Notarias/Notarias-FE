
import React                        from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';
import StatusRadioButton              from '../index/statusRadioButton';
import IconButton                     from '@material-ui/core/IconButton';
import MoreVertIcon                   from '@material-ui/icons/MoreVert';
import Menu                         from '@material-ui/core/Menu';
import FormControl                    from '@material-ui/core/FormControl';
import Select                         from '@material-ui/core/Select';
import MenuItem                       from '@material-ui/core/MenuItem';
import InputLabel                     from '@material-ui/core/InputLabel';
import AddBoxIcon                   from '@material-ui/icons/AddBox';
import Divider                      from '@material-ui/core/Divider';
import TextField                    from '@material-ui/core/TextField';
import DeleteForeverIcon              from '@material-ui/icons/DeleteForever';


import Dialog                                                   from '@material-ui/core/Dialog';
import DialogContent                                            from '@material-ui/core/DialogContent';
import DialogTitle                                              from '@material-ui/core/DialogTitle';
import DialogActions                                            from '@material-ui/core/DialogActions';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';




const FieldsGroupMenu = (props) => {

  const { classes, groupName, active, changeStatus, addNewField } = props

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openB, setOpenB] = React.useState(false);

  let open = Boolean(anchorEl);

  const handleClickOpen = () => {
    setOpenB(true);
  }

  const handleClose = () => {
    setOpenB(false);
  };

  const handleClickOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleCloseMenu = () => {
    setAnchorEl(null)
  };


  return(
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={ handleClickOpenMenu }
        // className={ selected ? classes.activeMenuTab : classes.menuTabDefault }
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        keepMounted
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleCloseMenu }
      >
        <MenuItem>
          <ListItemIcon>
            <DeleteForeverIcon className={ classes.defaultIcon }/>
          </ListItemIcon>
          <ListItemText primary="Borrar" />
        </MenuItem>
        <Divider/>
        <MenuItem>
          <StatusRadioButton
            active={ active }
            changeStatus= { changeStatus }
          />
        </MenuItem>
        <Divider/>
        <MenuItem>
          <ListItemIcon>
            <AddBoxIcon className={ classes.defaultIcon }  onClick={ handleClickOpen}/>
          </ListItemIcon>
          <ListItemText primary="Campo" onClick={ handleClickOpen}/>
          <Dialog open={openB} onClose={ handleClose }>
            <DialogTitle>
              Añade un campo al grupo { groupName }
            </DialogTitle>
            <DialogContent>
              <Grid container direction="row">
                <Grid container item xs={6}>
                  <TextField 
                    id="fieldName" 
                    label="Editar nombre"
                    className={ classes.textInputTittleName }
                    // value={ fieldName }
                    // onChange={ handleFieldNameChange }
                  />
                </Grid>
                <Grid container item xs={1}>
                </Grid>
                <Grid container item xs={5}>
                  <FormControl variant="outlined" className={ classes.textFieldTittleType }>
                    <InputLabel id="label-field">Selecciona el tipo de campo</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      name='style'
                      // value={ style }
                      // onChange={ handleStyleChange }
                    >
                      <MenuItem key='string' value={'string'}>Texto</MenuItem>
                      <MenuItem key='number' value={'number'}>Numerico</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid container direction="row" justify="flex-end">
                <Button onClick={ handleClose } color="secondary" >
                  Cancelar
                </Button>
                <Button 
                  onClick={ addNewField } 
                  color="primary"
                  variant="contained"
                >
                  "Añadir campo"
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </Menu>
    </>
  )
}

export default  withStyles(styles)(FieldsGroupMenu);
