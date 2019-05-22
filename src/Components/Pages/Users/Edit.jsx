import React, { Component } from 'react';
import { styles }           from './UserForm/styles';
import { withStyles }       from '@material-ui/core/styles';
import API                  from '../../../axiosConfig';
import UserForm             from './UserForm/UserForm';
import { GENERIC_FORM_ERROR } from './../../Reducers/MessagesReducer';
import Button               from '@material-ui/core/Button';
import { Link }             from 'react-router-dom';
import Paper                from '@material-ui/core/Paper';
import ErrorMessage         from './../../Ui/CustomSnackbarMessage';
import { connect }          from 'react-redux'
import { loadRecordData }     from '../../Reducers/RecordFormReducer'

class Edit extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
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
      }
    }
  }

  componentDidMount() {
    if(this.props && this.props.match && this.props.match.params.id) {
      API.get(`/users/${this.props.match.params.id}`)
        .then((response) => {
          this.setState({ user: response.data.user })
          this.props.loadRecordData(response.data.user)
        })
    }
  }

  submitUser = NewUserInfo => {
    API.patch(`/users/${this.state.user.id}`,
      {
        user: NewUserInfo
      }
    ).then((data) => {
      setTimeout(() => { this.props.history.push('/users') }, 3000)
    }).catch((error) => {
      if (error.response && error.response.status === 422 ) {
        this.setState({
          errorMessage: GENERIC_FORM_ERROR,
          errors: error.response.data.pointers
        })
      }
    });
  }

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <div className={classes.barItemsWrapper}>
          <Button component={Link} to="/users" variant="contained" color="primary">
            Regresar
          </Button>
        </div>
        <Paper className={classes.paper}>
          {this.state.errorMessage && <ErrorMessage
            variant="error"
            className={classes.margin}
            message={this.state.errorMessage}
            actionable={false}
          />}
          <UserForm
            userData={this.state.user}
            onSubmit={this.submitUser.bind(this)}
            errors={this.state.errors}
            requiredFields={this.state.requiredFields}
            notRequiredFields={this.state.notRequiredFields}
            />
        </Paper>
      </div>
    )
  }
}
const mapStateToProps = props => {
  return props
}

const mapDispatchToProps = dispatch => ({
  loadRecordData: (payload) => dispatch(loadRecordData(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Edit));
