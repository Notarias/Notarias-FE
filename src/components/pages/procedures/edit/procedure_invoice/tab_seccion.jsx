import React, { useEffect }                 from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../styles';
import { useQuery }                         from '@apollo/client';
import { GET_PROCEDURE_TEMPLATES_TABS }     from '../../queries_and_mutations/queries';
import FieldsFromTabs                       from './fields_form_tabs';
import { GET_PROCEDURE_TAB_TOTALS }            from '../../queries_and_mutations/queries';


const TabSeccion = (props) => {
  const { classes, proceduringingTemplateId, procedure } = props
  
  const { data: dataTabsTotals } = useQuery(
    GET_PROCEDURE_TAB_TOTALS,{ variables: { id: procedure.id }, fetchPolicy: "no-cache"}
  );

  useEffect(() => {
    dataTabsTotals && setTabTotals(dataTabsTotals.procedureTabsTotals);
  }, [dataTabsTotals])

  const [tabTotals, setTabTotals] = useState();

  const { data: dataTabs } = useQuery(
    GET_PROCEDURE_TEMPLATES_TABS, { variables: { id: proceduringingTemplateId }}
  );

  useEffect(() => {
    dataTabs && setTabList(dataTabs.proceduringTemplateTabs);
  }, [dataTabs])

  const [tabList, setTabList] = useState(dataTabs ? dataTabs.proceduringTemplateTabs: []);


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
