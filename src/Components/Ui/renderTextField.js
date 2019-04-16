import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({
  input,
  required,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return(
    <TextField
      placeholder={label}
      label={label}
      required
      error={error && touched}
      {...input}
      {...custom}
    />
  )
}