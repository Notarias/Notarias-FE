import React, { useState, useEffect }       from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../../../styles';
import Button                               from '@material-ui/core/Button';
import NoSimIcon                            from '@material-ui/icons/NoSim';
import RestorePageIcon                      from '@material-ui/icons/RestorePage';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import { useMutation }                      from '@apollo/react-hooks'
import { VOID_OR_UNVOID_PAYMENT }           from '../../../../queries_and_mutations/queries'
import { GET_PAYMENTS }                     from '../../../../queries_and_mutations/queries'
import { GET_BUDGET_TOTALS }                from '../../../../queries_and_mutations/queries'
import { GET_BUDGET_FIELD_VALUE }           from '../../../../queries_and_mutations/queries'


const VoidOrInvoidPayment = (props) => {
  const { payment, fieldValueId, voidAt, budgetingTemplateFieldId } = props
  const [statusVoid, setStatusVoid] =  React.useState(voidAt)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setStatusVoid(voidAt);;
  }, [voidAt])

  const [voidOrUnvoidPaymentMutation, voidOrUnvoidPaymentProcessInfo] =
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
          variables: { "fieldValueId": fieldValueId }
        },
        {
          query: GET_BUDGET_TOTALS,
          variables: { "id": payment.budgetId }
        },
        {
          query: GET_BUDGET_FIELD_VALUE,
          variables: { "budgetingTemplateFieldId": budgetingTemplateFieldId , "budgetId":  payment.budgetId }
        },
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
      <Button onClick={handleClickOpen}>
        <RestorePageIcon color="primary"/> 
      </Button>
      : 
        <Button onClick={handleClickOpen}>
          <NoSimIcon color="secondary"/> 
        </Button>
    )
  }


  const addOrRemove = () => {
    return(
    voidAt ?
      "añadir"
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
          <Button onClick={voidOrUnvoidPayment}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withStyles(styles)(VoidOrInvoidPayment)
