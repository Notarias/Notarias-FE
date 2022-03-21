import React, { useEffect }                 from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../../../styles';
import Button                               from '@material-ui/core/Button';
import IconButton                           from '@material-ui/core/IconButton';
import NoSimIcon                            from '@material-ui/icons/NoSim';
import RestorePageIcon                      from '@material-ui/icons/RestorePage';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import Tooltip                              from '@material-ui/core/Tooltip';
import { useMutation }                      from '@apollo/client';
import { VOID_OR_UNVOID_PAYMENT }           from '../../../../queries_and_mutations/queries';
import { GET_PAYMENTS }                     from '../../../../queries_and_mutations/queries';
import { GET_BUDGET_TOTALS }                from '../../../../queries_and_mutations/queries';
import { GET_BUDGET_FIELD_VALUE }           from '../../../../queries_and_mutations/queries';
import { GET_BUDGETS_AUDITLOG }             from '../../../../queries_and_mutations/queries';

const VoidOrInvoidPayment = (props) => {
  const { payment, budgetFieldValue, voidAt, field } = props
  const [statusVoid, setStatusVoid] =  React.useState(voidAt)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setStatusVoid(voidAt);;
  }, [voidAt])

  const [voidOrUnvoidPaymentMutation, {loading: voidOrUnvoidPaymentLoading}] =
  useMutation(
    VOID_OR_UNVOID_PAYMENT,
    {
      onError(apolloError) {
      },
      onCompleted(cacheData) {
        setOpen(false)
      },
      refetchQueries: [
        {
          query: GET_PAYMENTS,
          variables: { "fieldValueId": budgetFieldValue.id }
        },
        {
          query: GET_BUDGET_TOTALS,
          variables: { "id": payment.budgetId }
        },
        {
          query: GET_BUDGET_FIELD_VALUE,
          variables: { "budgetingTemplateFieldId": field.id , "budgetId":  payment.budgetId }
        },
        {
          query: GET_BUDGETS_AUDITLOG,  
            variables: {"budgetId": payment.budgetId }
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const voidOrUnvoidPayment = (event) => {
    voidOrUnvoidPaymentMutation({
       variables:{
        "id": payment.id,
       }
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showVoidOrInvoid = () => {
    return(
      statusVoid ? 

        <Tooltip title="Reactivar">
          <IconButton color='primary' onClick={handleClickOpen}>
            <RestorePageIcon /> 
          </IconButton>
        </Tooltip>
      : 
        <Tooltip title="Cancelar">
          <IconButton color='secondary' onClick={handleClickOpen}>
            <NoSimIcon /> 
          </IconButton>
        </Tooltip>
    )
  }


  const addOrRemove = () => {
    return(
    voidAt ?
      "reactivar"
    :
      "cancelar")
  }

  return(
    <>
      {showVoidOrInvoid()}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          ¿Desea {addOrRemove()} pago?
        </DialogTitle>
        <DialogContent>
          Al {addOrRemove()} este pago afectara directamente { voidAt ? "sumando" : "restando"} al total
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={voidOrUnvoidPayment} disabled={voidOrUnvoidPaymentLoading}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withStyles(styles)(VoidOrInvoidPayment)
