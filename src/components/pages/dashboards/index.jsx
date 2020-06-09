import React                        from 'react';
import { setBreadcrumbsList }       from './../../interfaces/breadcrumbs_interface';
import Grid                         from '@material-ui/core/Grid';
import Paper                        from '@material-ui/core/Paper';
import { styles }                   from './styles';
import { withStyles }               from '@material-ui/core/styles';
import LastPayments                 from "./index/last_payments";
import Breadcrumbs                  from '../../ui/breadcrumbs';
import LastProcedures               from "./index/last_procedures";
import LastBudgets                  from './index/last_budgets';
import LastComments                 from './index/last_comments';
import NextEvents                   from './index/next_events';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" }
]

const DashboardsIndex = (props) => {
  const componentDidMount = () => {
    setBreadcrumbsList([])
  }
  const { classes } = props;
  return (
    <>
      <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      <Grid container xs={12} spacing={3} classes={{root: classes.gridContainer}}>
        <Grid item container xs={12} sm={12} md={12} lg={8} spacing={3} style={{width: "100%"}}>
          <Grid item xs={12} sm={12} md={6}><Paper className={ classes.paper }> <LastPayments/> </Paper></Grid>
          <Grid item xs={12} sm={12} md={6}><Paper className={ classes.paper }> <LastProcedures/> </Paper></Grid>
          <Grid item xs={12} sm={12} md={6}><Paper className={ classes.paper }> <LastBudgets/> </Paper></Grid>
          <Grid item xs={12} sm={12} md={6}><Paper className={ classes.paper }> <NextEvents/> </Paper></Grid>
        </Grid>
        <Grid item container xs={12} sm={12} md={12} lg={4}>
          <Grid item xs={12} md={12}>
            <Paper className={ classes.paper } style={{width: "97%"}}>
              <LastComments/>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );  
}

export default withStyles(styles)(DashboardsIndex);
