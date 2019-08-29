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
import TablePagination      from '@material-ui/core/TablePagination';
import update               from 'react-addons-update';
import InputBase            from '@material-ui/core/InputBase';
import SearchIcon           from '@material-ui/icons/Search';
import CircularProgress     from '@material-ui/core/CircularProgress';
import UsersRows            from './UsersRows';
import TableSortLabel       from '@material-ui/core/TableSortLabel';
import store                from '../../../store';
import { setBreadcrumbsList, goToBreadcrumb } from './../../Reducers/BreadcrumbsReducer';

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
      page: 0,
      per: 5,
      pages: 1,
      total_records: 1,
      searchText: "",
      timeout: 0,
      searchLoading: false,
      sort_field: "first_name",
      sort_direction: "desc"
    }
  }

  componentDidMount() {
    this.callServer()
    store.dispatch(setBreadcrumbsList(BREADCRUMBS))
  }

  handleChangeRowsPerPage = (event) => {
    let per  = event.target.value
    let { page, searchText, sort_direction, sort_field } = this.state
    this.callServer({ page, per, searchText, sort_direction, sort_field })
  };

  ChangePage = (event, page) => {
    let { per, searchText, sort_direction, sort_field } = this.state
    this.callServer({ page, per, searchText, sort_direction, sort_field })
  };

  callServer({ page, per, searchText, sort_direction, sort_field } = this.state) {
    page++
    let params = { params: { per, page, sort: { [sort_field] : sort_direction } } }
    searchText && (params["params"]["search"] = { "all_fields.cont": searchText })

    this.setState({ loading: true })

    API.get('/users', params).then(response => {
      let newPage = parseInt(response.data.meta.page)
      newPage--
      this.setState({
        users: response.data.users,
        page: newPage,
        per: parseInt(response.data.meta.per),
        pages: parseInt(response.data.meta.pages),
        total_records: parseInt(response.data.meta.total_records),
        searchLoading: false,
        loading: false,
        sort_field: sort_field || this.state.sort_field,
        sort_direction: sort_direction || this.state.sort_direction,
      })
    })
  }

  onChangeSearch(event) {
    this.state.timeout && clearTimeout(this.state.timeout)
    const searchText =  event.target.value
    const { page, per, sort_direction, sort_field } = this.state
    const callServer = this.callServer.bind(this)
    searchText ?
      this.setState({
        searchText,
        searchLoading: true,
        timeout: setTimeout(() => { callServer({ page, per, searchText, sort_direction, sort_field }) }, 2000)
      }) :
      callServer({ page, per, searchText, sort_direction, sort_field })
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

  sortHandler(field) {
    let { page, per, searchText, sort_direction, sort_field } = this.state
    sort_field === field ?
      (sort_direction === "asc" ? (sort_direction = "desc") : (sort_direction = "asc")) :
      (sort_direction = "desc")
    return (event) => {
      sort_field = field
      this.callServer({ page, per, searchText, sort_direction, sort_field })
    } 
  } 
  render() {
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <Grid container  direction="row"  justify="flex-end"  alignItems="flex-end" className={classes.usersTableBarWrapper}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              { 
                this.state.searchLoading ?
                <CircularProgress className={classes.searchLoadingIcon} size={25}/> :
                <SearchIcon /> 
              }
            </div>
            <InputBase
              placeholder="Buscar…"
              onChange={this.onChangeSearch.bind(this)}
              defaultValue={this.state.searchText}
              classes={{
                root: classes.searchInputRoot,
                input: classes.searchInputInput,
              }}
            />
          </div>
          <Button component={Link} to="/users/new" variant="contained" color="primary">
            <PersonAddIcon/>
          </Button>
        </Grid>
        <div className={classes.tableWrapper}>
          <Paper >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    Nombre
                    <TableSortLabel
                      active={this.state.sort_field === "first_name"}
                      direction={this.state.sort_direction}
                      onClick={this.sortHandler("first_name")}
                    />                   
                  </TableCell>
                  <TableCell align="center">
                    Apellido
                    <TableSortLabel
                      active={this.state.sort_field === "last_name"}
                      direction={this.state.sort_direction}
                      onClick={this.sortHandler("last_name")}
                    /> 
                  </TableCell>
                  <TableCell align="center">
                    Correo
                    <TableSortLabel
                      active={this.state.sort_field === "email"}
                      direction={this.state.sort_direction}
                      onClick={this.sortHandler("email")}
                    /> 
                    </TableCell>
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
                    page={this.state.page}
                    rowsPerPage={this.state.per}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    onChangePage={this.ChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    count={this.state.total_records}
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