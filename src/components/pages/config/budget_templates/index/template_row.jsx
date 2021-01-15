import React                          from 'react';
import Grid                           from '@material-ui/core/Grid';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import GenericDropdownMenu            from '../../../../ui/generic_dropdown_menu';
import Chip                           from '@material-ui/core/Chip';


const TemplateRow = (props) => {

  const budtingTemplate  = props.data
  const { classes } = props
  const [active, setActive] = React.useState(budtingTemplate.active);

  const folioNumber = (serial) => {
    return serial.toString().padStart(5, "0")
  }

  const markStatus = () => {
    if(!active) {
      return  classes.statusTemplateRow 
    }
  }

  const statusBadgetTemplate = () => {
    return(
      budtingTemplate.active ? "Activo" : "Inactivo"
    )
  }

  return(
    <TableRow key={ budtingTemplate.id + "-row" }  className={ markStatus() } >
      <TableCell align= "center">{ budtingTemplate.name }</TableCell>
      <TableCell align= "center">{ folioNumber(budtingTemplate.serialNumber) }</TableCell>
      <TableCell align= "center">
        { 
          <Chip
            size="small" label={ statusBadgetTemplate() }
            classes={{colorPrimary: classes.activeGreen}}
            color={ active ? "primary" : "secondary"} 
          /> 
        }
      </TableCell>
      <TableCell align= "center">2.0</TableCell>
      <TableCell align= "center">En ejecución</TableCell>
      <TableCell align= "center">
        <Grid>
        <GenericDropdownMenu/>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default TemplateRow;
