import React, { useEffect }           from 'react';
import Grid                           from '@material-ui/core/Grid';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import GenericDropdownMenu            from '../../../ui/generic_dropdown_menu';
import Chip                           from '@material-ui/core/Chip';
import Button                         from '@material-ui/core/Button';
import CreateIcon                     from '@material-ui/icons/Create';
import MenuItem                       from '@material-ui/core/MenuItem';
import RadioButtonUncheckedIcon       from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon         from '@material-ui/icons/RadioButtonChecked';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import Dialog                         from '@material-ui/core/Dialog';
import DialogActions                  from '@material-ui/core/DialogActions';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogContentText              from '@material-ui/core/DialogContentText';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import useMediaQuery                  from '@material-ui/core/useMediaQuery';
import { useTheme }                   from '@material-ui/core/styles';
import { Link }                       from 'react-router-dom';


const TemplateRow = (props) => {

  const {budget} = props
  const { classes } = props
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  console.log(budget.id, "budg")
  return(
    <TableRow key={  "-row" } >
      <TableCell align= "center">{ budget.client.firstName }</TableCell>
      <TableCell align= "center">{ budget.budgetingTemplate.name }</TableCell>
      <TableCell align= "center">
        { 
          <Chip
            size="small" label={ "activo" }
          />
        }
      </TableCell>
      <TableCell align= "center">10,000</TableCell>
      <TableCell align= "center">{ budget.serialNumber }</TableCell>
      <TableCell align= "center">
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
            <MenuItem>
              "algo futuro"
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default TemplateRow;
