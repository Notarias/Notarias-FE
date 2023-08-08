import React, {useState}                    from 'react';
import Breadcrumbs                          from '../../../ui/breadcrumbs'
import Paper                                from '@material-ui/core/Paper';
import Chip                                 from '@material-ui/core/Chip';
import Grid                                 from '@material-ui/core/Grid';
import Hidden                               from '@material-ui/core/Hidden';
import { styles }                           from './styles';
import { withStyles }                       from '@material-ui/core/styles';
import Divider                              from '@material-ui/core/Divider';
import Tabs                                 from './edit/tabs';
import ActiveTemplateButton                 from './edit/active_template_button';
import TemplateTitle                        from './edit/template_title';
import { useQuery }                         from '@apollo/client';
import { GET_PROCEDURE_TEMPLATE }           from './queries_and_mutations/queries'
import CircularProgress                     from '@material-ui/core/CircularProgress';
import FieldsAndGroupFields                 from './edit/fields_and_group_fields';
import ButtonsNewFieldNewFieldsGroup        from './edit/buttons_newField_newFieldsGroup'
import ButgetingTemplateLinkButton          from './edit/budgeting_template_link_button'


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Trámites", path: "/config/procedure_templates" },
  { name: "Editar", path: null }
]


const Edit = (props) => {
  const { classes, match } = props

  const { loading, data } = useQuery(GET_PROCEDURE_TEMPLATE,
    { variables: {"id": match.params.id }, fetchPolicy: "cache-and-network" } 
  );
  const [currentTab, setCurrentTab] = useState()

  return (
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container direction="row">
        <Grid container item xs={9} direction="column">
          <Grid container direction="row" alignItems="center" 
            style={{paddingLeft:'30px', paddingRight:'30px'}}
          >
            <Hidden smDown>
              <Grid container item xs justifyContent="flex-start">
                <TemplateTitle
                  templateData={ data ? data.proceduresTemplate : " " }
                  match={ props.match.params }
                />
              </Grid>
              <Grid container item xs={8} justifyContent="flex-end">
                <Grid item style={{paddingRight:'50px'}}>
                  <Chip 
                    classes={{colorPrimary: classes.activeGreen}}
                    color={ data && data.proceduresTemplate.active ? "primary" : "secondary" }
                    label={ `VERSION: ${data && data.proceduresTemplate.version ? data.proceduresTemplate.version : "0"}.0 ` }
                  />
                </Grid>
                <Grid item style={{paddingRight:'20px'}}>
                  <ButgetingTemplateLinkButton
                    id={ match.params.id }
                    budgetingTemplatesData={ data ? data.proceduresTemplate.budgetingTemplates : null }
                  />
                </Grid>
                <Grid item>
                  <ActiveTemplateButton
                    templateData={ data ?  data.proceduresTemplate : [] }
                    match={ props.match.params }
                  />
                </Grid>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid container item xs={12} justifyContent="flex-start">
                <TemplateTitle
                  templateData={ data ? data.proceduresTemplate : " " }
                  match={ props.match.params }
                />
              </Grid>
              <Grid container item xs={12} justifyContent="flex-start">
                <Grid item style={{paddingRight:'20px'}}>
                  <ButgetingTemplateLinkButton
                    id={ match.params.id }
                    budgetingTemplatesData={ data ? data.proceduresTemplate.budgetingTemplates : null }
                  />
                </Grid>
                <Grid item>
                  <ActiveTemplateButton
                    templateData={data ?  data.proceduresTemplate : [] }
                    match={ props.match.params }
                  />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
          <Divider/>
          <Grid container direction="row" justifyContent="center">
            <Grid container item xs={6} direction="row" justifyContent="center">
              <ButtonsNewFieldNewFieldsGroup
                currentTab={ currentTab }
              />
            </Grid>
            {(loading || !data) ?
              <Grid container item className={ classes.circularProgressLoading } direction="column" alignItems="center" justifyContent="center">
                <CircularProgress size={ 100 }/>
              </Grid>
            :
              <FieldsAndGroupFields
                currentTab={ currentTab }
              />
            }
          </Grid>
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
                tabsData={data ? data.proceduresTemplate.tabs : []}
                currentTab={currentTab }
                setCurrentTab={ setCurrentTab }
                proceduresTemplateId={data ? data.proceduresTemplate.id : " " }
              />
            }
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Edit);
