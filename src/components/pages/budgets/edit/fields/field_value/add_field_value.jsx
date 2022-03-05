import React                         from 'react';
import Button                        from '@material-ui/core/Button';
import SaveIcon                      from '@material-ui/icons/Save';
import { useMutation }               from '@apollo/client';
import { UPDATE_BUDGET_FIELD_VALUE } from '../../../queries_and_mutations/queries'
import { CREATE_BUDGET_FIELD_VALUE } from '../../../queries_and_mutations/queries'
import { GET_BUDGET_FIELD_VALUE }    from '../../../queries_and_mutations/queries'
import { GET_BUDGET }                from '../../../queries_and_mutations/queries'
import { GET_BUDGET_TOTALS }         from '../../../queries_and_mutations/queries'
import Dialog                        from '@material-ui/core/Dialog';
import DialogActions                 from '@material-ui/core/DialogActions';
import DialogContent                 from '@material-ui/core/DialogContent';
import DialogTitle                   from '@material-ui/core/DialogTitle';
import { GET_BUDGETS_AUDITLOG }      from '../../../queries_and_mutations/queries';

const buildRefetchQueries = (field, budget) => {
  return(
    field.taxes.map((tax) => {
      return({
        query: GET_BUDGET_FIELD_VALUE,
        variables: { "budgetingTemplateFieldId": tax.id , "budgetId": budget.id }
      })
    })
  )
}

const AddFieldValue = (props) => {
  const {
    budget, 
    fieldId,
    withValue, 
    setWithValue, 
    pristine, 
    changeFieldValue,
    setPristine, 
    currentId, 
    setChangeInputStatus,
    initialFieldValue
  } = props
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [createFieldValueMutation, { loading: createFieldValueLoading }] =
  useMutation(
    CREATE_BUDGET_FIELD_VALUE,
    {
      onError(apolloError) {
      },
      onCompleted(cacheData) {
        setWithValue(true)
        setPristine(false)
      },
      refetchQueries: [
        {
          query: GET_BUDGET_FIELD_VALUE,
          variables: { "budgetingTemplateFieldId": fieldId, "budgetId": budget.id }
        },
        {
          query: GET_BUDGETS_AUDITLOG,
          variables: { "budgetId": budget.id }
        },
        {
          query: GET_BUDGET_TOTALS,
            variables: { "id": budget.id }
        },
        ...buildRefetchQueries(currentId, budget)
      ],
      awaitRefetchQueries: true
    }
  )

  const createNewFieldValue = (event) => {
    createFieldValueMutation({
       variables:{
        "budgetingTemplateFieldId": fieldId,
        "budgetId": budget.id, 
        "value": (changeFieldValue * 100)}
    })
  }

  const [updateFieldValueMutation, {loading: updateFieldValueLoading}] =
  useMutation(
    UPDATE_BUDGET_FIELD_VALUE,
    {
      onError(apolloError) {
        // setErrors(apolloError)
        // setOpen(false);
        // setPristine(true)
      },
      onCompleted(cacheData) {
        setChangeInputStatus(true)
        setPristine(false)
        setOpen(false);
      },
      refetchQueries: [
        {
          query: GET_BUDGET_FIELD_VALUE,
          variables: { "budgetingTemplateFieldId": fieldId , "budgetId": budget.id }
        },
        {
          query: GET_BUDGET,
          variables: {"id": budget.id }
        },
        {
          query: GET_BUDGETS_AUDITLOG,
          variables: { "budgetId": budget.id }
        },
        {
          query: GET_BUDGET_TOTALS,
            variables: {"id": budget.id }
        },
        ...buildRefetchQueries(currentId, budget)
      ],
      awaitRefetchQueries: true
    }
  )

    const updateNewFieldValue = (event) => {
    updateFieldValueMutation({ variables: {"id": currentId ? currentId.id : "No", "value": (changeFieldValue * 100)}})
  }

  const renderAddFieldValueButton = () => {
    return(
      
      withValue ? 
        <Button
          disabled={!pristine}
          color="primary"
          onClick={ handleClickOpen }
        >
          <SaveIcon/>
        </Button>
      :
        <Button
          disabled={!pristine || createFieldValueLoading}
          onClick={ createNewFieldValue }
        >
          <SaveIcon/>
        </Button>
      
    )
  }

  return(
    <>
    {renderAddFieldValueButton()}
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Cambiar el total 
      </DialogTitle>
      <DialogContent>
        ¿Estás seguro que deseas cambiar el total {initialFieldValue} del cargo a {changeFieldValue}?
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose }>
          Cancelar
        </Button>
        <Button  
          onClick={ updateNewFieldValue }
          disabled={updateFieldValueLoading}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default AddFieldValue;
