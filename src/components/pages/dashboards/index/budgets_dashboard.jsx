import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import { useQuery }                   from '@apollo/client';
import { GET_BUDGETS }                from '../index_queries_and_mutations/queries';
import Budget                         from './budgets_dashboard/budget';
import Typography                     from '@material-ui/core/Typography';
import Paper                          from '@material-ui/core/Paper';

const BudgetsDashboard = (props) => {
  const [searchLoading] = useState(false);
  const [sortField]     = useState("serial_number")
  const [sortDirection] = useState("desc")
  const [page]          = useState(1)
  const [per]           = useState(10)
  const [budgets, setBudgets] = useState([])

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField,
    searchLoading: searchLoading
  }

  const  { data } = useQuery(
    GET_BUDGETS, { variables: variables, fetchPolicy: "no-cache" }
  );

  useEffect( () =>{
    data && budgets.length === 0 && setBudgets(data.budgets)
  }, [data])
  
  return(
    <Grid container item direction='column' alignItems="stretch"  justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      {budgets.length > 0 ?
        budgets && budgets.map((budget) => {
          return(
            <Grid item key={`${budget.__typename}-${budget.id}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
              <Budget budget={budget}/>
            </Grid>
          )
        })
      :
        <Paper>
          <Typography variant='h4' style={{padding: "20px"}}>
            No hay presupuestos registrados por el momento
          </Typography>
        </Paper>
      }
    </Grid>
  )
}

export default BudgetsDashboard;
