import React, { useState }       from 'react';
import Breadcrumbs               from '../../ui/breadcrumbs'
import Box                       from '@material-ui/core/Box';
import Dialog                    from '@material-ui/core/Dialog';
import Paper                     from '@material-ui/core/Paper';
import Grid                      from '@material-ui/core/Grid';
import Hidden                    from '@material-ui/core/Hidden';
import Typography                from '@material-ui/core/Typography';
import Button                    from '@material-ui/core/Button';
import Calendar                  from 'react-calendar'
import                           'react-calendar/dist/Calendar.css';
import NewAppointmentDialog      from './new/new_appointment_dialog';
import EventList                 from './eventList/index';
import LoadingAppointments       from './loading_appointments';
import { useQuery }              from '@apollo/client';
import { GET_APPOINTMENTS }      from './queries_and_mutations/queries';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Calendario", path: null }
]

const AppointmentsIndex = (props) => {

  const [sortField]                      = useState("created_at");
  const [sortDirection]                  = useState("desc");
  const [page]                           = useState(1); 
  const [per]                            = useState(10);
  const [searchField]                    = useState("init_date");
  const [searchValue, setSearchValue]    = useState(new Date());
  const [date, setDate]                  = useState(new Date());
  const [newDialog, setNewDialog]        = useState(false);
console.log(new Date())
  let variables = {
    page: page,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  };

  const { loading, data, refetch } = useQuery(
    GET_APPOINTMENTS, { variables: variables, fetchPolicy: 'cache-and-network' }
  );

  const openNewDialog = () => {
    setNewDialog(true);
  };

  const closeNewDialog = (value) => {
    setNewDialog(false);
  };
  
  const selectDay = (event) => {
    setSearchValue(event);
    setDate(event);
    refetch();
  };

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
        { 
          loading ?
            <LoadingAppointments/>
          :
            <>
              <Grid container style={{ paddingLeft:'30px', paddingTop: '30px', paddingBottom: '30px' }}>
                <Grid item xs={4}></Grid>
                <Grid container item xs={8} style={{paddingLeft:'30px', paddingRight:'30px'}}>
                  <Grid container item xs={6} justifyContent='flex-start'>
                    <Grid item>
                      <Box color="primary.main">
                        <Typography variant="h4" component="h2" >
                          Citas del {(date.toLocaleDateString(
                            'es-ES', { month: 'long', day: 'numeric', year: 'numeric' })).toUpperCase()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Hidden smDown>
              <Grid container justifyContent='center' style={{paddingLeft:'30px'}}>
                <Grid item xs={4}>
                  <Paper >
                    <Grid container direction='column' justifyContent='center' alignItems='center'>
                      <Grid item style={{paddingTop:'20px', paddingBottom:'20px'}}>
                        <Typography variant="h4" component="h2">
                          Calendario
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Calendar
                          onChange={selectDay}
                          value={date}
                        />
                      </Grid>
                      <Grid item style={{paddingTop:'20px', paddingBottom:'20px'}}>
                        <Button variant='contained' color='primary' onClick={openNewDialog}>
                          Nuevo Evento
                        </Button>
                      </Grid>
                    </Grid>
                    <Dialog onClose={closeNewDialog} aria-labelledby='simple-dialog-title' open={newDialog}>
                      <NewAppointmentDialog closeNewDialog={closeNewDialog} getAppointmensVariables={variables}/>
                    </Dialog>
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Grid>
                    {data && data.appointments.length > 0 ?
                      data.appointments.map(appointment  => {
                        return(
                          <EventList
                            key={`dashboard-appointment-${appointment.id}`}
                            appointment={appointment}
                            getAppointmensVariables={variables} />)
                      })
                    :
                      <Grid style={{paddingLeft:'30px', paddingRight:'30px'}}>
                        <Paper>
                          <Grid item style={{paddingTop:'20px', paddingBottom:'20px'}}>
                            <Typography variant='h4'>Sin Eventos</Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                    }
                  </Grid>
                </Grid>
              </Grid>
              </Hidden>
              <Hidden mdUp>
              <Grid container direction='column' justifyContent='center'>
                <Grid item xs={12}>
                  <Grid style={{paddingBottom:'30px', paddingLeft:'30px', paddingRight:'30px'}}>
                    <Paper >
                      <Grid container direction='column' justifyContent='center' alignItems='center'>
                        <Grid item style={{paddingTop:'20px', paddingBottom:'20px'}}>
                          <Typography variant="h4" component="h2">
                            Calendario
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Calendar
                            onChange={selectDay}
                            value={date}
                          />
                        </Grid>
                        <Grid item style={{paddingTop:'20px', paddingBottom:'20px'}}>
                          <Button variant='contained' color='primary' onClick={openNewDialog}>
                            Nuevo Evento
                          </Button>
                        </Grid>
                      </Grid>
                      <Dialog onClose={closeNewDialog} aria-labelledby='simple-dialog-title' open={newDialog}>
                        <NewAppointmentDialog closeNewDialog={closeNewDialog} getAppointmensVariables={variables}/>
                      </Dialog>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid>
                    {data && data.appointments.length > 0 ?
                      data.appointments.map(appointment  => {
                        return(
                          <EventList
                            key={`dashboard-appointment-${appointment.id}`}
                            appointment={appointment}
                            getAppointmensVariables={variables} />)
                      })
                    :
                      <Grid style={{paddingLeft:'30px', paddingRight:'30px'}}>
                        <Paper>
                          <Grid item style={{paddingTop:'20px', paddingBottom:'20px'}}>
                            <Typography variant='h4'>Sin Eventos</Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                    }
                  </Grid>
                </Grid>
              </Grid>
              </Hidden>
            </>
        }
    </>
  )
}
export default AppointmentsIndex;
