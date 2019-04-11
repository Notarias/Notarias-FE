import React from 'react';
import Input from '@material-ui/core/Input';

export default ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <Input
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)
