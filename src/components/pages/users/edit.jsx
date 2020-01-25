import React, { Component } from 'react';
import { styles }           from './user_form/styles';
import { withStyles }       from '@material-ui/core/styles';
import API                  from '../../../axios_config';
import UserForm             from './user_form/user_form';
import { GENERIC_FORM_ERROR } from '../../reducers/messages_reducer';
import Paper                from '@material-ui/core/Paper';
import ErrorMessage         from '../../ui/custom_snackbar_message';
import { setMessage }                      from '../../interfaces/messages_interface';
import { setBreadcrumbsList }              from '../../interfaces/breadcrumbs_interface';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: "/users" },
  { name: "Nuevo", path: null }
]

class Edit extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      errorMessage: null,
      errors: {},
      loading: false,
      requiredFields: {
        "email": "Correo Electrónico",
        "first_name": "Nombre",
        "last_name": "Apellido",
      },
      notRequiredFields: {
        "password": "Contraseña",
        "password_confirmation": "Confirmar Contraseña",
      }
    }
  }

  componentDidMount() {
    setBreadcrumbsList(BREADCRUMBS)
    if(this.props && this.props.match && this.props.match.params.id) {
      API.get(`/users/${this.props.match.params.id}`)
        .then((response) => {
          this.setState({ user: response.data.user })
        })
    }
  }

  submitUser = NewUserInfo => {
    this.setState({ loading: true })
    API.patch(`/users/${this.state.user.id}`,
      {
        user: NewUserInfo
      }
    ).then((data) => {
      setMessage({ type: "success", text: "Usuario actualizado, redirigiendo..." })
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

  render() {
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
            initialValues={this.state.user}
            onSubmit={this.submitUser.bind(this)}
            errors={this.state.errors}
            requiredFields={this.state.requiredFields}
            notRequiredFields={this.state.notRequiredFields}
            loading={this.state.loading}
            />
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(Edit);
