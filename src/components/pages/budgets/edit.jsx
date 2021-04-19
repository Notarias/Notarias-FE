import React, { useState }                  from 'react';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from './styles';
import Breadcrumbs                          from '../../ui/breadcrumbs'
import Grid                                 from '@material-ui/core/Grid';
import Paper                                from '@material-ui/core/Paper';
import Divider                              from '@material-ui/core/Divider';
import InformationTabs                      from './edit/tabs'
import GenericDropdownMenu                  from '../../ui/generic_dropdown_menu';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_BUDGET }                       from './queries_and_mutations/queries'
import Typography                           from '@material-ui/core/Typography';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: '/budgets' },
  { name: "Editar", path: null }
]

const BudgetsEdit = (props) => {
  const { classes, match } = props

  const { loading, data, refetch } = useQuery(
    GET_BUDGET, { variables: {"id": match.params.id } } 
  );

  console.log("data", data)

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Grid container item xs={12} direction="row" >
          <Grid container item xs={9} alignItems="center" justify="center" direction="column">
          <Paper className={ classes.budgetEditPaper}>
            <Grid container item xs={12} alignItems="center" className={ classes.budgetTittle}>
              <Grid item xs={5}>
                { data && data.budget.budgetingTemplate.name }
              </Grid>
              <Grid item xs={4}>
                { data && data.budget.proceduresTemplate.name }
              </Grid>
              <Grid container item xs={2} justify="flex-end">
                Saldo pendiente
              </Grid>
              <Grid item xs={1}>
                <GenericDropdownMenu>
                </GenericDropdownMenu>
              </Grid>
            </Grid>
            <Grid container item xs={12} alignItems="center" className={ classes.budgetTittle} >
              <Grid item xs={4}>
                Nombre del encargado
              </Grid>
              <Grid container item xs={3} justify="flex-end" alignItems="center">
                <Typography variant="subtitle2" gutterBottom>
                  { data && data.budget.client.firstName }
                </Typography>
              </Grid>
              <Grid container item xs={3} justify="flex-start" alignItems="center">
                <Typography variant="subtitle2" gutterBottom className={ classes.spaceBetwenFirstNameAndLastName}>
                  { data && data.budget.client.lastName }
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justify="flex-start" >
              <InformationTabs/>
            </Grid>
            </Paper>
          </Grid>
        <Grid container item xs={3} direction="column" alignItems="stretch" className={ classes.budgetEdit}>
          <Paper className={ classes.budgetRightOptionsList}>
            <Grid>
              listado de budget
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}


export default withStyles(styles)(BudgetsEdit);
