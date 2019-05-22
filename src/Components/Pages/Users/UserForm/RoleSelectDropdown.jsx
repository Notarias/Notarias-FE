import React, { Component } from 'react';
import Select         from '@material-ui/core/Select';
import FormControl    from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel     from '@material-ui/core/InputLabel';

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

export default class RoleSelectDropdown extends Component {
  render(){
    const { input, required, children, label } = this.props
    const { meta: { touched, error }, ...custom } = this.props
    return(
      <FormControl required margin="normal" fullWidth>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <Select
          value={input.value}
          onChange={input.onChange}
        >
          {children}
        </Select>
        {hasError(error, touched)&& <FormHelperText error>{errorMessage(error)}</FormHelperText> }
      </FormControl>
    )
  }
}