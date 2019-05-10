import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderTextField      from './../../../Ui/renderTextField';
import Button               from '@material-ui/core/Button';

const requiredFields = {
  "email": "Correo Electrónico",
  "password": "Contraseña",
  "password_confirmation": "Confirmar Contraseña",
  "first_name": "Nombre",
  "last_name": "Apellido",
}

class  NewUser extends Component {
  render() {
    const { handleSubmit, pristine, submitting, errors } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {
          Object.keys(requiredFields).map((field) => {
            return(
              <Field
                    key={field} 
                    name={field}
                    type={field === "password" ? "password" : "text"}
                    id={field}
                    label={requiredFields[field]}
                    meta={{ error: errors[field], touched: errors[field] }}
                    required={true}
                    component={renderTextField} />
            )
          })
        }
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={pristine || submitting}
        >
          Guardar
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'NewUserForm', // a unique identifier for this form
})(NewUser);
  
