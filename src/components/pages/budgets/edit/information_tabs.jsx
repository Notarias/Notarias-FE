import React, { useEffect }                 from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import BudgetTemplateTab from './budget_template_tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATES_TABS }     from '../queries_and_mutations/queries';
import Fields                               from './fields';
import Grid                                 from '@material-ui/core/Grid';
import Divider                              from '@material-ui/core/Divider';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  rootTab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const InformationTabs = (props) => {
  const { classes } = props
  // const classes = useStyles();
  const { budgetId } = props;
  const [value, setValue] = React.useState(0);
  const [tabList, setTabList] = React.useState(data ? data.budgetingTemplateTabs: []);
  const [currentTab, setCurrentTab] = React.useState( data ? data.budgetingTemplateTabs[0] : "")

  const { data } = useQuery(
    GET_BUDGETING_TEMPLATES_TABS, { variables: {"id": budgetId }}
  );

  useEffect(() => {
    currentTab || (data && setCurrentTab(data.budgetingTemplateTabs[0]));
    data && setTabList(data.budgetingTemplateTabs);
  }, [data])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTab = () => {
    return(
      tabList.map(
        (tab, index) => {
          return(
            <BudgetTemplateTab
              key={tab.id + "-tab"} 
              setValue={setValue}
              setCurrentTab={setCurrentTab} 
              tab={tab} 
              label={tab.name}
              index={index}
            />
          )
        }
      )
    )
  }

  console.log(currentTab && currentTab.id,"-----")
  return (
    <div className={classes.rootTab}>
      <AppBar position="static">
        <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
          { renderTab() }
        </Tabs>
      </AppBar>
      <Grid container justify="flex-start" alignItems="flex-end" className={classes.titleFields}>
        <Grid container item xs={3}>
          <Typography variant="h6" gutterBottom>
            Concepto
          </Typography>
        </Grid>
        <Grid container item xs={3}>
          <Typography variant="h6" gutterBottom>
            Total
          </Typography>
        </Grid>
        <Grid container item xs={3}>
          <Typography variant="h6" gutterBottom>
            Saldo
          </Typography>
        </Grid>
      </Grid>
      <Divider/>
      <Grid container className={classes.boxContainerFields}>
        <Fields
          value={value}
          setValue={setValue}
          currentTab={currentTab && currentTab}
          tabList={tabList}
        />
      </Grid>
    </div>
  );
}

export default withStyles(styles)(InformationTabs);