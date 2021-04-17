import React, { useState }                from 'react';
import { withStyles }                     from '@material-ui/core/styles';
import { styles }                         from './styles';
import Breadcrumbs                        from '../../ui/breadcrumbs'
import Grid                           from '@material-ui/core/Grid';
import Paper                              from '@material-ui/core/Paper';
import Divider                            from '@material-ui/core/Divider';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: '/budgets' },
  { name: "Editar", path: null }
]

const BudgetsEdit = (props) => {
  const { classes } = props


  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Grid container item xs={12} direction="row" >
          <Grid container item xs={9} alignItems="center" justify="center" direction="column" className={ classes.budgetEdit}>
          <Paper className={ classes.budgetEditPaper}>
            <Grid container item xs={12}>
              <Grid item xs={6}>
                Nombre del Presupuesto
              </Grid>
              <Grid item xs={3}>
                Nombre del trámite
              </Grid>
              <Grid item xs={3}>
                Nombre del cliente
              </Grid>
            </Grid>
            <Divider/>
            <Grid container item xs={12}>
              Tabs
            </Grid>
            </Paper>
          </Grid>
        <Grid container item xs={3} direction="column" alignItems="stretch" className={ classes.budgetEdit}>
          <Paper className={ classes.budgetEditPaper}>
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
