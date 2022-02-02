import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import { useQuery }                   from '@apollo/client';
import { GET_PAYMENTS }               from '../index_queries_and_mutations/queries';
import Payment                        from './payment_dashboard/payment';
import Typography                     from '@material-ui/core/Typography';
import Paper                          from '@material-ui/core/Paper';

const PaymentsDashboard = (props) => {
  const [sortField]     = useState("created_at");
  const [sortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [per]           = useState(10);
  const [payments, setPayments] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const  { loading, data } = useQuery(
    GET_PAYMENTS, { variables: variables, fetchPolicy: "cache-and-network" }
  );
  
  useEffect( () =>{
    data && payments.length === 0 && setPayments(data.dashboardPayments)
  }, [data])

  return(
    <Grid container item direction='column' alignItems="stretch" justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      {payments.length > 0 ?
        payments && payments.map((payment) => {
          return <Payment payment={payment}/>
        })
      :
        <Paper>
          <Typography>
            No hay pagos registrados por el momento
          </Typography>
        </Paper>
      }
    </Grid>
  )
}

export default PaymentsDashboard;
