import React              from 'react';
import Grid               from '@material-ui/core/Grid';
import Button             from '@material-ui/core/Button';
import MoreVertIcon       from '@material-ui/icons/MoreVert';
import FormControlLabel   from '@material-ui/core/FormControlLabel';
import Switch             from '@material-ui/core/Switch';
import IconButton         from '@material-ui/core/IconButton';
import Menu               from '@material-ui/core/Menu';
import MenuItem           from '@material-ui/core/MenuItem';


const dotsMenu  = ({
    deleteAttrClick,
    handleActiveChange,
    active,
    createNewAttribute,
    updateAttribute,
    id,
    loadingAttr,
  })=> {

  const [anchorEl, setAnchorEl] = React.useState(null) 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  let open = Boolean(anchorEl);

  return (
    <Grid container item justify="flex-end" alignItems="center">
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
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
        <MenuItem>
          <Button 
          onClick={ id ?  updateAttribute : createNewAttribute }
          disabled={ loadingAttr }
          >
            Guardar
          </Button>
        </MenuItem>
        <MenuItem>
          <Button 
          onClick={ deleteAttrClick }
          >
              borrar
          </Button>
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            value="top"
            control={<Switch color="primary" onChange={ handleActiveChange } checked={ active } />}
            labelPlacement="top"
          />
        </MenuItem>
      </Menu>
    </Grid>
  );
}
export default dotsMenu;