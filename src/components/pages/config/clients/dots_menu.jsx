import React              from 'react';
import Grid               from '@material-ui/core/Grid';
import FormControlLabel   from '@material-ui/core/FormControlLabel';
import Switch             from '@material-ui/core/Switch';
import IconButton         from '@material-ui/core/IconButton';
import SaveIcon           from '@material-ui/icons/Save';
import DeleteForeverIcon  from '@material-ui/icons/DeleteForever';


const dotsMenu  = ({
    deleteAttrClick,
    handleActiveChange,
    active,
    createNewAttribute,
    updateAttribute,
    id,
    loadingAttr,
  })=> {

  return (
    <Grid container item justifyContent="flex-end" alignItems="center">
      <Grid item xs={4}>
        <IconButton 
          onClick={ id ?  updateAttribute : createNewAttribute }
          disabled={ loadingAttr }
          color='primary'
        >
          <SaveIcon/>
        </IconButton>
      </Grid>
      <Grid item xs={4}>
        <IconButton 
          onClick={ deleteAttrClick }
          color='secondary'
        > 
          <DeleteForeverIcon/>
        </IconButton>
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          value="top"
          control={<Switch color="primary" onChange={ handleActiveChange } checked={ active } />}
          labelPlacement="top"
        />
      </Grid>
    </Grid>
  );
}
export default dotsMenu;