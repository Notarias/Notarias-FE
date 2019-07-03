import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SignInPage from '../Components/Pages/Session/SignInPage';
import SignOutPage from '../Components/Pages/Session/SignOutPage';
import ProtectedRoute from './ProtectedRoute';

import Home         from '../Components/Pages/Home';
import Users        from '../Components/Pages/Users/Index';
import NewUser      from '../Components/Pages/Users/New';
import EditUser     from '../Components/Pages/Users/Edit';
import Clients      from '../Components/Pages/Clients/Index';
import Budgets      from '../Components/Pages/Budgets/Index';
import Procedures   from '../Components/Pages/Procedures/Index';
import Appointments from '../Components/Pages/Appointments/Index';
import Reports      from '../Components/Pages/Reports/Index';


class BaseRoutes extends Component {
  render() {
    return(
      <div className={this.props.routesContainerClass} >
        { localStorage.jwtToken ?
          (<Route path="/sign_out" component={SignOutPage}/>) :
          (<Route path="/sign_in" component={SignInPage}/>)
        }
        <ProtectedRoute path='/users' component={Users}/>
        <ProtectedRoute path='/users/new' component={NewUser}/>
        <ProtectedRoute path='/users/:id/edit' component={EditUser}/>
        <ProtectedRoute path="/" component={Home}/>
        <ProtectedRoute path="/clients" component={Clients}/>
        <ProtectedRoute path='/budgets' component={Budgets} />
        <ProtectedRoute path="/procedures" component={Procedures}/>
        <ProtectedRoute path="/appointments" component={Appointments}/>
        <ProtectedRoute path="/reports" component={Reports}/>
      </div>
    )
  }
}

export default BaseRoutes;