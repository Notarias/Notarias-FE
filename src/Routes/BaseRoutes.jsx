import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SignInPage from '../Components/Pages/Session/SignInPage';
import SignOutPage from '../Components/Pages/Session/SignOutPage';
import ProtectedRoute from './ProtectedRoute';

import Home from '../Components/Pages/Home';
import Users from '../Components/Pages/Users';


class BaseRoutes extends Component {
  render() {
    return(
      <div>
        <Route path="/sign_in" component={SignInPage}/>
        <Route path="/sign_out" component={SignOutPage}/>
        <ProtectedRoute path='/users' component={Users}/>
        <ProtectedRoute path="/" component={Home}/>
      </div>
    )
  }
}

export default BaseRoutes;