import React, { useState }                  from 'react';
import Skeleton                             from '@material-ui/lab/Skeleton';
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid';
import Typography                           from '@material-ui/core/Typography';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from './styles';

const LoadingAppointments = (props) => {

  const { classes } = props
  const [array] = useState([1,2,3,4,5,6,7,8,9])

  return( 
    <>
      <Grid container style={ { paddingTop: '30px', paddingBottom: '30px' } }>
        <Grid item xs container justifyContent='center'>
          <Skeleton variant="rect" width={400} height={50} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <Paper>
            <Grid container justifyContent='center' style={{paddingTop:'20px', paddingBottom:'20px'}}>
              <Skeleton variant="rect" width={150} height={50} />
            </Grid>
            <Grid container justifyContent='center' >
              <Skeleton variant="rect" width={350} height={265} />
            </Grid>
            <Grid container justifyContent='center' style={{paddingTop:'20px', paddingBottom:'20px'}}>
              <Skeleton variant="rect" width={150} height={50} />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          {
            array.map((index) => {
              return(
                <Grid key={`loadingAppointmen-${index}`} className={classes.paddingBottomEvent}>
                  <Grid className={classes.paddingBottomEvent}>
                    <Paper className={classes.marginCalendarPaper}>
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
                            <Grid container item alignContent='center'>
                              <Grid item xs>
                                <Skeleton variant="text" />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>            
                        <Grid container item xs direction='column' style={{paddingLeft:'15px', paddingRight:'15px'}}>
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
                        <Grid item xs style={{paddingLeft:'15px', paddingRight:'15px'}}>
                          <Typography variant='caption' className={classes.centerText}>
                            <Skeleton variant="rect" width='100%' height={50} />
                          </Typography>
                        </Grid>
                        <Grid container item xs={2} justifyContent='center' alignContent='center'>
                          <Skeleton variant="circle" width={40} height={40} />
                          <Skeleton variant="circle" width={40} height={40} />
                          <Skeleton variant="circle" width={40} height={40} />
                        </Grid>
                        <Grid container item xs={1} justifyContent='flex-end' alignContent='center'>
                          <Skeleton variant="circle" width={40} height={40} />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(LoadingAppointments);
