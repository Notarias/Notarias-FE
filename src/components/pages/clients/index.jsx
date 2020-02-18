import React, { Component }         from 'react';
import { withStyles }               from '@material-ui/core/styles';
import API                          from '../../../axios_config';
import Table                        from '@material-ui/core/Table';
import Paper                        from '@material-ui/core/Paper';
import TableHead                    from '@material-ui/core/TableHead';
import TableRow                     from '@material-ui/core/TableRow';
import TableBody                    from '@material-ui/core/TableBody';
import TableCell                    from '@material-ui/core/TableCell';
import { setBreadcrumbsList }       from '../../interfaces/breadcrumbs_interface';
import { styles }                   from './styles';
import GenericDropdownMenuCliets    from '../../ui/generic_dropdown_menu_clients';
import ControlBar                   from '../clients/controls_bar';
import { setParamsInterface }       from '../../interfaces/parameter_manager';
import { managePaginationAfter, managePaginationBefore }   from '../../interfaces/parameter_manager';
import CircularProgress             from '@material-ui/core/CircularProgress';
import SortHeader           from '../../ui/sort_header';
import TableFooter          from '@material-ui/core/TableFooter';
import TablePagination      from '@material-ui/core/TablePagination';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: null }
]
class Clients extends Component {
  constructor(props){
    super(props)
    this.state ={
      loading: true,
      clients: [ ],
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
    setBreadcrumbsList(BREADCRUMBS)
    this.callServer()
  }

  handleChangeRowsPerPage = (event) => {
    let per  = event.target.value
    this.callServer({ per })
  }

  ChangePage = (event, page) => {
    this.callServer({ page  })
  }

  prepareParams = (new_params) => {
    let deliverable_params = Object.assign({}, this.state.request_params)
    setParamsInterface(new_params, deliverable_params)
    managePaginationBefore(deliverable_params)
    return deliverable_params
  }

  callServer(new_params = {}, extra_state_data = {}) {
    this.setState({ loading: true })
    let deliverable_params = this.prepareParams(new_params)
    API.get('/clients',
      { params: deliverable_params },
    ).then(response => {
      let meta = managePaginationAfter(response.data.meta)
      this.setState({
        clients: response.data.clients,
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
    })
  }

  onChangeSearch(event) {
    this.state.timeout && clearTimeout(this.state.timeout)
    let searchText = event.target.value
    const search = { search: { "first_name_or_last_name.cont": searchText } }
    const callServer = this.callServer.bind(this)
    this.setState({
      searchLoading: true,
      timeout: setTimeout(() => { callServer(search) }, 2000)
    })
    return searchText
  }

  render() {
    const { classes } = this.props
    const { sort_field, sort_direction } = this.state
    const callServer = this.callServer.bind(this)
    return(
      <div className={classes.root}>
        <ControlBar
          searchLoading={this.state.searchLoading}
          onChangeSearch={this.onChangeSearch.bind(this)}/>
        <div className={classes.tableWrapper}>
          <Paper >
            <Table>
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
                  <TableCell align= "center">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                { this.state.loading ? 
                  <TableRow>
                    <TableCell align="center" colSpan={4} className={classes.loadingTableCell}>
                      <CircularProgress className={classes.searchLoadingIcon} size={100}/>
                    </TableCell>
                  </TableRow> :
                    this.state.clients.map(client => (
                    <TableRow  key={client.id}>
                      <TableCell align= "center">{client.first_name}</TableCell>
                      <TableCell align= "center">{client.last_name}</TableCell>
                      <TableCell align= "center">
                        <div>
                          <GenericDropdownMenuCliets/>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))
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
export default withStyles(styles)(Clients);
