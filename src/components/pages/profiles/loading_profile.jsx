import React          from 'react';
import Grid           from '@material-ui/core/Grid';
import Paper          from '@material-ui/core/Paper';
import Divider        from '@material-ui/core/Divider';
import Skeleton       from '@material-ui/lab/Skeleton';
import Breadcrumbs    from '../../ui/breadcrumbs';

const BREADCRUMBS = [
  { name: "Loading...", path: "/" },
]

const LoadingProfile = (props) => {
  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider style={{marginBottom: '100px'}}/>
      <Grid container direction='row'justifyContent='center'>
        <Grid item container xs={3} justifyContent='center' alignItems='center'>
          <Grid item container xs={6} direction='column' alignItems='baseline'>
            <Grid item container xs justifyContent='center' style={{paddingBottom:'20px'}}>
            <Skeleton variant="rect" width={200} height={40}/>
            </Grid>
            <Grid item container direction='row' xs justifyContent='center' style={{paddingBottom:'10px'}}>
              <Skeleton variant="circle" width={40} height={40}/>
              <Skeleton variant="rect" width={100} height={40}/>
            </Grid>
            <Grid item container direction='row' xs justifyContent='center'>
              <Skeleton variant="circle" width={40} height={40}/>
              <Skeleton variant="rect" width={100} height={40}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={8} justifyContent='center' alignItems='center'>
          <Paper variant="outlined" style={{padding: '30px'}}>
            <Grid item container xs={12} direction='row' alignItems='center'>
              <Grid item container xs={6} justifyContent='center' style={{paddingRight:'20px'}}>
                <Skeleton variant="circle" width={320} height={320}/>
              </Grid>

              <Grid item container xs={6} justifyContent='center' alignItems='stretch'>
                <Grid item style={{paddingBottom:'10px'}}>
                  <Skeleton variant="rect" width={300} height={30}/>
                </Grid>
                <Grid item style={{paddingBottom:'10px'}}>
                  <Skeleton variant="rect" width={300} height={30}/>
                </Grid>
                <Grid item style={{paddingBottom:'10px'}}>
                  <Skeleton variant="rect" width={300} height={30}/>
                </Grid>
                <Grid item style={{paddingBottom:'10px'}}>
                  <Skeleton variant="rect" width={300} height={30}/>
                </Grid>
                <Grid item style={{paddingBottom:'10px'}}>
                  <Skeleton variant="rect" width={300} height={30}/>
                </Grid>
                <Grid item style={{paddingBottom:'10px'}}>
                  <Skeleton variant="rect" width={300} height={30}/>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default (LoadingProfile);
