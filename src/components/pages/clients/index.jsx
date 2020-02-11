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
import { managePaginationBefore }   from '../../interfaces/parameter_manager';
import CircularProgress             from '@material-ui/core/CircularProgress';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: null }
]
class Clients extends Component {
  constructor(props){
    super(props)
    this.state ={
      clients: [ ],
      timeout: 0,
      searchLoading: false,
    }
  }

  componentDidMount() {
    setBreadcrumbsList(BREADCRUMBS)
    this.callServer()
  }

  prepareParams = (new_params) => {
    let deliverable_params = Object.assign({}, this.state.request_params)
    setParamsInterface(new_params, deliverable_params)
    managePaginationBefore(deliverable_params)
    return deliverable_params
  }

  callServer(new_params = {}) {
    this.setState({ loading: true })
    let deliverable_params = this.prepareParams(new_params)
    API.get('/clients',
      { params: deliverable_params },
      ).then(response => {
        this.setState({
          clients: response.data.clients,
          searchLoading: false,         
          loading: false,
          request_params: {
            search: deliverable_params.search
          }
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
                    <TableCell align= "center">Nombre</TableCell>
                    <TableCell align= "center">Apellido</TableCell>
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
                    this.state.clients.map(row => (
                    <TableRow>
                      <TableCell align= "center">{row.first_name}</TableCell>
                      <TableCell align= "center">{row.last_name}</TableCell>
                      <TableCell align= "center">
                        <div>
                          <GenericDropdownMenuCliets/>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      )
    }
  }
export default withStyles(styles)(Clients);
