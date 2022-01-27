import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import { useQuery }                   from '@apollo/client';
import { GET_PROCEDURES }             from '../index_queries_and_mutations/queries';
import Procedure                      from './procedures_dashboard/procedure';

const ProceduresDashboard = (props) => {
  const [searchLoading] = useState(false);
  const [sortField]     = useState("serial_number");
  const [sortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [per]           = useState(10);
  const [procedures, setProcedures] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField,
    searchLoading: searchLoading
  }   

  const  { loading, data } = useQuery(
    GET_PROCEDURES, { variables: variables, fetchPolicy: "cache-and-network" }
  );
    console.log(procedures)
  useEffect( () =>{
    data && procedures.length === 0 && setProcedures(data.procedures)
  }, [data])

  return(
    <Grid container item direction='column' alignItems="stretch"  justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      {
        procedures.map((procedure) => {
          return <Procedure procedure={procedure}/>
        })
      }
    </Grid>
  )
}

export default ProceduresDashboard;
