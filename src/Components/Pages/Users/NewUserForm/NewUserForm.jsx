import React                from 'react';
import FormControl          from '@material-ui/core/FormControl';
import { Field, reduxForm } from 'redux-form';
import renderTextField      from './../../../Ui/renderTextField';
import Button               from '@material-ui/core/Button';

const NewUser = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormControl margin="normal" required fullWidth>
        <Field name="email"
              type="email"
              id="email"
              required
              label="Correo Electrónico"
              component={renderTextField} />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <Field name="password"
              type="password"
              id="password"
              required
              label="Contraseña"
              component={renderTextField} />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <Field name="password_confirmation"
              type="password" 
              id="password_confirmation"
              required
              label="Confirmar Contraseña"
              component={renderTextField} />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <Field name="first_name"
              type="first_name"
              id="first_name"
              label="Nombre"
              component={renderTextField} />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <Field name="last_name"
              type="last_name"
              id="last_name"
              label="Apellido"
              component={renderTextField} />
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={pristine || submitting}
        //onClick={this.signinClick}
      >
        Entrar
      </Button>
    </form>
  );
}

export default reduxForm({
  form: 'NewUserForm', // a unique identifier for this form
})(NewUser);
  
