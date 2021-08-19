import React, { useEffect } from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../styles';
import Grid                                 from '@material-ui/core/Grid';
import NumberFormat                         from 'react-number-format';
import { useQuery }                           from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }  from '../../queries_and_mutations/queries'
import { GET_BUDGETING_TEMPLATES_TABS }     from '../../queries_and_mutations/queries';
import FieldsFromTabs from './fields_form_tabs';

const TabSeccion = (props) => {
  const { classes, budgetId, budget } = props

  const { data: dataTabs } = useQuery(
    GET_BUDGETING_TEMPLATES_TABS, { variables: {"id": budgetId }}
  );

  useEffect(() => {
    // currentTab || (data && setCurrentTab(data.budgetingTemplateTabs[0]));
    dataTabs && setTabList(dataTabs.budgetingTemplateTabs);
  }, [dataTabs])

  const [tabList, setTabList] = React.useState(dataTabs ? dataTabs.budgetingTemplateTabs: []);

  const renderTabs = () => {
    return(
      tabList.map(
        (tab,) => {
          return(
            <React.Fragment key={tab.id + "fragment"}>
              <FieldsFromTabs
                tabId={tab.id}
                budgetId={budgetId}
                budget={budget}
              />
            </React.Fragment>
            )
        }
      )
    )
  }

  return(
    <>
      {renderTabs()}
    </>
  )
}

export default withStyles(styles)(TabSeccion);