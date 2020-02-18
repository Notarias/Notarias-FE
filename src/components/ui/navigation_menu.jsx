import React, { Component } from 'react';
import Drawer               from '@material-ui/core/Drawer';
import Divider              from '@material-ui/core/Divider';
import List                 from '@material-ui/core/List';
import withStyles           from '@material-ui/core/styles/withStyles';
import classNames           from 'classnames';
import { styles }           from './navigation_menu_styles';
import MenuLink             from './menu_link'
import ProfileLink          from './profile_link'

import ReportsIcon          from './../../icons/reportes.svg';
import ClientsIcon          from './../../icons/CLIENTES.svg';
import BudgetsIcon          from './../../icons/presupuestos.svg';
import FormsIcon            from './../../icons/tramites.svg';
import AppointmentsIcon     from './../../icons/calendario.svg';
import UsersIcon            from './../../icons/usuarios.svg';
import BudgetsBuilderIcon   from './../../icons/plantillas_presupuestos.svg';
import FormsBuilderIcon     from './../../icons/plantillas_tramites.svg';

class NavigationMenu extends Component {
  render() {
    const { classes, setOpenMenu, setCloseMenu } = this.props;
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
        <List style={{height: "40%"}}>
          <div>
            <MenuLink iconComponent={ClientsIcon} linkPath="/clients" menuText="Clientes" />
            <MenuLink iconComponent={BudgetsIcon} linkPath="/budgets" menuText="Presupuestos" />
            <MenuLink iconComponent={FormsIcon} linkPath="/forms" menuText="Trámites" />
            <MenuLink iconComponent={AppointmentsIcon} linkPath="/appointments" menuText="Calendario" />
          </div>
        </List>
        <Divider />
          <List style={{height: "60%"}}>
            <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
              <div style={{justifyContent: "normal"}}>              
                <MenuLink iconComponent={UsersIcon} linkPath="/users" menuText="Usuarios" />
                <MenuLink iconComponent={BudgetsBuilderIcon} linkPath="/budgets/templates" menuText="Presupuestos" />
                <MenuLink iconComponent={FormsBuilderIcon} linkPath="/forms/templates" menuText="Trámites" />
                <MenuLink iconComponent={ReportsIcon} linkPath="/reports" menuText="Reportes" />
              </div>
              <div style={{  }}>
                <ProfileLink/>
              </div>
            </div>
          </List>
        </Drawer>
    )
  }
}

export default withStyles(styles)(NavigationMenu)