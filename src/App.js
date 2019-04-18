import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './App.css';
import BaseRoutes from './Routes/BaseRoutes';
import { signIn } from './Components/Reducers/SessionReducer';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
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
