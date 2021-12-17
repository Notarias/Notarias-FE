import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import ProcedureTemplateTab from './procedure_template_tab';
import Fields from '../fields/fields';
import FieldsGroups from '../fields_groups/fields_groups';
import CreateComments from './create_comments';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles';
import { useQuery } from '@apollo/client';
import { GET_PROCEDURES_TEMPLATES_TABS } from '../../queries_and_mutations/queries';

const InformationTabs = (props) => {
  const { classes, procedure } = props

  const [value, setValue] = useState(0);
  const [tabList, setTabList] = useState();
  const [currentTab, setCurrentTab] = useState();

  const { data } = useQuery(
    GET_PROCEDURES_TEMPLATES_TABS, { variables: {"id": procedure.proceduresTemplate.id },
    fetchPolicy: "no-cache"}
  );

  useEffect(() => {
    data && setCurrentTab(data.proceduresTemplateTabs[0]);
    data && setTabList(data.proceduresTemplateTabs);
  }, [data])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    return(
      tabList && tabList.map(
        (tab, index) => {
          return(
            <ProcedureTemplateTab
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
    <Grid container item xs={12} direction="column"  justifyContent="flex-start">
      <Grid container item justifyContent="flex-start">
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
      <Grid container item justifyContent="flex-start" style={{ paddingTop: "10px" }}>
        {currentTab && <Fields
          currentTab={currentTab}
          procedure={procedure}
        />}
      </Grid>
      <Grid container item justifyContent="flex-start" style={{ paddingTop: "10px" }}>
        {currentTab && <FieldsGroups
          currentTab={currentTab}
          procedure={procedure}
        />}
      </Grid>
      <Divider variant="middle"/>
      <Grid container item justifyContent="flex-start" item style={{ paddingTop: "10px" }}>
        <Grid container item direction="row" xs={10}>
          <CreateComments procedure={procedure}/>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(InformationTabs);
