import React, { useState, useEffect }                  from 'react';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from './styles';
import Breadcrumbs                          from '../../ui/breadcrumbs'
import Grid                                 from '@material-ui/core/Grid';
import Paper                                from '@material-ui/core/Paper';
import InformationTabs                      from './edit/information_tabs/information_tabs'
import { useQuery }                         from '@apollo/client';
import { GET_BUDGET }                       from './queries_and_mutations/queries'
import Typography                           from '@material-ui/core/Typography';
import OpenInNewIcon                        from '@material-ui/icons/OpenInNew';
import Button                               from '@material-ui/core/Button';
import Divider                              from '@material-ui/core/Divider';
import Avatar                               from '@material-ui/core/Avatar';
import { GET_CURRENT_USER }                 from '../../../resolvers/queries';
import PaymentDrawer                        from './edit/payment_drawer'
import Activities                           from './edit/activities/activities'

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: '/budgets' },
  { name: "Editar", path: null }
]

const BudgetsEdit = (props) => {
  const { match } = props
  const [budget, setBudget]                       = useState()
  const [budgetingTemplate, setBudgetingTemplate] = useState()

  const { loading, data, refetch } = useQuery(
    GET_BUDGET, { variables: {"id": match.params.id } }
  );

  useEffect(() => {
    if(data) {
      setBudget(data.budget)
      setBudgetingTemplate(data.budget.budgetingTemplate)
    }
  }, [loading, data])

  return(
    <Grid container direction='column' alignItems="stretch" justifyContent="flex-start" style={{ minHeight: "100vh" }}>
      <Grid item >
        <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      </Grid>
      <Grid container item style={{ flex: '1 1 auto' }}>
        <Grid item xs={8}>
          <Paper elevation={5} style={{ height: "100%" }} variant='outlined'>
            <Grid container item direction="column"  justifyContent="flex-start" alignItems="stretch" style={{ height: "100%" }}>
              <Grid container item style={{ flex: "1 1 auto" }}  alignItems="stretch">
                { 
                  budget &&
                  <InformationTabs budget={ budget }/>
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={0} style={{ minHeight: "100%" }}>
            { budget && <Activities budget={budget}/> }
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BudgetsEdit;
