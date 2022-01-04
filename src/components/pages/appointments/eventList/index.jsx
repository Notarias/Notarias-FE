import React, { useState } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import { styles }                   from './../styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'react-calendar/dist/Calendar.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import EditDialog from '../editDialog/index';
import CircularProgress from '@material-ui/core/CircularProgress';

const EventList = (props) => {

  const { classes, appointment } = props

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleClickOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = (value) => {
    setOpenEditDialog(false);
  };


  return(
    <Grid className={classes.paddingBottomEvent}>
      <Paper className={classes.marginRightCalendarPaper}>
        <Grid container spacing={3}>
            <Grid item xs={1}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.centerText}>
              {!appointment ? <CircularProgress size={ "40px" }/> : appointment.attorney}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.centerText}>
              {!appointment ? <CircularProgress size={ "40px" }/> : appointment.ini_date}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.centerText}>
               {!appointment ? <CircularProgress size={ "40px" }/> : appointment.fin_date}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.centerText}>
               {!appointment ? <CircularProgress size={ "40px" }/> : appointment.place}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={handleClickOpenEditDialog}>
                Edit Event
              </Button>
              <EditDialog handleCloseEditDialog={handleCloseEditDialog} openEditDialog={openEditDialog}/>
            </Grid>
          </Grid>
      </Paper>
    </Grid>
  )

}
export default withStyles(styles)(EventList);