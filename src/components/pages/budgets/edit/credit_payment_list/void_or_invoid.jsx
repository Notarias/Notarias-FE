import React, { useState, useEffect }       from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../styles';
import Button                               from '@material-ui/core/Button';
import NoSimIcon                            from '@material-ui/icons/NoSim';
import RestorePageIcon                      from '@material-ui/icons/RestorePage';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import { useMutation }                      from '@apollo/react-hooks'
import { VOID_OR_INVOID }                   from '../../queries_and_mutations/queries'
import { useQuery }                         from '@apollo/react-hooks';
import { GET_CREDIT_PAYMENTS }              from '../../queries_and_mutations/queries'
import { GET_BUDGET_TOTALS }                from '../../queries_and_mutations/queries'

const VoidOrInvoid = (props) => {
  const { classes, voidAt, paymentId, budgetId } = props
  const [statusVoid, setStatusVoid] =  React.useState(voidAt)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setStatusVoid(voidAt);;
  }, [voidAt])

  const [voidOrnvoidPaymentMutation, voidOrnvoidPaymentProcessInfo] =
  useMutation(
    VOID_OR_INVOID,
    {
      onError(apolloError) {
        // setErrors(apolloError)
        // setPristine(false)
      },
      onCompleted(cacheData) {
        setOpen(false)
      },
      refetchQueries: [
        {
          query: GET_CREDIT_PAYMENTS,
          variables: {"budgetId": budgetId }
        },
        {
          query: GET_BUDGET_TOTALS,
          variables: { "id": budgetId }
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const voidOrInvoidCreditPayment = (event) => {
    voidOrnvoidPaymentMutation({
       variables:{
        "id": paymentId,
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
          ¿Desea {addOrRemove()} abono?
        </DialogTitle>
        <DialogContent>
          Al {addOrRemove()} este abono afectara directamente { voidAt ? "sumando" : "restando"} al total
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={voidOrInvoidCreditPayment}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withStyles(styles)(VoidOrInvoid)
