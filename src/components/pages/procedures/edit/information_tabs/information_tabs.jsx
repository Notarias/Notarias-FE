import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import ProcedureTemplateTab from './procedure_template_tab';
import Typography from '@material-ui/core/Typography';
import Fields from '../fields/fields';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles';
import { useQuery } from '@apollo/client';
import { GET_PROCEDURES_TEMPLATES_TABS } from '../../queries_and_mutations/queries';

const InformationTabs = (props) => {
  const { classes, procedure } = props
  const [value, setValue] = useState(0);
  const [tabList, setTabList] = useState(data ? data.proceduresTemplateTabs:[]);
  const [currentTab, setCurrentTab] = useState( data ? data.proceduresTemplateTabs[0] : "");
  const fieldListWrapperElement = useRef();

  const { data } = useQuery(
    GET_PROCEDURES_TEMPLATES_TABS, { variables: {"id": procedure.proceduresTemplate.id },
    fetchPolicy: "no-cache"}
  );

  useEffect(() => {
    currentTab || (data && setCurrentTab(data.proceduresTemplateTabs[0]));
    data && setTabList(data.proceduresTemplateTabs);
  }, [data])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    return(
      tabList.map(
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
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Campos
          </Typography>
        </Grid>
      </Grid>
      <Divider/>
      <Grid item container justifyContent='flex-start' style={{ flex: '1 1 auto'}}>
        <Fields
          parentRef={fieldListWrapperElement}
          currentTab={currentTab && currentTab}
          procedure={procedure}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(InformationTabs);
