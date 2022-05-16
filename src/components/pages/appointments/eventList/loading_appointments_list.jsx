import React                                from 'react';
import Skeleton                             from '@material-ui/lab/Skeleton';
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid';
import Typography                           from '@material-ui/core/Typography';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';

const LoadingAppointmentsList = (props) => {

  const { classes } = props

  return(
    <Grid className={classes.paddingBottomEvent}>
      <Paper className={classes.marginRightCalendarPaper}>
        <Grid container direction='row'>
          <Grid container item direction='row' xs>
            <Grid container item xs={4} justifyContent='center' alignContent='center'>
              <Skeleton variant="circle" width={50} height={50} />
            </Grid>
            <Grid container item xs direction='column' justifyContent='center' alignContent='center'>
              <Grid container item alignContent='flex-start'>
                <Grid item xs>
                  <Skeleton variant="text" />
                </Grid>
              </Grid>
              <Grid container item alignContent='flex-start'>
                <Grid item xs>
                  <Skeleton variant="text" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>            
          <Grid container item xs direction='column'>
            <Grid item>
              <Typography variant='body2'>
                <Skeleton variant="rect" width='100%' height={50} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs direction='column'>
            <Grid container item>
              <Grid item xs>
                <Typography variant='caption' className={classes.centerText}>
                  <Skeleton variant="text" />
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs>
              <Grid item xs>
                <Typography variant='caption' className={classes.centerText}>
                  <Skeleton variant="text" />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Typography variant='caption' className={classes.centerText}>
              <Skeleton variant="rect" width='100%' height={50} />
            </Typography>
          </Grid>
          <Grid container item xs={2} justifyContent='flex-end'>
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="circle" width={40} height={40} />
          </Grid>
          <Grid item xs={1}>
            <Skeleton variant="circle" width={40} height={40} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
export default withStyles(styles)(LoadingAppointmentsList);
