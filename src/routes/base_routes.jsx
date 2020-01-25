import React     from 'react';
import { Switch, Route } from 'react-router-dom';

import SignInPage     from '../components/pages/session/sign_in_page';
import ProtectedRoute from './protected_route';
import Breadcrumbs    from '../components/ui/breadcrumbs';

import Home           from '../components/pages/home';
import Users          from '../components/pages/users';
import NewUser        from '../components/pages/users/new';
import EditUser       from '../components/pages/users/edit';
import Clients        from '../components/pages/clients';
import BudgetBuilder  from '../components/pages/budget_builders';
import FormsBuilder   from '../components/pages/form_builders';
import Budgets        from '../components/pages/budgets';
import Procedures     from '../components/pages/procedures';
import Appointments   from '../components/pages/appointments';
import Reports        from '../components/pages/reports';
import Profile        from '../components/pages/profiles';
import store          from '../store';

export default function BaseRoutes(props) {
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
