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
import TablePagination      from '@material-ui/core/TablePagination';
import update               from 'react-addons-update';
import CircularProgress     from '@material-ui/core/CircularProgress';
import UsersRows            from './UsersRows';
import ControlsBar          from './ControlsBar';
import SortHeader           from './../../Ui/SortHeader';
import { setBreadcrumbsList }                            from './../../Interfaces/BreadcrumbsSi';
import { startLoadingBar, stopLoadingBar }               from './../../Interfaces/StartStopLoading';
import { setParamsInterface }                            from './../../Interfaces/ParameterManager';
import { managePaginationAfter, managePaginationBefore } from './../../Interfaces/ParameterManager';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: null }
]

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      users: [],
      sort_field: "first_name",
      sort_direction: "desc",
      timeout: 0,
      searchLoading: false,
      request_params: {
        page: 0,
        per: 5,
        total_records: 1,
        sort: {
          "first_name": "asc"
        }
      }
    }
  }

  componentDidMount() {
    startLoadingBar()
    setBreadcrumbsList(BREADCRUMBS)
    this.callServer()
  }

  handleChangeRowsPerPage = (event) => {
    let per  = event.target.value
    this.callServer({ per })
  };

  ChangePage = (event, page) => {
    this.callServer({ page  })
  };

  prepareParams = (new_params) => {
    let deliverable_params = Object.assign({}, this.state.request_params)
    setParamsInterface(new_params, deliverable_params)
    managePaginationBefore(deliverable_params)
    return deliverable_params
  }

  callServer(new_params = {}, extra_state_data = {}) {
    this.setState({ loading: true })
    let deliverable_params = this.prepareParams(new_params)
    API.get('/users', { params: deliverable_params }).then(response => {
      let meta = managePaginationAfter(response.data.meta)
      this.setState({
        users: response.data.users,
        searchLoading: false,
        loading: false,
        request_params: {
          page: meta.page,
          per: meta.per,
          total_records: meta.total_records,
          sort: deliverable_params.sort,
          search: deliverable_params.search
        },
        ...extra_state_data
      })
      stopLoadingBar()
    })
  }

  onChangeSearch(event) {
    this.state.timeout && clearTimeout(this.state.timeout)
    let searchText = event.target.value
    const search = { search: { "all_fields.cont": searchText } }
    const callServer = this.callServer.bind(this)
    this.setState({
      searchLoading: true,
      timeout: setTimeout(() => { callServer(search) }, 2000)
    })
    return searchText
  }

  lockUser(user) {
    API.patch(`/users/${user.id}/lock`)
      .then((response) => { this.updateUserInList(response, user) })
  }

  unlockUser(user) {
    API.patch(`/users/${user.id}/unlock`)
      .then((response) => { this.updateUserInList(response, user) })
  }

  updateUserInList(response, user) {
    let users = this.state.users
    let index = users.findIndex(oldUser => oldUser.id === user.id)
    let updateObj = {}
    updateObj[index] = { $set: response.data.user }
    this.setState({ users: update(users, updateObj) })
  }

  render() {
    const { classes } = this.props
    const { sort_field, sort_direction } = this.state
    const callServer = this.callServer.bind(this)
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
                    current_field={sort_field}
                    sort_direction={sort_direction}
                    callback={callServer}
                  />
                  <SortHeader
                    text={"Apellido"}
                    field_property={"last_name"}
                    current_field={sort_field}
                    sort_direction={sort_direction}
                    callback={callServer}
                  />
                  <SortHeader
                    text={"Correo"}
                    field_property={"email"}
                    current_field={sort_field}
                    sort_direction={sort_direction}
                    callback={callServer}
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
                    users={this.state.users}
                    lockUser={this.lockUser.bind(this)}
                    unlockUser={this.unlockUser.bind(this)}
                  />
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    page={this.state.request_params.page}
                    rowsPerPage={this.state.request_params.per}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    onChangePage={this.ChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    count={this.state.request_params.total_records}
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