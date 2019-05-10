import React from 'react';
import TextField      from '@material-ui/core/TextField';
import FormControl    from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const hasError = function(error, touched) {
  return error && touched && true
}

const errorMessage = function(error) {
  if (typeof error === "string") {
    return error
  } else {
    return error[0]
  }
}

export default ({
  input,
  required,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return(
    <FormControl margin="normal" required={required} fullWidth>
      <TextField
        placeholder={label}
        label={label}
        required={required}
        error={ hasError(error, touched) }
        {...input}
        {...custom}
      />
      {hasError(error, touched)&& <FormHelperText error>{errorMessage(error)}</FormHelperText> }
    </FormControl>
  )
}