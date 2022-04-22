import React, { useState, useEffect }       from 'react';
import Grid                                 from '@material-ui/core/Grid';
import Paper                                from '@material-ui/core/Paper';
import Divider                              from '@material-ui/core/Divider';
import Breadcrumbs                          from '../../../../ui/breadcrumbs';
import LoadingRoleEdit                      from './loading_role_edit';
import RoleName                             from './role_name';
import Permissions                          from './permissions';
import LoadingPermissions                   from './loading_permissions';
import { useQuery }                         from '@apollo/client';
import { GET_ROLE }                         from '../queries_and_mutations/queries';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Roles", path: "/config/roles" },
  { name: "Edit", path: null}
]

const ConfigRoleEdit = (props) => {
  const { match } = props
  
  const skeletonArray = [1,2,3,4,5,6,7,8,9]

  const { loading, data } = useQuery(
    GET_ROLE, { variables: { "id": match.params.id } } 
  );
console.log('edit---', data, loading)
  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Grid container direction='column' style={{ paddingTop: "30px" }}>
        <Grid item style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <Paper style={{ padding: "10px" }}>
            <Grid container item xs style={{paddingTop: '10px', paddingBottom: '10px', paddingLeft: '30px', paddingRight: '30px'}}>
              { loading ?
                <LoadingRoleEdit/>
              :
                <RoleName role={data && data.role}/>
              }
            </Grid>
            <Divider variant="middle" />
            <Grid container item xs style={{paddingTop: '10px', paddingBottom: '10px', paddingLeft: '30px', paddingRight: '30px'}}>
              { loading ?
                skeletonArray.map((item) => {
                  return(
                    <Grid key={`${item}-skeletonArray`} container item xs={4}>
                      <LoadingPermissions/>
                    </Grid>
                  )
                })
              :
                <Permissions role={data && data.role}/> 
              }
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default ConfigRoleEdit;
