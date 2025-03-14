import React                                from 'react';
import TableCell                            from '@material-ui/core/TableCell';
import TableRow                             from '@material-ui/core/TableRow';
import Grid                                 from '@material-ui/core/Grid';
import MenuItem                             from '@material-ui/core/MenuItem';
import ListItemIcon                         from '@material-ui/core/ListItemIcon';
import ListItemText                         from '@material-ui/core/ListItemText';
import BorderColorIcon                      from '@material-ui/icons/BorderColor';
import DeleteForeverIcon                    from '@material-ui/icons/DeleteForever';
import GenericDropdownMenu                  from '../../../../ui/generic_dropdown_menu';
import { Link }                             from 'react-router-dom';
import { useMutation }                      from '@apollo/client';
import { DESTROY_ROLE, LOAD_ROLES }         from '../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                   from '../../../../../resolvers/queries';
import client                               from '../../../../../apollo';

const RolesRows = (props) => {

  const { role } = props

  const [destroyRole] =
    useMutation(
      DESTROY_ROLE,
      {
        onError(error) {
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Ha ocurrio un error al eliminar el rol",
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
                message: "Role eliminado con exito.",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
        },
        refetchQueries: [
          {
            query: LOAD_ROLES 
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const deleteRole = (event) => {
    destroyRole({
      variables:{
        id: role.id 
      }
    })
  }
  
  return(
    <TableRow>
      <TableCell align="center">{role.id}</TableCell>
      <TableCell align="center">{role.name}</TableCell>
      <TableCell align="center">{role.permanentLink}</TableCell>
      <TableCell align="center">
        <Grid>
          <GenericDropdownMenu>
            <Link key={"1-roleMenu"} to={`/config/roles/${role.id}/permissions`} style={{ textDecoration: 'none' }}>
              <MenuItem>
                <Grid container>
                  <ListItemIcon>
                    <BorderColorIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Editar" />
                </Grid>
              </MenuItem>
            </Link>
            <MenuItem key={"2-roleMenu"} onClick={deleteRole}>
              <Grid container>
                <ListItemIcon>
                  <DeleteForeverIcon/>
                </ListItemIcon>
                <ListItemText primary="Eliminar" />
              </Grid>
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default RolesRows;
