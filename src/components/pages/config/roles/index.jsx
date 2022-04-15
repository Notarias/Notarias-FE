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
import RolesRows                      from './index/roles_rows';
import { useQuery }                   from '@apollo/client';
import { LOAD_ROLES }                 from './queries_and_mutations/queries';
import NewRoleDialog                  from './new/new_role_dialog';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Roles", path: null }
]

const ConfigRolesIndex = () => {

  const [newDialogStatus, setNewDialogStatus] = useState(false);

  const { loading, data } = useQuery(
    LOAD_ROLES
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
              Nuevo Rol
            </Button>
          </Grid>
        </Grid>
       
        <Grid item xs={12} style={{padding: '25px'}}>
          <Paper >
            { data && data.roles.length > 0 ?
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Serie</TableCell>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center">Permanent Link</TableCell>
                    <TableCell align="center">Opciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  { data.roles.map((role) => {
                    return( <RolesRows key={`${role.id}-rolesRows`} role={role} /> )
                    })
                  }
                </TableBody>

              </Table>
            :
              <Grid>
                <Typography variant='h6' style={{paddingTop: '20px', paddingBottom: '20px'}}>
                  "No Existen Roles Añadidos"
                </Typography>
              </Grid>
            }
          </Paper>
          <Dialog open={newDialogStatus} onClose={newDialog}>
            <NewRoleDialog newDialog={newDialog}/>
          </Dialog>
        </Grid>
      </Grid>
    </>
  )
}

export default ConfigRolesIndex;
