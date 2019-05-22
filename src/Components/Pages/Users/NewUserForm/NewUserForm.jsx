import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderTextField      from './../../../Ui/renderTextField';
import RoleSelectDropdown   from './RoleSelectDropdown';
import Button               from '@material-ui/core/Button';
import API                  from './../../../../axiosConfig';
import MenuItem from '@material-ui/core/MenuItem';


class  NewUser extends Component {
  constructor() {
    super()
    this.state = {
      requiredFields: {
        "email": "Correo Electrónico",
        "password": "Contraseña",
        "password_confirmation": "Confirmar Contraseña",
        "first_name": "Nombre",
        "last_name": "Apellido",
      },
      roles: []
    }
  }

  componentDidMount() {
    API.get("/roles").then((response) => {
      this.setState({ roles: response.data.roles })
    });
  }

  requiredFields(errors) {
    let requiredFields = this.state.requiredFields;
    return Object.keys(requiredFields).reduce((result, key) => {
      result.push(
        <Field
        key={key} 
        name={key}
        type={key === "password" ? "password" : "text"}
        id={key}
        label={requiredFields[key]}
        meta={{ error: errors[key], touched: errors[key] }}
        required={true}
        component={renderTextField} />
      )
      return result;
    }, [])
  }

  render() {
    const { handleSubmit, pristine, submitting, errors } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {this.requiredFields(errors)}
        <Field
          key={"role_permanent_link"} 
          name={"role_permanent_link"}
          label={"Rol"}
          selected={""}
          meta={{ error: errors["role"], touched: errors["role"] }}
          required={true}
          component={RoleSelectDropdown}>
            {
              this.state.roles.map((item, key) =>
                <MenuItem key={key} value={item.permanent_link}>
                  <em>{item.name}</em>
                </MenuItem>
              )
            }
          </Field>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={pristine || submitting || !this.state.roles.length}
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
  
