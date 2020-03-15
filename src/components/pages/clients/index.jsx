import React, { Component }         from 'react';
import { withStyles }               from '@material-ui/core/styles';
import Table                        from '@material-ui/core/Table';
import Paper                        from '@material-ui/core/Paper';
import TableHead                    from '@material-ui/core/TableHead';
import TableRow                     from '@material-ui/core/TableRow';
import TableBody                    from '@material-ui/core/TableBody';
import TableCell                    from '@material-ui/core/TableCell';
import MenuItem                     from '@material-ui/core/MenuItem';
import VisibilityOutlinedIcon       from '@material-ui/icons/VisibilityOutlined';
import BudgetsIcon                  from './../../../icons/presupuestos.svg';
import AppointmentsIcon             from './../../../icons/calendario.svg';
import ReportsIcon                  from './../../../icons/reportes.svg';
import FormsIcon                    from './../../../icons/tramites.svg';
import { setBreadcrumbsList }       from '../../interfaces/breadcrumbs_interface';
import { styles }                   from './styles';
import GenericDropdownMenu          from '../../ui/generic_dropdown_menu';
import CircularProgress             from '@material-ui/core/CircularProgress';
import SortHeader           from '../../ui/sort_header';
import TableFooter          from '@material-ui/core/TableFooter';
import TablePagination      from '@material-ui/core/TablePagination';
import ClientsCollection    from '../../models/collections/clients_collection'
import ControlsBar          from './controls_bar';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: null }
]

class Clients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientsCollection: new ClientsCollection(),
      searchLoading: false
    }
  }

  submitData(params) {
    this.setState({ loading: true })
    this.state.clientsCollection.load(params).then(() => {
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
    this.state.clientsCollection.cancelLoad()
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
      view.state.clientsCollection
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

  render() {
    const { classes } = this.props
    const { field, direction } = this.state.clientsCollection.sort
    console.log(this.state.clientsCollection.clients)
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
                    text={"RFC"}
                    field_property={"email"}
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
                    this.state.clientsCollection.clients.map(client => (
                    <TableRow  key={client.id}>
                      <TableCell align= "center">{client.attributes.first_name}</TableCell>
                      <TableCell align= "center">{client.attributes.last_name}</TableCell>
                      <TableCell align= "center">{client.attributes.rfc}</TableCell>
                      <TableCell align= "center">
                        <div>
                          <GenericDropdownMenu>
                            <MenuItem>
                              <VisibilityOutlinedIcon/>
                              <span style={{ paddingLeft: "10px" }}>
                                Detalles
                              </span>
                            </MenuItem>
                            <MenuItem>
                              <img alt={"presupuestos"} src={BudgetsIcon} style={{ width: "25px", height: "25px"}}/>
                              <span style={{paddingLeft: "10px"}}>
                                Presupuestos
                              </span>
                            </MenuItem>
                            <MenuItem>
                              <img alt={"Agenda"} src={AppointmentsIcon} style={{ width: "26px", height: "26px"}}/>
                              <span style={{paddingLeft: "10px"}}>
                                Agenda
                              </span>
                            </MenuItem>
                            <MenuItem>
                              <img alt={"Reporte"} src={ReportsIcon} style={{ width: "25px", height: "25px"}}/>
                              <span style={{paddingLeft: "10px"}}>
                                Reporte
                              </span>
                            </MenuItem>
                            <MenuItem>
                            <img alt={"Trámites"} src={FormsIcon} style={{ width: "25px", height: "25px", paddingRight: "3px"}}/>
                              <span style={{paddingLeft: "10px"}}>
                                Trámites
                              </span>
                            </MenuItem>
                          </GenericDropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))
                  }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    page={this.state.clientsCollection.pagination.page}
                    rowsPerPage={this.state.clientsCollection.pagination.per}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    onChangePage={this.changePage}
                    onChangeRowsPerPage={this.changeRowsPerPage}
                    count={this.state.clientsCollection.pagination.total_records}
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
