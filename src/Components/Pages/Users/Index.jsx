import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import API                  from '../../../axiosConfig';
import Table                from '@material-ui/core/Table';
import TableBody            from '@material-ui/core/TableBody';
import TableFooter          from '@material-ui/core/TableFooter';
import TableCell            from '@material-ui/core/TableCell';
import TableHead            from '@material-ui/core/TableHead';
import TableRow             from '@material-ui/core/TableRow';
import Paper                from '@material-ui/core/Paper';
import { styles }           from './styles';
import Button               from '@material-ui/core/Button';
import { Link }             from 'react-router-dom';
import Grid                 from '@material-ui/core/Grid';
import PersonAddIcon        from '@material-ui/icons/PersonAdd';
import GenericDropdownMenu  from '../../Ui/GenericDropdownMenu';
import TablePagination      from '@material-ui/core/TablePagination';
import update               from 'react-addons-update';
import MenuItem             from '@material-ui/core/MenuItem';

class Users extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      users: [],
      page: 1,
      per: 5,
      pages: 2,
      total_records: 10,
    }
  }

  componentDidMount() {
    this.callServer()
  }

  handleChangeRowsPerPage = (event) => {
    this.callServer(this.state.page, event.target.value)
  };

  ChangePage= (event, page) => {
    this.callServer(page+1)
  };

  callServer(page = this.state.page, per = this.state.per) {
    API.get('/users',{
          params: {
            per,
            page,
          }
        }
    ).then(response => {
      this.setState({
        users: response.data.users,
        page: response.data.meta.page -1,
        per: response.data.meta.per,
        pages: response.data.meta.pages,
        total_records: response.data.meta.total_records
      })
    })
  }

  lockUser(user) {
    API.patch(`/users/${user.id}/lock`)
      .then((response) => {
        let users = this.state.users
        let index = users.findIndex(oldUser => oldUser.id === user.id)
        let updateObj = {}
        updateObj[index] = { $set: response.data.user } 
        this.setState({
          users: update(users, updateObj)
        })
      })
  }

  render() {
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <Grid container  direction="row"  justify="flex-end"  alignItems="flex-end" className={classes.usersTableBarWrapper}>
          <Button component={Link} to="/users/new" variant="contained" color="primary">
            <PersonAddIcon/>
          </Button>
        </Grid>
        <div className={classes.tableWrapper}>
          <Paper >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Apellido</TableCell>
                  <TableCell align="center">Correo</TableCell>
                  <TableCell align="center">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map(n => (
                  <TableRow key={n.id} className={ n.locked_at && classes.lockedUserRow }>
                    <TableCell align="left">
                      {n.first_name}
                    </TableCell>
                    <TableCell align="center">{n.last_name}</TableCell>
                    <TableCell align="center">{n.email}</TableCell>
                    <TableCell align="center">
                      <GenericDropdownMenu user={n} 
                                           dropdownSelectedStyle>
                        <MenuItem key="Editar">
                          Editar
                        </MenuItem>
                        <MenuItem key="Bloquear" onClick={this.lockUser.bind(this)}>
                          Bloquear
                        </MenuItem>
                      </GenericDropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    page={this.state.page}
                    rowsPerPage={parseInt(this.state.per)}
                    pages={this.state.pages}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    onChangePage={this.ChangePage} //ese de change rows per page me suena a que no debe ir por que significa "cuando se cambian las filas por paginakk" eso significa que se ejecuta cuando cambia la cantidad de filas en la tabla y pues eso no nos sirve por que queremos que se triggeree cuando cambias el dropdown del "per" ssiolamente
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    count={this.state.total_records}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Users);