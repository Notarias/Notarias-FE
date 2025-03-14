import React, { useState }       from 'react';
import IconButton                from '@material-ui/core/IconButton';
import DoneAllIcon               from '@material-ui/icons/DoneAll';
import Dialog                    from '@material-ui/core/Dialog';
import DialogContent             from '@material-ui/core/DialogContent';
import DialogContentText         from '@material-ui/core/DialogContentText';
import DialogActions             from '@material-ui/core/DialogActions';
import Divider                   from '@material-ui/core/Divider';
import Button                    from '@material-ui/core/Button';
import { useMutation }           from '@apollo/client';
import { UPDATE_PROCEDURE }      from '../../queries_and_mutations/queries';
import { GET_PROCEDURE }         from '../../queries_and_mutations/queries';
import { green }                 from '@material-ui/core/colors';

const CompleteProcedure = (props) => {

  const { procedure } = props
  const [dialog, setDialog] = useState(false);
  const [completedDate] = useState(new Date());

  const [updateProcedure] =
  useMutation(
    UPDATE_PROCEDURE,
    {
      onCompleted(cacheData) {
        openDialog();
      },
      refetchQueries: [
        {
          query: GET_PROCEDURE,
            variables: {"id": procedure.id }
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const openDialog = () => {
    setDialog(!dialog);
  }

  const terminateProcedure = () => {
    procedure.completedAt ?
      updateProcedure({ variables: { id: procedure.id, completedAt: null }})
    :
      updateProcedure({ variables: { id: procedure.id, completedAt: completedDate }})
  }
  
  return(
    <>
      <IconButton onClick={openDialog} style={procedure.completedAt ? { color: green[500] } : {  }} >
        <DoneAllIcon/>
      </IconButton>
      <Dialog open={dialog} onClose={openDialog}>
        <DialogContent>
          <DialogContentText>
            { `Dé click en ACEPTAR para ${procedure.completedAt ? "desmarcar" : "marcar"} este trámite como completado.` }
          </DialogContentText>
        </DialogContent>
        <Divider variant="middle" />
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
            onClick={terminateProcedure}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CompleteProcedure;
