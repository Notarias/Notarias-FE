import React                  from 'react';
import Grid                   from '@material-ui/core/Grid';
import TableRow               from '@material-ui/core/TableRow';
import TableCell              from '@material-ui/core/TableCell';
import GenericDropdownMenu    from '../../../ui/generic_dropdown_menu';
import CreateIcon             from '@material-ui/icons/Create';
import MenuItem               from '@material-ui/core/MenuItem';
import ListItemIcon           from '@material-ui/core/ListItemIcon';
import ListItemText           from '@material-ui/core/ListItemText';
import Typography             from '@material-ui/core/Typography';
import { Link }               from 'react-router-dom';
import { withStyles }         from '@material-ui/core/styles';
import { styles }             from '../styles';
import VisibilityIcon         from '@material-ui/icons/Visibility';
import PrintIcon              from '@material-ui/icons/Print';
import Chip                   from '@material-ui/core/Chip';
import Avatar                 from '@material-ui/core/Avatar';

const buildDate = (value, separator='/') => {
  let newDate = new Date(value)
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();

  return (
    `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} - ${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
  )
}

const TableRows = (props) => {

  const {procedure, classes} = props;

  const estatus = (params) => {
    if (params.completedAt) {
      return <Chip color="primary" label="Completado" />
    } else {
      return <Chip color="secondary" label="En Proceso" />
    }
  }

  return(
    <TableRow>
      <TableCell align="center" className={classes.tablecellWidth}>{ procedure.serialNumber }</TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>{ procedure.budgets[procedure.budgets.length - 1].writingNumber }</TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>{ procedure.proceduresTemplate.name }</TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>{ procedure.budgetingTemplate.name }</TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>{ procedure.client.fullName }</TableCell>
      <TableCell align="left" className={classes.tablecellWidth}>
        {
          procedure.asignee ?
          <Grid item container xs direction="row" spacing={2}>
            <Grid item>
              <Avatar src={procedure.asignee && procedure.asignee.avatarThumbUrl}/>
            </Grid>
            <Grid item xs>
              <Typography variant="body2" >{procedure.asignee.firstName}</Typography>
              <Typography variant="body2" >{procedure.asignee.lastName}</Typography>
            </Grid>
          </Grid>
        :
          <Typography>
            Sin Usuario Asignado
          </Typography>
        }
      </TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>{ buildDate(procedure.createdAt) }</TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>{ estatus(procedure) }</TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>
        <Grid>
          <GenericDropdownMenu>
            <MenuItem key={ procedure.id + "-edit" }>
                <Link
                  to={`/procedures/${ procedure.id }/edit`}
                  color="inherit"
                  underline="none"
                  className={ classes.linkDefault }
                >
                <Grid container>
                  <ListItemIcon>
                    <CreateIcon className={ classes.defaultIcon }/>
                  </ListItemIcon>
                  <ListItemText primary="Editar" />
                </Grid>
              </Link>
            </MenuItem>
            <MenuItem key={ procedure.id + "-preview"}>
              <Link
                to="#"
                color="inherit"
                underline="none"
                className={ classes.linkDefault }
              >
                <Grid container>
                  <ListItemIcon>
                    <VisibilityIcon className={ classes.defaultIcon }/>
                  </ListItemIcon>
                  <ListItemText primary="Vista previa"/>
                </Grid>
              </Link>
            </MenuItem>
            <MenuItem key={ procedure.id + "-print"}>
              <Link
                to="#"
                color="inherit"
                underline="none"
                className={ classes.linkDefault }
              >
                <Grid container>
                  <ListItemIcon>
                    <PrintIcon className={ classes.defaultIcon }/>
                  </ListItemIcon>
                  <ListItemText primary="Imprimir"/>
                </Grid>
              </Link>
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default withStyles(styles)(TableRows);
