import React                                          from 'react';
import Grid                                           from '@material-ui/core/Grid';
import TextField                                      from '@material-ui/core/TextField';
import StarsIcon                                      from '@material-ui/icons/Stars';
import FormControlLabel                               from '@material-ui/core/FormControlLabel';
import Checkbox                                       from '@material-ui/core/Checkbox';
import StarBorderIcon                                 from '@material-ui/icons/StarBorder';
import Button                                         from '@material-ui/core/Button';
import DeleteForeverIcon                              from '@material-ui/icons/DeleteForever';
import { withStyles }                                 from '@material-ui/core/styles';
import { styles }                                     from '../styles';
import FormControl                                    from '@material-ui/core/FormControl';
import Select                                         from '@material-ui/core/Select';
import MenuItem                                       from '@material-ui/core/MenuItem';
import InputLabel                                     from '@material-ui/core/InputLabel';
import Dialog                                         from '@material-ui/core/Dialog';
import DialogActions                                  from '@material-ui/core/DialogActions';
import DialogContent                                  from '@material-ui/core/DialogContent';
import DialogTitle                                    from '@material-ui/core/DialogTitle';
import Paper                                          from '@material-ui/core/Paper';
import Typography                                     from '@material-ui/core/Typography';
import SaveIcon                                       from '@material-ui/icons/Save';
import CreateIcon                                     from '@material-ui/icons/Create';
import { useMutation }                                from '@apollo/react-hooks';
import { UPDATE_BUDGETING_TEMPLATE_TAB_FIELD }        from '../queries_and_mutations/queries'
import { DESTROY_BUDGETING_TEMPLATE_TAB_FIELD }       from '../queries_and_mutations/queries'
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }          from '../queries_and_mutations/queries'
import RadioButtonUncheckedIcon                       from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon                         from '@material-ui/icons/RadioButtonChecked';
import List                                           from '@material-ui/core/List';
import ListItem                                       from '@material-ui/core/ListItem';

import AddCategoryToField                             from './add_category_to_field';

import Fuse                                           from 'fuse.js';
// import { List } from '@material-ui/core';


const INPUT_CATEGORIES = {
  cateA: "IVA",
  cateB: "Comision",
  cateC: "ISR",
}

const Field = (props) => {

  const { classes, id, groupId, currentTab, removeFromList } = props
  const [open, setOpen] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editing, setEditing] = React.useState(true);
  const [name, setName] = React.useState(props.name)
  const [categories, setCategories] = React.useState(props.categories);
  const [active, setActive] = React.useState(props.active);
  const [error, setError] = React.useState(false);
  const inputsList = ["name"]

  const [searchList, setSearchList] = React.useState([]);
  const [initialList, setInitialList] = React.useState([]);
  const [fuzzySearcher, setFuzzySearcher] = React.useState(new Fuse(initialList, { keys: ['name'] }));

  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    
    if (event.target.value.length === 0){
      setSearchList(initialList)
    } else {
      setSearchList(result)
    }
  }

  const [updateBudgetingTemplateTabFieldMutation, updateProcessInfo] =
    useMutation(
      UPDATE_BUDGETING_TEMPLATE_TAB_FIELD,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        update(store, cacheData) {
          setActive(cacheData.data.updateBudgetingTemplateField.budgetingTemplateField.active)
          setError(false)
          setEditing(true)
        },
        refetchQueries: [{
          query: GET_BUDGETING_TEMPLATE_TAB_FIELDS,
          variables: { "id": currentTab && currentTab.id },
        }],
        awaitRefetchQueries: true
      }
    )

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

  const updateField = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: id, name: name, categories: categories}})
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
    updateBudgetingTemplateTabFieldMutation({ variables: { id: id, active: !active }})
    setActive(!active)
    setOpenDialog(false);
  }

  const [destroyBudgetingTemplateTabFieldMutation, destroyProcessInfo] =
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
    removeFromList(props.arrayIndex, destroyBudgetingTemplateTabFieldMutation, { variables: { id: id } }, id )
    setOpen(false);
  }

  const editField = () => {
    setEditing(!editing)
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategories(event.target.value);
  };

  const statusField = () => { 
    return active ? "Desactivar" : "Activar"
  }

  const renderTextField = () => {
    return(
      <>
        <Grid container item xs={1} alignItems="center" justify="center">
          <Button
            onClick={ editField }
          >
            <CreateIcon/>
          </Button>
        </Grid>
        <Grid container item xs={5}>
          <Typography className={ classes.texPlainTittleName }>
            { name } { id } -{ groupId }
          </Typography>
        </Grid>
      </>
    )
  }

  
  const renderCategoriesList = () => {
    return(
      <>
        {
          categories.map(
            (category, index) => {
              return(
                <List
                  key={ category.id + "-category"}
                >
                  <ListItem>
                    { category.name }
                    {/* id={ category.id || " " }
                    "hola" */}
                  </ListItem>
                </List>
              )
            }
          )
        }
      </>
    )
  }


  const renderInputField = () => {
    return(
      <>
        <Grid container item xs={1} alignItems="center" justify="center">
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

  console.log("active", props.active)
  return (
    <Grid container item alignItems="flex-start" justify="flex-start" className={ classes.fielPaddingBottom }>
      <Paper>
      <Grid container item className={ classes.fieldHeightRow }>
        { editing ? renderTextField() : renderInputField() }
        <Grid container item direction="column"  alignItems="center" justify="center" item xs={4}>
          <Button 
            onClick={ openCategoryList }
          >
            + Categoria
          </Button>
          <Dialog
            open={openB}
            onClose={handleCloseCategoryList}
          >
            <DialogTitle>
              Agrega una Categoria
            </DialogTitle>
            <DialogContent>
              <AddCategoryToField/>
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleCloseCategoryList }> Cancelar </Button>
              <Button> Aceptar </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid container item direction="column"  alignItems="center" justify="center" item xs={1} onClick={ handleClickOpenDialog }>
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
        <Grid container item direction="column"  alignItems="center" justify="center" item xs={1}>
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
