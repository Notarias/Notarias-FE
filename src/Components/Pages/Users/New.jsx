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

class NewUser extends Component {

  constructor() {
    super()
    this.state = {
      errorMessage: null,
      errors: {},
      requiredFields: {
        "email": "Correo Electrónico",
        "password": "Contraseña",
        "password_confirmation": "Confirmar Contraseña",
        "first_name": "Nombre",
        "last_name": "Apellido",
      },
    }
  }

  submitUser = NewUserInfo => {
    API.post('users',
      {
        user: NewUserInfo
      }
    ).then((data) => {
      this.props.history.push('/users')
    }).catch((error) => {
      if (error.response && error.response.status === 422 ) {
        this.setState({
          errorMessage: GENERIC_FORM_ERROR,
          errors: error.response.data.pointers
        })
      }
    });
  }

  render(){
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
            onSubmit={this.submitUser}
            errors={this.state.errors}
            requiredFields={this.state.requiredFields}
            />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(NewUser);