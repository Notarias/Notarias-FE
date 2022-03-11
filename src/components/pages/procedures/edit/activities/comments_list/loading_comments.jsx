import React                                from 'react'
import Grid                                 from '@material-ui/core/Grid';
import Skeleton                             from '@material-ui/lab/Skeleton';

const LoadingComments = () => {

  return(
    <Grid container direction="row" justifyContent='center' style={{marginTop: '10px'}}>
      <Grid container item xs={11} justifyContent="flex-start" alignItems="flex-start">
        <Grid container item direction="row" spacing={2} justifyContent="flex-start">
          <Grid item xs>
            <Skeleton variant="circle" width={40} height={40} />
          </Grid>
          <Grid container item xs={8} direction='column' alignContent='left'>
            <Grid item>
              <Skeleton variant="text" />
            </Grid>
            <Grid item>
              <Skeleton variant="text" />
            </Grid>
          </Grid>
          <Grid item xs>
            
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="flex-start" style={{marginTop: '5px'}}>
          <Grid container item xs={12} justifyContent="flex-start">
            <Skeleton variant="rect" width= '100%' height={100} />
          </Grid>
          <Grid container item direction="row" xs={12} spacing={2} justifyContent="flex-start" style={{marginTop: '5px'}}>
            <Grid item>
              <Skeleton variant="rect" width={80} height={30} />
            </Grid>
            <Grid item>
              <Skeleton variant="rect" width={80} height={30} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LoadingComments;
