import React, { useState }                          from 'react';
import DialogTitle                                  from '@material-ui/core/DialogTitle';
import DialogContent                                from '@material-ui/core/DialogContent';
import DialogContentText                            from '@material-ui/core/DialogContentText';
import DialogActions                                from '@material-ui/core/DialogActions';
import TextField                                    from '@material-ui/core/TextField';
import Button                                       from '@material-ui/core/Button';
import { useMutation }                              from '@apollo/client';
import { UPDATE_PERMISSION, LOAD_PERMISSIONS }      from '../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                           from '../../../../../resolvers/queries';
import client                                       from '../../../../../apollo';

const PermissionEditDialog = (props) => {
  const { permission, closeEditDialog } = props;

  const [permissionName, setPermissionName] = useState(permission && permission.name);
  const [saveStatus, setSaveStatus] = useState(true);
  const [errors, setErrors] = useState({});

  const [updatePermission] =
    useMutation(
      UPDATE_PERMISSION,
      {
        onError(error) {
          let errorsHash = {}
          error.graphQLErrors.map((error) => {
            errorsHash[error.extensions.attribute] = error.message
            return(error.message)
          })
          setErrors(errorsHash)
          setSaveStatus(true)
        },
        onCompleted(cacheData) {
          setSaveStatus(true);
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Permiso actualizado con exito.",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
          closeEditDialog();
        },
        refetchQueries: [
          {
            query: LOAD_PERMISSIONS 
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const saveUpdatePermission = () => {
    updatePermission({
      variables: {
        id: permission.id,
        name: permissionName
      }
    })
  }

  const fieldValueChange = ({ target }) => {
    setPermissionName(target.value);
    setSaveStatus(false);
  }

  return(
    <>
      <DialogTitle id="form-dialog-title">
        Editar Permiso
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Cambie el nombre del permiso.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="writing"
          label="Nombre del Permiso"
          type="text"
          onChange={fieldValueChange}
          value={permissionName}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditDialog} color="secondary">
          Cancelar
        </Button>
        <Button onClick={saveUpdatePermission} disabled={saveStatus} color="primary" variant='contained'>
          Guardar
        </Button>
      </DialogActions>
    </>
  )
}

export default PermissionEditDialog;
