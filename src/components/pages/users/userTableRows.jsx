import React, { Component } from 'react'
import TableCell            from '@material-ui/core/TableCell';
import TableRow             from '@material-ui/core/TableRow';
import MenuItem             from '@material-ui/core/MenuItem';
import { UPDATE_USER }      from './queries_and_mutations/queries';
import { Mutation }         from '@apollo/react-components';
import Button               from '@material-ui/core/Button';
import { styles }           from './styles';
import { withStyles }       from '@material-ui/core/styles';
import IconButton           from '@material-ui/core/IconButton';
import Menu                 from '@material-ui/core/Menu';
import MoreVertIcon         from '@material-ui/icons/MoreVert';
import { Link }             from 'react-router-dom';

class  UserTableRows extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locked: props.user.lockedAt,
      anchorEl: ""
    }
  }

  // [createCreditPaymentMutation, createCreditPaymentProcessInfo] =
  // useMutation(
  //   CREATE_CREDIT_PAYMENT,
  //   {
  //     onError(apolloError) {
  //       setErrors(apolloError)
  //       setPristine(false)
  //     },
  //     onCompleted(cacheData) {
  //       setOpen(false);
  //     },
  //     refetchQueries: [
  //       {
  //         query: GET_BUDGET,
  //           variables: {"id": match.params.id }
  //       },
  //       {
  //         query: GET_BUDGET_TOTALS,
  //           variables: {"id": match.params.id }
  //       },
  //       {
  //         query: GET_CREDIT_PAYMENTS,
  //           variables: { "budgetId": match.params.id }
  //       },
  //       {
  //         query: GET_BUDGETS_AUDITLOG,  
  //           variables: {"budgetId": match.params.id}
  //       }
  //     ],
  //     awaitRefetchQueries: true
  //   }
  // )

  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  newUser = (user) => {
  }
  setUserRole = (user) => {
    if (user.role) {
      return user.role.name
    } else {
      return "N/A" 
    }
  }

  onCompletedLockUnlock(data) {
    this.setState({ locked: data.updateUser.user.lockedAt })
  }

  render () {
    const {anchorEl} = this.state
    const {user, classes} = this.props;
    const open = Boolean(anchorEl);
    return( 
      <TableRow key={user.id} className={ this.state.locked && classes.lockedUserRow }>
        <TableCell align="center">{user.firstName}</TableCell>
        <TableCell align="center">{user.lastName}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{this.setUserRole(user)}</TableCell>
        <TableCell align="center">
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              keepMounted
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
            >
              {this.state.locked ?
                <MenuItem key={`${user.id}-lock`} >
                  <Mutation
                    mutation={UPDATE_USER}
                    onCompleted={this.onCompletedLockUnlock.bind(this)}
                    >
                    {
                      (mutation, { data }) => (
                          <Button
                          classes={{ root: classes.buttonMaxwidth }}
                          key="Bloquear"
                          onClick={ () => {
                            mutation({
                              variables: { id: user.id, locked: false }
                            })
                          }}
                          >
                            Desbloquear
                          </Button>
                        )
                    }
                  </Mutation>
                </MenuItem> :
                <MenuItem  key={`${user.id}-unlock`} >
                  <Mutation
                    mutation={UPDATE_USER}
                    onCompleted={this.onCompletedLockUnlock.bind(this)}
                  >
                    {
                      (mutation, { data }) => (
                        <Button
                        classes={{ root: classes.buttonMaxwidth }}
                        width={"100%"}
                        key="Desbloquear"
                        disabled
                        onClick={ () => {
                          mutation({
                            variables: { id: user.id, locked: true }
                          })
                        } }
                        >
                          Bloquear
                        </Button>
                      )
                    }
                  </Mutation>
                </MenuItem>
              }
              <MenuItem key={`${user.id}-edit`}>
                <Link to={`users/${user.id}/edit`} align="center" style= {{ width: "100%", textDecoration:"none" }} >
                  <Button >
                        Editar
                  </Button>
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </TableCell>
      </TableRow>
    )
  }
}

export default withStyles(styles)(UserTableRows);
