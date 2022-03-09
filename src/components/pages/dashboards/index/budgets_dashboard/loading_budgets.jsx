import React                            from 'react'
import Grid                             from '@material-ui/core/Grid';
import Paper                            from '@material-ui/core/Paper';
import Skeleton                         from '@material-ui/lab/Skeleton';
import Divider                          from '@material-ui/core/Divider';

const LoadingBudgets = () => {
  return (
    <Paper style={{height: "140px"}}>
      <Grid container item xs={12} direction='row' style={{padding: "10px"}}>
        <Grid container item xs={6} justifyContent='flex-start' style={{ paddingTop: "10px", paddingLeft: "20px"}}>
            <Skeleton width="30%"/>
        </Grid>
        <Grid container item xs={6} direction='row' justifyContent='flex-end' style={{paddingTop: "10px", paddingRight: "20px"}}>
          <Grid item>
            <Skeleton variant="circle" width={35} height={35} style={{marginRight: "10px"}}/>
          </Grid>
          <Grid item xs={2} style={{ marginTop: "5px" }}>
            <Skeleton width="100%"/>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} direction='row' style={{padding: "10px"}}>
        <Grid item xs style={{padding: "10px", paddingLeft: "10px"}}>
          <Skeleton variant="rect" width="100%" heigth={50}/>
          <Skeleton variant="rect" width="100%" heigth={50}/>
        </Grid>
        <Divider orientation="vertical" flexItem/>
        <Grid item xs style={{padding: "10px"}}>
          <Skeleton variant="rect" width="100%" heigth={50}/>
          <Skeleton variant="rect" width="100%" heigth={50}/>
        </Grid>
        <Divider orientation="vertical" flexItem/>
        <Grid item xs style={{padding: "10px"}}>
          <Skeleton variant="rect" width="100%" heigth={50}/>
          <Skeleton variant="rect" width="100%" heigth={50}/>
        </Grid>
        <Divider orientation="vertical" flexItem/>
        <Grid item xs style={{padding: "10px"}}>
          <Skeleton variant="rect" width="100%" heigth={50}/>
          <Skeleton variant="rect" width="100%" heigth={50}/>
        </Grid>
        <Divider orientation="vertical" flexItem/>
        <Grid item xs style={{padding: "10px"}}>
          <Skeleton variant="rect" width="100%" heigth={50}/>
          <Skeleton variant="rect" width="100%" heigth={50}/>
        </Grid>
        <Divider orientation="vertical" flexItem/>
        <Grid item xs style={{padding: "10px"}}>
          <Skeleton variant="rect" width="100%" heigth={50}/>
          <Skeleton variant="rect" width="100%" heigth={50}/>
        </Grid>
        <Divider orientation="vertical" flexItem/>
        <Grid item xs style={{padding: "10px", paddingRight: "10px"}}>
          <Skeleton variant="rect" width="100%" heigth={50}/>
          <Skeleton variant="rect" width="100%" heigth={50}/>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default LoadingBudgets;
