import React from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';
import { Grid }             from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Typography                           from '@material-ui/core/Typography';
import { useQuery }              from '@apollo/react-hooks';
import { GET_BUDGETS }    from '../../clients_queries_and_mutations/queries'
import { useEffect } from 'react';
import ClientBudget from './client_budget'
import { Link }                             from 'react-router-dom';

const ClientsBudgetsList = (props) => {
  const { classes, match }  = props

  let variables = {

    search: {
      clientId: Number(match.params.id),
    },
  }

  const { loading, data, refetch } = useQuery(
    GET_BUDGETS, { variables: variables, fetchPolicy: "no-cache" }
  );

  const [budgets, setBudgets] = React.useState([])

  useEffect( () =>{
    data && setBudgets(data.budgets)
  }, [data])

  const withOutBudget = () => {
    return(
      <Grid>
        Sin presupuestos
      </Grid>
    )
  }

  return(
    <Paper style={{width:"90%"}}>
      <List>
        <ListItem>
          <Grid container direction="row" style={{marginRight:"10px"}}>
            <Grid container item xs={1}  justifyContent="center" alignItems="center">
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
            <Typography>Presupuesto</Typography>
            </Grid>
            <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
              <Typography>A cargo</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography>Total</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography>Adeudo</Typography>
            </Grid>
          </Grid>
        </ListItem>
        {
          budgets.length > 0 ?
            budgets.map((budget) => {
              return(
                <ListItem 
                  key={budget.id + "-budget"} 
                  button
                  component={Link} 
                  to={`/budgets/${ budget.id}/edit` }
                  
                >
                  <ClientBudget
                    budget={budget}
                    match={match}
                  />
                </ListItem>
              )}
            )
          :
            withOutBudget()
        }
      </List>
    </Paper>
  )
}

export default withStyles(styles)(ClientsBudgetsList);
