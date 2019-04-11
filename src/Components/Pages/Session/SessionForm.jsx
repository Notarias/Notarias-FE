import FormControl from '@material-ui/core/FormControl';
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '../../CustomInputs/TextField'
import AsyncValidate from '../../CustomInputs/AsyncValidate'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Dirección inválida'
  }
  return errors
}

let SessionForm = props => {
  let { handleSubmit, classes, pristine, submitting } = props;
  return(
    <form className={classes.form} onSubmit={ handleSubmit }>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Correo electrónico</InputLabel>
        <TextField id="email" name="email" autoComplete="email" autoFocus />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Contraseña</InputLabel>
        <TextField name="password" type="password" id="password" autoComplete="current-password" />
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={ classes.submit }
        disabled={pristine || submitting}
        //onClick={this.signinClick}
      >
        Entrar
      </Button>
    </form>
  )
}

SessionForm = reduxForm({ form: "session" }, validate, AsyncValidate)(SessionForm);

export default SessionForm;
