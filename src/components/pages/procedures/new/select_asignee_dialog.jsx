import React from 'react';
import { Divider } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserAsigneeList from './user_asignee_list';

const SelectAsigneeDialog = (props) => {

  const { asignee, setAsignee, closeAsigneeDialog } = props;

  const cancelAsignation = () => {
    setAsignee("");
    closeAsigneeDialog();
  }

  return(
    <>
      <DialogTitle>
        <Typography>
          Seleccionar Responsable del Tramite
        </Typography>
      </DialogTitle>
      <Divider/>
      <DialogContent>
        <UserAsigneeList 
          asignee={asignee}
          setAsignee={setAsignee}
        />
      </DialogContent>
      <Divider/>
      <DialogActions>
        <Button
          variant="contained"
          onClick={cancelAsignation}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={closeAsigneeDialog}
        >
          Asignar
        </Button>
      </DialogActions>
    </>
  )

} 

export default SelectAsigneeDialog
