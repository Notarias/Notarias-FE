import React                        from 'react';
import Dialog                       from '@material-ui/core/Dialog';
import DialogContent                from '@material-ui/core/DialogContent';
import DialogContentText            from '@material-ui/core/DialogContentText';
import DialogActions                from '@material-ui/core/DialogActions';
import Button                       from '@material-ui/core/Button';
import { useMutation }              from '@apollo/client';
import { UPDATE_PROCEDURE }         from '../../queries_and_mutations/queries';
import { GET_BUDGET }               from '../../queries_and_mutations/queries';
import { GET_BUDGET_TOTALS }        from '../../queries_and_mutations/queries';
import { GET_CREDIT_PAYMENTS }      from '../../queries_and_mutations/queries';
import { GET_BUDGETS_AUDITLOG }     from '../../queries_and_mutations/queries';

const StartProcedure = (props) => {

  const { budget, procedure, dialog, openDialog } = props;

  const [updateProcedure] =
  useMutation(
    UPDATE_PROCEDURE,
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

  const initProcedure = () => {
    procedure.serialNumber ?
      openDialog()
    :
      updateProcedure({ variables: { id: procedure.id, serialNumber: procedure.maxSerialNumber + 1 }})
  }
console.log(procedure)
  return(
    <>
      <Dialog open={dialog} onClose={openDialog}>
        <DialogContent>
          <DialogContentText>
            { procedure.serialNumber ?
              `Los tramites de este presupuesto ya se han iniciado con el folio : ${procedure.serialNumber.toString().padStart(10, "0")}.`
            :
              `De click en ACEPTAR para iniciar los tramites de este presupuesto el tramite sera marcado con el folio: ${(procedure.maxSerialNumber + 1).toString().padStart(10, "0")}.`
            }
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
            onClick={initProcedure}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default StartProcedure;
