import React, { useEffect, useState }            from 'react';
import { Switch, Route }              from 'react-router-dom';

import SessionsNew                    from '../components/pages/sessions/new';
import ProtectedRoute                 from './protected_route';

import DashboardsIndex                from '../components/pages/dashboards/index';
import UsersIndex                     from '../components/pages/users/index';
import UsersNew                       from '../components/pages/users/new';
import UsersEdit                      from '../components/pages/users/edit';
import clientsNew                     from '../components/pages/clients/new';
import ClientsEdit                    from '../components/pages/clients/edit';
import ClientsIndex                   from '../components/pages/clients/index';
import BudgetBuilderIndex             from '../components/pages/budget_builders/index';
import BudgetInvoice                  from '../components/pages/budgets/edit/budget_invoice/budget_invoice';
import BudgetsEdit                    from '../components/pages/budgets/edit';
import budgetsNew                     from '../components/pages/budgets/new'
import BudgetsIndex                   from '../components/pages/budgets/index';
import ProcedureEdit                  from '../components/pages/procedures/edit';
import ProcedureNew                   from '../components/pages/procedures/new';
import ProceduresIndex                from '../components/pages/procedures/index';
import AppointmentsIndex              from '../components/pages/appointments/index';
import ReportsIndex                   from '../components/pages/reports/index';
import ProfilesIndex                  from '../components/pages/profiles/index';
import StatisticsIndex                from '../components/pages/statistics/index';
import ConfigRolesIndex               from '../components/pages/config/roles/index';
import ConfigRoleEdit                 from '../components/pages/config/roles/edit/edit';
import ConfigPermissionsIndex         from '../components/pages/config/permissions/index'
import ConfigClientsIndex             from '../components/pages/config/clients/index';
import ConfigBudgetsTemplatesIndex    from '../components/pages/config/budget_templates/index';
import ConfigBudgetsTemplatesEdit     from '../components/pages/config/budget_templates/edit';
import ConfigProcedureTemplatesIndex  from '../components/pages/config/procedure_templates/index';
import ConfigProcedureTemplatesEdit   from '../components/pages/config/procedure_templates/edit';
import GlobalMessage                  from './global_message';
import { GET_CURRENT_USER }           from '../resolvers/queries';
import { useQuery }                   from '@apollo/client';

export default function BaseRoutes(props) {
  const { styles } = props
  const [permissionsPermanentLinks, setPermissionsPermanentLinks] = useState([])
  const [currentUser, setCurrentUser] = useState()

  const { data } = useQuery(GET_CURRENT_USER)

  useEffect(() => {
    if(data) {
      setCurrentUser(data.currentUser)
    }
  }, [data])

  useEffect(() => {
    if(currentUser && currentUser.permissions) {
      setPermissionsPermanentLinks(currentUser.permissions.map((permission) => {
        return permission.permanentLink
      }))
    }
  }, [currentUser])

  const withPermission = (permission) => {
    if (currentUser && currentUser.permissions) {
      return permissionsPermanentLinks.includes(permission)
    }
  }

  const loadRoutes = () => {
    let routes = []
    if(withPermission('clientes')) {
      routes.push(<ProtectedRoute path='/clients/:id/edit' currentUser={currentUser} component={ClientsEdit} permission='clientes'/>)
      routes.push(<ProtectedRoute path='/clients/new' currentUser={currentUser} component={clientsNew} permission='clientes'/>)
      routes.push(<ProtectedRoute path="/clients" currentUser={currentUser} component={ClientsIndex} permission='clientes'/>)
    }
    if(withPermission('presupuestos')) {
      routes.push(<ProtectedRoute path="/budgets/templates" currentUser={currentUser} component={BudgetBuilderIndex} permission='presupuestos'/>)
      routes.push(<ProtectedRoute path='/budgets/:id/invoice' currentUser={currentUser} component={BudgetInvoice} permission='presupuestos'/>)
      routes.push(<ProtectedRoute path='/budgets/:id/edit' currentUser={currentUser} component={BudgetsEdit} permission='presupuestos'/>)
      routes.push(<ProtectedRoute path='/budgets/new' currentUser={currentUser} component={budgetsNew} permission='presupuestos'/>)
      routes.push(<ProtectedRoute path='/budgets' currentUser={currentUser} component={BudgetsIndex} permission='presupuestos'/>)
    }
    if(withPermission('config')) {
      routes.push(<ProtectedRoute path='/users/:id/edit' currentUser={currentUser} component={UsersEdit} permission='config'/>)
      routes.push(<ProtectedRoute path='/users/new' currentUser={currentUser} component={UsersNew} permission='config'/>)
      routes.push(<ProtectedRoute path='/users' currentUser={currentUser} component={UsersIndex} permission='config'/>)
      routes.push(<ProtectedRoute path='/procedures/:id/edit' currentUser={currentUser} component={ProcedureEdit} permission='tramites'/>)
      routes.push(<ProtectedRoute path="/procedures/new" currentUser={currentUser} component={ProcedureNew} permission='tramites'/>)
      routes.push(<ProtectedRoute path="/procedures" currentUser={currentUser} component={ProceduresIndex} permission='tramites'/>)
      routes.push(<ProtectedRoute path="/config/roles/:id/permissions" currentUser={currentUser} component={ConfigRoleEdit} permission='config'/>)
      routes.push(<ProtectedRoute path="/config/roles" currentUser={currentUser} component={ConfigRolesIndex} permission='config'/>)
      routes.push(<ProtectedRoute path="/config/permissions" currentUser={currentUser} component={ConfigPermissionsIndex} permission='config'/>)
      routes.push(<ProtectedRoute path="/config/clients" currentUser={currentUser} component={ConfigClientsIndex} permission='config'/>)
      routes.push(<ProtectedRoute path="/config/procedure_templates/:id/edit" currentUser={currentUser} component={ConfigProcedureTemplatesEdit} permission='config'/>)
      routes.push(<ProtectedRoute path="/config/procedure_templates" currentUser={currentUser} component={ConfigProcedureTemplatesIndex} permission='config'/>)
      routes.push(<ProtectedRoute path="/config/budget_templates/:id/edit" currentUser={currentUser} component={ConfigBudgetsTemplatesEdit} permission='config'/>)
      routes.push(<ProtectedRoute path="/config/budget_templates" currentUser={currentUser} component={ConfigBudgetsTemplatesIndex} permission='config'/>)
    }
    return(routes)
  }

  console.log(currentUser)
  return(
    <div style={{ minHeight: "100vh" }}>
      <GlobalMessage classes={styles}/>
      <Switch>
        { !localStorage.jwtToken &&
          (<Route path="/sign_in" component={SessionsNew}/>)
        }
        { loadRoutes() }
        { withPermission('citas') && <ProtectedRoute path="/appointments" currentUser={currentUser} component={AppointmentsIndex} permission='citas'/> }
        { withPermission('estadisticas') && <ProtectedRoute path="/statistics" currentUser={currentUser} component={StatisticsIndex} permission='estadisticas'/> }
        <ProtectedRoute path="/profiles" currentUser={currentUser} component={ProfilesIndex}/>
        <ProtectedRoute path='*' component={DashboardsIndex} />
        <Route render={() => <ProtectedRoute path='/' component={DashboardsIndex}/>}/>
      </Switch>
    </div>
  )
}

