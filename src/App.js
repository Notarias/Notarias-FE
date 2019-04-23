import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { withRouter }       from 'react-router-dom';
import BaseRoutes           from './Routes/BaseRoutes';
import { signIn }           from './Components/Reducers/SessionTokenReducer';
import CssBaseline          from '@material-ui/core/CssBaseline';
import { styles }           from './AppStyles';
import withStyles           from '@material-ui/core/styles/withStyles';
import classNames           from 'classnames';
import compose              from 'recompose/compose';
import NavigationBar        from './Components/Ui/NavigationBar';

import './App.css';
import 'typeface-roboto';

class App extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  openMenu() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.root, "App")}>
        {localStorage.jwtToken ? <NavigationBar open={ this.state.open } openMenu={this.openMenu.bind(this)}/> : null}
        <CssBaseline />
        <div className={classes.content}>
          <BaseRoutes/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = props => {
  return props
}

const mapDispatchToProps = dispatch => ({
  signIn: payload => dispatch(signIn(payload))
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(App));
