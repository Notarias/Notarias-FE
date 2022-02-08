import React, { useState }          from 'react';
import Grid                         from '@material-ui/core/Grid';
import { styles }                   from './styles';
import { withStyles }               from '@material-ui/core/styles';
// import LastPayments                 from "./index/last_payments";
// import LastProcedures               from "./index/last_procedures";
// import LastBudgets                  from './index/last_budgets';
// import LastComments                 from './index/last_comments';
// import NextEvents                   from './index/next_events';
import Breadcrumbs                  from '../../ui/breadcrumbs';
import Tabs                         from '@material-ui/core/Tabs';
import Tab                          from '@material-ui/core/Tab';
import AppointmentsDashboard         from './index/appointments_dashboard'
import BudgetsDashboard             from './index/budgets_dashboard'
import PaymentsDashboard            from './index/payments_dashboard'
import CreditPaymentsDashboard      from './index/credit_payments_dashboard'
import ProceduresDashboard          from './index/procedures_dashboard'
import CommentariesDashboard          from './index/commentaries_dashboard'

const BREADCRUMBS = [
  { name: "Inicio", path: "/" }
]

const DashboardsIndex = (props) => {
  const { classes } = props;

  const [currentTab, setCurrentTab] = useState(0)

  const handleChangeTab = (event, newTab) => {
    setCurrentTab(newTab)
  }

  const renderTabContent = () => {
    switch(currentTab) {
      case 0:
        return <AppointmentsDashboard/>
      case 1:
        return <BudgetsDashboard/>
      case 2:
        return <PaymentsDashboard/>
      case 3:
        return <CreditPaymentsDashboard/>
      case 4:
        return <ProceduresDashboard/>
      case 5:
        return <CommentariesDashboard/>
      default:
        return <AppointmentsDashboard/>
    }
  }

  return (
    <Grid container direction='column' alignItems="stretch" justifyContent="flex-start">
      <Grid item>
        <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      </Grid>
      <Grid container item style={{ flex: '1 1 auto' }}>
        <Grid container item xs={2} justifyContent='center' style={ { paddingTop: '30px' } }>
          <Grid item>
            <Tabs
              orientation="vertical"
              value={currentTab}
              onChange={handleChangeTab}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              <Tab label="Reuniones" id={`vertical-tab-0`} ariaControls={`vertical-tabpanel-0`}/>
              <Tab label="Presupuestos" id={`vertical-tab-1`} ariaControls={`vertical-tabpanel-1`}/>
              <Tab label="Pagos" id={`vertical-tab-2`} ariaControls={`vertical-tabpanel-2`}/>
              <Tab label="Ingresos" id={`vertical-tab-3`} ariaControls={`vertical-tabpanel-3`}/>
              <Tab label="Trámites" id={`vertical-tab-4`} ariaControls={`vertical-tabpanel-4`}/>
              <Tab label="Comentarios" id={`vertical-tab-5`} ariaControls={`vertical-tabpanel-5`}/>
            </Tabs>
          </Grid>
        </Grid>
        <Grid container item xs={10}>
          { renderTabContent() }
        </Grid>
      </Grid>
    </Grid>
  );  
}

export default withStyles(styles)(DashboardsIndex);
