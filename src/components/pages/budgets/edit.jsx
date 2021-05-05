import React, { useState }                  from 'react';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from './styles';
import Breadcrumbs                          from '../../ui/breadcrumbs'
import Grid                                 from '@material-ui/core/Grid';
import Paper                                from '@material-ui/core/Paper';
import Divider                              from '@material-ui/core/Divider';
import InformationTabs                      from './edit/information_tabs/information_tabs'
import GenericDropdownMenu                  from '../../ui/generic_dropdown_menu';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_BUDGET }                       from './queries_and_mutations/queries'
import Typography                           from '@material-ui/core/Typography';
import OpenInNewIcon                        from '@material-ui/icons/OpenInNew';
import Button                               from '@material-ui/core/Button';

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

  console.log(match.params.id , "budgId")

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Grid container item xs={12} direction="row" >
          <Grid container item xs={9} alignItems="center" justify="center" direction="column">
          <Paper className={ classes.budgetEditPaper}>
            <Grid container item xs={12} alignItems="center" className={ classes.budgetTittle}>
              <Grid container item xs={5} justify="flex-start" alignItems="center">
                <Typography variant="h6" gutterBottom className={classes.marginTitleBudgetName}>
                  { data ? data.budget.budgetingTemplate.name : "" }
                  { data ? data.budget.budgetingTemplate.id : "" }
                </Typography>
                <Button>
                  <OpenInNewIcon/>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" gutterBottom>
                  { data ? data.budget.proceduresTemplate.name : "" }
                  { data ? data.budget.proceduresTemplate.id : "" }
                </Typography>
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
                <Typography variant="subtitle2" gutterBottom className={classes.spaceBetwenFirstNameAndLastName}>
                  { data && data.budget.client.lastName }
                  { data && data.budget.client.id }
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justify="flex-start" >
              <InformationTabs
                budgetTemplateId={data && data.budget.budgetingTemplate.id}
                budgetInfo={data && data.budget}
                budgetId={match.params.id}
              />
            </Grid>
            </Paper>
          </Grid>
        <Grid container item xs={3} direction="row" justify="center" alignItems="stretch" className={ classes.budgetEdit}>
          <Paper className={ classes.budgetRightOptionsList}>
            <Grid container item justify="center">
              listado de budget
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(BudgetsEdit);
