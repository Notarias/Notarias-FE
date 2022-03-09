import React, { useEffect, useState }    from 'react'
import Grid                              from '@material-ui/core/Grid';
import Fade                               from '@material-ui/core/Fade';
import { useQuery }                      from '@apollo/client';
import { GET_APPOINTMENTS }              from '../index_queries_and_mutations/queries';
import Appointment                       from './appointments_dashboard/appointment';
import LoadingAppointments               from './appointments_dashboard/loading_appointments';
import Typography                        from '@material-ui/core/Typography';
import Paper                             from '@material-ui/core/Paper';

const AppointmentsDashboard = (props) => {
  const [sortField]     = useState("created_at");
  const [sortDirection] = useState("desc");
  const [page] = useState(1);
  const [per]           = useState(10);
  const [array] = useState([1,2,3,4,5,6,7,8,9]);
  const [appointments, setAppointments] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const  { loading, data } = useQuery(
    GET_APPOINTMENTS, { variables: variables, fetchPolicy: "no-cache" }
  );

  useEffect( () => {
    data && appointments.length === 0 && setAppointments(data.appointments)
  }, [loading, data])

  return(
    <Grid container item direction='column' alignItems="stretch"  justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      { loading || !data ?
        array.map((index) => {
          return(
            <Grid item key={`appointLoading-${index}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
              <LoadingAppointments/>
            </Grid>
          )
        })
      :
        appointments && appointments ?
          appointments.map((appointment) => {
            return(
              <Fade in={!!appointment}>
                <Grid item key={`${appointment.__typename}-${appointment.id}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
                  <Appointment appointment={appointment}/>
                </Grid>
              </Fade>
            )
          })
        :
          <Paper>
            <Typography variant='h4' style={{padding: "20px"}}>
              No hay reuniones registradas por el momento
            </Typography>
          </Paper>
      }
    </Grid>
  )
}

export default AppointmentsDashboard;
