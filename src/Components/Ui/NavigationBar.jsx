import React, { Component } from 'react';
import AppBar               from '@material-ui/core/AppBar';
import Toolbar              from '@material-ui/core/Toolbar';
import Typography           from '@material-ui/core/Typography';
import IconButton           from '@material-ui/core/IconButton';
import MenuIcon             from '@material-ui/icons/Menu';
import Badge                from '@material-ui/core/Badge';
import NotificationsIcon    from '@material-ui/icons/Notifications';
import withStyles           from '@material-ui/core/styles/withStyles';
import classNames           from 'classnames';
import { styles }           from './NavigationBarStyles'

class NavigationBar extends Component {
  render() {
    const { classes, shiftMenu } = this.props;
    return(
      <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.props.open && classes.appBarShift)}
        >
        <Toolbar disableGutters={!this.props.open} className={classes.toolbar}>
          <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={shiftMenu}
              className={classes.menuButton}
            >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >Dashboard</Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(NavigationBar)