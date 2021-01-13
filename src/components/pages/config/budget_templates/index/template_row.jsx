import React                          from 'react';
import Grid                           from '@material-ui/core/Grid';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import GenericDropdownMenu            from '../../../../ui/generic_dropdown_menu';


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
      <TableCell align= "center">{ statusBadgetTemplate() }</TableCell>
      <TableCell align= "center">2.0</TableCell>
      <TableCell align= "center">En ejecución</TableCell>
      <TableCell align= "center">
        <Grid>
        <GenericDropdownMenu/>
          {/* <GenericDropdownMenu>
            <MenuItem key={ procedureTemplate.id + "-edit" }>
              <Link
                to={`/config/procedure_templates/${ procedureTemplate.id }/edit`}
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
            <MenuItem 
              key={ procedureTemplate.id + "-status" }
            >
              <Grid container onClick={ handleClickOpen }>
                <ListItemIcon>
                  {
                    active ? 
                      <RadioButtonUncheckedIcon color="secondary" className={ classes.defaultIcon }/> 
                    : 
                      <RadioButtonCheckedIcon className={classes.activeIconGreen} /> 
                  }
                </ListItemIcon>
                <ListItemText primary={ statusTemplate() } />
              </Grid>
              <Dialog
                  fullScreen={ fullScreen }
                  open={ open }
                  onClose={ handleClose }
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">{"Confirmar ", statusTemplate() }</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      ¿Realmente deseas { statusTemplate() } está plantilla de trámite ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={ handleClose } color="primary">
                      Cancelar
                    </Button>
                    <Button autoFocus onClick={ changeStatus } color="primary">
                      { statusTemplate() }
                    </Button>
                  </DialogActions>
                </Dialog>
            </MenuItem>
          </GenericDropdownMenu> */}
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default TemplateRow;
