import React, { Component }       from 'react';
import PropTypes                  from 'prop-types';
import { withRouter }             from 'react-router-dom'
import compose                    from 'recompose/compose';
import CustomSnackbarMessage      from '../../ui/custom_snackbar_message';
import { setBreadcrumbsList }     from '../../interfaces/breadcrumbs_interface';

import { styles }  from './session_styles';
import SessionForm from './session_form';

import Avatar           from '@material-ui/core/Avatar';
import logo_notaria   from './../../../images/logo_notaria.JPG'
import Paper            from '@material-ui/core/Paper';
import withStyles       from '@material-ui/core/styles/withStyles';

class SessionsNew extends Component {
  constructor() {
    super()
    this.state = {
      errorMessage: null
    }
  }

  componentDidMount() {
    setBreadcrumbsList([])
  }

  signOut() {
    localStorage.clear('jwtToken');
  }

  setError(error) {
    this.setState({ errorMessage: error })
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          {this.state.errorMessage && <CustomSnackbarMessage
            key="snackbar"
            variant="error"
            className={classes.margin}
            message={this.state.errorMessage}
            actionable={false}
            autohide={false}
          />}
          <Avatar className={classes.avatar}>
            <img className={classes.logo} src={logo_notaria} alt="Logo"/>
          </Avatar>
          <SessionForm classes={classes} history={this.props.history} setError={this.setError.bind(this)} />
        </Paper>
      </main>
    )
  }
}

SessionsNew.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
)(withRouter(SessionsNew))
