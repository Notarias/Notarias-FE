import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SignInPage from '../Components/Pages/Session/SignInPage';
import SignOutPage from '../Components/Pages/Session/SignOutPage';
import ProtectedRoute from './ProtectedRoute';

import Home from '../Components/Pages/Home';
import Users from '../Components/Pages/Users/Users';
import New from '../Components/Pages/Users/New';


class BaseRoutes extends Component {
  render() {
    return(
      <div className={this.props.routesContainerClass} >
        { localStorage.jwtToken ?
          (<Route path="/sign_out" component={SignOutPage}/>) :
          (<Route path="/sign_in" component={SignInPage}/>)
        }
        <ProtectedRoute path='/users' component={Users}/>
        <ProtectedRoute path='/users/new' component={New}/>
        <ProtectedRoute path="/" component={Home}/>
      </div>
    )
  }
}

export default BaseRoutes;