import React, { useState, Component }     from 'react';
import { Redirect }             from 'react-router-dom';
import Drawer                   from '@material-ui/core/Drawer';
import Divider                  from '@material-ui/core/Divider';
import List                     from '@material-ui/core/List';
import withStyles               from '@material-ui/core/styles/withStyles';
import Collapse                 from '@material-ui/core/Collapse';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ExitToAppIcon            from '@material-ui/icons/ExitToApp';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemIcon             from '@material-ui/core/ListItemIcon';
import ListItemText             from '@material-ui/core/ListItemText';
import ExpandLess               from '@material-ui/icons/ExpandLess';
import ExpandMore               from '@material-ui/icons/ExpandMore';
import ContactsSharpIcon        from '@material-ui/icons/ContactsSharp';
import TimelineIcon             from '@material-ui/icons/Timeline';
import HomeIcon                 from '@material-ui/icons/Home';
import classNames               from 'classnames';
import { styles }               from './navigation_menu_styles';
import MenuLink                 from './menu_link'
import ProfileLink              from './profile_link'

import ReportsIcon              from './../../icons/reportes.svg';
import ClientsIcon              from './../../icons/CLIENTES.svg';
import BudgetsIcon              from './../../icons/presupuestos.svg';
import FormsIcon                from './../../icons/tramites.svg';
import AppointmentsIcon         from './../../icons/calendario.svg';
import UsersIcon                from './../../icons/usuarios.svg';
import BudgetsBuilderIcon       from './../../icons/plantillas_presupuestos.svg';
import FormsBuilderIcon         from './../../icons/plantillas_tramites.svg';


class NavigationMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      configMenuOpen: false
    }
  }

  handleConfigMenuSwitch() {
    this.setState({
      configMenuOpen: !this.state.configMenuOpen
    })
  }

  
  render() {
    const { classes, setOpenMenu, setCloseMenu, setLogOut } = this.props;

    return(
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
        }}
        open={this.props.open}
        onMouseMove={setOpenMenu}
        onMouseLeave={setCloseMenu}
      >
        <List>
          <ProfileLink/>
          <Divider />
          <MenuLink iconComponent={HomeIcon} linkPath="/" menuText="Inicio" rawIcon />
          <MenuLink iconComponent={ClientsIcon} linkPath="/clients" menuText="Clientes" />
          <MenuLink iconComponent={BudgetsIcon} linkPath="/budgets" menuText="Presupuestos" />
          <MenuLink iconComponent={FormsIcon} linkPath="/procedures" menuText="Trámites" />
          <MenuLink iconComponent={AppointmentsIcon} linkPath="/appointments" menuText="Calendario" />
          <MenuLink rawIcon iconComponent={TimelineIcon} linkPath="/statistics" menuText="Estadísticas" />
        </List>
        <Divider />
        <ListItem button onClick={this.handleConfigMenuSwitch.bind(this)}>
          <ListItemIcon>
            <SettingsApplicationsIcon />
          </ListItemIcon>
          <ListItemText primary="Configuración" />
          {this.state.configMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.configMenuOpen} timeout="auto" unmountOnExit>
          <List>
            <MenuLink nested={true} iconComponent={UsersIcon} linkPath="/users" menuText="Usuarios" />
            <MenuLink nested={true} iconComponent={BudgetsBuilderIcon} linkPath="/config/budget_templates" menuText="Presupuestos" />
            <MenuLink nested={true} iconComponent={FormsBuilderIcon} linkPath="/config/procedure_templates" menuText="Trámites" />
            <MenuLink nested={true} iconComponent={ReportsIcon} linkPath="/reports" menuText="Reportes" />
            <MenuLink nested={true} rawIcon iconComponent={ContactsSharpIcon} linkPath="/config/clients" menuText="Clientes" />
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={setLogOut}>
          <ListItemIcon>
            <ExitToAppIcon color='secondary' />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItem>
        <Redirect to={{ pathname: "/sign_in" }} />
      </Drawer>
    )
  }
}

export default withStyles(styles)(NavigationMenu)
