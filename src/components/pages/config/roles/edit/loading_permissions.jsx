import React          from 'react';
import Grid           from '@material-ui/core/Grid';
import Skeleton       from '@material-ui/lab/Skeleton';

const LoadingPermissions = () => {

  return(
    <>
      <Grid container item xs justifyContent='flex-start' alignContent='center' style={{paddingTop: '10px', paddingLeft: '20%'}}>
        <Grid item>
          <Skeleton variant="rect" width={200} height={20} />
        </Grid>
      </Grid>
      <Grid container item xs justifyContent='flex-end' style={{paddingTop: '10px', paddingRight: '20%'}}>
        <Grid item>
          <Skeleton variant="rect" width={50} height={20} />
        </Grid>
      </Grid>
    </>
  )
}

export default LoadingPermissions;
