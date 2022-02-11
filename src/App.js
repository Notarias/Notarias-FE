import React, { Component } from 'react';
import { withRouter }       from 'react-router-dom';
import BaseRoutes           from './routes/base_routes';
import CssBaseline          from '@material-ui/core/CssBaseline';
import { styles }           from './AppStyles';
import withStyles           from '@material-ui/core/styles/withStyles';
import classNames           from 'classnames';
import compose              from 'recompose/compose';
import NavigationMenu       from './components/ui/navigation_menu';
import './App.css';
import 'typeface-roboto';

class App extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  shiftMenu() {
    this.setState({ open: !this.state.open });
  }

  setOpenMenu() {
    if(!this.state.open) {
      this.setState({ open: true });
    }
  }

  setCloseMenu() {
    if(this.state.open) {
      this.setState({ open: false });
    }
  }

  setLogOut() {
    localStorage.clear();
    this.forceUpdate()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.root, "App")}>
        { localStorage.jwtToken && 
          <NavigationMenu
            shiftMenu={ this.shiftMenu.bind(this) }
            open={ this.state.open }
            setOpenMenu={ this.setOpenMenu.bind(this) }
            setCloseMenu={ this.setCloseMenu.bind(this) }
            setLogOut={ this.setLogOut.bind(this)}
          /> }
        <CssBaseline />
        <main className={classes.content}>
          <BaseRoutes styles={classes}/>
        </main>
      </div>
    );
  }
}

export default compose(
  withStyles(styles)
)(withRouter(App));
