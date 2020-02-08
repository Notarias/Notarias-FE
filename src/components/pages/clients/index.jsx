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

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: null }
]
class Clients extends Component {
  constructor(props){
    super(props)
    this.state ={
      clients: [ ],
    }
  }

  componentDidMount() {
    setBreadcrumbsList(BREADCRUMBS)
    this.callServer()
  }
  callServer() {
    API.get('/clients'
      ).then(response => {
        this.setState({
          clients: response.data.clients
        })
      })
    }
    render() {
      const { classes } = this.props
      return(
        <div>
          [busqueda]
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
                  {this.state.clients.map(row => (
                  <TableRow>
                    <TableCell align= "center">{row.first_name}</TableCell>
                    <TableCell align= "center">{row.last_name}</TableCell>
                    <TableCell align= "center">
                      <div>
                        <GenericDropdownMenuCliets/>
                      </div>
                    </TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      )
    }
  }
export default withStyles(styles)(Clients);
