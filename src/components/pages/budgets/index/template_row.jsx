import React                          from 'react';
import Grid                           from '@material-ui/core/Grid';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import GenericDropdownMenu            from '../../../ui/generic_dropdown_menu';
import CreateIcon                     from '@material-ui/icons/Create';
import MenuItem                       from '@material-ui/core/MenuItem';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import Chip                           from '@material-ui/core/Chip';
import { Link }                       from 'react-router-dom';
import MaterialLink                   from '@material-ui/core/Link';
import NumberFormat                   from 'react-number-format';
import { withStyles }                 from '@material-ui/core/styles';
import { styles }                     from '../styles';
import Typography                     from '@material-ui/core/Typography';
import VisibilityIcon                 from '@material-ui/icons/Visibility';
import PrintIcon                      from '@material-ui/icons/Print';
import { BASE_URI }                   from '../../../../apollo'

const TemplateRow = (props) => {

  const {budget, classes} = props

  const estatus = (budget) => {
    if (budget.completedAt) {
      return <Chip color="primary" label="Completado" />
    } else {
      return <Chip color="secondary" label="En Proceso" />
    }
  }

  return(
    <TableRow>
      <TableCell align="center" className={classes.tablecellWidth}>{ budget.serialNumber }</TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>{ budget.budgetingTemplate.name }</TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>{ budget.proceduresTemplate.name }</TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>{ budget.client.fullName }</TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>
        <NumberFormat 
          value={ budget.total / 100}
          displayType='text'
          thousandSeparator={true} 
          prefix='$'
          decimalScale={2}
        />
      </TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>
        <Typography variant="subtitle2">
          <NumberFormat 
            value={ budget.totalDebt / 100 }
            displayType='text' 
            thousandSeparator={true} 
            prefix='$'
            decimalScale={2}
            className={budget.totalDebt ? classes.totalDebtInRed : ""}
          />
        </Typography>
      </TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>
        <Typography variant="subtitle2">
          <NumberFormat 
            value={ budget.totalPaid / 100 }
            displayType='text' 
            thousandSeparator={true} 
            prefix='$'
            decimalScale={2}
            className={classes.totalPaidInGreen}
          />
        </Typography>
      </TableCell>
      <TableCell align="center" className={classes.tablecellWidth}>{ estatus(budget) }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>
        <Grid>
          <GenericDropdownMenu>
            <MenuItem key={ budget.id + "-edit" }>
                <Link
                  to={`/budgets/${ budget.id }/edit`}
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
            <MenuItem key={ budget.id + "-preview"}>
              <Link
                to={`/budgets/${ budget.id }/invoice`}
                color="inherit"
                target='_blank'
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
            <MenuItem key={ budget.id + "-print"}>
              <MaterialLink
                href={`http://${BASE_URI}/invoices/${budget.id}.pdf?auth=${localStorage.getItem('jwtToken')}`}
                target='_blank'
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
              </MaterialLink>
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default withStyles(styles)(TemplateRow);
