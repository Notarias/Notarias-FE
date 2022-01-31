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
import Box from '@material-ui/core/Box';

const AppointmentsIndex = (props) => {
  const { classes } = props

  const [sortField]         = useState();
  const [sortDirection]     = useState();
  const [searchField]       = useState();
  const [searchValue  ]     = useState("");
  const [page]              = useState(1);
  const [per]               = useState(100);
  const [date, setDate]                 = useState(new Date());
  const [appointmentList, setAppointmentsList]   = useState();
  const [newDialog, setNewDialog] = useState(false);

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
    setAppointmentsList(data && data.appointments);
    refetch(variables)
  }, [page, per, sortField]);

  useEffect(() => {
    if(data && data.appointments.length) {
      setAppointmentsList(data && data.appointments)
    }
  }, [data && data.appointments.length])

  const openNewDialog = () => {
    setNewDialog(true);
  };

  const closeNewDialog = (value) => {
    setNewDialog(false);
  };
  
  const selectDay = (event) => {
    setDate(event)
  };

  return(
    <Grid>
      <Grid container spacing={3} style={ { paddingTop: "30px", paddingBottom: "30px" } }>
        <Grid item xs={4}></Grid>
        <Grid item xs={8} container justifyContent="flex-start">
          <Box color="primary.main">
            <Typography variant="h4" component="h2" >{date.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}</Typography>
          </Box>
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
              <NewAppointmentDialog closeNewDialog={closeNewDialog} variables={variables}/>
            </Dialog>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Grid className={classes.windowScrollEventList}>
            {
              data && data.appointments.length ?
                data.appointments.map(appointment  => {
                  return(<EventList key={`dashboard-appointment-${appointment.id}`} appointment={appointment}/>)
                }) :
                <Paper style={{ padding: "30px" }}>
                  <Typography variant='h4'>Sin Eventos</Typography>
                </Paper>
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default withStyles(styles)(AppointmentsIndex);
