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
import CustomSnackbarMessage          from './Components/Ui/CustomSnackbarMessage';
import { clearMessage, setMessage }   from './Components/Reducers/MessagesReducer';
import LoadingTopBar from './Components/Ui/LoadingTopBar';
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

  closeMessage() {
    this.props.clearMessage()
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
            onClose={ this.closeMessage.bind(this) }
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

const mapDispatchToProps = dispatch => ({
  clearMessage: () => dispatch(clearMessage()),
  setMessage: payload => dispatch(setMessage(payload)),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(App));
