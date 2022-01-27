import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import { useQuery }                   from '@apollo/client';
import { GET_CREDIT_PAYMENTS }        from '../index_queries_and_mutations/queries';
import CreditPayment                  from './credit_payment_dashboard/credit_payment';

const CreditPaymentsDashboard = (props) => {
  const [sortField]     = useState("created_at");
  const [sortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [per]           = useState(10);
  const [creditPayments, setCreditPayments] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const  { loading, data } = useQuery(
    GET_CREDIT_PAYMENTS, { variables: variables, fetchPolicy: "cache-and-network" }
  );
  
  useEffect( () =>{
    data && creditPayments.length === 0 && setCreditPayments(data.dashboardCreditPayments)
  }, [data])

  return(
    <Grid container item direction='column' alignItems="stretch" justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      {
        creditPayments && creditPayments.map((creditPayment) => {
          return <CreditPayment creditPayment={creditPayment}/>
        })
      }
    </Grid>
  )
}

export default CreditPaymentsDashboard;
