import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import { useQuery }                   from '@apollo/client';
import { GET_BUDGETS }                from '../index_queries_and_mutations/queries';
import Budget                         from './budgets_dashboard/budget';

const BudgetsDashboard = (props) => {
  const [searchLoading] = useState(false);
  const [sortField]     = useState("serial_number")
  const [sortDirection] = useState("desc")
  const [page, setPage] = useState(1)
  const [per]           = useState(10)
  const [budgets, setBudgets] = useState([])

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField,
    searchLoading: searchLoading
  }

  const  { loading, data } = useQuery(
    GET_BUDGETS, { variables: variables, fetchPolicy: "cache-and-network" }
  );

  useEffect( () =>{
    data && budgets.length === 0 && setBudgets(data.budgets)
  }, [data])

  return(
    <Grid container item direction='column' alignItems="stretch"  justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      {
        budgets.map((budget) => {
          return <Budget budget={budget}/>
        })
      }
    </Grid>
  )
}

export default BudgetsDashboard;
