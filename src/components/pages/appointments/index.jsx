import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NewAppointmentDialog from './new/new_appointment_dialog';
import EventList from './eventList/index';
import { useQuery } from '@apollo/client';
import { GET_APPOINTMENTS } from './queries_and_mutations/queries';

const AppointmentsIndex = (props) => {
  const { classes } = props

  const [sortField, setSortField]         = useState();
  const [sortDirection, setSortDirection] = useState();
  const [searchField]                     = useState();
  const [searchValue, setSearchValue]     = useState("");
  const [page, setPage]                   = useState(1);
  const [per, setPer]                     = useState(100);
  const [events, setEvents]               = useState();
  const [fecha, setFecha]                 = useState();
  const [appointmentList, getAppointmentsList]   = useState();

  let variables = {
    page: page,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  };

  const { loading, data, refetch } = useQuery(
    GET_APPOINTMENTS, { variables: variables }
  );

  useEffect(() => {
    getAppointmentsList(data && data.appointments);
    refetch(variables)
  }, [page, per, sortField]);

  const [date, setDate] = useState(new Date());
  const [newDialog, setNewDialog] = useState(false);

  const openNewDialog = () => {
    setNewDialog(true);
  };

  const closeNewDialog = (value) => {
    setNewDialog(false);
  };
  
  const selectDay = (event) => {
    setFecha(event)
  };

  return(
    <Grid>
      <h1>Appointments</h1>
      <Grid container spacing={3}>
        <Grid item xs={4}></Grid>
        <Grid item xs={8} container justifyContent="flex-start">
          <Typography variant="h4" component="h2" >Fecha</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} >
        <Grid item xs={4}>
          <Paper className={classes.marginLeftCalendarPaper} >
            <Typography variant="h4" component="h2">Calendar</Typography>
            <Grid container justifyContent="center" >
              <Calendar
                onChange={selectDay}
                value={date}
              />
            </Grid>
            <Grid className={classes.calendarNew}>
              <Grid >
                <Button variant="contained" color="primary" onClick={openNewDialog}>
                  Nuevo Evento
                </Button>
              </Grid>
            </Grid>
            <Dialog onClose={closeNewDialog} aria-labelledby="simple-dialog-title" open={newDialog}>
              <NewAppointmentDialog closeNewDialog={closeNewDialog}/>
            </Dialog>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Grid className={classes.windowScrollEventList}>
            {
              appointmentList && appointmentList.map( appointment  => {
                return <EventList appointment={appointment} key={appointment.id}/>
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default withStyles(styles)(AppointmentsIndex);