import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router-dom'
import API                  from '../../../axiosConfig';
import compose              from 'recompose/compose'
import { signIn }           from '../../Reducers/SessionReducer'

import { styles } from './sessionStyles';
import SessionForm from './SessionForm'

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

class SignInPage extends Component {
  signinClick = e => {
    let token;
    const data = { email: "alexisraca@hotmail.com", password: "" };
    API.post('/authenticate', data)
      .then(res => {
          token = res.data.auth_token
          localStorage.setItem('jwtToken', token)
          this.props.signIn(token)
        }
      )
  }

  render() {
    const { classes } = this.props;
    console.log("adentro")
    console.log(this.props)
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicia sesión
          </Typography>
          <SessionForm classes={classes}/>
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
