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
import Drawer               from '@material-ui/core/Drawer';
import Divider              from '@material-ui/core/Divider';
import List                 from '@material-ui/core/List';
import withStyles           from '@material-ui/core/styles/withStyles';
import classNames           from 'classnames';

import { styles } from './NavigationMenuStyles';

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
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Integrations" />
            </ListItem>
          </div>
        </List>
        <Divider />
        <List>
          <div>
            <ListSubheader inset>Saved reports</ListSubheader>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Current month" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Last quarter" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Year-end sale" />
            </ListItem>
          </div>
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(NavigationMenu)