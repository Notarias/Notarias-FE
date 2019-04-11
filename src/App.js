import React, { Component } from 'react';
import API from './axiosConfig';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './App.css';
import BaseRoutes from './Routes/BaseRoutes';
import { signIn } from './Components/Reducers/SessionReducer';

class App extends Component {
  render() {
    console.log("afuera")
    console.log(this.props)
    return (
      <div className="App">
        { this.props.sessionToken ? this.props.sessionToken : "SIN SESION"}
        <BaseRoutes/>
      </div>
    );
  }
}

const mapStateToProps = props => {
  return props
}

const mapDispatchToProps = dispatch => ({
  signIn: payload => dispatch(signIn(payload))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
