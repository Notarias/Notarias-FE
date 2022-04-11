import React, { useState }              from 'react';
import TableCell                        from '@material-ui/core/TableCell';
import TableRow                         from '@material-ui/core/TableRow';
import Grid                             from '@material-ui/core/Grid';
import MenuItem                         from '@material-ui/core/MenuItem';
import ListItemIcon                     from '@material-ui/core/ListItemIcon';
import ListItemText                     from '@material-ui/core/ListItemText';
import BorderColorIcon                  from '@material-ui/icons/BorderColor';
import DeleteForeverIcon                from '@material-ui/icons/DeleteForever';
import Dialog                           from '@material-ui/core/Dialog';
import GenericDropdownMenu              from '../../../../ui/generic_dropdown_menu';
import { useMutation }                  from '@apollo/client';
import { DESTROY_ROLE, LOAD_ROLES }     from '../queries_and_mutations/queries';
import EditRoleDialog                    from '../edit/edit_role_dialog';

const RolesRows = (props) => {

  const { role } = props

  const [editDialogStatus, setEditDialogStatus] = useState(false);

  const editDialog = () => {
    setEditDialogStatus(!editDialogStatus)
  }

  const [destroyRole] =
    useMutation(
      DESTROY_ROLE,
      {
        onCompleted(cacheData) {
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
            <MenuItem key={"1-rolMenu"} onClick={editDialog}>
              <Grid container>
                <ListItemIcon>
                  <BorderColorIcon/>
                </ListItemIcon>
                <ListItemText primary="Editar" />
              </Grid>
            </MenuItem>
            <MenuItem key={"2-rolMenu"} onClick={deleteRole}>
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
      <Dialog open={editDialogStatus} onClose={editDialog}>
        <EditRoleDialog editDialog={editDialog} role={role} />
      </Dialog>
    </TableRow>
  )
}

export default RolesRows;
