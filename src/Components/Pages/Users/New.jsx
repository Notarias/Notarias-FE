import React, { Component } from 'react';
import NewUserForm          from './NewUserForm/NewUserForm';
import { withStyles }       from '@material-ui/core/styles';
import Paper                from '@material-ui/core/Paper';
import { styles }           from './NewUserForm/styles';
import API                  from './../../../axiosConfig';
import ErrorMessage         from './../../Ui/CustomSnackbarMessage';
import Button               from '@material-ui/core/Button';
import { Link }             from 'react-router-dom';
import Grid                 from '@material-ui/core/Grid';
import { GENERIC_FORM_ERROR } from './../../Reducers/MessagesReducer';

class NewUser extends Component {

  constructor() {
    super()
    this.state = {
      errorMessage: null,
      errors: {}
    }
  }

  submitUser = NewUserInfo => {
    console.log(NewUserInfo)
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

  processErrors(errorsHash) {
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
          <NewUserForm onSubmit={this.submitUser} errors={this.state.errors}/>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(NewUser);