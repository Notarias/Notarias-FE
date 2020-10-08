import React                        from 'react';
import Breadcrumbs                  from '../../../ui/breadcrumbs'
import Paper                        from '@material-ui/core/Paper';
import Grid                         from '@material-ui/core/Grid';
import { styles }                   from './styles';
import { withStyles }               from '@material-ui/core/styles';
import Divider                      from '@material-ui/core/Divider';
import TextField                    from '@material-ui/core/TextField';
import Button                       from '@material-ui/core/Button';
import DialogSelect                 from './edit/dialog_select'
import Field                        from './edit/field';
import FieldsGroup                  from './edit/fields_group';
import PostAddIcon                  from '@material-ui/icons/PostAdd';

import ProcedurePage                from './edit/procedure_page'


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Trámites", path: "/config/procedure_templates" },
  { name: "Editar", path: null }
]

const Edit = (props) => {

  const [fieldList, setfieldList] = React.useState([])
  const [fieldsGroupList, setfieldsGroupList] = React.useState([])
  const [open, setOpen] = React.useState(false);

  const { classes } = props

  const addNewField = (event) => {
    setfieldList(fieldList.concat([fieldList]));
    setOpen(false);
  }

  const renderFieldList = () => {
    return(
      fieldList.map(
        (field, index) => {
          return(
            <Field
              key={ index + "-field"}
              arrayIndex={ index }
            />
          )
        }
      )
    )
  }

  const addNewFieldsGroup = (event) => {
    setfieldsGroupList(fieldsGroupList.concat([fieldsGroupList]));
    setOpen(false);
  }

  const renderFieldsGroupList = () => {
    return(
      fieldsGroupList.map(
        (fieldsGroup, index) => {
          return (
            <FieldsGroup
            />
          )
        }
      )
    )
  }

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//desacoplar y borrar en su propio componente
  return (
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container direction="row">
        <Grid container item xs={9} direction="column">
          <Paper>
            <Grid container direction="row"  alignItems="center" className={ classes.addTittleProcedure }>
              <Grid container item xs={6} justify="flex-start">
                <TextField id="standard-basic" label="Agregar un Título" className={ classes.textFieldTittle }/>
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
                <Button variant="contained" color="primary" size="small" className={ classes.buttonHeight }>
                  Activar
                </Button>
                </Grid>
              </Grid>
            </Grid>
          <Divider/>
          <Grid container direction="column" justify="flex-start" alignItems="center">
            <Grid container item xs={10}>
              Campos
              {
                renderFieldList()
              }
            </Grid>
          <Divider/>
              <Grid container item xs={10}>
                Grupo de campos
                {
                  renderFieldsGroupList()
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container item xs={3} direction="column">
          <Paper>
          <ProcedurePage/>
          </Paper>
        </Grid>
      </Grid>

    </>
  )
}

export default withStyles(styles)(Edit);
