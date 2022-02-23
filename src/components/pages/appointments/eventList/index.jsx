import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './../styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'react-calendar/dist/Calendar.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditAppointmentDialog from './../edit/edit_appointment_dialog';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_USER } from '../queries_and_mutations/queries';
import { GET_APPOINTMENTS } from '../queries_and_mutations/queries';
import { DESTROY_APPOINTMENT } from '../queries_and_mutations/queries'

const formatDate = (value, separator='/') => {
  let newDate = new Date(value)
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();

  return (
    `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} -
     ${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
  )
}

const EventList = (props) => {

  const { classes, appointment, getAppointmensVariables } = props

  const [creatorUser, setCreatorUser] = useState();
  const [editDialog, setEditDialog] = useState(false);
  const [assigneList, setAssigneList] = useState(false);
  const [moreActions, setMoreActions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [initDate] = useState(appointment.initDate);
  const [endDate] = useState(appointment.endDate);

  const { data } = useQuery(GET_USER, { variables: { "id": appointment.creatorId }})
  useEffect(() => {
    setCreatorUser(data && data.user);
  }, [data]);

  const [destroyAppointment] =
  useMutation(
    DESTROY_APPOINTMENT,
    {
      onCompleted(cacheData) {
        closeMoreActions();
      },
      refetchQueries: [
        {
          query: GET_APPOINTMENTS,
          variables: getAppointmensVariables
        },
      ],
      awaitRefetchQueries: true
    }
  )

  const deleteAppointment = () => {
    destroyAppointment( {
      variables: {
        id: appointment.id
      }
    })
  }

  const openEditDialog = () => {
    setEditDialog(true);
    setMoreActions(false);
    setAnchorEl(null);
  };

  const closeEditDialog = (value) => {
    setEditDialog(false);
  };
  
  const openAssigneList = (event) => {
    setAnchorEl(event.currentTarget);
    setAssigneList(true);
  };

  const closeAssigneList = () => {
    setAssigneList(false);
    setAnchorEl(null);
  };
  
  const openMoreActions = (event) => {
    setAnchorEl(event.currentTarget);
    setMoreActions(true);
  };

  const closeMoreActions = () => {
    setMoreActions(false);
    setAnchorEl(null);
  };

  return(
    creatorUser ? 
    <Grid className={classes.paddingBottomEvent}>
      <Paper className={classes.marginRightCalendarPaper}>
        <Grid container direction='row' spacing={1}>
          <Grid container item direction='row' xs>
            <Grid container item xs={4} justifyContent='center' alignContent='center'>
              <Avatar alt={creatorUser.firstName} src={creatorUser.avatarThumbUrl} />
            </Grid>
            <Grid container item xs direction='column' justifyContent='center' alignContent='center'>
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
          <Grid container item xs direction='column'>
            <Grid item>
              <Typography variant='subtitle2'>
                Ubicación
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2'>
                {!appointment ? <CircularProgress size={ "40px" }/> : appointment.place}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs direction='column'>
            <Grid container item direction='row'>
              <Grid item xs>
                <Typography variant='subtitle2'>
                  Inicio:
                </Typography>
              </Grid>
              <Grid container item xs={8} justifyContent='flex-start'>
                <Typography variant='caption' className={classes.centerText}>
                  {!appointment ? <CircularProgress size={ "40px" }/> : formatDate(initDate)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs item direction='row'>
              <Grid item xs>
                <Typography variant='subtitle2'>
                  Final:
                </Typography>
              </Grid>
              <Grid container item xs={8} justifyContent='flex-start'>
                <Typography variant='caption' className={classes.centerText}>
                  {!appointment ? <CircularProgress size={ "40px" }/> : formatDate(endDate)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Typography variant='caption' className={classes.centerText}>
              {!appointment ? <CircularProgress size={ "40px" }/> : `${appointment.extraData.substr(0,40)}...`}
            </Typography>
          </Grid>
          <Grid container item xs={2} justifyContent='flex-end'>
            <Button aria-controls="assigned-list" aria-haspopup="true" onClick={openAssigneList}>
              <AvatarGroup max={3}>
                {appointment.users.map((user) => {
                  return(<Avatar key={user.id} alt={user.fullName} src={user.avatarThumbUrl} />)
                })}
              </AvatarGroup>
            </Button>
            <Menu
              id="assigned-list"
              anchorEl={anchorEl}
              keepMounted
              open={assigneList}
              onClose={closeAssigneList}
            >
              {appointment.users.map((user) => {
                return(
                  <MenuItem key={`invitee-list-${appointment.id}-user-${user.id}`}>
                    <Chip
                      key={user.id}
                      avatar={<Avatar alt={user.firstName} src={user.avatarThumbUrl} />}
                      label={`${user.firstName} ${user.lastName}`}
                      variant="outlined"
                    />
                  </MenuItem>
                )
              })}
            </Menu>
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="moreActions" aria-controls="more-actions" aria-haspopup="true" onClick={openMoreActions}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="more-actions"
              anchorEl={anchorEl}
              keepMounted
              open={moreActions}
              onClose={closeMoreActions}
            >
              <MenuItem onClick={openEditDialog}>
                <ListItemIcon>
                  <EventNoteIcon fontSize="small" color='primary'/>
                </ListItemIcon>
                <ListItemText primary="Editar" />
              </MenuItem>
              <MenuItem onClick={deleteAppointment}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color='secondary'/>
                </ListItemIcon>
                <ListItemText primary="Eliminar" />
              </MenuItem>
            </Menu>
            <Dialog onClose={closeEditDialog} aria-labelledby="simple-dialog-title" open={editDialog}>
              <EditAppointmentDialog closeEditDialog={closeEditDialog} appointment={appointment} getAppointmensVariables={getAppointmensVariables} />
            </Dialog>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
    :
    <CircularProgress size={ "40px" }/>
  )
}
export default withStyles(styles)(EventList);
