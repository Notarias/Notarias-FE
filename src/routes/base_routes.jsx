import React     from 'react';
import { Switch, Route } from 'react-router-dom';

import SessionsNew     from '../components/pages/sessions/new';
import ProtectedRoute from './protected_route';
import Breadcrumbs    from '../components/ui/breadcrumbs';

import DashboardsIndex     from '../components/pages/dashboards/index';
import UsersIndex          from '../components/pages/users/index';
import UsersNew            from '../components/pages/users/new';
import UsersEdit           from '../components/pages/users/edit';
import ClientsIndex        from '../components/pages/clients/index';
import BudgetBuilderIndex from '../components/pages/budget_builders/index';
import FormsBuilderIndex   from '../components/pages/form_builders/index';
import BudgetsIndex        from '../components/pages/budgets/index';
import ProceduresIndex     from '../components/pages/procedures/index';
import AppointmentsIndex   from '../components/pages/appointments/index';
import ReportsIndex        from '../components/pages/reports/index';
import ProfilesIndex        from '../components/pages/profiles/index';
import store               from '../store';

export default function BaseRoutes(props) {
  const { styles } = props
  let { breadcrumbs } = store.getState()
  return(
    <div>
      { !!breadcrumbs.length && <Breadcrumbs styles={styles} /> }
      <Switch>
        { !localStorage.jwtToken &&
          (<Route path="/sign_in" component={SessionsNew}/>)
        }
        <ProtectedRoute path='/users/:id/edit' component={UsersEdit}/>
        <ProtectedRoute path='/users/new' component={UsersNew}/>
        <ProtectedRoute path='/users' component={UsersIndex}/>
        <ProtectedRoute path="/clients" component={ClientsIndex}/>
        <ProtectedRoute path="/budgets/templates" component={BudgetBuilderIndex}/>
        <ProtectedRoute path="/forms/templates" component={FormsBuilderIndex}/>
        <ProtectedRoute path='/budgets' component={BudgetsIndex} />
        <ProtectedRoute path="/procedures" component={ProceduresIndex}/>
        <ProtectedRoute path="/appointments" component={AppointmentsIndex}/>
        <ProtectedRoute path="/reports" component={ReportsIndex}/>
        <ProtectedRoute path="/profile" component={ProfilesIndex}/>
        <Route render={() => <DashboardsIndex/>}/>
      </Switch>
    </div>
  )
}
