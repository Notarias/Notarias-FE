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
import PersonIcon           from '@material-ui/icons/Person';
import Drawer               from '@material-ui/core/Drawer';
import Divider              from '@material-ui/core/Divider';
import List                 from '@material-ui/core/List';
import withStyles           from '@material-ui/core/styles/withStyles';
import classNames           from 'classnames';
import { Link }             from 'react-router-dom';
import { styles }           from './NavigationMenuStyles';
import Clients              from './../../icons/CLIENTES.svg';
import Procedures           from './../../icons/tramites.svg';
import Appointments         from './../../icons/calendario.svg';

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
            <Link to="/users" style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
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
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(NavigationMenu)