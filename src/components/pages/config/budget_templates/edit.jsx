import React                                from 'react';
import Breadcrumbs                          from '../../../ui/breadcrumbs'
import Divider                              from '@material-ui/core/Divider';
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid';
import { styles }                           from './styles';
import { withStyles }                       from '@material-ui/core/styles';
import Button                               from '@material-ui/core/Button';
import CircularProgress                     from '@material-ui/core/CircularProgress';
import TemplateTittle                       from './edit/template_tittle';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATE }           from './queries_and_mutations/queries'
import Typography                           from '@material-ui/core/Typography';
import AddIcon                              from '@material-ui/icons/Add';
import ActiveTemplateButton                 from './edit/active_template_button';
import AddProcedureTemplateButton           from './edit/add_procedure_template_button';
import Tabs                                 from './edit/tabs';
import NewFieldButton                       from './edit/new_field_Button';
import RenderFields                         from './edit/render_fields';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path:"/config/budget_templates" },
  { name: "Editar", path: null }
]

const Edit = (props) => {
  const { classes, match } = props
  const { loading, data, refetch } = useQuery(GET_BUDGETING_TEMPLATE,
    { variables: {"id": match.params.id } } 
  );

  const [currentTab, setCurrentTab] = React.useState()

  console.log(data ? data : "vacio", "DT")
  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container direction="row">
        <Grid container item xs={9} direction="column">
            <Grid container direction="row"  alignItems="center" className={ classes.addTittleProcedure }>
              <Grid container item xs={7} justify="flex-start">
                <TemplateTittle
                  templateData={ data ? data.budgetingTemplate : " " }
                  match={ props.match.params }
                />
              </Grid>
              <Grid container item xs={5} justify="flex-end" alignItems="center">
                <Grid container item xs={3} justify="center">
                </Grid>
                <Grid container item xs={5} justify="center">
                  <AddProcedureTemplateButton
                    id={ match.params.id }
                    proceduresTemplatesData={ data ? data.budgetingTemplate.proceduresTemplates : null }
                  />
                </Grid>
                <Grid container item xs={4} justify="center">
                  <ActiveTemplateButton
                    templateData={data ? data.budgetingTemplate : [] }
                    match={ props.match.params }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider/>
            <NewFieldButton
              currentTab={ currentTab }
            />
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
                  <Grid container item className={ classes.circularProgressLoading } direction="column" alignItems="center" justify="center">
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
