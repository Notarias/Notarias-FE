import React, { useEffect, useState }     from 'react'
import Grid                               from '@material-ui/core/Grid';
import Fade                               from '@material-ui/core/Fade';
import { useQuery }                       from '@apollo/client';
import { GET_BUDGETS }                    from '../index_queries_and_mutations/queries';
import Budget                             from './budgets_dashboard/budget';
import LoadingBudgets                     from './budgets_dashboard/loading_budgets';
import Typography                         from '@material-ui/core/Typography';
import Paper                              from '@material-ui/core/Paper';

const BudgetsDashboard = (props) => {
  const [searchLoading] = useState(false);
  const [sortField]     = useState("serial_number");
  const [sortDirection] = useState("desc");
  const [page]          = useState(1);
  const [per]           = useState(10);
  const [array] = useState([1,2,3,4,5,6,7,8,9]);
  const [budgets, setBudgets] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField,
    searchLoading: searchLoading
  }

  const  { loading, data } = useQuery(
    GET_BUDGETS, { variables: variables, fetchPolicy: "no-cache" }
  );

  useEffect( () =>{
    data && budgets.length === 0 && setBudgets(data.budgets)
  }, [loading, data])
  
  return(
    <Grid container item direction='column' alignItems="stretch"  justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      { loading || !data ?
        array.map((index) => {
          return(
            <Grid item key={`budgetLoading-${index}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
              <LoadingBudgets/>
            </Grid>
          )
        })
      :
        budgets && budgets.length > 0 ?
          budgets.map((budget) => {
            return(
              <Fade in={!!budget}>
                <Grid item key={`${budget.__typename}-${budget.id}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
                  <Budget budget={budget}/>
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

export default BudgetsDashboard;
