import React, { useState, useEffect }                 from 'react';
import Grid                                           from '@material-ui/core/Grid';
import Paper                                          from '@material-ui/core/Paper';
import TextField                                      from '@material-ui/core/TextField';
import InputBase                                      from '@material-ui/core/InputBase';
import IconButton                                     from '@material-ui/core/IconButton';
import Chip                                           from '@material-ui/core/Chip';
import Avatar                                         from '@material-ui/core/Avatar';
import Badge                                          from '@material-ui/core/Badge';
import DeleteForeverIcon                              from '@material-ui/icons/DeleteForever';
import SaveIcon                                       from '@material-ui/icons/Save';
import CreateIcon                                     from '@material-ui/icons/Create';
import SettingsIcon                                   from '@material-ui/icons/Settings';
import { withStyles }                                 from '@material-ui/core/styles';
import { styles }                                     from '../styles';
import { useMutation }                                from '@apollo/client';
import { UPDATE_BUDGETING_TEMPLATE_TAB_FIELD }        from '../queries_and_mutations/queries'
import { DESTROY_BUDGETING_TEMPLATE_TAB_FIELD }       from '../queries_and_mutations/queries'
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }          from '../queries_and_mutations/queries'
import { GLOBAL_MESSAGE }                             from '../../../../../resolvers/queries';
import client                                         from '../../../../../apollo';
import TaxedFields                                    from './taxed_fields'
import CategoryDialog                                 from './category_dialog';
import FieldSettingsDialog                            from './field_settings_dialog';
import DeleteFieldDialog                              from './delete_field_dialog';

const TaxField = (props) => {

  const { classes, id, currentTab, field } = props
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [editing, setEditing] = useState(true);
  const [name, setName] = useState(props.name)
  const [categories, setCategories] = useState(props.categories);
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
          setCategoryDialog(false)
        },
        refetchQueries: [{
          query: GET_BUDGETING_TEMPLATE_TAB_FIELDS,
          variables: { "id": currentTab && currentTab.id },
        }],
        awaitRefetchQueries: true
      }
    )

  const [destroyBudgetingTemplateTabFieldMutation] =
    useMutation(
      DESTROY_BUDGETING_TEMPLATE_TAB_FIELD, 
      {
        refetchQueries: [{
          query: GET_BUDGETING_TEMPLATE_TAB_FIELDS,
          variables: { "id": currentTab.id },
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

  const deleteFieldClick = () => {
    destroyBudgetingTemplateTabFieldMutation({ variables: { id: id }})
    setDeleteDialog(false);
  }

  const openDeleteDialog = () => {
    setDeleteDialog(!deleteDialog);
  };

  const openCategoryList = () => {
    setCategoryDialog(!categoryDialog);
  }

  const openSettingsDialog = () => {
    setSettingsDialog(!settingsDialog)
  }

  const editField = () => {
    setEditing(!editing)
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }; 

  const renderTextField = () => {
    return(
      <>
        <Grid container item xs={1} alignItems="center" justifyContent="center">
          <IconButton
            onClick={ editField }
          >
            <CreateIcon/>
          </IconButton>
        </Grid>
        <Grid container item xs={6}>
          <InputBase
            value={ name }
            readOnly={true}
            inputProps={{ 'aria-label': 'naked' }}
            variant="outlined"
            fullWidth
            style={{paddingLeft: '5px', paddingTop:'12px', paddingBottom:'12px'}}
          />
        </Grid>
      </>
    )
  }

  const renderInputField = () => {
    return(
      <>
        <Grid container item xs={1} alignItems="center" justifyContent="center">
          <IconButton
            onClick={ updateField }
          >
            <SaveIcon />
          </IconButton>
        </Grid>
        <Grid container item xs={6}>
          <TextField 
            id="standard-basic" 
            value={ name }
            onChange={ handleNameChange }
            variant="outlined"
            style={{'backgroundColor': 'rgb(200, 200, 200)'}}
            fullWidth
            error={ !!error["name"] && true }
            helperText={error["name"] || ""}
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
    <Grid id='fields-rows' container item xs={12} direction='column' justifyContent="center" style={{padding:'5px'}}>
      <Paper style={{padding:'5px'}}>
        <Grid container>
          { editing ? renderTextField() : renderInputField() }
          <Grid container alignItems="center" justifyContent="center" item xs={1}>
            {field.taxableSelector === 'tariff' ?
              <Chip
                label='Arancel'
                color='primary'
              />
            :
              <Badge classes={{badge: classes.badgeGreenColor}} overlap="circular" badgeContent={field && field.defaultValue + "%"}/>
            }
          </Grid>
          <Grid container direction="column"  alignItems="center" justifyContent="center" item xs={2}>
            <Chip
              avatar={<Avatar>{ categoriesToShow() }</Avatar>}
              label={ ` categorias` }
              color={ categories.length > 0 ? "primary" : "default" }
              onClick={ openCategoryList }
            />
          </Grid>

          <Grid container direction="column"  alignItems="center" justifyContent="center" item xs={1}>
            <IconButton onClick={ openSettingsDialog }>
              <SettingsIcon/>
            </IconButton>
          </Grid>

          <Grid container direction="column"  alignItems="center" justifyContent="center" item xs={1}>
            <IconButton onClick={ openDeleteDialog } color='secondary'>
              <DeleteForeverIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      { field && <TaxedFields parentField={field}/> }

      
      <CategoryDialog
        categoryDialog={ categoryDialog }
        categories={ categories }
        categoriesToSave={ categoriesToSave }
        setCategoriesToSave={ setCategoriesToSave }
        updateFieldCategories={ updateFieldCategories }
        openCategoryList={ openCategoryList }
      />

      <FieldSettingsDialog
        id={ field.id }
        active={ props.active }
        printable={ props.printable }
        calculable={ props.calculable }
        settingsDialog={ settingsDialog }
        openSettingsDialog={ openSettingsDialog }
        updateBudgetingTemplateTabFieldMutation={ updateBudgetingTemplateTabFieldMutation }
      />

      <DeleteFieldDialog
        fieldName={ name }
        deleteDialog={ deleteDialog }
        setDeleteDialog= { setDeleteDialog }
        openDeleteDialog={ openDeleteDialog }
        deleteFieldClick= { deleteFieldClick }
      />

    </Grid>
  )
}

export default  withStyles(styles)(TaxField);
