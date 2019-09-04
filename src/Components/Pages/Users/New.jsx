import React, { Component } from 'react';
import UserForm             from './UserForm/UserForm';
import { withStyles }       from '@material-ui/core/styles';
import Paper                from '@material-ui/core/Paper';
import { styles }           from './UserForm/styles';
import API                  from './../../../axiosConfig';
import ErrorMessage         from './../../Ui/CustomSnackbarMessage';
import Button               from '@material-ui/core/Button';
import { Link }             from 'react-router-dom';
import { GENERIC_FORM_ERROR } from './../../Reducers/MessagesReducer';
import store                  from './../../../store';
import { setMessage }         from './../../Interfaces/MessagesSi';
import { setBreadcrumbsList } from './../../Interfaces/BreadcrumbsSi';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: "/users" },
  { name: "Nuevo", path: null }
]

class NewUser extends Component {
  constructor() {
    super()
    this.state = {
      errorMessage: null,
      errors: {},
      loading: false,
      requiredFields: {
        "email": "Correo Electrónico",
        "password": "Contraseña",
        "password_confirmation": "Confirmar Contraseña",
        "first_name": "Nombre",
        "last_name": "Apellido",
      },
    }
  }

  componentDidMount() {
    setBreadcrumbsList(BREADCRUMBS)
  }

  submitUser = NewUserInfo => {
    this.setState({ loading: true })
    API.post('users',
      {
        user: NewUserInfo
      }
    ).then((data) => {
      setMessage({ type: "success", text: "Usuario guardado, redirigiendo..." })
      this.setState({ loading: false })
      setTimeout(() => { this.props.history.push('/users') }, 2000)
    }).catch((error) => {
      if (error.response && error.response.status === 422 ) {
        this.setState({
          errorMessage: GENERIC_FORM_ERROR,
          errors: error.response.data.pointers,
          loading: false
        })
      }
    });
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <Paper className={classes.paper}>
          {this.state.errorMessage && <ErrorMessage
            variant="error"
            className={classes.margin}
            message={this.state.errorMessage}
            actionable={false}
          />}
          <UserForm
            onSubmit={this.submitUser}
            errors={this.state.errors}
            requiredFields={this.state.requiredFields}
            loading={this.state.loading}
            />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(NewUser);