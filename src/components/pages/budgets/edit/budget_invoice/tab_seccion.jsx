import React, { useEffect }                 from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../styles';
import { useQuery }                         from '@apollo/client';
import { GET_BUDGETING_TEMPLATES_TABS }     from '../../queries_and_mutations/queries';
import FieldsFromTabs                       from './fields_form_tabs';
import { GET_BUDGET_TAB_TOTALS }            from '../../queries_and_mutations/queries';


const TabSeccion = (props) => {
  const { classes, budgetingTemplateId, budget } = props
  
  const { data: dataTabsTotals } = useQuery(
    GET_BUDGET_TAB_TOTALS,{ variables: { id: budget.id }, fetchPolicy: "no-cache"}
  );

  useEffect(() => {
    dataTabsTotals && setTabTotals(dataTabsTotals.budgetTabsTotals);
  }, [dataTabsTotals])

  const [tabTotals, setTabTotals] = React.useState();

  const { data: dataTabs } = useQuery(
    GET_BUDGETING_TEMPLATES_TABS, { variables: { id: budgetingTemplateId }}
  );

  useEffect(() => {
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
                tab={tab}
                budget={budget}
                tabTotals={tabTotals && tabTotals[tab.id].total}
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
