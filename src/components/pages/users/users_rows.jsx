import React, { Component } from 'react'
import TableCell            from '@material-ui/core/TableCell';
import TableRow             from '@material-ui/core/TableRow';
import GenericDropdownMenu  from '../../ui/generic_dropdown_menu';
import MenuItem             from '@material-ui/core/MenuItem';
import { withStyles }       from '@material-ui/core/styles';
import { styles }           from './styles';
import Typography           from '@material-ui/core/Typography';
import { Link }             from 'react-router-dom';

class UsersRows extends Component {
  constructor() {
    super()
    this.state = { users: [] }
  }

  usersRows() {
    const { users, lockUser, unlockUser, classes } = this.props;
    return(
      users.map(user => (
        <TableRow key={user.id} className={ user.locked_at && classes.lockedUserRow }>
          <TableCell align="left">
            {user.first_name}
          </TableCell>
          <TableCell align="center">{user.last_name}</TableCell>
          <TableCell align="center">{user.email}</TableCell>
          <TableCell align="center">
            <GenericDropdownMenu user={user} 
                                dropdownSelectedStyle>
              <Link key="Editar" to={`/users/${user.id}/edit`} style={{ textDecoration: 'none' }}>
                <MenuItem>
                  Editar
                </MenuItem>
              </Link>
              { user.locked_at ?
                  <MenuItem key="Bloquear" onClick={unlockUser}>
                    Desbloquear
                  </MenuItem> :
                  <MenuItem key="Bloquear" onClick={lockUser}>
                    Bloquear
                  </MenuItem>
              }
            </GenericDropdownMenu>
          </TableCell>
        </TableRow>
      ))
    )
  }

  emptyTable() {
    const { classes } = this.props;
    return(
      <TableRow>
        <TableCell align="center" colspan={4} className={classes.loadingTableCell}>
          <Typography variant="h4" gutterBottom>
            Nada que mostrar...
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Si usaste la búsqueda, intenta con otros valores.
          </Typography>
        </TableCell>
      </TableRow>
    )
  }

  render() {
    const { users } = this.props;
    return(
      users.length ? this.usersRows() : this.emptyTable()
    )
  }
}

export default withStyles(styles)(UsersRows);