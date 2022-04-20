import React          from 'react';
import Grid           from '@material-ui/core/Grid';
import Skeleton       from '@material-ui/lab/Skeleton';

const LoadingRoleEdit = () => {
  return(
    <>
      <Grid container item xs={6} justifyContent='flex-start'>
        <Skeleton variant="rect" width={250} height={45} />
      </Grid>
      <Grid container item xs={6} justifyContent='flex-end'>
        <Skeleton variant="circle" width={45} height={45} />
      </Grid>
    </>
  )
}

export default LoadingRoleEdit;