import React                                from 'react';
import Breadcrumbs                          from '../../../ui/breadcrumbs'
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid';
import { styles }                           from './styles';
import { withStyles }                       from '@material-ui/core/styles';
import Divider                              from '@material-ui/core/Divider';
import Tabs                                 from './edit/tabs';
import ActiveTemplateButton                 from './edit/active_template_button';
import TemplateTitle                       from './edit/template_title';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_PROCEDURE_TEMPLATE }           from './queries_and_mutations/queries'
import CircularProgress                     from '@material-ui/core/CircularProgress';
import FieldsAndGroupFields                 from './edit/fields_and_group_fields';
import ButtonsNewFieldNewFieldsGroup        from './edit/buttons_newField_newFieldsGroup'
import ButgetingTemplateLinkButton           from './edit/budgeting_template_link_button'


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
  const [currentTab, setCurrentTab] = React.useState()

  return (
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container direction="row">
        <Grid container item xs={9} direction="column">
            <Grid container direction="row"  alignItems="center" className={ classes.addTittleProcedure }>
              <Grid container item xs={7} justify="flex-start">
                <TemplateTitle
                  templateData={ data ? data.proceduresTemplate : " " }
                  match={ props.match.params }
                />
              </Grid>
              <Grid container item xs={5} justify="center" alignItems="center">
                <Grid container item xs={6} justify="center">
                  <ButgetingTemplateLinkButton
                    id={ match.params.id }
                    budgetingTemplatesData={ data ? data.proceduresTemplate.budgetingTemplates : null }
                  />
                </Grid>
                <Grid container item xs={4} justify="center">
                  <ActiveTemplateButton
                    templateData={data ?  data.proceduresTemplate : [] }
                    match={ props.match.params }
                  />
                </Grid>
              </Grid>
            </Grid>
          <Divider/>
          <ButtonsNewFieldNewFieldsGroup
            currentTab={ currentTab }
          />
          { 
          (loading || !data) ?
            (
              <Grid container item className={ classes.circularProgressLoading } direction="column" alignItems="center" justify="center">
                <CircularProgress size={ 100 }/>
              </Grid>
            )
          :
            (
              <FieldsAndGroupFields
                currentTab={ currentTab }
              />
            )
          }
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
