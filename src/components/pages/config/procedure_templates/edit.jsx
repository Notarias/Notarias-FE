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


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Trámites", path: "/config/procedure_templates" },
  { name: "Editar", path: null }
]

const MOCK_DATA = {
  data:{
    procedureTemplate: {
      name: "nombre de la plantilla",
      tabs:[
        {
          id: 1,
          name: "Comprador",
          fields: [
            {
              id: 1,
              name: "Nombre",
              fieldType: "string",
              favourite: true,
              deletedAt: null
            },
            {
              id: 156,
              name: "Nombre2",
              fieldType: "number",
              favourite: false,
              deletedAt: null
            },
            {
              id: 2,
              name: "Nombre3",
              fieldType: "number",
              favourite: false,
              deletedAt: null
            },
            {
              id: 536,
              name: "Nombre4",
              fieldType: "string",
              favourite: true,
              deletedAt: null
            }
          ],
          groups: [
            {
              id: 1,
              name: "Compras",
              fields: [
                {
                  id: 4,
                  name: "Nom",
                  fieldType: "number",
                  favourite: false,
                  deletedAt: null
                },
                {
                  id: 157,
                  name: "Nom2",
                  fieldType: "string",
                  favourite: true,
                  deletedAt: null
                },
                {
                  id: 6,
                  name: "Nom3",
                  fieldType: "number",
                  favourite: false,
                  deletedAt: null
                },
                {
                  id: 537,
                  name: "Nom4",
                  fieldType: "string",
                  favourite: true,
                  deletedAt: null
                }
              ]
            },
            {
              id: 2,
              name: "Compras2",
              fields: [
                {
                  id: 14,
                  name: "Nono",
                  fieldType: "number",
                  favourite: true,
                  deletedAt: null
                },
                {
                  id: 167,
                  name: "Nono2",
                  fieldType: "number",
                  favourite: true,
                  deletedAt: null
                },
                {
                  id: 16,
                  name: "Nono3",
                  fieldType: "string",
                  favourite: false,
                  deletedAt: null
                },
                {
                  id: 547,
                  name: "Nono4",
                  fieldType: "number",
                  favourite: false,
                  deletedAt: null
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: "Vendedor",
          fields: [
            {
              id: 10,
              name: "anonimo",
              fieldType: "string",
              favourite: false,
              deletedAt: null
            },
            {
              id: 166,
              name: "anonimo2",
              fieldType: "string",
              favourite: true,
              deletedAt: null
            },
            {
              id: 12,
              name: "anonimo3",
              fieldType: "number",
              favourite: false,
              deletedAt: null
            },
            {
              id: 546,
              name: "anonimo4",
              fieldType: "string",
              favourite: true,
              deletedAt: null
            }
          ],
          groups: [
            {
              id: 3,
              name: "ventas",
              fields: [
                {
                  id: 15,
                  name: "Vent",
                  fieldType: "string",
                  favourite: true,
                  deletedAt: null
                },
                {
                  id: 168,
                  name: "Vent2",
                  fieldType: "string",
                  favourite: false,
                  deletedAt: null
                },
                {
                  id: 16,
                  name: "Vent3",
                  fieldType: "number",
                  favourite: false,
                  deletedAt: null
                },
                {
                  id: 548,
                  name: "Vent4",
                  fieldType: "string",
                  favourite: true,
                  deletedAt: null
                }
              ]
            }
          ]
        }
      ]
    }
  }
}


const Edit = (props) => {

  const [open, setOpen] = React.useState(false);
  const data = MOCK_DATA;
  const [currentTab, setCurrentTab] = React.useState(data.data.procedureTemplate.tabs[0])

  const { classes } = props

  // const fdsafdsafdas = (currentTab) => {
  //   setfieldList(currentTab.groups.find(element => !element.id))
  //   setFieldsGroups(currentTab.groups)
  // }

  const addNewField = (event) => {
    // setfieldList(fieldList.concat([fieldList]));
    console.log("Creado nuevo field")
    setOpen(false);
  }

  // const removeFromList = (index) => {
  //   fieldList.splice(index, 1)
  //   let newArray = fieldList.slice()
  //   setfieldList(newArray)
  // }

  const addNewFieldsGroup = (event) => {
    // setFieldsGroupList(fieldsGroupList.concat([fieldsGroupList]));
    console.log("Creado nuevo GRUPO")
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
        <Grid container item xs={9} direction="column">
            <Grid container direction="row"  alignItems="center" className={ classes.addTittleProcedure }>
              <Grid container item xs={6} justify="flex-start">
                <TemplateTittle/>
              </Grid>
              <Grid container item xs={6} justify="flex-end">
                <Grid container item xs={2} justify="center">
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
                <Grid container item xs={2}>
                  <ActiveTemplateButton/>
                </Grid>
              </Grid>
            </Grid>
          <Divider/>
          <Grid container item direction="column" alignItems="center">
            <Grid container item xs={10} alignItems="center" justify="center">
              Campos
              <RenderFieldList
                // removeFromList={ removeFromList }
                fields={ currentTab.fields || [] }
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
        <Grid container item xs={3} direction="column">
          <Paper>
          <Tabs 
            tabsData={data.data.procedureTemplate.tabs}
            currentTab={currentTab}
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
