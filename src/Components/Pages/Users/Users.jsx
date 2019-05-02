import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import LoadingTopBar        from '../../Ui/LoadingTopBar';
import API            from '../../../axiosConfig';
import Table          from '@material-ui/core/Table';
import TableBody      from '@material-ui/core/TableBody';
import TableCell      from '@material-ui/core/TableCell';
import TableHead      from '@material-ui/core/TableHead';
import TableRow       from '@material-ui/core/TableRow';
import Paper          from '@material-ui/core/Paper';
import { styles }     from './styles';
import Button         from '@material-ui/core/Button';
import { Link }       from 'react-router-dom';
import Grid           from '@material-ui/core/Grid';
import PersonAddIcon  from '@material-ui/icons/PersonAdd';
import GenericDropdownMenu from '../../Ui/GenericDropdownMenu';

class Users extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      users:[] 
    }
  }

  componentDidMount() {
    API.get('/users')
      .then(response => {
        this.setState({ users: response.data, loading: false })
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
        { this.state.loading && <LoadingTopBar/> }
        <div className={classes.tableWrapper}>
          <Paper >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Apellido</TableCell>
                  <TableCell align="right">Correo</TableCell>
                  <TableCell align="right">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map(n => (
                  <TableRow key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell align="right">{n.first_name}</TableCell>
                    <TableCell align="right">{n.last_name}</TableCell>
                    <TableCell align="right">{n.email}</TableCell>
                    <TableCell align="right">
                      <GenericDropdownMenu optionsComponents={['Editar','Bloquear']} />
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

export default withStyles(styles)(Users);