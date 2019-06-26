import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import SignInPage from '../Components/Pages/Session/SignInPage';
import SignOutPage from '../Components/Pages/Session/SignOutPage';
import ProtectedRoute from './ProtectedRoute';

import Home from '../Components/Pages/Home';
import Users from '../Components/Pages/Users/Index';
import NewUser from '../Components/Pages/Users/New';
import EditUser from '../Components/Pages/Users/Edit';
import ErrorNotFound from '../Components/404error';


class BaseRoutes extends Component {
  render() {
    return(
      <div className={this.props.routesContainerClass} >
        { localStorage.jwtToken ?
          (<Route path="/sign_out" component={SignOutPage}/>) :
          (<Route path="/sign_in" component={SignInPage}/>)
        }
        <Switch>
          <ProtectedRoute path='/users' component={Users}/>
          <ProtectedRoute path='/users/new' component={NewUser}/>
          <ProtectedRoute path='/users/:id/edit' component={EditUser}/>
          <ProtectedRoute path="/" component={Home}/>
          <Route path="/*" component={ErrorNotFound}/>
        </Switch>
      </div>
    )
  }
}

export default BaseRoutes;