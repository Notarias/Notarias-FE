import React, { useEffect }                 from 'react';
import PropTypes                            from 'prop-types';
import { makeStyles }                       from '@material-ui/core/styles';
import AppBar                               from '@material-ui/core/AppBar';
import Tabs                                 from '@material-ui/core/Tabs';
import BudgetTemplateTab                    from './budget_template_tab';
import Typography                           from '@material-ui/core/Typography';
import Box                                  from '@material-ui/core/Box';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATES_TABS }     from '../../queries_and_mutations/queries';
import Fields                               from '../fields/fields';
import Grid                                 from '@material-ui/core/Grid';
import Divider                              from '@material-ui/core/Divider';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../styles';

const InformationTabs = (props) => {
  const { classes, budgetInfo, budgetId, budgetTemplateId } = props
  const [value, setValue] = React.useState(0);
  const [tabList, setTabList] = React.useState(data ? data.budgetingTemplateTabs: []);
  const [currentTab, setCurrentTab] = React.useState( data ? data.budgetingTemplateTabs[0] : "")

  const { data } = useQuery(
    GET_BUDGETING_TEMPLATES_TABS, { variables: {"id": budgetTemplateId }}
  );

  // useEffect(() => {
  //   setValue()
  // }, [tab])

  useEffect(() => {
    currentTab || (data && setCurrentTab(data.budgetingTemplateTabs[0]));
    data && setTabList(data.budgetingTemplateTabs);
  }, [data])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    return(
      tabList.map(
        (tab, index) => {
          return(
            <BudgetTemplateTab
              key={tab.id + "-tab"} 
              setValue={setValue}
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
              tab={tab} 
              label={tab.name}
              index={index}
            />
          )
        }
      )
    )
  }

  console.log(currentTab, "current")
  return (
    <div  className={classes.rootTab}>
      <AppBar position="static">
        <Tabs 
          centered 
          value={value} 
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          { renderTabs() }
        </Tabs>
      </AppBar>
      <Grid container justifyContent="flex-start" alignItems="flex-end" className={classes.titleFields}>
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
          currentTab={currentTab && currentTab}
          budgetInfo={budgetInfo}
          budgetId={budgetId}
        />
      </Grid>
    </div>
  );
}

export default withStyles(styles)(InformationTabs);
