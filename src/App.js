import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router-dom';
import BaseRoutes           from './Routes/BaseRoutes';
import CssBaseline          from '@material-ui/core/CssBaseline';
import { styles }           from './AppStyles';
import withStyles           from '@material-ui/core/styles/withStyles';
import classNames           from 'classnames';
import compose              from 'recompose/compose';
import NavigationMenu       from './Components/Ui/NavigationMenu';
import CustomSnackbarMessage  from './Components/Ui/CustomSnackbarMessage';
import { clearMessage }       from './Components/Interfaces/MessagesSi';
import LoadingTopBar          from './Components/Ui/LoadingTopBar';
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
    const { classes, message, loading } = this.props;
    return (
      <div className={classNames(classes.root, "App")}>
        { localStorage.jwtToken ? <NavigationMenu
          shiftMenu={ this.shiftMenu.bind(this) }
          open={ this.state.open }
          setOpenMenu={ this.setOpenMenu.bind(this) }
          setCloseMenu={ this.setCloseMenu.bind(this) }
          /> : null }
        <CssBaseline />

        <main className={classes.content}>
          { loading && <LoadingTopBar/> }
          { message && <CustomSnackbarMessage
            variant={ message.type }
            className={ classes.floatingMessage }
            message={ message.text }
            actionable={ true }
            onClose={ clearMessage }
          /> }
          <BaseRoutes styles={classes}/>
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
