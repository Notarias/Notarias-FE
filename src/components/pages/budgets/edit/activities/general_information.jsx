import React, { useState, useEffect } from 'react';
import Button               from '@material-ui/core/Button';
import Menu                 from '@material-ui/core/Menu';
import MenuItem             from '@material-ui/core/MenuItem';
import Grid                 from '@material-ui/core/Grid';
import Divider              from '@material-ui/core/Divider';
import ArrowDropDownIcon    from '@material-ui/icons/ArrowDropDown';
import Typography           from '@material-ui/core/Typography';
import Avatar               from '@material-ui/core/Avatar';
import { GET_BUDGET }       from '../../queries_and_mutations/queries';
import Asignee              from '../asignee';
import Reporter              from '../reporter';
import { useQuery }         from '@apollo/client';

export default (props) => {

  const { budgetId } = props

  const [budget, setBudget] = useState()

  const { loading, data, refetch } = useQuery(
    GET_BUDGET, { variables: {"id": budgetId } }
  );

  useEffect(() => {
    setBudget(data.budget)
  }, [!!data.budget])

  return(
    <Grid container item alignItems="center" spacing={3}>
      <Grid container item xs={12} alignItems='center'>
        <Grid item xs={3}>
          <Typography style={{}} align='left'>Encargado:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Asignee
            asigneeData={budget && budget.asignee}
            budgetId={budgetId}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Reportador:</Typography>
        </Grid>
        <Grid container item xs={9}>
          <Reporter
            reporterData={budget && budget.reporter}
            budgetId={budgetId}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems='center' alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Cliente:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography noWrap align='left'>
            { budget && budget.client.firstName } { budget && budget.client.lastName }
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}