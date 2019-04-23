import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router-dom'
import API                  from '../../../axiosConfig';
import compose              from 'recompose/compose';
import { signIn, signOut }           from '../../Reducers/SessionTokenReducer';
import CustomSnackbarMessage from '../../Ui/CustomSnackbarMessage';
import {GENERIC_CONNECTION_ERROR} from '../../GenericErrors';
import { signInUser } from '../../Reducers/CurrentUserReducer';

import { styles } from './sessionStyles';
import SessionForm from './SessionForm';

import Avatar           from '@material-ui/core/Avatar';
import logo_momentary from './../../../images/logo_momentary.png'
import Paper            from '@material-ui/core/Paper';
import Typography       from '@material-ui/core/Typography';
import withStyles       from '@material-ui/core/styles/withStyles';


class SignInPage extends Component {
  constructor() {
    super()
    this.state = {
      errorMessage: null
    }
  }

  signOut() {
    this.props.signOut()
  }

  getCurrentUser = () => {
    API.get(`/current_profile`).then(res => {
      this.props.signInUser(res.data)
      localStorage.setItem('currentUser', JSON.stringify(res.data))
    });
  }

  submitSignin = emailAndPassword => {
    let token;
    API.post('/authenticate', emailAndPassword)
      .then(res => {
          token = res.data.auth_token
          localStorage.setItem('jwtToken', token)
          this.props.signIn(token)
          return new Promise((resolve) => resolve())
        }
      ).then(() => {
          this.props.history.push(this.props.location.state.from.pathname)
          this.getCurrentUser()
        }
      ).catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            this.setState({ errorMessage: error.response.data.error.user_authentication.join("") })
          } else {
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
            <img className={classes.logo} src={logo_momentary} alt="Logo"/>
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
  signOut: PropTypes.func.isRequired,
  sessionToken: PropTypes.string,
  from: PropTypes.string
};

const mapStateToProps = props => {
  return { sessionToken: props.sessionToken, currentUser: props.currentUser }
}

const mapDispatchToProps = dispatch => ({
  signIn: payload => dispatch(signIn(payload)),
  signOut: payload => dispatch(signOut(payload)),
  signInUser: payload => dispatch(signInUser(payload))
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(SignInPage))
