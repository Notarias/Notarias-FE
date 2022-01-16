import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../ui/breadcrumbs'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InformationTabs from './edit/information_tabs/information_tabs';
import { useQuery } from '@apollo/client';
import { GET_PROCEDURE } from './queries_and_mutations/queries';
import Activities from './edit/activities/activities';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Tramites", path: '/procedures' },
  { name: "Editar", path: null }
]

const ProceduresEdit = (props) => {
  const { match } = props;
  const [procedure, setProcedure] = useState();

  const { loading, data } = useQuery(
    GET_PROCEDURE, { variables: {"id": match.params.id } }
  );

  useEffect(() => {
    if(data && data.procedure) {
      setProcedure(data.procedure)
    }
  }, [loading, data]);

  return(
    <Grid container direction='column' alignItems="stretch" justifyContent="flex-start" style={{ minHeight: "100vh" }}>
      <Grid item>
        <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      </Grid>
      <Grid container item xs={12} style={{ flex: '1 1 auto' }}>
        <Grid item xs={8}>
          <Paper elevation={5} style={{ height: "100%" }} variant='outlined'>
            <Grid container item direction="column"  justifyContent="flex-start" alignItems="stretch" style={{ height: "100%" }}>
              <Grid container item style={{ flex: "1 1 auto" }}  alignItems="stretch">
                { 
                  procedure && <InformationTabs procedure={ procedure }/>
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={0} style={{ minHeight: "100%" }}>
            { procedure && <Activities procedure={procedure}/> }
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProceduresEdit;
