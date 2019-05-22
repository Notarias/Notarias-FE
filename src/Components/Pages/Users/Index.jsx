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
import InputBase            from '@material-ui/core/InputBase';
import SearchIcon           from '@material-ui/icons/Search';
import CircularProgress     from '@material-ui/core/CircularProgress';

class Users extends Component {
  constructor() {
    super()
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
    }
  }

  componentDidMount() {
    this.callServer()
  }

  handleChangeRowsPerPage = (event) => {
    let per  = event.target.value
    let { page, searchText } = this.state
    this.callServer({ page, per, searchText })
  };

  ChangePage = (event, page) => {
    let { per, searchText } = this.state
    this.callServer({ page, per, searchText })
  };

  callServer({ page, per, searchText } = this.state) {
    page++
    let params = { params: { per, page } }
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
        loading: false
      })
    })
  }

  onChangeSearch(event) {
    this.state.timeout && clearTimeout(this.state.timeout)
    const searchText =  event.target.value
    const { page, per } = this.state
    const callServer = this.callServer.bind(this)
    searchText ?
      this.setState({
        searchText,
        searchLoading: true,
        timeout: setTimeout(() => { callServer({ page, per, searchText }) }, 2000)
      }) :
      callServer({ page, per, searchText })
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
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Apellido</TableCell>
                  <TableCell align="center">Correo</TableCell>
                  <TableCell align="center">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                { this.state.loading ? 
                  <TableRow>
                    <TableCell align="center" colspan={4} className={classes.loadingTableCell}>
                      <CircularProgress className={classes.searchLoadingIcon} size={100}/>
                    </TableCell>
                  </TableRow> :
                  this.state.users.map(n => (
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
                          { n.locked_at ?
                              <MenuItem key="Bloquear" onClick={this.unlockUser.bind(this)}>
                                Desbloquear
                              </MenuItem> :
                              <MenuItem key="Bloquear" onClick={this.lockUser.bind(this)}>
                                Bloquear
                              </MenuItem>
                          }
                        </GenericDropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    page={this.state.page}
                    rowsPerPage={this.state.per}
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