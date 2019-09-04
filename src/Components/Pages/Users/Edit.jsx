import React, { Component } from 'react';
import { styles }           from './UserForm/styles';
import { withStyles }       from '@material-ui/core/styles';
import API                  from '../../../axiosConfig';
import UserForm             from './UserForm/UserForm';
import { GENERIC_FORM_ERROR } from './../../Reducers/MessagesReducer';
import Paper                from '@material-ui/core/Paper';
import ErrorMessage         from './../../Ui/CustomSnackbarMessage';
import { connect }          from 'react-redux'
import { setMessage }                      from './../../Interfaces/MessagesSi';
import { setBreadcrumbsList }              from './../../Interfaces/BreadcrumbsSi';
import { startLoadingBar, stopLoadingBar } from './../../Interfaces/StartStopLoading';

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
    startLoadingBar()
    if(this.props && this.props.match && this.props.match.params.id) {
      API.get(`/users/${this.props.match.params.id}`)
        .then((response) => {
          stopLoadingBar()
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
const mapStateToProps = props => {
  return props
}

export default connect(
  mapStateToProps
)(withStyles(styles)(Edit));
