import React, { useState, useEffect }               from 'react';
import Button                                       from '@material-ui/core/Button';
import SaveIcon                                     from '@material-ui/icons/Save';
import { useMutation }                              from '@apollo/react-hooks';
import { UPDATE_BUDGET_FIELD_VALUE }                from '../../../queries_and_mutations/queries'
import { CREATE_BUDGET_FIELD_VALUE }                from '../../../queries_and_mutations/queries'
import { GET_BUDGET_FIELD_VALUE }                   from '../../../queries_and_mutations/queries'
import { GET_BUDGET }                               from '../../../queries_and_mutations/queries'


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddFieldValue = (props) => {
  const {
    currentBudget, 
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


  const [createFieldValueMutation, createFieldValueProcessInfo] =
  useMutation(
    CREATE_BUDGET_FIELD_VALUE,
    {
      onError(apolloError) {
        // setErrors(apolloError)
        // setOpen(false);
        // setPristine(true)
      },
      onCompleted(cacheData) {
        setWithValue(true)
        setPristine(false)
      },
      refetchQueries: [{
        query: GET_BUDGET_FIELD_VALUE,
        variables: { "budgetingTemplateFieldId": fieldId , "budgetId": currentBudget }
      }],
      awaitRefetchQueries: true
    }
  )

  const createNewFieldValue = (event) => {
    createFieldValueMutation({
       variables:{
        "budgetingTemplateFieldId": fieldId,
        "budgetId": currentBudget, 
        "value": (changeFieldValue * 100)}
    })
  }

  const [updateFieldValueMutation, updateFieldValueProcessInfo] =
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
          variables: { "budgetingTemplateFieldId": fieldId , "budgetId": currentBudget }
        },
        {
          query: GET_BUDGET,
          variables: {"id": currentBudget }
        }
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
          disabled={!pristine}
          onClick={ createNewFieldValue }
        >
          <SaveIcon/>
        </Button>
      
    )
  }

  console.log(currentBudget, "---")
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
        <Button  onClick={ updateNewFieldValue }>
          Acceptar
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default AddFieldValue;
