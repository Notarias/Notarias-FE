import React, { useEffect, useRef, useState }                 from 'react';
import AppBar                               from '@material-ui/core/AppBar';
import Tabs                                 from '@material-ui/core/Tabs';
import BudgetTemplateTab                    from './budget_template_tab';
import Typography                           from '@material-ui/core/Typography';
import { useQuery }                         from '@apollo/client';
import { GET_BUDGETING_TEMPLATES_TABS }     from '../../queries_and_mutations/queries';
import Fields                               from '../fields/fields';
import Grid                                 from '@material-ui/core/Grid';
import Divider                              from '@material-ui/core/Divider';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../styles';

const InformationTabs = (props) => {
  const { budget } = props
  const [value, setValue] = useState(0);
  const [tabList, setTabList] = useState([]);
  const [currentTab, setCurrentTab] = useState("");
  const fieldListWrapperElement = useRef();

  const { data } = useQuery(
    GET_BUDGETING_TEMPLATES_TABS, { variables: {"id": budget.budgetingTemplate.id }}
  );

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



  return (
    <Grid container item direction="column"  justifyContent="flex-start" alignItems="stretch" >
      <Grid item>
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
      </Grid>
      <Grid item container justifyContent="flex-start" alignItems="flex-end" style={{ paddingTop: "15px", paddingBottom: "5px"}}>
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            Concepto
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
            Total
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            Saldo
          </Typography>
        </Grid>
      </Grid>
      <Divider/>
      <Grid item container justifyContent='flex-start' style={{ flex: '1 1 auto'}}>
        <Fields
          parentRef={fieldListWrapperElement}
          currentTab={currentTab && currentTab}
          budget={budget}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(InformationTabs);
