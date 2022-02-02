import React, { useEffect, useState }    from 'react'
import Grid                              from '@material-ui/core/Grid';
import { useQuery }                      from '@apollo/client';
import { GET_APPOINTMENTS }              from '../index_queries_and_mutations/queries';
import Appointment                       from './appointment_dashboard/appointment';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const AppointmentsDashboard = (props) => {
  const [sortField]     = useState("created_at");
  const [sortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [per]           = useState(10);
  const [appointments, setAppointments] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const  { loading, data } = useQuery(
    GET_APPOINTMENTS, { variables: variables, fetchPolicy: "cache-and-network" }
  );

  useEffect( () =>{
    data && appointments.length === 0 && setAppointments(data.appointments)
  }, [data])

  return(
    <Grid container item direction='column' alignItems="stretch"  justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      {appointments.length > 0 ?
        appointments && appointments.map((appointment) => {
          return <Appointment appointment={appointment}/>
        })
      :
        <Paper>
          <Typography>
            No hay reuniones por el momento
          </Typography>
        </Paper>
      }
    </Grid>
  )
}

export default AppointmentsDashboard;
