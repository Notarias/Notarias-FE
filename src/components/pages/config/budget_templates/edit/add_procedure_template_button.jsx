import React        from 'react'
import Button       from '@material-ui/core/Button';
import Dialog                             from '@material-ui/core/Dialog';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import DialogActions                      from '@material-ui/core/DialogActions';
import ListToLinkOfProcedures             from './list_to_link_of-procedures';

const AddProcedureTemplateButton = (props) => {
  const classes = props
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return(
    <>
      <Button onClick={ handleClickOpen }>
        + Tramite
      </Button>
      <Dialog open={ open } onClose={ handleClose } >
        <DialogTitle>
          Selecciona un Trámite para vincularlo
        </DialogTitle>
        <DialogContent>
          <ListToLinkOfProcedures
          
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={ handleClose }
          >
            Cancelar
          </Button>
          <Button
            onClick={ handleClose }
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddProcedureTemplateButton;