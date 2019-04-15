import FormControl from '@material-ui/core/FormControl';
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import renderTextField from '../../CustomInputs/renderTextField'
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
  let { submitSignin, handleSubmit, classes, pristine, submitting } = props;
  return(
    <form className={ classes.form } onSubmit={ handleSubmit(submitSignin) }>
      <FormControl margin="normal" required fullWidth>
        <Field name="email" 
               type="email" 
               id="email"
               required
               label="Correo Electrónico"
               autoComplete="email" 
               component={renderTextField} />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <Field name="password" 
               type="password" 
               id="password" 
               required
               autoComplete="current-password"
               label="Contraseña" 
               component={renderTextField} />
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

SessionForm = reduxForm({
  form: "SessionForm",
  validate,
})(SessionForm);

export default SessionForm;
