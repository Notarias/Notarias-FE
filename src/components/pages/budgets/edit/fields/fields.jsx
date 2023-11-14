import React, { useState, useEffect }         from 'react';
import Grid                                   from '@material-ui/core/Grid';
import Hidden                                 from '@material-ui/core/Hidden';
import Skeleton                               from '@material-ui/lab/Skeleton';
import Divider                                from '@material-ui/core/Divider';
import Typography                             from '@material-ui/core/Typography';
import FieldValue                             from './field_value';
import TaxFieldValue                          from './tax_field_value';
import FieldTotalValues                       from './field_total_values';
import TabTotalValues                         from './tab_total_values';
import CreateComments                         from './create_comments';
import { withStyles }                         from '@material-ui/core/styles';
import { styles }                             from '../../styles';
import { useQuery }                           from '@apollo/client';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }  from '../../queries_and_mutations/queries';
import { GET_BUDGETING_TAB_TOTALS }           from '../../queries_and_mutations/queries';
import { GET_CREDIT_TOTAL }                   from '../../queries_and_mutations/queries';

const Fields = (props) => {
  const { currentTab, budget, classes} = props;

  const [array] = useState([1,2,3,4,5,6,7]);

  const { loading, data } = useQuery(
    GET_BUDGETING_TEMPLATE_TAB_FIELDS, { variables: { id: currentTab.id, active: true, } }
  );

  const { data: tabTotalData } = useQuery(
    GET_BUDGETING_TAB_TOTALS, { variables: { id: currentTab.id, budgetId: budget.id } }
  );

  const { data: creditTotalData } = useQuery(
    GET_CREDIT_TOTAL, { variables: { "id": budget.id } }
  );

  const [fields, setFields] = useState(data ? data.budgetingTemplateTabFields : [])
  const [totals, setTotals] = useState(tabTotalData && tabTotalData.tabTotals)
  const [creditTotal, setCreditTotal] = useState(creditTotalData && creditTotalData.BudgetTotals)

  useEffect(() => {
    if(data){
      data && setFields(data.budgetingTemplateTabFields);
    }
    if (tabTotalData) {
      tabTotalData && setTotals(tabTotalData.tabTotals)
    }
    if (creditTotalData) {
      creditTotalData && setCreditTotal(creditTotalData.budgetTotals)
    } 
  }, [loading, data, tabTotalData, creditTotalData, currentTab])

  return(
    <Grid item container style={{ flex: '1 1 auto' }} direction='column' alignItems="stretch" justifyContent="flex-start" >
      <Grid item container justifyContent="flex-start">
        { loading || !data ? array.map(
            (index) => {
              return(
                <Grid container item justifyContent='center' style={{ minHeight: '70px' }} key={index + 'field-row'}>
                  <Grid item xs={11} style={{marginTop: "20px"}}>
                    <Skeleton variant="rect" width="100%"/>
                    <Skeleton variant="rect" width="100%"/>
                  </Grid>
                </Grid>
              )
            }
        ) : (
          fields.map((field) => {
            return(
              <Grid container item style={{ minHeight: '70px' }} key={field.id + 'field-row'}>
                { field.fieldType === "tax" ?
                  <TaxFieldValue
                    budget={budget}
                    field={field}
                    key={field.id + "-field"}
                  /> 
                :
                  <FieldValue
                    budget={budget}
                    field={field}
                    key={field.id + "-field"}
                    tabId={currentTab.id}
                  />
                }
              </Grid>
            )
          })
        )}
      </Grid>
      <Divider variant="middle"/>
      <Grid container item direction='column' justifyContent="center" alignItems='stretch' style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Grid container item direction='row' justifyContent="flex-end">
          <Grid item xs>
            <Typography variant='h6'>
              {currentTab.name}
            </Typography>
          </Grid>
          <Grid container item xs={8                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          } lg={8} xl={6} alignItems="flex-end" className={classes.totalValuesGridContainer}>
            <TabTotalValues totals={totals} creditTotal={creditTotal}/>
          </Grid>
        </Grid>
      </Grid>           
      <Divider/>
      <Hidden mdDown>
        <Grid container item justifyContent="flex-end" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Grid container item xs>
            <CreateComments budget={budget}/>
          </Grid>
          <Grid container item xs={8} lg={8} xl={6} alignItems="flex-end" className={classes.totalValuesGridContainer}>
            <FieldTotalValues budget={budget}/>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden lgUp>
        <Grid container item direction='column' justifyContent="center" alignItems='stretch' style={{ padding: "20px"}}>
          <Grid container item style={{ paddingBottom: "20px"}}>
            <CreateComments budget={budget}/>
          </Grid>
          <Grid container item alignItems="center" className={classes.totalValuesGridContainer}>
            <FieldTotalValues budget={budget}/>
          </Grid>
        </Grid>
      </Hidden>

    </Grid>
  )
}

export default withStyles(styles)(Fields);
