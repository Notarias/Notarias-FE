import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import Table                from '@material-ui/core/Table';
import TableBody            from '@material-ui/core/TableBody';
import TableFooter          from '@material-ui/core/TableFooter';
import TableCell            from '@material-ui/core/TableCell';
import TableHead            from '@material-ui/core/TableHead';
import TableRow             from '@material-ui/core/TableRow';
import Paper                from '@material-ui/core/Paper';
import { styles }           from './styles';
import TablePagination      from '@material-ui/core/TablePagination';
import CircularProgress     from '@material-ui/core/CircularProgress';
import UsersRows            from './users_rows';
import ControlsBar          from './controls_bar';
import SortHeader           from '../../ui/sort_header';
import { setBreadcrumbsList }                            from '../../interfaces/breadcrumbs_interface';
import UsersCollection from '../../models/collections/users_collection'

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: null }
]

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usersCollection: new UsersCollection(),
      searchLoading: false
    }
  }

  submitData(params) {
    this.setState({ loading: true })
    this.state.usersCollection.load(params).then(() => {
      this.setState({ loading: false })
    })
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
  }

  changePage = (event, page) => {
    this.submitData({ page })
  }

  onChangeSearch(event) {
    this.state.timeout && clearTimeout(this.state.timeout)
    let predicate = event.currentTarget.attributes.predicate.value
    let searchText = event.target.value
    const search_params = { search: { [predicate]: searchText } }
    const view = this

    let timeout = setTimeout(() => {
      view.state.usersCollection
        .search(search_params)
        .finally((val) => {
          view.setState({ searchLoading: false })
        })
    }, 2000)

    this.setState({ searchLoading: true, timeout: timeout })
  }

  sort(params) {
    this.submitData(params)
  }

  lockUser(user) {
    user.lock().then((locked_user) => {
      this.forceUpdate()
    })
  }

  unlockUser(user) {
    user.unlock().then((unlocked_user) => {
      this.forceUpdate()
    })
  }

  render() {
    const { classes } = this.props
    const { field, direction } = this.state.usersCollection.sort
    return(
      <div className={classes.root}>
        <ControlsBar
          classes={classes}
          searchLoading={this.state.searchLoading}
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
                    callback={this.sort.bind(this)}
                  />
                  <SortHeader
                    text={"Apellido"}
                    field_property={"last_name"}
                    current_field={field}
                    sort_direction={direction}
                    callback={this.sort.bind(this)}
                  />
                  <SortHeader
                    text={"Correo"}
                    field_property={"email"}
                    current_field={field}
                    sort_direction={direction}
                    callback={this.sort.bind(this)}
                  />
                  <SortHeader
                    text={"Roles"}
                    field_property={"role"}
                    current_field={field}
                    sort_direction={direction}
                    callback={this.sort.bind(this)}
                  />
                  <TableCell align="center">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { this.state.loading ? 
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