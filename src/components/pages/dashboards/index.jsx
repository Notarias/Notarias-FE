import React                        from 'react';
import { setBreadcrumbsList }       from './../../interfaces/breadcrumbs_interface';
import Grid                         from '@material-ui/core/Grid';
import { styles }                   from './styles';
import { withStyles }               from '@material-ui/core/styles';
// import LastPayments                 from "./index/last_payments";
// import LastProcedures               from "./index/last_procedures";
// import LastBudgets                  from './index/last_budgets';
// import LastComments                 from './index/last_comments';
// import NextEvents                   from './index/next_events';
import Breadcrumbs                  from '../../ui/breadcrumbs';
import Dashboard from './index/dashboard'

const BREADCRUMBS = [
  { name: "Inicio", path: "/" }
]

const DashboardsIndex = (props) => {
    setBreadcrumbsList([])
  const { classes } = props;
  return (
    <>
      <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      <Grid
        container 
        item 
        xs={12} 
        justifyContent="center"
        alignItems="center" 
        className={classes.girdFatherIndexDashboard}
      >
        <Grid container item xs={12} direction="row" className={classes.gridContainerDashboard}>
          <Dashboard/>
          
        </Grid>
      </Grid>
    </>
  );  
}

export default withStyles(styles)(DashboardsIndex);
