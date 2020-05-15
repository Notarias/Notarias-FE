import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import Paper                from '@material-ui/core/Paper';
import { Grid }             from '@material-ui/core';
import { styles }           from './show/styles';
import CustomerInformation  from './show/customer_information';
import LastProcedures       from './show/last_procedures';
import LastComments         from './show/last_comments';
import NextEvents           from './show/next_events';
import LastBudgets          from './show/last_budgets';
import { GET_CLIENT }       from './clients_queries_and_mutations/queries';
import { useQuery }         from '@apollo/react-hooks';
import Breadcrumbs          from '../../ui/breadcrumbs';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: "/clients" },
  { name: "Editar", path: null }
]

const Details = (props) => {
  const { classes, match } = props
  const { loading, error, data } = useQuery(GET_CLIENT, { variables: { "id": match.params.id }})
  if(loading) return <p>Loadng...</p>
  if(error) return <p> { `Error ${error.message}` } </p>
  return(
    <div style={{height:"auto"}}>
      <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      <Grid item xs={12} style={{paddingTop:"3%", paddingLeft:"3%"}}>
        <Grid xs={12} spacing={3} container >
          <Grid xs={4} container item alignItems="stretch" direction="row">
            <Grid item container>
              <CustomerInformation classes={ classes } history={props.history} match={props.match.params} data={data} />
            </Grid>
          </Grid>
          <Grid container xs={8} item spacing={3}>
            <Grid xs={12} item container spacing={3}>
              <Grid xs={6} item>
                <LastProcedures/>
              </Grid>
              <Grid xs={6} item>
                <LastComments/>
              </Grid>
            </Grid>
            <Grid xs={12} item container spacing={3}>
              <Grid xs={6} item>
                <LastBudgets/>
              </Grid>
              <Grid xs={6} item>
                <NextEvents/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Details);