import React                          from 'react';
import { Switch, Route }              from 'react-router-dom';

import SessionsNew                    from '../components/pages/sessions/new';
import ProtectedRoute                 from './protected_route';

import DashboardsIndex                from '../components/pages/dashboards/index';
import UsersIndex                     from '../components/pages/users/index';
import UsersNew                       from '../components/pages/users/new';
import UsersEdit                      from '../components/pages/users/edit';
import clientsNew                     from '../components/pages/clients/new';
import ClientsShow                    from '../components/pages/clients/show';
import ClientsEdit                    from '../components/pages/clients/edit';
import ClientsIndex                   from '../components/pages/clients/index';
import BudgetBuilderIndex             from '../components/pages/budget_builders/index';

import BudgetsIndex                   from '../components/pages/budgets/index';
import ProceduresIndex                from '../components/pages/procedures/index';
import AppointmentsIndex              from '../components/pages/appointments/index';
import ReportsIndex                   from '../components/pages/reports/index';
import ProfilesIndex                  from '../components/pages/profiles/index';
import ConfigClientsIndex             from '../components/pages/config/clients/index';
import ConfigProcedureTemplatesIndex  from '../components/pages/config/procedure_templates/index';
import GlobalMessage                  from './global_message';

export default function BaseRoutes(props) {
  const { styles } = props

  return(
    <div style={{ height: "100%" }}>
      <GlobalMessage classes={styles}/>
      <Switch>
        { !localStorage.jwtToken &&
          (<Route path="/sign_in" component={SessionsNew}/>)
        }
        <ProtectedRoute path='/users/:id/edit' component={UsersEdit}/>
        <ProtectedRoute path='/users/new' component={UsersNew}/>
        <ProtectedRoute path='/users' component={UsersIndex}/>
        <ProtectedRoute path='/clients/:id/edit' component={ClientsEdit}/>
        <ProtectedRoute path='/clients/new' component={clientsNew}/>
        <ProtectedRoute path='/clients/:id' component={ClientsShow}/> 
        <ProtectedRoute path="/clients" component={ClientsIndex}/>
        <ProtectedRoute path="/budgets/templates" component={BudgetBuilderIndex}/>

        <ProtectedRoute path='/budgets' component={BudgetsIndex} />
        <ProtectedRoute path="/procedures" component={ProceduresIndex}/>
        <ProtectedRoute path="/appointments" component={AppointmentsIndex}/>
        <ProtectedRoute path="/reports" component={ReportsIndex}/>
        <ProtectedRoute path="/profiles" component={ProfilesIndex}/>
        <ProtectedRoute path="/config/clients" component={ConfigClientsIndex}/>
        <ProtectedRoute path="/config/procedure_templates" component={ConfigProcedureTemplatesIndex}/>
        <Route render={() => <DashboardsIndex/>}/>
      </Switch>
    </div>
  )
}

