import React                                        from 'react';
import DialogTitle                                  from '@material-ui/core/DialogTitle';
import DialogContent                                from '@material-ui/core/DialogContent';
import DialogContentText                            from '@material-ui/core/DialogContentText';
import DialogActions                                from '@material-ui/core/DialogActions';
import Button                                       from '@material-ui/core/Button';
import { useMutation }                              from '@apollo/client';
import { DESTROY_PERMISSION, LOAD_PERMISSIONS }     from '../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                           from '../../../../../resolvers/queries';
import client                                       from '../../../../../apollo';

const PermissionDeleteDialog = (props) => {
  const { permission, closeDeleteDialog } = props

  const [destroyPermission] =
    useMutation(
      DESTROY_PERMISSION,
      {
        onError(error) {
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Ha ocurrio un error al eliminar el permiso",
                type: "error",
                __typename: "globalMessage"
              }
            }
          })
        },
        onCompleted(cacheData) {
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Permiso eliminado con exito.",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
          closeDeleteDialog();
        },
        refetchQueries: [
          {
            query: LOAD_PERMISSIONS 
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const deletePermission = (event) => {
    destroyPermission({
      variables:{
        id: permission.id 
      }
    })
  }

  return(
    <>
      <DialogTitle id="form-dialog-title">
        Eliminar Permiso
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirme para eliminar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog} color="secondary" variant='contained'>
          Cancelar
        </Button>
        <Button onClick={deletePermission} color="primary" variant='contained'>
          Confirmar
        </Button>
      </DialogActions>
    </>
  )
}

export default PermissionDeleteDialog;
