import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import Fade                               from '@material-ui/core/Fade';
import { useQuery }                   from '@apollo/client';
import { GET_PROCEDURES }             from '../index_queries_and_mutations/queries';
import Procedure                      from './procedures_dashboard/procedure';
import LoadingProcedure               from './procedures_dashboard/loading_procedures';
import Typography                     from '@material-ui/core/Typography';
import Paper                          from '@material-ui/core/Paper';

const ProceduresDashboard = (props) => {
  const [searchLoading] = useState(false);
  const [sortField]     = useState("serial_number");
  const [sortDirection] = useState("desc");
  const [page] = useState(1);
  const [per]           = useState(10);
  const [array] = useState([1,2,3,4,5,6,7,8,9]);
  const [procedures, setProcedures] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField,
    searchLoading: searchLoading
  }   

  const  { loading, data } = useQuery(
    GET_PROCEDURES, { variables: variables, fetchPolicy: "no-cache" }
  );
  
  useEffect( () =>{
    data && procedures.length === 0 && setProcedures(data.procedures)
  }, [loading, data])

  return(
    <Grid container item direction='column' alignItems="stretch"  justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      { loading || !data ?
        array.map((index) => {
          return(
            <Grid item key={`budgetLoading-${index}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
              <LoadingProcedure/>
            </Grid>
          )
        })
      :
        procedures && procedures.length > 0 ?
          procedures.map((procedure) => {
            return(
              <Fade in={!!procedure} key={`${procedure.__typename}-${procedure.id}`}>
                <Grid item style={{ paddingBottom: "20px", paddingRight: "30px" }}>
                  <Procedure procedure={procedure}/>
                </Grid>
              </Fade>
            )
          })
        :
          <Grid item xs style={{paddingRight: "30px"}}>
            <Paper>
              <Typography variant='h4' style={{padding: "20px"}}>
                No hay tramites registradas por el momento.
              </Typography>
            </Paper>
          </Grid>
      }
    </Grid>
  )
}

export default ProceduresDashboard;
