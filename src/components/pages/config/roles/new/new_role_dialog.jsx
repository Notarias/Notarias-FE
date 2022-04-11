import React, { useState }              from 'react';
import DialogTitle                      from '@material-ui/core/DialogTitle';
import DialogContent                    from '@material-ui/core/DialogContent';
import DialogContentText                from '@material-ui/core/DialogContentText';
import DialogActions                    from '@material-ui/core/DialogActions';
import Button                           from '@material-ui/core/Button';
import TextField                        from '@material-ui/core/TextField';
import { useMutation }                  from '@apollo/client';
import { CREATE_ROLE, LOAD_ROLES }      from '../queries_and_mutations/queries';

const NewRoleDialog = (props) => {

  const { newDialog } = props

  const [roleName, setRoleName] = useState("");
  const [saveStatus, setSaveStatus] = useState(false);
  const [permanentLink, setPermanentLink] = useState();

  const changeNameField = (event) => {
    setRoleName(event.target.value);
    setSaveStatus(false);
  }

  const [createRole, { loading }] =
    useMutation(
      CREATE_ROLE,
      {
        /* onError(error) {
          let errorsHash = {}
          error.graphQLErrors.map((error) => {
            return errorsHash[error.extensions.attribute] = error.message
          })
          setSaveStatus(true)
        }, */
        onCompleted(cacheData) {
          setSaveStatus(true);
          newDialog();
        },
        refetchQueries: [
          {
            query: LOAD_ROLES 
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const saveNewRole = () => {
    createRole({
      variables: {
        name: roleName,
        permanentLink: permanentLink
      }
    })
  }

  return(
    <>
      <DialogTitle id="form-dialog-title">Nuevo Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escriba el nombre del nuevo role
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
          <Button onClick={newDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={saveNewRole} disabled={saveStatus} color="primary" variant='contained'>
            Guardar
          </Button>
        </DialogActions>
    </>
  )
}

export default NewRoleDialog;
