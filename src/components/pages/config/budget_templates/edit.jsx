import React                                from 'react';
import Breadcrumbs                          from '../../../ui/breadcrumbs'
import Divider                              from '@material-ui/core/Divider';
import Paper                                from '@material-ui/core/Paper';
import Chip                                 from '@material-ui/core/Chip';
import Grid                                 from '@material-ui/core/Grid';
import Hidden                               from '@material-ui/core/Hidden';
import { styles }                           from './styles';
import { withStyles }                       from '@material-ui/core/styles';
import CircularProgress                     from '@material-ui/core/CircularProgress';
import TemplateTitle                        from './edit/template_title';
import { useQuery }                         from '@apollo/client';
import { GET_BUDGETING_TEMPLATE }           from './queries_and_mutations/queries'
import ActiveTemplateButton                 from './edit/active_template_button';
import ProcedureTemplateLinkButton          from './edit/procedure_template_link_button';
import Tabs                                 from './edit/tabs';
import NewFieldButton                       from './edit/new_field_button';
import RenderFields                         from './edit/render_fields';
import NewFieldTaxButton                    from './edit/newFieldTaxButton/new_field_tax_button'


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
          <Grid container direction="row"  alignItems="center" 
            style={{paddingLeft:'30px', paddingRight:'30px', paddingTop:'15px', paddingBottom:'15px'}}
          >
            <Hidden smDown>
              <Grid container item xs justifyContent="flex-start">
                <TemplateTitle
                  templateData={ data ? data.budgetingTemplate : " " }
                  match={ props.match.params }
                />
              </Grid>
              <Grid container item xs={8} justifyContent="flex-end" alignItems="center">
                <Grid item style={{paddingRight:'50px'}}>
                  <Chip 
                    classes={{colorPrimary: classes.activeGreen}}
                    color={data.budgetingTemplate.active ? "primary" : "secondary"}
                    label={`VERSION: ${data.budgetingTemplate.version ? data.budgetingTemplate.version : "0"}.0 `}
                  />
                </Grid>
                <Grid item style={{paddingRight:'20px'}}>
                  <ProcedureTemplateLinkButton
                    id={ match.params.id }
                    proceduresTemplatesData={ data ? data.budgetingTemplate.proceduresTemplates : null }
                  />
                </Grid>
                <Grid item>
                  <ActiveTemplateButton
                    templateData={data ? data.budgetingTemplate : [] }
                    match={ props.match.params }
                  />
                </Grid>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid container item xs={12} alignItems="center">
                <TemplateTitle
                  templateData={ data ? data.budgetingTemplate : " " }
                  match={ props.match.params }
                />
              </Grid>
              <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
                <Grid item style={{paddingRight:'20px'}}>
                  <ProcedureTemplateLinkButton
                    id={ match.params.id }
                    proceduresTemplatesData={ data ? data.budgetingTemplate.proceduresTemplates : null }
                  />
                </Grid>
                <Grid item>
                  <ActiveTemplateButton
                    templateData={data ? data.budgetingTemplate : [] }
                    match={ props.match.params }
                  />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
          <Divider/>
          <Grid container justifyContent='center' direction="row">
            <NewFieldButton
              templateData={data ? data.budgetingTemplate.fields : [] }
              currentTab={ currentTab }
            />
            <NewFieldTaxButton
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
