import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import { useQuery }                   from '@apollo/client';
import { GET_PROCEDURES }             from '../index_queries_and_mutations/queries';
import Procedure                      from './procedures_dashboard/procedure';
import Typography                     from '@material-ui/core/Typography';
import Paper                          from '@material-ui/core/Paper';

const ProceduresDashboard = (props) => {
  const [searchLoading] = useState(false);
  const [sortField]     = useState("serial_number");
  const [sortDirection] = useState("desc");
  const [page] = useState(1);
  const [per]           = useState(10);
  const [procedures, setProcedures] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField,
    searchLoading: searchLoading
  }   

  const  { data } = useQuery(
    GET_PROCEDURES, { variables: variables, fetchPolicy: "no-cache" }
  );
  
  useEffect( () =>{
    data && procedures.length === 0 && setProcedures(data.procedures)
  }, [data])

  return(
    <Grid container item direction='column' alignItems="stretch"  justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      {procedures.length > 0 ?
        procedures && procedures.map((procedure) => {
          return(
            <Grid item key={`${procedure.__typename}-${procedure.id}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
              <Procedure procedure={procedure}/>
            </Grid>
          )
        })
      :
        <Paper>
          <Typography variant='h4' style={{padding: "20px"}}>
            No hay trámites registrados por el momento
          </Typography>
        </Paper>
      }
    </Grid>
  )
}

export default ProceduresDashboard;
