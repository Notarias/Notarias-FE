import React, { useState }                          from 'react';
import DialogTitle                                  from '@material-ui/core/DialogTitle';
import DialogContent                                from '@material-ui/core/DialogContent';
import DialogContentText                            from '@material-ui/core/DialogContentText';
import DialogActions                                from '@material-ui/core/DialogActions';
import Button                                       from '@material-ui/core/Button';
import TextField                                    from '@material-ui/core/TextField';
import { useMutation }                              from '@apollo/client';
import { CREATE_PERMISSION, LOAD_PERMISSIONS }      from '../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                           from '../../../../../resolvers/queries';
import client                                       from '../../../../../apollo';

const NewPermissionDialog = (props) => {

  const { newDialog } = props

  const [permissionName, setPermissionName] = useState("");
  const [saveStatus, setSaveStatus] = useState(true);
  const [errors, setErrors] = useState({});

  const changeNameField = (event) => {
    setPermissionName(event.target.value);
    setSaveStatus(false);
  }

  const [createPermission] =
    useMutation(
      CREATE_PERMISSION,
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
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Permiso creado con exito.",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
          setSaveStatus(true);
          newDialog();
        },
        refetchQueries: [
          {
            query: LOAD_PERMISSIONS 
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const saveNewPermission = () => {
    createPermission({
      variables: {
        name: permissionName
      }
    })
  }

  return(
    <>
      <DialogTitle id="form-dialog-title">
        Nuevo Permiso
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Escriba el nombre del nuevo permiso.
        </DialogContentText>
        <TextField
          margin="dense"
          id="writing"
          label="Nombre del Permiso"
          type="text"
          onChange={changeNameField}
          value={permissionName}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={newDialog} color="secondary">
          Cancelar
        </Button>
        <Button onClick={saveNewPermission} disabled={saveStatus} color="primary" variant='contained'>
          Guardar
        </Button>
      </DialogActions>
    </>
  )
}

export default NewPermissionDialog;
