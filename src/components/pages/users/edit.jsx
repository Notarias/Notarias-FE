import React, { Component } from 'react';
import { styles }           from './user_form/styles';
import { withStyles }       from '@material-ui/core/styles';
import { GENERIC_FORM_ERROR } from '../../reducers/messages_reducer';
import { setMessage }         from '../../interfaces/messages_interface';
import UserForm             from './user_form/user_form';
import Paper                from '@material-ui/core/Paper';
import ErrorMessage         from '../../ui/custom_snackbar_message';
import { setBreadcrumbsList }              from '../../interfaces/breadcrumbs_interface';
import User from '../../models/objects/user'


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: "/users" },
  { name: "Nuevo", path: null }
]

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      user: new User({ id: this.props.match.params.id }, this),
      errorMessage: null,
      errors: {},
      requiredFields: {
        "email": "Correo Electrónico",
        "first_name": "Nombre",
        "last_name": "Apellido",
      },
      notRequiredFields: {
        "password": "Contraseña",
        "password_confirmation": "Confirmar Contraseña",
      },
      fields: [
        "email",
        "first_name",
        "last_name",
        "password",
        "password_confirmation",
        "role_permanent_link"
      ]
    }
  }

  componentDidMount() {
    setBreadcrumbsList(BREADCRUMBS)
    if(this.state.user.id) {
      this.state.user.load().then(() => {
        this.setState({
          loading: false
        })
      }).catch((error) => {
        this.setState({
          errorMessage: GENERIC_FORM_ERROR,
          loading: false
        })
      })
    }
  }

  formData() {
    let data = {}
    for(let field of this.state.fields){
      data[field] = this.state.user[field]
    }
    return(data)
  }

  submitUser = params => {
    this.setState({ loading: true })
    this.state.user.update(params).then(() => {
      this.setState({
        errorMessage: null,
        errors: {},
        loading: false
      })
      setMessage({ type: "success", text: "Usuario actualizado, redirigiendo..." })
      setTimeout(() => { this.props.history.push('/users') }, 1500);
    }).catch((error) => {
      if (error.response && error.response.status === 422 ) {
        this.setState({
          errorMessage: GENERIC_FORM_ERROR,
          errors: error.response.data.pointers,
          loading: false
        })
      }
    })
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
            actionable={false}/>}
          <UserForm
            initialValues={this.formData()}
            onSubmit={this.submitUser.bind(this)}
            errors={this.state.errors}
            requiredFields={this.state.requiredFields}
            notRequiredFields={this.state.notRequiredFields}
            loading={this.state.loading}/>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(Edit);
