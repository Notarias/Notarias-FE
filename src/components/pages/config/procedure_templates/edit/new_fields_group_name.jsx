import React      from 'react';
import Grid       from '@material-ui/core/Grid';
import TextField  from '@material-ui/core/TextField';

const NewFieldsGroupName = (props) => {
  const { groupFieldName, handleFieldGroupNameChange, error } = props

  return(
    <Grid>
      <TextField 
        id="filled-basic"
        label="Nombre del Grupo"
        value={ groupFieldName } 
        variant="filled" 
        size="small" 
        onChange={ handleFieldGroupNameChange }
        error={ !!error["name"] && true }
        helperText={error["name"] || " "}
        errorskey={ "name" }
        name='name'
      />
    </Grid>
  )
}

export default NewFieldsGroupName;
