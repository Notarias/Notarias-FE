import React, { useState }        from 'react';
import DialogTitle                from '@material-ui/core/DialogTitle';
import DialogContent              from '@material-ui/core/DialogContent';
import DialogContentText          from '@material-ui/core/DialogContentText';
import DialogActions              from '@material-ui/core/DialogActions';
import Button                     from '@material-ui/core/Button';
import TextField                  from '@material-ui/core/TextField';
import { useMutation }                  from '@apollo/client';
import { UPDATE_ROLE, LOAD_ROLES }      from '../queries_and_mutations/queries';

const EditRoleDialog = (props) => {

  const { editDialog, role } = props

  const [roleName, setRoleName] = useState(role.name);
  const [permanentLink, setPermanentLink] = useState(role.permanentLink);
  const [saveStatus, setSaveStatus] = useState(false);

  const changeNameField = (event) => {
    setRoleName(event.target.value);
    setSaveStatus(false);
  }

  const [updateRole, { loading }] =
    useMutation(
      UPDATE_ROLE,
      {
        onError(error) {
          let errorsHash = {}
          /* error.graphQLErrors.map((error) => {
            return errorsHash[error.extensions.attribute] = error.message
          }) */
        },
        onCompleted(cacheData) {
          editDialog();
        },
        refetchQueries: [
          {
            query: LOAD_ROLES 
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const updateNewRole = () => {
    updateRole({
      variables: {
        id: role.id,
        name: roleName,
        permanentLink: permanentLink
      }
    })
  }

  return(
    <>
      <DialogTitle id="form-dialog-title">Editar Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cambie el nombre del role
          </DialogContentText>
          <TextField
            margin="dense"
            id="writing"
            label="Nombre del Role"
            type="text"
            onChange={changeNameField}
            value={roleName}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={updateNewRole} disabled={saveStatus} color="primary" variant='contained'>
            Guardar
          </Button>
        </DialogActions>
    </>
  )
}

export default EditRoleDialog;
