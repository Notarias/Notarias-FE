import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import { useQuery }                   from '@apollo/client';
import { GET_CREDIT_PAYMENTS }        from '../index_queries_and_mutations/queries';
import CreditPayment                  from './credit_payment_dashboard/credit_payment';
import Typography                     from '@material-ui/core/Typography';
import Paper                          from '@material-ui/core/Paper';

const CreditPaymentsDashboard = (props) => {
  const [sortField]     = useState("created_at");
  const [sortDirection] = useState("desc");
  const [page] = useState(1);
  const [per]           = useState(10);
  const [creditPayments, setCreditPayments] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const  { data } = useQuery(
    GET_CREDIT_PAYMENTS, { variables: variables, fetchPolicy: "no-cache" }
  );
  
  useEffect( () =>{
    data && creditPayments.length === 0 && setCreditPayments(data.dashboardCreditPayments)
  }, [data])

  return(
    <Grid container item direction='column' alignItems="stretch" justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      {creditPayments.length > 0 ?
        creditPayments && creditPayments.map((creditPayment) => {
          return(
            <Grid item key={`${creditPayment.__typename}-${creditPayment.id}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
              <CreditPayment creditPayment={creditPayment}/>
            </Grid>
          )
        })
      :
        <Paper>
          <Typography variant='h4' style={{padding: "20px"}}>
            No hay ingresos registrados por el momento
          </Typography>
        </Paper>
      }
    </Grid>
  )
} 

export default CreditPaymentsDashboard;
