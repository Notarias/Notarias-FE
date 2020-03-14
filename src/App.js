import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router-dom';
import BaseRoutes           from './routes/base_routes';
import CssBaseline          from '@material-ui/core/CssBaseline';
import { styles }           from './AppStyles';
import withStyles           from '@material-ui/core/styles/withStyles';
import classNames           from 'classnames';
import compose              from 'recompose/compose';
import NavigationMenu       from './components/ui/navigation_menu';
import CustomSnackbarMessage  from './components/ui/custom_snackbar_message';
import { clearMessage }       from './components/interfaces/messages_interface';
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

  render() {
    const { classes, message } = this.props;
    return (
      <div className={classNames(classes.root, "App")}>
        { localStorage.jwtToken && 
          <NavigationMenu
            shiftMenu={ this.shiftMenu.bind(this) }
            open={ this.state.open }
            setOpenMenu={ this.setOpenMenu.bind(this) }
            setCloseMenu={ this.setCloseMenu.bind(this) }
          /> }
        <CssBaseline />

        <main className={classes.content}>
          <BaseRoutes styles={classes}>
            { message && <CustomSnackbarMessage
              variant={ message.type }
              className={ classes.floatingMessage }
              message={ message.text }
              actionable={ true }
              onClose={ clearMessage }
            /> }
          </BaseRoutes>
        </main>
      </div>
    );
  }
}

const mapStateToProps = props => {
  return props
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(withRouter(App));
