import React, { useState }       from 'react';
import Dialog                    from '@material-ui/core/Dialog';
import DialogContent             from '@material-ui/core/DialogContent';
import DialogContentText         from '@material-ui/core/DialogContentText';
import DialogActions             from '@material-ui/core/DialogActions';
import Button                    from '@material-ui/core/Button';
import { useMutation }           from '@apollo/client';
import { UPDATE_BUDGET }         from '../../queries_and_mutations/queries';
import { GET_BUDGET }            from '../../queries_and_mutations/queries';
import { GET_BUDGET_TOTALS }     from '../../queries_and_mutations/queries';
import { GET_CREDIT_PAYMENTS }   from '../../queries_and_mutations/queries';
import { GET_BUDGETS_AUDITLOG }  from '../../queries_and_mutations/queries';

const CompleteBudget = (props) => {

  const { budget, dialog, openDialog } = props;
  const [completedDate] = useState(new Date());

  const [updateBudget] =
  useMutation(
    UPDATE_BUDGET,
    {
      onCompleted(cacheData) {
        openDialog();
      },
      refetchQueries: [
        {
          query: GET_BUDGET,
            variables: {"id": budget.id }
        },
        {
          query: GET_BUDGET_TOTALS,
            variables: {"id": budget.id }
        },
        {
          query: GET_CREDIT_PAYMENTS,
            variables: { "budgetId": budget.id }
        },
        {
          query: GET_BUDGETS_AUDITLOG,  
            variables: {"budgetId": budget.id}
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const terminateBudget = () => {
    budget.completedAt ?
      updateBudget({ variables: { id: budget.id, completedAt: null }})
    :
      updateBudget({ variables: { id: budget.id, completedAt: completedDate }})
  }

  return(
    <>
      <Dialog open={dialog} onClose={openDialog}>
        <DialogContent>
          <DialogContentText>
            { `De click en ACEPTAR para ${budget.completedAt ? "desmarcar" : "marcar"} este presupuesto como completado.` }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={openDialog}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={terminateBudget}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CompleteBudget;
