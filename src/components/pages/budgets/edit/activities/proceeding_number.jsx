import React, { useState, useEffect } from 'react';
import Grid                from '@material-ui/core/Grid';
import Hidden              from '@material-ui/core/Hidden';
import Typography          from '@material-ui/core/Typography';
import Button              from '@material-ui/core/Button';
import TextField           from '@material-ui/core/TextField';
import Dialog              from '@material-ui/core/Dialog';
import DialogActions       from '@material-ui/core/DialogActions';
import DialogContent       from '@material-ui/core/DialogContent';
import DialogContentText   from '@material-ui/core/DialogContentText';
import DialogTitle         from '@material-ui/core/DialogTitle';
import { useMutation }     from '@apollo/client';
import { UPDATE_PROCEDURE, GET_BUDGET } from '../../queries_and_mutations/queries';

export default (props) => {
  const { budget } = props

  const [open, setOpen]         = useState(false)
  const [pristine, setPristine] = useState(true)
  const [proceedingNumber, setProceedingNumber] = useState(budget.procedures[0].proceedingNumber)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleProceedingNumberChange = (e) => {
    setProceedingNumber(e.target.value)
    setPristine(false)
  }

  const [updateProcedure, { loading }] =
    useMutation(
      UPDATE_PROCEDURE,
      {
        onError(error) {
          let errorsHash = {}
          error.graphQLErrors.map((error) => {
            return errorsHash[error.extensions.attribute] = error.message
          })
          setPristine(true)
        },
        onCompleted(cacheData) {
          setPristine(true);
          setOpen(false)
        },
        refetchQueries: [
          {
            query: GET_BUDGET,
            variables: { id: budget.id } 
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const handleSave = () => {
    updateProcedure({
      variables: {
        id: budget.procedures[0].id,
        proceedingNumber: proceedingNumber
      }
    })
  }

  useEffect(() => {
    setProceedingNumber(budget.procedures[0].proceedingNumber)
  }, [budget.proceedingNumber])

  return(
    <Grid container item xs={12} alignItems='center'>
      <Hidden mdDown>
        <Grid item xs={3}>
          <Typography align='left'>Expediente:</Typography>
        </Grid>
      </Hidden>
      <Grid item xs>
        <Button fullWidth style={{ padding: '10px' }} onClick={handleOpen}>
          <Grid container alignItems="center" justifyContent='flex-start' >
            <Typography noWrap align='left' style={{ paddingRight: "10px", fontWeight: 600 }}>
              {
                (budget && budget.procedures[0].proceedingNumber) || 'Agregar No. de Expediente'
              }
            </Typography>
          </Grid>
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">No. de Expediente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escriba el numero de expediente del trámite
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="proceeding"
            label="No. de Expediente"
            type="text"
            onChange={handleProceedingNumberChange}
            value={!!proceedingNumber ? proceedingNumber : ""}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading || pristine} color="primary" variant='contained'>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
