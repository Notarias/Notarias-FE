import React, { Component } from 'react';
import UserForm             from './user_form/user_form';
import { withStyles }       from '@material-ui/core/styles';
import Paper                from '@material-ui/core/Paper';
import { styles }           from './user_form/styles';
import API                  from '../../../axios_config';
import ErrorMessage         from '../../ui/custom_snackbar_message';
import { GENERIC_FORM_ERROR } from '../../reducers/messages_reducer';
import { setMessage }         from '../../interfaces/messages_interface';
import { setBreadcrumbsList } from '../../interfaces/breadcrumbs_interface';

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
