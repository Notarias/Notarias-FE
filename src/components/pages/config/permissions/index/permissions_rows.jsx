import React, { useState }                              from 'react';
import TableCell                                        from '@material-ui/core/TableCell';
import TableRow                                         from '@material-ui/core/TableRow';
import Grid                                             from '@material-ui/core/Grid';
import Dialog                                       from '@material-ui/core/Dialog';
import MenuItem                                         from '@material-ui/core/MenuItem';
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

  const openEditDialog = () => {
    setEditDialogStatus(true);
  }

  const closeEditDialog = () => {
    setEditDialogStatus(false);
  }

  const openDeleteDialog = () => {
    setDeleteDialogStatus(true);
  }

  const closeDeleteDialog = () => {
    setDeleteDialogStatus(false);
  }

  return(
    <TableRow>
      <TableCell align="center">{permission.id}</TableCell>
      <TableCell align="center">{permission.name}</TableCell>
      <TableCell align="center">{permission.permanentLink}</TableCell>
      <TableCell align="center">
        <Grid>
          <GenericDropdownMenu>
            <MenuItem key={"1-permissionMenu"} onClick={openEditDialog}>
              <Grid container>
                <ListItemIcon>
                  <BorderColorIcon/>
                </ListItemIcon>
                <ListItemText primary="Editar" />
              </Grid>
            </MenuItem>
            <MenuItem key={"2-permissionMenu"} onClick={openDeleteDialog}>
              <Grid container>
                <ListItemIcon>
                  <DeleteForeverIcon/>
                </ListItemIcon>
                <ListItemText primary="Eliminar" />
              </Grid>
            </MenuItem>
          </GenericDropdownMenu>
          <Dialog open={editDialogStatus} onClose={closeEditDialog} id="form-dialog-title">
            <PermissionEditDialog
              permission={permission}
              closeEditDialog={closeEditDialog}
            />
          </Dialog>
          <Dialog open={deleteDialogStatus} onClose={closeDeleteDialog}>
            <PermissionDeleteDialog
              permission={permission}
              closeDeleteDialog={closeDeleteDialog}
            />
          </Dialog>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default PermissionsRows;
