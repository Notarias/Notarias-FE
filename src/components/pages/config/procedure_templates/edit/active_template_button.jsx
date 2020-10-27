import React                        from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Button                       from '@material-ui/core/Button';


const ActiveTemplateButton = (props) => {

  const { classes } = props



  return(
    <Button variant="contained" color="primary" size="small" className={ classes.buttonHeight }>
    Activar
  </Button>
  )
}

export default withStyles(styles)(ActiveTemplateButton);
