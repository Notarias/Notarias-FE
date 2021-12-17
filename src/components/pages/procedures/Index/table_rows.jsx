import React                          from 'react';
import Grid                           from '@material-ui/core/Grid';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import GenericDropdownMenu            from '../../../ui/generic_dropdown_menu';
import CreateIcon                     from '@material-ui/icons/Create';
import MenuItem                       from '@material-ui/core/MenuItem';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import { Link }                       from 'react-router-dom';
import { withStyles }                 from '@material-ui/core/styles';
import { styles }                     from '../styles';
import VisibilityIcon                 from '@material-ui/icons/Visibility';
import PrintIcon                      from '@material-ui/icons/Print';
import Chip                           from '@material-ui/core/Chip';



const TableRows = (props) => {

  const {procedure, classes} = props;
  const [open, setOpen] = React.useState(false);

  const estatus = (params) => {
    if (params.completedAt) {
      return <Chip color="primary" label="Completado" />
    } else {
      return <Chip color="secondary" label="En Proceso" />
    }
  }
  console.log(procedure)

  return(
    <TableRow key={  "-row" }>
      <TableCell align= "center" className={classes.tablecellWidth}>{ procedure.client.fullName }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>{ procedure.serialNumber }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>{ procedure.budgetingTemplate.name }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>{ procedure.proceduresTemplate.name }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>{ procedure.reporter && procedure.reporter.avatarThumbUrl }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>{ procedure.createdAt }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>{ estatus(procedure) }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>
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
