import React, { useState } from 'react';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { Mutation } from "@apollo/react-components";
import { REMOVE_MESSAGE_MUTATION } from '../../resolvers/queries'
import { GLOBAL_MESSAGE }          from '../../resolvers/queries';
import client                      from '../../apollo'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
    flexFlow: "row"
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    width: "100%",
    flexFlow: "row"
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
    flexFlow: "row"
  },
  warning: {
    backgroundColor: amber[700],
    flexFlow: "row"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  action: {
    paddingLeft: 0,
  }
});

function CustomSnackbarMessage(props) {
  const { actionable, classes, className, message, variant, autohide, ...other } = props;
  const Icon = variantIcon[variant];
  const [hidden, setHidden] = useState(false); 

  if (autohide) {
    setTimeout(() => {
      client.writeQuery(
        {
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: null,
              type: null,
              __typename: "globalMessage"
            }
          }
        }
      )
      setHidden(true)
    }, 3000)
  }

  return (
    !hidden &&
        <SnackbarContent
          classes={{ action: classes.action }}
          className={classNames(classes[variant], className)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={actionable && [
            <Mutation mutation={REMOVE_MESSAGE_MUTATION} variables={{}}>
              { (mutate) => {
                  return(
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={mutate}
                    >
                      <CloseIcon className={classes.icon} />
                    </IconButton>
                  )
                }
              }
            </Mutation>
          ]}
          {...other}
        />
  );
}

export default withStyles(styles1)(CustomSnackbarMessage);
