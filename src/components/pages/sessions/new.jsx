import React, { Component }       from 'react';
import PropTypes                  from 'prop-types';
import { withRouter }             from 'react-router-dom'
import API                        from '../../../axios_config';
import compose                    from 'recompose/compose';
import CustomSnackbarMessage      from '../../ui/custom_snackbar_message';
import {GENERIC_CONNECTION_ERROR} from '../../generic_errors';
import { setBreadcrumbsList }     from '../../interfaces/breadcrumbs_interface';

import { styles }  from './session_styles';
import SessionForm from './session_form';

import Avatar           from '@material-ui/core/Avatar';
import logo_notaria   from './../../../images/logo_notaria.JPG'
import Paper            from '@material-ui/core/Paper';
import withStyles       from '@material-ui/core/styles/withStyles';

class SessionsNew extends Component {
  constructor() {
    super()
    this.state = {
      errorMessage: null
    }
  }

  componentDidMount() {
    setBreadcrumbsList([])
  }

  signOut() {
    localStorage.clear('jwtToken');
  }

  getCurrentUser = () => {
    API.get(`/current_profile`).then(res => {
      this.props.signInUser(res.data)
      localStorage.setItem('currentUser', JSON.stringify(res.data))
      return new Promise((resolve) => resolve())
    });
  }

  submitSignin = emailAndPassword => {
    let token;
    API.post('/authenticate', emailAndPassword)
      .then(res => {
          token = res.data.auth_token
          localStorage.setItem('jwtToken', token)
          return new Promise((resolve) => resolve())
        }
      ).then(() => {
        this.getCurrentUser()
      }).then(() => {
        if (this.props.history.location.pathname == "/sign_in") {
          this.props.history.go(-1)
        } else {
          this.props.history.location = this.props.history.location
        }
      })
      .catch((error) => {
        if (!error.response) {
          this.setState({ errorMessage: GENERIC_CONNECTION_ERROR })
          this.signOut()
        } else if (error.response) {
          if (error.response.status === 401) {
            this.setState({ errorMessage: error.response.data.error.user_authentication.join("") })
          }
        }
    });
  }

  setError(error) {
    this.setState({ errorMessage: error })
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
            autohide={false}
          />}
          <Avatar className={classes.avatar}>
            <img className={classes.logo} src={logo_notaria} alt="Logo"/>
          </Avatar>
          <SessionForm classes={classes} history={this.props.history} setError={this.setError.bind(this)} />
        </Paper>
      </main>
    )
  }
}

SessionsNew.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
)(withRouter(SessionsNew))
