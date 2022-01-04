import React, { useState, useEffect } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import { styles }                   from './../styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'react-calendar/dist/Calendar.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import EditDialog from '../editDialog/index';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries_and_mutations/queries';

const EventList = (props) => {

  const { classes, appointment } = props

  const [creatorUser, setCreatorUser] = useState();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { loading, error, data } = useQuery(GET_USER, { variables: { "id": appointment.creatorId }})
  useEffect(() => {
    setCreatorUser(data.user);
  }, [data]);

  const handleClickOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = (value) => {
    setOpenEditDialog(false);
  };
  console.log(appointment)
  return(
    creatorUser ? 
    <Grid className={classes.paddingBottomEvent}>
      <Paper className={classes.marginRightCalendarPaper}>
        <Grid container direction='row' xs={12}>
            <Grid container item direction='row' xs={2}>
              <Grid container item xs={5} justifyContent='center' alignContent='center'>
                <Avatar alt={creatorUser.firstName} src={creatorUser.avatarThumbUrl} />
              </Grid>
              <Grid container item xs={7} direction='column' justifyContent='center' alignContent='center'>
                <Grid container item alignContent='flex-start'>
                  <Typography variant='subtitle2'>
                    {creatorUser.firstName}
                  </Typography>
                </Grid>
                <Grid container item alignContent='flex-start'>
                  <Typography variant='subtitle2'>
                    {creatorUser.lastName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>            
            <Grid container item xs={2} direction='column'>
              <Grid item>
                <Typography variant='subtitle2'>
                  Ubicacion
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2'>
                  {!appointment ? <CircularProgress size={ "40px" }/> : appointment.place}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={3} direction='column'>
              <Grid container item direction='row'>
                <Grid item xs={4}>
                  <Typography variant='subtitle2'>
                    Inicio:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant='caption' className={classes.centerText}>
                  {!appointment ? <CircularProgress size={ "40px" }/> : appointment.initDate}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item direction='row'>
                <Grid item xs={4}>
                  <Typography variant='subtitle2'>
                    Final:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant='caption' className={classes.centerText}>
                  {!appointment ? <CircularProgress size={ "40px" }/> : appointment.endDate}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.centerText}>
              {!appointment ? <CircularProgress size={ "40px" }/> : appointment.extraData}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" color="primary" onClick={handleClickOpenEditDialog}>
                <EventNoteIcon/>
              </Button>
              <EditDialog handleCloseEditDialog={handleCloseEditDialog} openEditDialog={openEditDialog}/>
            </Grid>
        </Grid>
      </Paper>
    </Grid>
    :
    <CircularProgress size={ "40px" }/>
  )
}
export default withStyles(styles)(EventList);