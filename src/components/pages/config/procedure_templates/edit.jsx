import React                        from 'react';
import Breadcrumbs                  from '../../../ui/breadcrumbs'
import Paper                        from '@material-ui/core/Paper';
import Grid                         from '@material-ui/core/Grid';
import { styles }                   from './styles';
import { withStyles }               from '@material-ui/core/styles';
import Divider                      from '@material-ui/core/Divider';
import Button                       from '@material-ui/core/Button';
import DialogSelect                 from './edit/dialog_select';
import PostAddIcon                  from '@material-ui/icons/PostAdd';
import RenderFieldList              from './edit/render_field_list';
import RenderFieldsGroupList        from './edit/render_fields_group_list';
import Tabs                         from './edit/tabs';
import ActiveTemplateButton         from './edit/active_template_button';
import TemplateTittle               from './edit/template_tittle';
import { useQuery }                 from '@apollo/react-hooks';
import { GET_PROCEDURE_TEMPLATE }   from './queries_and_mutations/queries'

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Trámites", path: "/config/procedure_templates" },
  { name: "Editar", path: null }
]


const Edit = (props) => {

  const { classes, match } = props

  const [open, setOpen] = React.useState(false);
  const { loading, data } = useQuery(GET_PROCEDURE_TEMPLATE, { variables: {"id": match.params.id }} );
  const [currentTab, setCurrentTab] = React.useState(data ? data.procedureTemplate.tabs[0]: [])


  
  // const fdsafdsafdas = (currentTab) => {
  //   setfieldList(currentTab.groups.find(element => !element.id))
  //   setFieldsGroups(currentTab.groups)
  // }

  const addNewField = (event) => {
    // setfieldList(fieldList.concat([fieldList]));
    setOpen(false);
  }

  // const removeFromList = (index) => {
  //   fieldList.splice(index, 1)
  //   let newArray = fieldList.slice()
  //   setfieldList(newArray)
  // }

  const addNewFieldsGroup = (event) => {
    // setFieldsGroupList(fieldsGroupList.concat([fieldsGroupList]));
    setOpen(false);
  }

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTab = (newTab) => {
    setCurrentTab(newTab);
  }

  const checkFieldsId = (currentTab) => {
    if(currentTab.groups){
      let group = currentTab.groups.find(group => !group.id)
      if(group && group.fields){
        return group.fields
      } else {
        return []
      }
    } else {
      return []
    } 
  }

  //pasar cosas para arriba es a travez de las variables(parentesis) y separar

  return (
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container direction="row">
        <Grid container item xs={10} direction="column">
            <Grid container direction="row"  alignItems="center" className={ classes.addTittleProcedure }>
              <Grid container item xs={7} justify="flex-start">
                <TemplateTittle
                  templateData={ data ? data.procedureTemplate: " " }
                  match={ props.match.params }
                />
              </Grid>
              <Grid container item xs={5} justify="flex-end" alignItems="center">
                <Grid container item xs={4} justify="center">
                  <Button variant="contained" onClick={ handleClickOpen } className={ classes.buttonHeight }>
                    <PostAddIcon/>
                  </Button>
                  <DialogSelect
                  open={ open }
                  handleClose={ handleClose }
                  addNewFieldsGroup={ addNewFieldsGroup }
                  addNewField={ addNewField }
                  />
                </Grid>
                <Grid container item xs={4} justify="center">
                  <Button variant="contained" size="small" className={ classes.buttonAddProcedure }>
                  + presupuesto
                  </Button>
                </Grid>
                <Grid container item xs={4} justify="center">
                  <ActiveTemplateButton
                    templateData={data?  data.procedureTemplate : [] }
                    match={ props.match.params }
                  />
                </Grid>
              </Grid>
            </Grid>
          <Divider/>
          <Grid container item direction="column" alignItems="center">
            <Grid container item xs={10} alignItems="center" justify="center">
              Campos
              <RenderFieldList
                // removeFromList={ removeFromList }
                fields={ currentTab ? currentTab.fields : [] }
              />
            </Grid>
              <Grid container item xs={10}  justify="center" alignItems="center">
                Grupo de campos
              <RenderFieldsGroupList
                  addNewField={ addNewField }
                  // removeFromList={ removeFromList }
                  currentTab={ currentTab }
                />
              </Grid>
            </Grid>
        </Grid>
        <Grid container item xs={2} direction="column">
          <Paper>
          <Tabs 
            tabsData={data ? data.procedureTemplate.tabs : []}
            currentTab={currentTab }
            changeTab={ changeTab }
            // changeFields={  }
          />
          </Paper>
        </Grid>
      </Grid>

    </>
  )
}

export default withStyles(styles)(Edit);
