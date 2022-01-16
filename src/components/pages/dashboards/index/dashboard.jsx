import React            from 'react';
import PropTypes        from 'prop-types';
import Tabs             from '@material-ui/core/Tabs';
import Tab              from '@material-ui/core/Tab';
import Typography       from '@material-ui/core/Typography';
import Box              from '@material-ui/core/Box';
import Grid             from '@material-ui/core/Grid';
import Paper            from '@material-ui/core/Paper';
import { styles }       from '../styles';
import { withStyles }   from '@material-ui/core/styles';
import DashboarBudgets  from './dashboard_budgets'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Dashboard = (props) => {
  const {classes } = props
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const  renderDashboarView = () => {
    switch (value) {
      case (0) :
        return(
          "mostrando contenido"
        )
      case (1) :
        return(
          <DashboarBudgets/>
        )
      case (2) :
        return(
          "Otro contenido"
        )
      default :
        return(
          "Sin vista para mostrar"
        )
    }
  }

  return (
    <>
      <Grid container item xs={3}>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center" 
          className={classes.girdFatherDashboard}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Ver trámites" {...a11yProps(0)} />
            <Tab label="Ver presupuestos" {...a11yProps(1)} />
            <Tab label="Ver pagos" {...a11yProps(2)} />
          </Tabs>
        </Grid>
        <Grid container item xs={12}>
          <Paper className={classes.paperCalendar}>
            solo para mostrar "Calendario"
          </Paper>
        </Grid>
      </Grid>
      <Grid container item xs={9} className={classes.gridTabPanel}>
        {renderDashboarView()}
      </Grid>
    </>
  );
}

export default withStyles(styles)(Dashboard);
