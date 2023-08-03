import React, { useState }                            from 'react';
import Grid                                           from '@material-ui/core/Grid';
import TextField                                      from '@material-ui/core/TextField';
import Button                                         from '@material-ui/core/Button';
import DeleteForeverIcon                              from '@material-ui/icons/DeleteForever';
import FormControlLabel                               from '@material-ui/core/FormControlLabel';
import Checkbox                                       from '@material-ui/core/Checkbox';
import PrintOutlinedIcon                              from '@material-ui/icons/PrintOutlined';
import PrintIcon                                      from '@material-ui/icons/Print';
import MonetizationOnOutlinedIcon                     from '@material-ui/icons/MonetizationOnOutlined';
import MonetizationOnIcon                             from '@material-ui/icons/MonetizationOn';
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
import Badge                                          from '@material-ui/core/Badge';
import TaxedFields                                     from './taxed_fields'


const TaxField = (props) => {

  const { classes, currentTab } = props

  const [open, setOpen] = useState(false);
  const [field]         = useState(props.field)
  const [categoryListOpen, setCategoryListOpen] = useState(false);
  const [categoriesToSave, setCategoriesToSave] = useState([])
  const [printableDialog, setPrintableDialog] = useState(false);
  const [calculableDialog, setCalculableDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing]       = useState(true);
  const [error, setError]           = useState(false);
  const [name, setName]             = useState()
  const [active, setActive]         = useState(false);
  const [printable, setPrintable] = useState(false);
  const [calculable, setCalculable] = useState(false);
  const [categories, setCategories] = useState([]);
  const inputsList = ["name"]

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
          setCategoryListOpen(false)
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

  React.useEffect(() => {
    if(field) {
      setCategories(field.categories)
      setName(field.name)
      setActive(field.active)
      setPrintable(field.printable)
      setCalculable(field.calculable)
    }
  }, [field && field.id])

  const updateField = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: field.id, name: name}})
  }

  const updateFieldCategories = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: field.id, categoriesIds: categoriesSavedIds() }})
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickOpenCategoryList = () => {
    setCategoryListOpen(true);
  }

  const handleCloseCategoryList = () => {
    setCategoryListOpen(false);
  };

  const openPrintableDialog = () => {
    setPrintableDialog(true);
  }

  const closePrintableDialog = () => {
    setPrintableDialog(false);
  }

  const openCalculableDialog = () => {
    setCalculableDialog(true);
  }

  const closeCalculableDialog = () => {
    setCalculableDialog(false);
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const changeFieldStatus = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: field.id, active: !active}})
    setActive(!active)
    setOpenDialog(false);
  }

  const checkPrintableField = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: field.id, printable: !printable }})
    setPrintable(!printable);
    setPrintableDialog(false);
  }

  const checkCalculableField = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: field.id, calculable: !calculable }})
    setCalculable(!calculable);
    setCalculableDialog(false);
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
    destroyBudgetingTemplateTabFieldMutation({ variables: { id: field.id } })
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
    <Grid container item alignItems="flex-start" justifyContent="flex-start" className={ classes.fielPaddingBottom }>
      <Paper className={classes.fieldPaper}>
        <Grid container item className={ classes.fieldHeightRow }>
          { editing ? renderTextField() : renderInputField() }
          <Grid container alignItems="center" justifyContent="center" item xs={1}>
            {field.taxableSelector === 'tariff' ?
              <Chip
                label='Arancel'
                color='primary'
              />
            :
              <Badge classes={{badge: classes.badgeGreenColor}} overlap="circular" badgeContent={field && field.defaultValue + "%"}>
                <div ></div>
              </Badge>
            }
          </Grid>
          <Grid container direction="column"  alignItems="center" justifyContent="center" item xs={1}>
            <Chip
              avatar={<Avatar>{ categoriesToShow() }</Avatar>}
              label={ ` categorias` }
              color={ categories.length > 0 ? "primary" : "default" }
              onClick={ onClickOpenCategoryList }
            />
            <Dialog
              open={categoryListOpen}
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

          <Grid container item xs={1} alignItems="center" justifyContent="center">
            <Grid item>
              <FormControlLabel
                control={<Checkbox 
                  color="secundary"
                  icon={<PrintOutlinedIcon />} 
                  checkedIcon={<PrintIcon />} 
                  name="printable"
                  checked={ printable }
                />}
                label=" "
                className={ classes.formControlPadding }
                onChange={ openPrintableDialog }
              />
            </Grid>
            <Dialog
              open={printableDialog}
              onClose={closePrintableDialog}
              aria-labelledby="print-aletrt"
              aria-describedby="print-alert-dialog"
            >
              <DialogTitle id="favorite-alert">
                { printable === true ? "No imprimir" : "Agregar a formulario de impresión"}
              </DialogTitle>
              <DialogContent>
                { printable === true ? "Este campo dejará de aparecer en el formato de impresión" : "Se marcará este campo para aparecer en el formulario de impresión"}
              </DialogContent>
              <DialogActions>
                <Button onClick={ closePrintableDialog } color="secondary">
                  Cancelar
                </Button>
                <Button autoFocus onClick={ checkPrintableField } variant="contained">
                  { printable ? "Quitar" : "Añadir"}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>

          <Grid container item xs={1} alignItems="center" justifyContent="center">
            <Grid item>
              <FormControlLabel
                control={<Checkbox 
                  color="primary"
                  icon={<MonetizationOnOutlinedIcon />} 
                  checkedIcon={<MonetizationOnIcon />} 
                  name="calculable"
                  checked={ calculable }
                />}
                label=" "
                className={ classes.formControlPadding }
                onChange={ openCalculableDialog }
              />
            </Grid>
            <Dialog
              open={calculableDialog}
              onClose={closeCalculableDialog}
              aria-labelledby="print-aletrt"
              aria-describedby="print-alert-dialog"
            >
              <DialogTitle id="favorite-alert">
                { calculable === true ? "Omitir en los calculos del presupuesto" : "Agregar a los calculos del presupuesto"}
              </DialogTitle>
              <DialogContent>
                { calculable === true ? "Este campo dejará de calcularse en el presupuesto" : "Este campo agregara a los calculos del presupuesto"}
              </DialogContent>
              <DialogActions>
                <Button onClick={ closeCalculableDialog } color="secondary">
                  Cancelar
                </Button>
                <Button autoFocus onClick={ checkCalculableField } variant="contained">
                  { calculable ? "Quitar" : "Añadir"}
                </Button>
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
      { field && <TaxedFields parentField={field}/> }
    </Grid>
  )
}

export default  withStyles(styles)(TaxField);
