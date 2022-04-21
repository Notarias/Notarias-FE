import React, { useState, useEffect}    from 'react';
import Grid                             from '@material-ui/core/Grid';
import Paper                            from '@material-ui/core/Paper';
import TextField                        from '@material-ui/core/TextField';
import InputBase                        from '@material-ui/core/InputBase';
import IconButton                       from '@material-ui/core/IconButton';
import SaveIcon                         from '@material-ui/icons/Save';
import EditIcon                         from '@material-ui/icons/Edit';
import ClearIcon                        from '@material-ui/icons/Clear';
import Divider                          from '@material-ui/core/Divider';
import Button                           from '@material-ui/core/Button';
import Breadcrumbs                      from '../../../../ui/breadcrumbs';
import LoadingRoleEdit                  from './loading_role_edit';
import Permissions                      from './permissions';
import { useQuery, useMutation }        from '@apollo/client';
import { UPDATE_ROLE, GET_ROLE }        from '../queries_and_mutations/queries';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Roles", path: "/config/roles" },
  { name: "Edit", path: null}
]

const ConfigRoleEdit = (props) => {
  const { match: {params: {id: rolId}}} = props;

  const { loading, data } = useQuery(
    GET_ROLE, { variables: { "id": rolId }}
  );
  
  const [role] = useState(data && data.role);
  const [initialValue, setInitialValue] = useState(data && data.role.name);
  const [fieldValue, setFieldValue] = useState(data && data.role.name);
  const [fieldStatus, setFieldStatus] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect( () => {
    if(data && data.role){
      setFieldValue(data && data.role.name);
  }}, [data]);
  
  const [updateRole, { loadingUpdateRole }] =
    useMutation(
      UPDATE_ROLE,
      {
        onError(error) {
          let errorsHash = {}
          error.graphQLErrors.map((error) => {
            errorsHash[error.extensions.attribute] = error.message
            return(error.message)
          })
          setErrors(errorsHash);
        },
        onCompleted(cacheData) {
          setFieldStatus(true);
          setInitialValue(cacheData.updateRole.role.name)
        },
        refetchQueries: [
          {
            query: GET_ROLE, variables: { "id": rolId }
          },
        ],
        awaitRefetchQueries: true
      }
    )
  
    const saveUpdateRole = () => {
      updateRole({
        variables: {
          id: role.id,
          name: fieldValue
        }
      })
    }

  const enableEditField = () => {
    setFieldStatus(false);
  }

  const cancelEditField = () => {
    setFieldValue(initialValue);
    setFieldStatus(true);
  }

  const fieldValueChange = ({ target }) => {
    setFieldValue(target.value);
  }

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
                <>
                  <Grid container item xs={6} justifyContent='flex-start'>
                    { fieldStatus ?
                      <InputBase
                        defaultValue={fieldValue}
                        inputProps={{ 'aria-label': 'naked' }}
                      />
                    :
                      <TextField
                        id={role.id}
                        key={role.name}
                        value={fieldValue}
                        onChange={fieldValueChange}
                        disabled={fieldStatus}
                        error={!!errors.name}
                        helperText={errors.name}
                        type='string'
                        variant="outlined"
                        fullWidth
                      />
                    }
                  </Grid>
                  <Grid container item xs={3} justifyContent='flex-start'>
                    { !fieldStatus ?
                        <IconButton
                          color='primary'
                          onClick={saveUpdateRole}
                        >
                          <SaveIcon/>
                        </IconButton>
                    :
                      ""
                    }
                  </Grid>
                  <Grid container item xs={3} justifyContent='flex-end'>
                    <IconButton
                      color={fieldStatus ? 'primary' : 'secondary'}
                      onClick={fieldStatus ? enableEditField : cancelEditField}
                    >
                      {fieldStatus ? <EditIcon/> : <ClearIcon/>}
                    </IconButton>
                  </Grid>
                </>
              }
            </Grid>
            <Divider variant="middle" />
            <Grid container item xs style={{paddingTop: '10px', paddingBottom: '10px', paddingLeft: '30px', paddingRight: '30px'}}>
              <Permissions role={role}/>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default ConfigRoleEdit;
