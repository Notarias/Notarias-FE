import React, { useEffect }           from 'react';
import Grid                           from '@material-ui/core/Grid';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import GenericDropdownMenu            from '../../../ui/generic_dropdown_menu';
import Button                         from '@material-ui/core/Button';
import CreateIcon                     from '@material-ui/icons/Create';
import MenuItem                       from '@material-ui/core/MenuItem';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import { Link }                       from 'react-router-dom';
import NumberFormat                   from 'react-number-format';
import { withStyles }                 from '@material-ui/core/styles';
import { styles }                     from '../styles';
import Typography                     from '@material-ui/core/Typography';


const TemplateRow = (props) => {

  const {budget, classes} = props
  const [open, setOpen] = React.useState(false);

 
  return(
    <TableRow key={  "-row" }>
      <TableCell align= "center" className={classes.tablecellWidth}>{ budget.client.firstName }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>{ budget.proceduresTemplate.name }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>{ budget.serialNumber }</TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>
        <NumberFormat 
          value={ budget.total / 100}
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>
        <Typography variant="subtitle2">
          <NumberFormat 
            value={ budget.totalDebt / 100 }
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$ '}
            decimalScale={2}
            className={budget.totalDebt ? classes.totalDebtInRed : ""}
          />
        </Typography>
      </TableCell>
      <TableCell align= "center" className={classes.tablecellWidth}>
        <Typography variant="subtitle2">
          <NumberFormat 
            value={ budget.totalPaid / 100 }
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$ '}
            decimalScale={2}
            className={classes.totalPaidInGreen}
          />
        </Typography>
      </TableCell>
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
            <MenuItem key={ budget.id + "-algo"}>
              "algo futuro"
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default withStyles(styles)(TemplateRow);
