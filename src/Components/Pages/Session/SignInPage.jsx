import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router-dom'
import API                  from '../../../axiosConfig';
import compose              from 'recompose/compose';
import { signIn }           from '../../Reducers/SessionReducer';
import {GENERIC_CONNECTION_ERROR} from '../../GenericErrors';

import { styles } from './sessionStyles';
import SessionForm from './SessionForm';

import Avatar           from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper            from '@material-ui/core/Paper';
import Typography       from '@material-ui/core/Typography';
import withStyles       from '@material-ui/core/styles/withStyles';
import CustomSnackbarMessage from '../../CustomInputs/CustomSnackbarMessage';

class SignInPage extends Component {
  constructor() {
    super()
    this.state = {
      errorMessage: null
    }
  }

  submitSignin = emailAndPassword => {
    let token;
    API.post('/authenticate', emailAndPassword)
      .then(res => {
          token = res.data.auth_token
          localStorage.setItem('jwtToken', token)
          this.props.signIn(token)
          this.props.history.push('/')
        }
      ).catch((error) => {
        // Error
        if (error.response) {
          if (error.response.status === 401) {
            this.setState({ errorMessage: error.response.data.error.user_authentication.join("") })
          } else if(error.response.status === 500) {
            this.setState({ errorMessage: GENERIC_CONNECTION_ERROR })
          }
        } else if (error.request) {
          this.setState({ errorMessage: GENERIC_CONNECTION_ERROR })
        } else {
          this.setState({ errorMessage: GENERIC_CONNECTION_ERROR })
        }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          {this.state.errorMessage && <CustomSnackbarMessage
            variant="error"
            className={classes.margin}
            message={this.state.errorMessage}
            actionable={false}
          />}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicia sesión
          </Typography>
          <SessionForm classes={classes} submitSignin={this.submitSignin} />
        </Paper>
      </main>
    )
  }
}

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  sessionToken: PropTypes.string,
};

const mapStateToProps = props => {
  return { sessionToken: props.sessionToken }
}

const mapDispatchToProps = dispatch => ({
  signIn: payload => dispatch(signIn(payload))
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(SignInPage))
