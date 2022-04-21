import React, { useState }            from 'react';
import Grid                           from '@material-ui/core/Grid';
import Button                         from '@material-ui/core/Button';
import Table                          from '@material-ui/core/Table';
import TableHead                      from '@material-ui/core/TableHead';
import TableBody                      from '@material-ui/core/TableBody';
import TableCell                      from '@material-ui/core/TableCell';
import TableRow                       from '@material-ui/core/TableRow';
import Paper                          from '@material-ui/core/Paper';
import Typography                     from '@material-ui/core/Typography';
import Dialog                         from '@material-ui/core/Dialog';
import PlaylistAddIcon                from '@material-ui/icons/PlaylistAdd';
import Breadcrumbs                    from '../../../ui/breadcrumbs'
import PermissionsRows                from './index/permissions_rows';
import NewPermissionDialog            from './new/new';
import { useQuery }                   from '@apollo/client';
import { LOAD_PERMISSIONS }           from './queries_and_mutations/queries';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Permisos", path: null }
]

const ConfigPermissionsIndex = () => {

  const [newDialogStatus, setNewDialogStatus] = useState(false);

  const { loading, data } = useQuery(
    LOAD_PERMISSIONS
  );

  const newDialog = () => {
    setNewDialogStatus(!newDialogStatus)
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Grid container >
        <Grid container item xs={12} justifyContent='flex-end' style={{paddingTop: '25px', paddingRight: '25px'}}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              endIcon={<PlaylistAddIcon/>}
              onClick={newDialog}
            >
              Nuevo Permiso
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{padding: '25px'}}>
          <Paper >
            { data && data.permissions.length > 0 ?
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Serie</TableCell>
                    <TableCell align="center">Permisos</TableCell>
                    <TableCell align="center">Permanent Link</TableCell>
                    <TableCell align="center">Opciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  { data.permissions.map((permission) => {
                    return( <PermissionsRows key={`${permission.id}-permissionsRows`} permission={permission} /> )
                    })
                  }
                </TableBody>

              </Table>
            :
              <Grid>
                <Typography variant='h6' style={{paddingTop: '20px', paddingBottom: '20px'}}>
                  "No Existen Permisos Añadidos"
                </Typography>
              </Grid>
            }
          </Paper>
          <Dialog open={newDialogStatus} onClose={newDialog}>
            <NewPermissionDialog newDialog={newDialog}/>
          </Dialog>
        </Grid>
      </Grid>
    </>
  )
}

export default ConfigPermissionsIndex;
