import React                            from 'react';
import Grid                             from '@material-ui/core/Grid';
import PermissionSwitch                 from './permission_switch';
import LoadingPermissions               from './loading_permissions';
import { useQuery }                     from '@apollo/client';
import { LOAD_PERMISSIONS }             from '../queries_and_mutations/queries';

const Permissions = ( params ) => {
  const { role } = params

  const { data } = useQuery(
    LOAD_PERMISSIONS
  );
  
  return(
    data && data.permissions.map((permission) => {
      return(
        <Grid key={`${permission.id}-rolePermissions`} container item xs={4}>
          <PermissionSwitch role={role} permission={permission}/>
        </Grid>
      )
    })
  )
}

export default Permissions;
