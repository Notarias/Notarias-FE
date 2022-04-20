import React, {useState}                from 'react';
import Grid                             from '@material-ui/core/Grid';
import Typography                       from '@material-ui/core/Typography';
import Switch                           from '@material-ui/core/Switch';
import { useMutation }                  from '@apollo/client';
import { ADD_REMOVE_ROLE_PERMISSIONS }  from '../queries_and_mutations/queries';
import { GET_ROLE }                     from '../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }               from '../../../../../resolvers/queries';
import client                           from '../../../../../apollo';

const PermissionSwitch = ( params ) => {
  const { role, permission } = params

  const [checkedValue, setCheckedValue] = useState(!!role.permissions.find(rolePermission => rolePermission.id === permission.id));
  
  const [addRemoveRolePermissions] =
    useMutation(
      ADD_REMOVE_ROLE_PERMISSIONS,
      {
        onError(error) {
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Error al actualizar los permisos.",
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
                message: "Permiso actualizado con exito.",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
        },
        refetchQueries: [
          {
            query: GET_ROLE, variables: { "id": role.id } 
          },
        ],
        awaitRefetchQueries: true
      }
    )

    const handleChange = (event) => {
      setCheckedValue(event.target.checked);
      addRemoveRolePermissions({
        variables: {
          roleId: role.id,
          permissionId: event.target.id,
          validate: event.target.checked
        }
      });
    }

  return(
    <>
      <Grid container item xs justifyContent='flex-start' alignContent='center' style={{paddingLeft: '20%'}}>
        <Grid item>
          <Typography>
            {permission.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs justifyContent='flex-end' style={{paddingRight: '20%'}}>
        <Grid item>
          <Switch
            id={permission.id}
            name={permission.name}
            onChange={handleChange}
            checked={checkedValue}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default PermissionSwitch;
