import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import API, { cancelToken } from '../../../axios_config';
import Table                from '@material-ui/core/Table';
import TableBody            from '@material-ui/core/TableBody';
import TableFooter          from '@material-ui/core/TableFooter';
import TableCell            from '@material-ui/core/TableCell';
import TableHead            from '@material-ui/core/TableHead';
import TableRow             from '@material-ui/core/TableRow';
import Paper                from '@material-ui/core/Paper';
import { styles }           from './styles';
import TablePagination      from '@material-ui/core/TablePagination';
import update               from 'react-addons-update';
import CircularProgress     from '@material-ui/core/CircularProgress';
import UsersRows            from './users_rows';
import ControlsBar          from './controls_bar';
import SortHeader           from '../../ui/sort_header';
import { setBreadcrumbsList }                            from '../../interfaces/breadcrumbs_interface';
import { managePaginationAfter } from '../../interfaces/parameter_manager';
import UsersCollection from '../../models/collections/users_collection'

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: null }
]

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usersCollection: new UsersCollection(this)
    }
  }

  submitData(params) {
    this.state.usersCollection.load(params)
  }

  componentDidMount() {
    setBreadcrumbsList(BREADCRUMBS)
    this.submitData()
  }

  componentWillUnmount() {
    this.cancelCall()
  }

  cancelCall() {
    this.state.usersCollection.cancelLoad()
  }

  changeRowsPerPage = (event) => {
    let per = event.target.value
    this.submitData({ per })
  };

  changePage = (event, page) => {
    this.submitData({ page })
  };

  lockUser(user) {
    API.patch(`/users/${user.id}/lock`, { cancelToken: cancelToken.token })
      .then((response) => { this.updateUserInList(response, user) })
  }

  unlockUser(user) {
    API.patch(`/users/${user.id}/unlock`, { cancelToken: cancelToken.token })
      .then((response) => { this.updateUserInList(response, user) })
  }

  updateUserInList(response, user) {
    let users = this.state.users
    let index = users.findIndex(oldUser => oldUser.id === user.id)
    let updateObj = {}
    updateObj[index] = { $set: response.data.user }
    this.setState({ users: update(users, updateObj) })
  }

  onChangeSearch(event) {
    this.state.usersCollection.search(event)
  }

  render() {
    const { classes } = this.props
    const { field, direction } = this.state.usersCollection.sort
    const callServer = this.state.usersCollection.load.bind(this.state.usersCollection)
    return(
      <div className={classes.root}>
        <ControlsBar
          classes={classes}
          searchLoading={this.state.usersCollection.searchLoading}
          onChangeSearch={this.onChangeSearch.bind(this)}/>
        <div className={classes.tableWrapper}>
          <Paper >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <SortHeader
                    text={"Nombre"}
                    field_property={"first_name"}
                    current_field={field}
                    sort_direction={direction}
                    callback={callServer}
                  />
                  <SortHeader
                    text={"Apellido"}
                    field_property={"last_name"}
                    current_field={field}
                    sort_direction={direction}
                    callback={callServer}
                  />
                  <SortHeader
                    text={"Correo"}
                    field_property={"email"}
                    current_field={field}
                    sort_direction={direction}
                    callback={callServer}
                  />
                  <SortHeader
                    text={"Roles"}
                    field_property={"role"}
                    current_field={field}
                    sort_direction={direction}
                    callback={callServer}
                  />
                  <TableCell align="center">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { this.state.usersCollection.loading ? 
                  <TableRow>
                    <TableCell align="center" colSpan={4} className={classes.loadingTableCell}>
                      <CircularProgress className={classes.searchLoadingIcon} size={100}/>
                    </TableCell>
                  </TableRow> :
                  <UsersRows
                    users={this.state.usersCollection.users}
                    lockUser={this.lockUser.bind(this)}
                    unlockUser={this.unlockUser.bind(this)}
                  />
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    page={this.state.usersCollection.pagination.page}
                    rowsPerPage={this.state.usersCollection.pagination.per}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    onChangePage={this.changePage}
                    onChangeRowsPerPage={this.changeRowsPerPage}
                    count={this.state.usersCollection.pagination.total_records}
                    labelRowsPerPage={"Filas por página:"}
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