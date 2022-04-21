import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import Fade                           from '@material-ui/core/Fade';
import { useQuery }                   from '@apollo/client';
import { GET_PAYMENTS }               from '../index_queries_and_mutations/queries';
import Payment                        from './payments_dashboard/payment';
import LoadingPayments                from './payments_dashboard/loading_payments';
import Typography                     from '@material-ui/core/Typography';
import Paper                          from '@material-ui/core/Paper';

const PaymentsDashboard = (props) => {
  const [sortField]     = useState("created_at");
  const [sortDirection] = useState("desc");
  const [page] = useState(1);
  const [per]           = useState(10);
  const [array] = useState([1,2,3,4,5,6,7,8,9]);
  const [payments, setPayments] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const  { loading, data } = useQuery(
    GET_PAYMENTS, { variables: variables, fetchPolicy: "no-cache" }
  );
  
  useEffect( () =>{
    data && payments.length === 0 && setPayments(data.dashboardPayments)
  }, [loading, data])

  return(
    <Grid container item direction='column' alignItems="stretch" justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      { loading || !data ?
        array.map((index) => {
          return(
            <Grid item key={`budgetLoading-${index}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
              <LoadingPayments/>
            </Grid>
          )
        })
      :
        payments && payments > 0 ?
          payments.map((payment) => {
            return(
              <Fade in={!!payments}>
                <Grid item key={`${payment.__typename}-${payment.id}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
                  <Payment payment={payment}/>
                </Grid>
              </Fade>
            )
          })
        :
          <Grid item xs style={{paddingRight: "30px"}}>
            <Paper>
              <Typography variant='h4' style={{padding: "20px"}}>
                No hay reuniones registradas por el momento
              </Typography>
            </Paper>
          </Grid>
      }
    </Grid>
  )
}

export default PaymentsDashboard;
