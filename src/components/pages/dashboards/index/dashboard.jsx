import React            from 'react';
import PropTypes        from 'prop-types';
import { makeStyles }   from '@material-ui/core/styles';
import Tabs             from '@material-ui/core/Tabs';
import Tab              from '@material-ui/core/Tab';
import Typography       from '@material-ui/core/Typography';
import Box              from '@material-ui/core/Box';
import Grid             from '@material-ui/core/Grid';
import Paper            from '@material-ui/core/Paper';
import { styles }       from '../styles';
import { withStyles }   from '@material-ui/core/styles';
import List             from '@material-ui/core/List';
import ListItem         from '@material-ui/core/ListItem';
import Divider          from '@material-ui/core/Divider';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Dashboard = (props) => {
  const {classes } = props
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <TabPanel value={value} index={0}>
          algo para mostrar
        </TabPanel>
        <TabPanel value={value} index={1}>
          Presupuestos
        </TabPanel>
        <TabPanel value={value} index={2}>
          Pagos
        </TabPanel>
      </Grid>
    </>
  );
}
export default withStyles(styles)(Dashboard);
