import React, { Component } from 'react';
import API from './axiosConfig';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './App.css';

import AuthButton from './Components/AuthButton';
import BaseRoutes from './Routes/BaseRoutes';
import { signIn } from './Components/Reducers/SessionReducer';

class App extends Component {
  signinClick = () => {
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
    return (
      <div className="App">
        { this.props.sessionToken ? this.props.sessionToken : "SIN SESION"}
        <AuthButton onClick={this.signinClick}/>
        <BaseRoutes/>
      </div>
    );
  }
}

const mapStateToProps = token => {
  return token
}

const mapDispatchToProps = dispatch => ({
  signIn: payload => dispatch(signIn(payload))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
