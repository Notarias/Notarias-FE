import React, { useState }       from 'react';
import IconButton                from '@material-ui/core/IconButton';
import DoneAllIcon               from '@material-ui/icons/DoneAll';
import Dialog                    from '@material-ui/core/Dialog';
import DialogTitle               from '@material-ui/core/DialogTitle';
import DialogContent             from '@material-ui/core/DialogContent';
import DialogContentText         from '@material-ui/core/DialogContentText';
import DialogActions             from '@material-ui/core/DialogActions';
import Divider                   from '@material-ui/core/Divider';
import Button                    from '@material-ui/core/Button';
import Typography                from '@material-ui/core/Typography';
import { useMutation }           from '@apollo/client';
import { UPDATE_BUDGET }         from '../../queries_and_mutations/queries';
import { GET_BUDGET }            from '../../queries_and_mutations/queries';
import { GET_BUDGET_TOTALS }     from '../../queries_and_mutations/queries';
import { GET_CREDIT_PAYMENTS }   from '../../queries_and_mutations/queries';
import { GET_BUDGETS_AUDITLOG }  from '../../queries_and_mutations/queries';
import { green }                 from '@material-ui/core/colors';

const CompleteBudget = (props) => {

  const { budget } = props
  const [dialog, setDialog] = useState(false);
  const [completedDate] = useState(new Date());
  const [errors, setErrorsList] = useState();

  /* const formatDate = (dateObject, separator='/') => {
    let newDate = new Date(dateObject);
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
  
    return (`${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`)
  }
  
  const formatTime = (timeObject, separator=':') => {
    let newDate = new Date(timeObject);
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
  
    return (`${hours < 10 ? `0${hours}` : `${hours}`}${separator}${minutes < 10 ? `0${minutes}` : `${minutes}`}`)
  } */

  const [updateBudget, {loading: updateBudgetLoading}] =
  useMutation(
    UPDATE_BUDGET,
    {
      onError(apolloError) {
        setErrorsList(apolloError)
      },
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

  const openDialog = () => {
    setDialog(!dialog);
  }

  const terminateBudget = () => {
    updateBudget({ variables: { id: budget.id, completedAt: completedDate}})
  }
  console.log(budget)
  return(
    <>
      <IconButton onClick={openDialog} style={budget.completedAt ? { color: green[500] } : {  }} >
        <DoneAllIcon/>
      </IconButton>
      <Dialog open={dialog} onClose={openDialog}>
        <DialogTitle>
          <Typography>
            Cornfirmacion Completado
          </Typography>
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText>
            Seguro que desa marcar como completado este presupuesto.
          </DialogContentText>
        </DialogContent>
        <Divider/>
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
