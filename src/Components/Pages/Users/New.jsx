import React, { Component } from 'react';
import NewUserForm          from './NewUserForm/NewUserForm';
import { withStyles }       from '@material-ui/core/styles';
import Paper                from '@material-ui/core/Paper';
import { styles }           from './NewUserForm/newUserStyles';
import API                  from './../../../axiosConfig';
import ErrorMessage         from './../../Ui/CustomSnackbarMessage';

class NewUser extends Component {

  constructor() {
    super()
    this.state = {
      errorMessage: null
    }
  }

  submitUser = NewUserInfo => {
    API.post('users', 
      {
        user: NewUserInfo
      }
      
    ).then(function(data){
      if(data.error===null){ 
        this.props.history.push('/users')
      }
    }
    ).catch((error) => {
      if (error.response) {
        if (error.response.status === 422) {
          this.setState({ errorMessage: error.response.data.message[0] })
        } else {
          this.setState(console.log("otro error"))
        }
      }
    });
  }

  render(){
    const { classes } = this.props;
    return(
      <Paper className={classes.paper}>
        {this.state.errorMessage && <ErrorMessage
          variant="error"
          className={classes.margin}
          message={this.state.errorMessage}
          actionable={false}
        />}
        <NewUserForm onSubmit={this.submitUser }/>
      </Paper>
    );
  }
}

export default withStyles(styles)(NewUser);