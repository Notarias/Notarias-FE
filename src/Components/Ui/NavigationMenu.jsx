import React, { Component } from 'react';
import ListSubheader        from '@material-ui/core/ListSubheader';
import ListItem             from '@material-ui/core/ListItem';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import ListItemText         from '@material-ui/core/ListItemText';
import DashboardIcon        from '@material-ui/icons/Dashboard';
import ShoppingCartIcon     from '@material-ui/icons/ShoppingCart';
import PeopleIcon           from '@material-ui/icons/People';
import BarChartIcon         from '@material-ui/icons/BarChart';
import LayersIcon           from '@material-ui/icons/Layers';
import AssignmentIcon       from '@material-ui/icons/Assignment';
import Users                 from './../../icons/usuarios.svg';
import Drawer               from '@material-ui/core/Drawer';
import Divider              from '@material-ui/core/Divider';
import List                 from '@material-ui/core/List';
import withStyles           from '@material-ui/core/styles/withStyles';
import classNames           from 'classnames';
import { Link }             from 'react-router-dom';
import { styles }           from './NavigationMenuStyles';
import Clients              from './../../icons/CLIENTES.svg';
import Budgets              from './../../icons/presupuestos.svg';
import Procedures           from './../../icons/tramites.svg';
import Appointments         from './../../icons/calendario.svg';
import Reports              from './../../icons/reportes.svg';
import Avatar               from '@material-ui/core/Avatar';
import Grid                 from '@material-ui/core/Grid';

class NavigationMenu extends Component {
  render() {
    const { classes, setOpenMenu, setCloseMenu} = this.props;
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
        <Divider />
        <List>
          <div>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <Link to="/clients" style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <img src={Clients}  className={classes.iconMenu}/>
                 </ListItemIcon>
                <ListItemText primary="Clientes" />
              </ListItem>
            </Link>
            <Link to="/budgets" style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <img src={Budgets}  className={classes.iconMenu}/>
                 </ListItemIcon>
                <ListItemText primary="Presupuestos" />
              </ListItem>
            </Link>
            <Link to="/procedures" style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <img src={Procedures}  className={classes.iconMenu}/>
                 </ListItemIcon>
                <ListItemText primary="Trámites" />
              </ListItem>
            </Link>
            <Link to="/appointments" style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <img src={Appointments}  className={classes.iconMenu}/>
                 </ListItemIcon>
                <ListItemText primary="Calendario" />
              </ListItem>
            </Link>
          </div>
        </List>
        <Divider />
          <List>
            <div>
              <Link to="/users" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>
                    <img src={Users}  className={classes.iconMenu}/>
                  </ListItemIcon>
                  <ListItemText primary="Usuarios" />
                </ListItem>
              </Link>
              <Link to="/reports" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>
                    <img src={Reports}  className={classes.iconMenu}/>
                  </ListItemIcon>
                <ListItemText primary="Reportes" />
              </ListItem>
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none', position: 'relative', top: '180px'}}>
              <ListItem button>
                <ListItemIcon >
                    <Grid>
                      <Avatar src="" className={classes.avatar} />
                    </Grid>
                  </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItem>
            </Link>
          </div>
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(NavigationMenu)