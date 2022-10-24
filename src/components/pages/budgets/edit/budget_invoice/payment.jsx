import React                                 from 'react';
import Grid                                  from '@material-ui/core/Grid';
import Typography                            from '@material-ui/core/Typography';

export default () => {

  return(
    <Grid container item justifyContent="flex-start" alignItems="flex-start" style={{paddingTop: '10px', paddingBottom: '10px'}}>
      <Typography variant="subtitle2"> Informacion Bancaria </Typography>
    </Grid>
  )
}
