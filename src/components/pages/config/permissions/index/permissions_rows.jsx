import React, { useState }                              from 'react';
import TableCell                                        from '@material-ui/core/TableCell';
import TableRow                                         from '@material-ui/core/TableRow';
import Grid                                             from '@material-ui/core/Grid';
import MenuItem                                         from '@material-ui/core/MenuItem';
import Dialog                                           from '@material-ui/core/Dialog';
import ListItemIcon                                     from '@material-ui/core/ListItemIcon';
import ListItemText                                     from '@material-ui/core/ListItemText';
import BorderColorIcon                                  from '@material-ui/icons/BorderColor';
import DeleteForeverIcon                                from '@material-ui/icons/DeleteForever';
import GenericDropdownMenu                              from '../../../../ui/generic_dropdown_menu';
import PermissionEditDialog                             from '../edit/edit';
import PermissionDeleteDialog                           from '../destroy/destroy';

const PermissionsRows = (props) => {
  const { permission } = props


  const [editDialogStatus, setEditDialogStatus] = useState(false);
  const [deleteDialogStatus, setDeleteDialogStatus] = useState(false);

  const editDialog = () => {
    setEditDialogStatus(!editDialogStatus);
  }

  const deleteDialog = () => {
    setDeleteDialogStatus(!deleteDialogStatus);
  }

  return(
    <TableRow>
      <TableCell align="center">{permission.id}</TableCell>
      <TableCell align="center">{permission.name}</TableCell>
      <TableCell align="center">{permission.permanentLink}</TableCell>
      <TableCell align="center">
        <Grid>
          <GenericDropdownMenu>
            <MenuItem key={"1-permissionMenu"} onClick={editDialog}>
              <Grid container>
                <ListItemIcon>
                  <BorderColorIcon/>
                </ListItemIcon>
                <ListItemText primary="Editar" />
              </Grid>
              <Dialog open={editDialogStatus} onClose={editDialog}>
                <PermissionEditDialog editDialog={editDialog} permission={permission}/>
              </Dialog>
            </MenuItem>
            <MenuItem key={"2-permissionMenu"} onClick={deleteDialog}>
              <Grid container>
                <ListItemIcon>
                  <DeleteForeverIcon/>
                </ListItemIcon>
                <ListItemText primary="Eliminar" />
              </Grid>
              <Dialog open={deleteDialogStatus} onClose={deleteDialog}>
                <PermissionDeleteDialog deleteDialog={deleteDialog} permission={permission}/>
              </Dialog>
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default PermissionsRows;
