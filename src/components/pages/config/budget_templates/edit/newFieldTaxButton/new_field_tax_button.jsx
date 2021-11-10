import React, { useEffect }                                  from 'react';
import Button                                 from '@material-ui/core/Button';
import Grid                                   from '@material-ui/core/Grid';
import { styles }                             from '../../styles';
import { withStyles }                         from '@material-ui/core/styles';
import AddIcon                                from '@material-ui/icons/Add'
import Dialog                                 from '@material-ui/core/Dialog';
import DialogContent                          from '@material-ui/core/DialogContent';
import DialogTitle                            from '@material-ui/core/DialogTitle';
import DialogActions                          from '@material-ui/core/DialogActions';
import Divider                                from '@material-ui/core/Divider';
import FieldSearch                            from './operators_and_selectors';
import TextField                              from '@material-ui/core/TextField';
import { useMutation }                        from '@apollo/react-hooks';
import { CREATE_TAX_FIELD}                    from '../../queries_and_mutations/queries'
import { GLOBAL_MESSAGE }                     from '../../../../../../resolvers/queries';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }  from '../../queries_and_mutations/queries'
import client                                 from '../../../../../../apollo';

const NewFliedTaxButton = (props) => {
  const { classes, templateData, currentTab } = props

  const [open, setOpen] = React.useState(false);
  const [fieldName, setFieldName] = React.useState("")
  const [defaultValue, setDefaultValue] = React.useState(3)
  const [taxedFieldsIds, setTaxedFieldsIds] = React.useState([])
  const [operator, setOperator] = React.useState("")
  const [taxableSelector, setTaxableSelector] = React.useState("")
  const [pristine, setPristine] = React.useState(true)
  const [allOptionsMarked, setAllOptionsMarked] = React.useState(false)
  const [error, setError] = React.useState(false)
  const inputsList = ["name"]

  const handleClose = () => {
    setOpen(false)
    setFieldName("")
    setPristine(true)
    setAllOptionsMarked(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const changeFieldName = (event) => {
    setFieldName(event.target.value);
  };

  const [createBudgetingTemplateTabTaxFieldMutation, {loading: createBudgetingTemplateTabTaxFieldLoading} ] =
  useMutation(
    CREATE_TAX_FIELD,
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
      onCompleted(cacheData) {
        setError(false)
        setOpen(false)
        setPristine(true)
      },
      fetchPolicy: "no-cache",
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
    setError(errorsList);
  }

  const addNewTaxField = (event) => {
    setOpen(false)
    createBudgetingTemplateTabTaxFieldMutation(
      { 
        variables: 
          {
            "name": fieldName,
            "tabId": currentTab.id,
            "defaultValue": defaultValue ,
            "taxedFieldsIds": taxedFieldsIds,
            "operator": operator,
            "taxableSelector": taxableSelector 
          },
          fetchPolicy: "no-cache",
      }
    )
  }

  useEffect(() => {
    if(operator.length && taxableSelector.length && (fieldName && fieldName.length) && defaultValue && taxedFieldsIds.length) {
      setAllOptionsMarked(true)
    } else {
      setAllOptionsMarked(false)
    }
  },[operator.length, taxableSelector.length, (fieldName && fieldName.length), (defaultValue && defaultValue.length), taxedFieldsIds.length])

  return(
    <Grid container item justifyContent="flex-start" alignItems="center" className={ classes.addTaxFieldButton } xs={6}>
      <Button
        variant="contained"
        size="small"
        className={ classes.addTaxFieldButtonColor }
        onClick={handleOpen}
      >
        Impuestos  <AddIcon className={ classes.addIconMargin }/>
      </Button>
      <Dialog open={open} onClose={ handleClose }>
        <DialogTitle 
          id="simple-dialog-title"
          className={ classes.tittleDialogWidth }
        >
          Rellena los campos para continuar
        </DialogTitle >
        <Divider/>
        <DialogContent>
          <Grid container item xs={12} justifyContent="center" alignItems="center">
            <TextField
              onChange={ changeFieldName }
              size="small"
              id="tax-field-name"
              label="Nombre del campo"
              className={classes.taxFieldName}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>
          <FieldSearch
            templateData={templateData}
            defaultValue={defaultValue}
            setDefaultValue={setDefaultValue}
            setTaxedFieldsIds={setTaxedFieldsIds}
            setOperator={setOperator}
            operator={operator}
            taxableSelector={taxableSelector}
            setTaxableSelector={setTaxableSelector}
            setPristine={setPristine}
          />
         </DialogContent>
        <Divider/>
        <DialogActions>
          <Grid container direction="row" justifyContent="flex-end">
            <Button onClick={ handleClose }>
              Cancelar
            </Button>
            <Button 
              color="primary"
              variant="contained"
              onClick={addNewTaxField}
              disabled={!allOptionsMarked || pristine || createBudgetingTemplateTabTaxFieldLoading}
            >
              Crear campo
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default withStyles(styles)(NewFliedTaxButton);
