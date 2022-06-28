import React, { useState, useEffect }         from 'react';
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
import SelectTaxType                          from './select_tax_type';
import TextField                              from '@material-ui/core/TextField';
import { useMutation }                        from '@apollo/client';
import { CREATE_TAX_FIELD}                    from '../../queries_and_mutations/queries'
import { GLOBAL_MESSAGE }                     from '../../../../../../resolvers/queries';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }  from '../../queries_and_mutations/queries'
import client                                 from '../../../../../../apollo';

const NewFieldTaxButton = (props) => {
  const { classes, templateData, currentTab } = props

  const [open, setOpen] = useState(false);
  const [fieldName, setFieldName] = useState("")
  const [defaultValue, setDefaultValue] = useState(3)
  const [taxedFieldsIds, setTaxedFieldsIds] = useState([])
  const [operator, setOperator] = useState("")
  const [taxableSelector, setTaxableSelector] = useState("")
  const [pristine, setPristine] = useState(true)
  const [allOptionsMarked, setAllOptionsMarked] = useState(false)

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
        setOpen(false)
        setPristine(true)
      },
      refetchQueries: [{
        query: GET_BUDGETING_TEMPLATE_TAB_FIELDS,
        variables: { "id": currentTab && currentTab.id },
      }],
      awaitRefetchQueries: true
    }
  )

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
          }
      }
    )
  }

  useEffect(() => {
    if(taxableSelector === "tariff") {
      if(taxableSelector.length && (fieldName && fieldName.length) && (taxedFieldsIds && taxedFieldsIds.length)) {
        setAllOptionsMarked(true)
      } else {
        setAllOptionsMarked(false)
      }
    } else {
      if(operator.length && taxableSelector.length && (fieldName && fieldName.length) && defaultValue && taxedFieldsIds.length) {
        setAllOptionsMarked(true)
      } else {
        setAllOptionsMarked(false)
      }
    }
  },[operator.length, taxableSelector.length, (fieldName && fieldName.length), (defaultValue && defaultValue.length), (taxedFieldsIds && taxedFieldsIds.length)])

  const renderNewFieldTaxButton = () => {
    return(
      <Button
        variant="contained"
        size="small"
        className={ classes.addTaxFieldButtonColor }
        onClick={handleOpen}
      >
        Impuestos  <AddIcon className={ classes.addIconMargin }/>
      </Button>
    )
  }

  return(
    <>
      <Grid container item justifyContent="flex-start" alignItems="center" className={ classes.addFieldButton } xs={6} >
        { currentTab && renderNewFieldTaxButton() }
      </Grid>
      <Grid container item justifyContent="flex-start" alignItems="center" className={ classes.addTaxFieldButton } xs={6}>
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
            <SelectTaxType
              currentTab={currentTab}
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
    </>
  )
}

export default withStyles(styles)(NewFieldTaxButton);
