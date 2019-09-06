import React     from 'react';
import { Switch, Route } from 'react-router-dom';

import SignInPage     from '../Components/Pages/Session/SignInPage';
import ProtectedRoute from './ProtectedRoute';
import Breadcrumbs    from './../Components/Ui/Breadcrumbs';

import Home           from '../Components/Pages/Home';
import Users          from '../Components/Pages/Users/Index';
import NewUser        from '../Components/Pages/Users/New';
import EditUser       from '../Components/Pages/Users/Edit';
import Clients        from '../Components/Pages/Clients/Index';
import BudgetBuilder  from '../Components/Pages/BudgetBuilder/Index';
import FormsBuilder   from '../Components/Pages/FormsBuilder/Index';
import Budgets        from '../Components/Pages/Budgets/Index';
import Procedures     from '../Components/Pages/Procedures/Index';
import Appointments   from '../Components/Pages/Appointments/Index';
import Reports        from '../Components/Pages/Reports/Index';
import Profile        from '../Components/Pages/Profile/Index';
import store          from '../store';

export default (props) => {
  const { styles } = props
  let { breadcrumbs } = store.getState()
  return(
    <div>
      { !!breadcrumbs.length && <Breadcrumbs styles={styles} /> }
      <Switch>
        { !localStorage.jwtToken &&
          (<Route path="/sign_in" component={SignInPage}/>)
        }
        <ProtectedRoute path='/users/:id/edit' component={EditUser}/>
        <ProtectedRoute path='/users/new' component={NewUser}/>
        <ProtectedRoute path='/users' component={Users}/>
        <ProtectedRoute path="/clients" component={Clients}/>
        <ProtectedRoute path="/budgets/templates" component={BudgetBuilder}/>
        <ProtectedRoute path="/forms/templates" component={FormsBuilder}/>
        <ProtectedRoute path='/budgets' component={Budgets} />
        <ProtectedRoute path="/procedures" component={Procedures}/>
        <ProtectedRoute path="/appointments" component={Appointments}/>
        <ProtectedRoute path="/reports" component={Reports}/>
        <ProtectedRoute path="/profile" component={Profile}/>
        <Route render={() => <Home/>}/>
      </Switch>
    </div>
  )
}
