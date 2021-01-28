import React, { useEffect }               from 'react'
import Button                             from '@material-ui/core/Button';
import Dialog                             from '@material-ui/core/Dialog';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import DialogActions                      from '@material-ui/core/DialogActions';
import ListToLinkOfProcedures             from './list_to_link_of-procedures';
import { useMutation }                    from '@apollo/react-hooks';
import { UPDATE_BUDGETING_TEMPLATE }      from '../queries_and_mutations/queries';
import { GET_BUDGETING_TEMPLATE }         from '../queries_and_mutations/queries';


const AddProcedureTemplateButton = (props) => {
  const { classes, proceduresTemplateData }= props
  const id = props.id
  const [procedureTemplate, setProcedureTemplate] = React.useState()
  const [open, setOpen] = React.useState(false)
  const [procedureIdSelected, setProcedureIdSelected] = React.useState()
  // const [disableButton, setDisableButton] = React.useState(false)

  useEffect(() => {
    setProcedureTemplate(proceduresTemplateData)
  }, [proceduresTemplateData])

  const [updateBudgetingTemplateMutation, updateProcessInfo] =
    useMutation(
      UPDATE_BUDGETING_TEMPLATE,
      {
        update(store, cacheData) {
        },
        fetchPolicy: "no-cache",
        refetchQueries: [{
          query: GET_BUDGETING_TEMPLATE,
          variables: { "id": id },
        }],
        awaitRefetchQueries: true
      }
    )

  const updateLinkedProcedureTemplate = (event) => {
    updateBudgetingTemplateMutation({ variables: {"id": id, "proceduresTemplateId": procedureIdSelected}})
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
    setProcedureIdSelected(false)
  }

  const handleClose = () => {
    setOpen(false)
    // setDisableButton(false)
  }

  const procedureSelected = () => {
    return (
      procedureTemplate ? "No." + procedureTemplate.serialNumber : "+ Tramite"
    ) 
  }

  const procedureLinked = (id) => {
    setProcedureIdSelected(id)
  }

  console.log("idselect", procedureIdSelected)
  console.log("name", proceduresTemplateData)
  console.log("dps", procedureTemplate)

  return(
    <>
      <Button onClick={ handleClickOpen }>
        { procedureSelected() }
      </Button>
      <Dialog open={ open } onClose={ handleClose } >
        <DialogTitle>
          Selecciona un Trámite para vincularlo
        </DialogTitle>
        <DialogContent>
          <ListToLinkOfProcedures
            procedureLinked={ procedureLinked }
            procedureIdSelected={ procedureIdSelected }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={ handleClose }
          >
            Cancelar
          </Button>
          <Button
            onClick={ updateLinkedProcedureTemplate }
            disabled={ !procedureIdSelected }
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddProcedureTemplateButton;