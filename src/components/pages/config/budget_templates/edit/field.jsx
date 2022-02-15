import React, { useState, useEffect }                 from 'react';
import Grid                                           from '@material-ui/core/Grid';
import TextField                                      from '@material-ui/core/TextField';
import Button                                         from '@material-ui/core/Button';
import DeleteForeverIcon                              from '@material-ui/icons/DeleteForever';
import { withStyles }                                 from '@material-ui/core/styles';
import { styles }                                     from '../styles';
import Dialog                                         from '@material-ui/core/Dialog';
import DialogActions                                  from '@material-ui/core/DialogActions';
import DialogContent                                  from '@material-ui/core/DialogContent';
import DialogTitle                                    from '@material-ui/core/DialogTitle';
import Paper                                          from '@material-ui/core/Paper';
import Typography                                     from '@material-ui/core/Typography';
import SaveIcon                                       from '@material-ui/icons/Save';
import CreateIcon                                     from '@material-ui/icons/Create';
import { useMutation }                                from '@apollo/client';
import { UPDATE_BUDGETING_TEMPLATE_TAB_FIELD }        from '../queries_and_mutations/queries'
import { DESTROY_BUDGETING_TEMPLATE_TAB_FIELD }       from '../queries_and_mutations/queries'
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }          from '../queries_and_mutations/queries'
import RadioButtonUncheckedIcon                       from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon                         from '@material-ui/icons/RadioButtonChecked';
import Chip                                           from '@material-ui/core/Chip';
import Avatar                                         from '@material-ui/core/Avatar';
import CategoriesSelectableList                       from './categories_selectable_list'
import { GLOBAL_MESSAGE }                             from '../../../../../resolvers/queries';
import client                                         from '../../../../../apollo';


const Field = (props) => {

  const { classes, id, currentTab, removeFromList } = props
  const [open, setOpen] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState(true);
  const [name, setName] = useState(props.name)
  const [categories, setCategories] = useState(props.categories);
  const [active, setActive] = useState(props.active || false);
  const [error, setError] = useState(false);
  const inputsList = ["name"]
  const [categoriesToSave, setCategoriesToSave] = useState(props.categories || [])


  const [updateBudgetingTemplateTabFieldMutation] =
    useMutation(
      UPDATE_BUDGETING_TEMPLATE_TAB_FIELD,
      {
        onError(apolloError) {
          setErrors(apolloError)
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Ocurrió un error",
                type: "error",
                __typename: "globalMessage"
              }
            }
          })
        },
        update(store, cacheData) {
          setError(false)
          setEditing(true)
          setOpenB(false)
        },
        refetchQueries: [{
          query: GET_BUDGETING_TEMPLATE_TAB_FIELDS,
          variables: { "id": currentTab && currentTab.id },
        }],
        awaitRefetchQueries: true
      }
    )

  const categoriesSavedIds = () => {
    return(
      categoriesToSave.map(category => (category.id))
    )
  }

  const setErrors = (apolloError) => {
    let errorsList = {}
    let errorTemplateList = apolloError.graphQLErrors
    for ( let i = 0; i < errorTemplateList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorTemplateList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorTemplateList[i].message
        }
      }
    }
    setError(errorsList) 
  }

  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])

  const updateField = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: id, name: name}})
  }

  const updateFieldCategories = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: id, categoriesIds: categoriesSavedIds() }})
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openCategoryList = () => {
    setOpenB(true);
  }

  const handleCloseCategoryList = () => {
    setOpenB(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const changeFieldStatus = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: id, active: !active}})
    setActive(!active)
    setOpenDialog(false);
  }

  const [destroyBudgetingTemplateTabFieldMutation] =
    useMutation(
      DESTROY_BUDGETING_TEMPLATE_TAB_FIELD, 
      {
        refetchQueries: [{
          query: GET_BUDGETING_TEMPLATE_TAB_FIELDS,
          variables: { "id": currentTab && currentTab.id },
        }],
        awaitRefetchQueries: true
      }
    )

  const deleteFieldClick = () => {
    destroyBudgetingTemplateTabFieldMutation({ variables: { id: id }})
    setOpen(false);
  }

  const editField = () => {
    setEditing(!editing)
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const statusField = () => { 
    return active ? "Desactivar" : "Activar"
  }

  const renderTextField = () => {
    return(
      <>
        <Grid container item xs={1} alignItems="center" justifyContent="center">
          <Button
            onClick={ editField }
          >
            <CreateIcon/>
          </Button>
        </Grid>
        <Grid container item xs={5}>
          <Typography className={ classes.texPlainTittleName }>
            { name }
          </Typography>
        </Grid>
      </>
    )
  }

  const renderInputField = () => {
    return(
      <>
        <Grid container item xs={1} alignItems="center" justifyContent="center">
          <Button
            onClick={ updateField }
          >
            <SaveIcon />
          </Button>
        </Grid>
        <Grid container item xs={5}>
          <TextField 
            id="standard-basic" 
            label="Nombre del campo"
            className={ classes.textInputTittleName }
            value={ name }
            onChange={ handleNameChange }
            error={ !!error["name"] && true }
            helperText={error["name"] || " "}
            errorskey={ "name" }
            name='name'
          />
        </Grid>
      </>
    )
  }

  const categoriesToShow = () => {
    if ( categories ){
      const categoryCount = categories.length
      return categoryCount
    } else {
      return "selecciona"
    }
  }


  return (
    <Grid container item alignItems="flex-start" justifyContent="flex-start" className={ classes.fielPaddingBottom } xs={12}>
      <Paper className={ classes.fieldPaper }>
        <Grid container>
          { editing ? renderTextField() : renderInputField() }
          <Grid container alignItems="center" justifyContent="center" item xs={1}>
          </Grid>
          <Grid container direction="column"  alignItems="center" justifyContent="center" item xs={3}>
            <Chip
              avatar={<Avatar>{ categoriesToShow() }</Avatar>}
              label={ ` categorias` }
              color={ categories.length > 0 ? "primary" : "default" }
              onClick={ openCategoryList }
            />
            <Dialog
              open={openB}
              onClose={handleCloseCategoryList}
            >
              <DialogTitle>
                Selecciona una o varias Categorias
              </DialogTitle>
              <DialogContent>
                <CategoriesSelectableList
                  CategoriesSelectableList={ CategoriesSelectableList }
                  setCategoriesToSave={ setCategoriesToSave }
                  categoriesToSave={ categoriesToSave }
                  categories={ categories }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={ handleCloseCategoryList }> Cancelar </Button>
                <Button onClick={ updateFieldCategories }> Aceptar </Button>
              </DialogActions>
            </Dialog>
          </Grid>

          <Grid container direction="column"  alignItems="center" justifyContent="center" item xs={1} onClick={ handleClickOpenDialog }>
            {
            active ?
              <Button>
                <RadioButtonCheckedIcon className={classes.radioButtonActiveGreen}/>
              </Button>
            :
              <Button>
                <RadioButtonUncheckedIcon color="secondary" className={ classes.defaultIcon }/>
              </Button>
            }
          </Grid>
          <Dialog
            open={ openDialog }
            onClose={ handleCloseDialog }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title"> Deseas {statusField()}</DialogTitle>
            <DialogContent>
              Realmente deseas { statusField() }
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleCloseDialog } color="secondary">
                Cancelar
              </Button>
              <Button
                color="primary"
                autoFocus
                onClick={ changeFieldStatus }
              >
                { statusField() }
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container direction="column"  alignItems="center" justifyContent="center" item xs={1}>
            <Button onClick={ handleClickOpen }>
              <DeleteForeverIcon/>
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Eliminar campo"}</DialogTitle>
              <DialogContent>
                Se eliminara de manera permantente el campo: 
                <Typography variant="subtitle2" className={ classes.texPlainTittleName }>
                  {name}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={ handleClose } color="secondary">
                  Cancelar
                </Button>
                <Button color="primary" autoFocus onClick={ deleteFieldClick }>
                  Borrar
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default  withStyles(styles)(Field);
