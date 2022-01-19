import React                                          from 'react';
import Grid                                           from '@material-ui/core/Grid';
import TextField                                      from '@material-ui/core/TextField';
import StarsIcon                                      from '@material-ui/icons/Stars';
import FormControlLabel                               from '@material-ui/core/FormControlLabel';
import Checkbox                                       from '@material-ui/core/Checkbox';
import StarBorderIcon                                 from '@material-ui/icons/StarBorder';
import Button                                         from '@material-ui/core/Button';
import DeleteForeverIcon                              from '@material-ui/icons/DeleteForever';
import { withStyles }                                 from '@material-ui/core/styles';
import { styles }                                     from '../styles';
import FormControl                                    from '@material-ui/core/FormControl';
import Select                                         from '@material-ui/core/Select';
import MenuItem                                       from '@material-ui/core/MenuItem';
import InputLabel                                     from '@material-ui/core/InputLabel';
import Dialog                                         from '@material-ui/core/Dialog';
import DialogActions                                  from '@material-ui/core/DialogActions';
import DialogContent                                  from '@material-ui/core/DialogContent';
import DialogTitle                                    from '@material-ui/core/DialogTitle';
import Paper                                          from '@material-ui/core/Paper';
import Typography                                     from '@material-ui/core/Typography';
import SaveIcon                                       from '@material-ui/icons/Save';
import CreateIcon                                     from '@material-ui/icons/Create';
import PrintOutlinedIcon                              from '@material-ui/icons/PrintOutlined';
import PrintIcon                                      from '@material-ui/icons/Print';
import { useMutation }                                from '@apollo/client';
import { UPDATE_PROCEDURES_TEMPLATE_TAB_FIELD }       from '../queries_and_mutations/queries'
import { DESTROY_PROCEDURES_TEMPLATE_TAB_FIELD }      from '../queries_and_mutations/queries'
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }          from '../queries_and_mutations/queries'
import RadioButtonUncheckedIcon                       from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon                         from '@material-ui/icons/RadioButtonChecked';


const INPUT_TYPES = {
  string: "Texto",
  number: "Numerico",
  file: "Archivo",
}

const Field = (props) => {

  const { classes, id, groupId, currentTab, removeFromList } = props
  const [open, setOpen] = React.useState(false);
  const [openb, setOpenb] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editing, setEditing] = React.useState(true);
  const [printable] = React.useState(props.printable)
  const [name, setName] = React.useState(props.name)
  const [style, setStyle] = React.useState(props.style)
  const [active, setActive] = React.useState(props.active)
  const [favourite, setFavourite] = React.useState(props.favourite)
  const [error, setError] = React.useState(false)
  const inputsList = ["name"]

  const [updateProceduresTemplateTabFieldMutation] =
    useMutation(
      UPDATE_PROCEDURES_TEMPLATE_TAB_FIELD,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        update(store, cacheData) {
          setFavourite(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.favourite)
          setActive(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.active)
          setError(false)
          setEditing(true)
        }
      }
    )

    const setErrors = (apolloError) => {
      let errorsList = {}
      let errorTemplateList = apolloError.graphQLErrors
      for ( let i = 0; i < errorTemplateList.length; i++) {
        for( let n = 0; n < inputsList.length; n++) {
          if(errorTemplateList[i].extensions.attribute === inputsList[n]){
            errorsList[inputsList[n]] = errorTemplateList[i].message
          }
        }
      }
      setError(errorsList) 
    }

  const updateField = (event) => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: id, name: name, style: style}})
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenb = () => {
    setOpenb(true);
  }

  const handleCloseb = () => {
    setOpenb(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const checkedStar = () => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: id, favourite: !favourite }})
    setOpenb(false);
  }

  const changeFieldStatus = (event) => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: id, active: !active }})
    setActive(!active)
    setOpenDialog(false);
  }

  const colorButton = () => {
    if (favourite === true) {
      return 'secondary'
    } else {
      return "primary"
    }
  }

  const [destroyProceduresTemplateTabFieldMutation  ] =
    useMutation(
      DESTROY_PROCEDURES_TEMPLATE_TAB_FIELD, 
      {
        refetchQueries: [{
          query: GET_PROCEDURE_TEMPLATE_TAB_FIELDS,
          variables: { "id": currentTab && currentTab.id },
        }],
        awaitRefetchQueries: true
      }
    )

  const deleteFieldClick = () => {
    removeFromList(props.arrayIndex, destroyProceduresTemplateTabFieldMutation, { variables: { id: id } }, id )
    setOpen(false);
  }

  const editField = () => {
    setEditing(!editing)
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
  };

  const statusField = () => { 
    return active ? "Desactivar" : "Activar"
  }

  const handleClickOpenPrintDialog = (event) => {

  }

  const handleClosePrintDialog = (event) => {

  }

  const savePrintableField = (event) => {

  }

  const renderTextField = () => {
    return(
      <>
        <Grid container item xs={1} alignItems="center" justifyContent="center">
          <Button
            onClick={ editField }
          >
            <CreateIcon/>
          </Button>
        </Grid>
        <Grid container item xs={4} alignItems="center">
          <Typography className={ classes.texPlainTittleName }>
            { name }
          </Typography>
        </Grid>
        <Grid container item xs={3} alignItems="center">
        <Typography className={ classes.textTittleType }>
            {  INPUT_TYPES[style] }
          </Typography>
        </Grid>
      </>
    )
  }

  const renderInputField = () => {
    return(
      <>
        <Grid container item xs={1} alignItems="center" justifyContent="center">
          <Button
            onClick={ updateField }
          >
            <SaveIcon />
          </Button>
        </Grid>
        <Grid container item xs={4} alignItems="center">
          <TextField 
            id="standard-basic" 
            label="Nombre del campo"
            className={ classes.textInputTittleName }
            value={ name }
            onChange={ handleNameChange }
            error={ !!error["name"] && true }
            helperText={error["name"] || " "}
            errorskey={ "name" }
            name='name'
          />
        </Grid>
        <Grid container item xs={3} alignItems="center">
          <FormControl variant="outlined" className={ classes.textFieldTittleType }>
            <InputLabel id="label-field">Tipo de campo</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              name='style'
              value={ style }
              onChange={ handleStyleChange }
            >
              <MenuItem key='string' value={'string'}>Texto</MenuItem>
              <MenuItem key='number' value={'number'}>Numerico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </>
    )
  }

  return (
    <Grid container item alignItems="center" justifyContent="center" className={ classes.fielPaddingBottom }>
      <Paper>
        <Grid container item className={ classes.fieldHeightRow }>
          { editing ? renderTextField() : renderInputField() }
          <Grid container item alignItems="center" justifyContent="center" xs={1}>
            <FormControlLabel
              control={<Checkbox 
                icon={<StarBorderIcon />} 
                checkedIcon={<StarsIcon />} 
                name="favourite"
                checked={ favourite }
              />}
              label=" "
              color="primary"
              className={ classes.formControlPadding }
              onChange={ handleClickOpenb }
            />
            <Dialog
              open={openb}
              onClose={handleClose}
              aria-labelledby="favorite-alert"
              aria-describedby="favorite-alert-dialog"
            >
              <DialogTitle id="favorite-alert">
                { favourite === true ? "Eliminar Favorito": "Añadir Favorito"}
              </DialogTitle>
              <DialogContent>
              { favourite === true ? "Este campo dejará de ser importante": "Se marcará este campo como importante"}
              </DialogContent>
              <DialogActions>
                <Button onClick={ handleCloseb } color="secondary">
                  Cancelar
                </Button>
                <Button color={ colorButton() } autoFocus onClick={ checkedStar } variant="contained">
                  { favourite ? "Quitar": "Añadir"}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid container item xs={1} alignItems="center" justifyContent="center">
            <FormControlLabel
              control={<Checkbox 
                icon={<PrintOutlinedIcon />} 
                checkedIcon={<PrintIcon />} 
                name="printable"
                checked={ printable }
              />}
              label=" "
              color="primary"
              className={ classes.formControlPadding }
              onChange={ handleClickOpenPrintDialog }
            />
            <Dialog
              open={openb}
              onClose={handleClosePrintDialog}
              aria-labelledby="print-aletrt"
              aria-describedby="print-alert-dialog"
            >
              <DialogTitle id="favorite-alert">
                { favourite === true ? "No imprimir" : "Agregar a formulario de impresión"}
              </DialogTitle>
              <DialogContent>
              { favourite === true ? "Este campo dejará de aparecer en el formato de impresión" : "Se marcará este campo para aparecer en el formulario de impresión"}
              </DialogContent>
              <DialogActions>
                <Button onClick={ handleClosePrintDialog } color="secondary">
                  Cancelar
                </Button>
                <Button color={ colorButton() } autoFocus onClick={ savePrintableField } variant="contained">
                  { favourite ? "Quitar" : "Añadir"}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid container item  alignItems="center" justifyContent="center" item xs={1}>
            <Button onClick={ handleClickOpen }>
              <DeleteForeverIcon/>
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Eliminar campo"}</DialogTitle>
              <DialogContent>
                Se eliminara de manera permantente el campo: 
                <Typography variant="subtitle2" className={ classes.texPlainTittleName }>
                  {name}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={ handleClose } color="secondary">
                  Cancelar
                </Button>
                <Button color="primary" autoFocus onClick={ deleteFieldClick }>
                  Borrar
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid container item alignItems="center" justifyContent="center" item xs={1} onClick={ handleClickOpenDialog }>
            {
            active ?
              <Button>
                <RadioButtonCheckedIcon className={classes.radioButtonActiveGreen}/>
              </Button>
            :
              <Button>
                <RadioButtonUncheckedIcon color="secondary" className={ classes.defaultIcon }/>
              </Button>
            }
          </Grid>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title"> Deseas {statusField()}</DialogTitle>
            <DialogContent>
              Realmente deseas { statusField() }
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleCloseDialog } color="secondary">
                Cancelar
              </Button>
              <Button
                color="primary"
                autoFocus
                onClick={ changeFieldStatus }
              >
                { statusField() }
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Paper>
    </Grid>
  )
}


export default  withStyles(styles)(Field);