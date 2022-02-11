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
  const [page] = useState(1);
  const [per]           = useState(10);
  const [payments, setPayments] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const  { data } = useQuery(
    GET_PAYMENTS, { variables: variables, fetchPolicy: "no-cache" }
  );
  
  useEffect( () =>{
    data && payments.length === 0 && setPayments(data.dashboardPayments)
  }, [data])

  return(
    <Grid container item direction='column' alignItems="stretch" justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      {payments.length > 0 ?
        payments && payments.map((payment) => {
          return(
            <Grid item key={`${payment.__typename}-${payment.id}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
              <Payment payment={payment}/>
            </Grid>
          )
        })
      :
        <Paper>
          <Typography variant='h4' style={{padding: "20px"}}>
            No hay pagos registrados por el momento
          </Typography>
        </Paper>
      }
    </Grid>
  )
}

export default PaymentsDashboard;
