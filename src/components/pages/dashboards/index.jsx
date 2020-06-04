import React                        from 'react';
import { setBreadcrumbsList }       from './../../interfaces/breadcrumbs_interface';
import Grid                         from '@material-ui/core/Grid';
import Paper                        from '@material-ui/core/Paper';
import { styles }                   from './styles';
import { withStyles }               from '@material-ui/core/styles';
import LastPayments                 from "./index/last_payments";
import Breadcrumbs             from '../../ui/breadcrumbs'

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
      <Grid container classes={{ root: classes.gridContainer }}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <LastPayments/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>2</Grid>
        <Grid item xs={12} sm={4}>3</Grid>
      </Grid>
    </>
  );  
}

export default withStyles(styles)(DashboardsIndex);
