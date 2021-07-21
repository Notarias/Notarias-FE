import React                                from 'react';
import Breadcrumbs                          from '../../../ui/breadcrumbs'
import Divider                              from '@material-ui/core/Divider';
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid';
import { styles }                           from './styles';
import { withStyles }                       from '@material-ui/core/styles';
import CircularProgress                     from '@material-ui/core/CircularProgress';
import TemplateTitle                       from './edit/template_title';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATE }           from './queries_and_mutations/queries'
import ActiveTemplateButton                 from './edit/active_template_button';
import ProcedureTemplateLinkButton           from './edit/procedure_template_link_button';
import Tabs                                 from './edit/tabs';
import NewFieldButton                       from './edit/new_field_Button';
import RenderFields                         from './edit/render_fields';
import NewFliedTaxButton    from './edit/newFieldTaxButton/new_field_tax_button'


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path:"/config/budget_templates" },
  { name: "Editar", path: null }
]

const Edit = (props) => {
  const { classes, match } = props
  const { loading, data } = useQuery(GET_BUDGETING_TEMPLATE,
    { variables: {"id": match.params.id }, fetchPolicy: "cache-and-network", } 
  );

  const [currentTab, setCurrentTab] = React.useState()

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container direction="row">
        <Grid container item xs={9} direction="column">
            <Grid container direction="row"  alignItems="center" className={ classes.addTittleProcedure }>
              <Grid container item xs={7} justifyContent="flex-start">
                <TemplateTitle
                  templateData={ data ? data.budgetingTemplate : " " }
                  match={ props.match.params }
                />
              </Grid>
              <Grid container item xs={5} justifyContent="flex-end" alignItems="center">
                <Grid container item xs={3} justifyContent="center">
                </Grid>
                <Grid container item xs={5} justifyContent="center">
                  <ProcedureTemplateLinkButton
                    id={ match.params.id }
                    proceduresTemplatesData={ data ? data.budgetingTemplate.proceduresTemplates : null }
                  />
                </Grid>
                <Grid container item xs={4} justifyContent="center">
                  <ActiveTemplateButton
                    templateData={data ? data.budgetingTemplate : [] }
                    match={ props.match.params }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider/>
            <Grid container direction="row">
              <NewFieldButton
                currentTab={ currentTab }
              />
              <NewFliedTaxButton
                templateData={data ? data.budgetingTemplate.fields : [] }
                currentTab={ currentTab }
              />
            </Grid>
            <RenderFields
              currentTab={ currentTab }
              data={ data }
              loading={ loading }
            />
          </Grid>
          <Grid container item xs={3} direction="column">
          <Paper>
            {
              (loading || !data) ?
                (
                  <Grid container item className={ classes.circularProgressLoading } direction="column" alignItems="center" justifyContent="center">
                    <CircularProgress size={ 100 }/>
                  </Grid>
                )
              :
              <Tabs 
                tabsData={data ? data.budgetingTemplate.tabs : []}
                currentTab={currentTab }
                setCurrentTab={ setCurrentTab }
                budgetingTemplateId={data ? data.budgetingTemplate.id : " " }
              />
            }
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Edit);
