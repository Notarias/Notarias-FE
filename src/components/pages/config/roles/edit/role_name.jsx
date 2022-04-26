import React, { useState }              from 'react';
import Grid                             from '@material-ui/core/Grid';
import TextField                        from '@material-ui/core/TextField';
import InputBase                        from '@material-ui/core/InputBase';
import IconButton                       from '@material-ui/core/IconButton';
import SaveIcon                         from '@material-ui/icons/Save';
import EditIcon                         from '@material-ui/icons/Edit';
import ClearIcon                        from '@material-ui/icons/Clear';
import { useMutation }                  from '@apollo/client';
import { UPDATE_ROLE, GET_ROLE }        from '../queries_and_mutations/queries';

const RoleName = (params) => {
  const { role } = params

  const [initialValue, setInitialValue] = useState(role.name);
  const [fieldValue, setFieldValue] = useState(role.name);
  const [fieldStatus, setFieldStatus] = useState(true);
  const [errors, setErrors] = useState({});

  const [updateRole] =
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
          query: GET_ROLE, variables: { "id": role.Id }
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
  )
}

export default RoleName;
