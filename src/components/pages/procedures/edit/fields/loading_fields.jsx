import React                                from 'react'
import Grid                                 from '@material-ui/core/Grid';
import Skeleton                             from '@material-ui/lab/Skeleton';

const LoadingFields = () => {

  return(
    <Grid container direction="row" justifyContent='center' style={{marginTop: '10px'}}>
      <Grid container item xs={10} justifyContent="flex-start" alignItems='center'>
        <Grid item xs>
          <Skeleton variant="rect" width='100%' height={40}/>
        </Grid>
      </Grid>
      <Grid container item xs justifyContent="center">
        <Grid item>
          <Skeleton variant="circle" width={45} height={45} />
        </Grid>
      </Grid>
      <Grid container item xs justifyContent="center">
        <Grid item>
          <Skeleton variant="circle" width={45} height={45} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LoadingFields;
