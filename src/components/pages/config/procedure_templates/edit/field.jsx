import React, { useState }                            from 'react';
import Grid                                           from '@material-ui/core/Grid';
import TextField                                      from '@material-ui/core/TextField';
import StarsIcon                                      from '@material-ui/icons/Stars';
import FormControlLabel                               from '@material-ui/core/FormControlLabel';
import Checkbox                                       from '@material-ui/core/Checkbox';
import StarBorderIcon                                 from '@material-ui/icons/StarBorder';
import Button                                         from '@material-ui/core/Button';
import DeleteForeverIcon                              from '@material-ui/icons/DeleteForever';
import FormControl                                    from '@material-ui/core/FormControl';
import Select                                         from '@material-ui/core/Select';
import MenuItem                                       from '@material-ui/core/MenuItem';
import InputBase                                      from '@material-ui/core/InputBase';
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
import { withStyles }                                 from '@material-ui/core/styles';
import { styles }                                     from '../styles';
import { useMutation }                                from '@apollo/client';
import { UPDATE_PROCEDURES_TEMPLATE_TAB_FIELD }       from '../queries_and_mutations/queries'
import { DESTROY_PROCEDURES_TEMPLATE_TAB_FIELD }      from '../queries_and_mutations/queries'
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }          from '../queries_and_mutations/queries'
import RadioButtonUncheckedIcon                       from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon                         from '@material-ui/icons/RadioButtonChecked';
import { Hidden } from '@material-ui/core';


const INPUT_TYPES = {
  string: "Texto",
  number: "Numerico",
  file: "Archivo",
  date: "Fecha",
  list: "Lista"
}

const Field = (props) => {

  const { classes, id, currentTab, removeFromList } = props
  const [favoriteDialog, setFavoriteDialog] = useState(false);
  const [printableDialog, setPrintableDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [statusDialog, setStatusDialog] = useState(false);
  const [editing, setEditing] = useState(true);
  const [name, setName] = useState(props.name);
  const [style, setStyle] = useState(props.style);
  const [active, setActive] = useState(props.active);
  const [favourite, setFavourite] = useState(props.favourite);
  const [printable, setPrintable] = useState(props.printable);
  //const [error, setError] = useState(false);

  const [updateProceduresTemplateTabFieldMutation] =
    useMutation(
      UPDATE_PROCEDURES_TEMPLATE_TAB_FIELD,
      {
        /* onError(apolloError) {
          setErrors(apolloError)
        }, */
        update(store, cacheData) {
          setFavourite(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.favourite)
          setActive(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.active)
          //setError(false)
          setEditing(true)
        }
      }
    )

    /* const setErrors = (apolloError) => {
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
    } */

  const updateField = (event) => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: id, name: name, style: style}})
  }

  const openFavoriteDialog = () => {
    setFavoriteDialog(true);
  };

  const closeFavoriteDialog = () => {
    setFavoriteDialog(false);
  };

  const openPrintableDialog = () => {
    setPrintableDialog(true);
  };

  const closePrintableDialog = () => {
    setPrintableDialog(false);
  };

  const openDeleteDialog = () => {
    setDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const openStatusDialog = () => {
    setStatusDialog(true);
  }

  const closeStatusDialog = () => {
    setStatusDialog(false);
  }

  const checkFavoriteField = () => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: id, favourite: !favourite }})
    setFavourite(!favourite);
    setFavoriteDialog(false);
  };

  const checkPrintableField = (event) => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: id, printable: !printable }})
    setPrintable(!printable);
    setPrintableDialog(false);
  }

  const changeFieldStatus = (event) => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: id, active: !active }})
    setActive(!active)
    setStatusDialog(false);
  };

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
    setDeleteDialog(false);
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

  

  const renderTextField = () => {
    return(
      <Grid container item xs={12} alignItems="center" justifyContent="center">
        <Grid item xs={2}>
          <Button
            onClick={ editField }
          >
            <CreateIcon/>
          </Button>
        </Grid>
        <Grid item xs={5}>
          <InputBase
            value={ name }
            readOnly={true}
            inputProps={{ 'aria-label': 'naked' }}
          />
        </Grid>
        <Grid container item xs={5} alignItems='center'>
          <Typography className={ classes.textTittleType }>
            {  INPUT_TYPES[style] }
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const renderInputField = () => {
    return(
      <Grid container item xs={12} alignItems="center" justifyContent="center">
        <Grid item xs={2}>
          <Button
            onClick={ updateField }
          >
            <SaveIcon />
          </Button>
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="standard-basic"
            value={ name }
            onChange={ handleNameChange }
            variant="outlined"
            style={{'backgroundColor': 'rgb(200, 200, 200)'}}
          />
        </Grid>
        <Grid item xs={5}>
          <FormControl variant="outlined" className={ classes.textFieldTittleType }>
            <Select
              labelId="demo-simple-select-outlined-label"
              name='style'
              value={ style }
              onChange={ handleStyleChange }
            >
              <MenuItem key='string' value={'string'}>Texto</MenuItem>
              <MenuItem key='number' value={'number'}>Numerico</MenuItem>
              <MenuItem key='file' value={'file'}>Archivo</MenuItem>
              <MenuItem key='date' value={'date'}>Fecha</MenuItem>
              <MenuItem key='list' value={'list'}>Lista</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid id='fields-rows' container direction='row' justifyContent="center" style={{padding:'5px'}}>
      <Paper style={{padding:'5px'}}>
        <Grid container justifyContent="center">
          <Hidden smDown>
            <Grid container item xs={8} alignItems="center" justifyContent="center">
              { editing ? renderTextField() : renderInputField() }
            </Grid>
            <Grid container item xs={1} alignItems="center" justifyContent="center">
              <Grid item>
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
                  onChange={ openFavoriteDialog }
                />
              </Grid>
              <Dialog
                open={favoriteDialog}
                onClose={closeFavoriteDialog}
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
                  <Button onClick={closeFavoriteDialog} color="secondary">
                    Cancelar
                  </Button>
                  <Button color={ colorButton() } autoFocus onClick={ checkFavoriteField } variant="contained">
                    { favourite ? "Quitar": "Añadir"}
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid container item xs={1} alignItems="center" justifyContent="center">
              <Grid item>
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
                  onChange={ openPrintableDialog }
                />
              </Grid>
              <Dialog
                open={printableDialog}
                onClose={closePrintableDialog}
                aria-labelledby="print-aletrt"
                aria-describedby="print-alert-dialog"
              >
                <DialogTitle id="favorite-alert">
                  { printable === true ? "No imprimir" : "Agregar a formulario de impresión"}
                </DialogTitle>
                <DialogContent>
                  { printable === true ? "Este campo dejará de aparecer en el formato de impresión" : "Se marcará este campo para aparecer en el formulario de impresión"}
                </DialogContent>
                <DialogActions>
                  <Button onClick={ closePrintableDialog } color="secondary">
                    Cancelar
                  </Button>
                  <Button color={ colorButton() } autoFocus onClick={ checkPrintableField } variant="contained">
                    { printable ? "Quitar" : "Añadir"}
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid container item xs={1} alignItems="center" justifyContent="center">
              <Grid item>
                <Button onClick={ openDeleteDialog }>
                  <DeleteForeverIcon/>
                </Button>
              </Grid>
              <Dialog
                open={deleteDialog}
                onClose={closeDeleteDialog}
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
                  <Button onClick={ closeDeleteDialog } color="secondary">
                    Cancelar
                  </Button>
                  <Button color="primary" autoFocus onClick={ deleteFieldClick }>
                    Borrar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid container item xs={1} alignItems="center" justifyContent="center" onClick={ openStatusDialog }>
              <Grid item>
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
                open={statusDialog}
                onClose={closeStatusDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title"> Deseas {statusField()}</DialogTitle>
                <DialogContent>
                  Realmente deseas { statusField() }
                </DialogContent>
                <DialogActions>
                  <Button onClick={ closeStatusDialog } color="secondary">
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
          </Hidden>
          <Hidden mdUp>
            <Grid container item xs={12} alignItems="center" justifyContent="center">
              { editing ? renderTextField() : renderInputField() }
            </Grid>
            <Grid container item xs={3} alignItems="center" justifyContent="center">
              <Grid item>
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
                  onChange={ openFavoriteDialog }
                />
              </Grid>
              <Dialog
                open={favoriteDialog}
                onClose={closeFavoriteDialog}
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
                  <Button onClick={closeFavoriteDialog} color="secondary">
                    Cancelar
                  </Button>
                  <Button color={ colorButton() } autoFocus onClick={ checkFavoriteField } variant="contained">
                    { favourite ? "Quitar": "Añadir"}
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid container item xs={3} alignItems="center" justifyContent="center">
              <Grid item>
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
                  onChange={ openPrintableDialog }
                />
              </Grid>
              <Dialog
                open={printableDialog}
                onClose={closePrintableDialog}
                aria-labelledby="print-aletrt"
                aria-describedby="print-alert-dialog"
              >
                <DialogTitle id="favorite-alert">
                  { printable === true ? "No imprimir" : "Agregar a formulario de impresión"}
                </DialogTitle>
                <DialogContent>
                  { printable === true ? "Este campo dejará de aparecer en el formato de impresión" : "Se marcará este campo para aparecer en el formulario de impresión"}
                </DialogContent>
                <DialogActions>
                  <Button onClick={ closePrintableDialog } color="secondary">
                    Cancelar
                  </Button>
                  <Button color={ colorButton() } autoFocus onClick={ checkPrintableField } variant="contained">
                    { printable ? "Quitar" : "Añadir"}
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid container item xs={3} alignItems="center" justifyContent="center">
              <Grid item>
                <Button onClick={ openDeleteDialog }>
                  <DeleteForeverIcon/>
                </Button>
              </Grid>
              <Dialog
                open={deleteDialog}
                onClose={closeDeleteDialog}
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
                  <Button onClick={ closeDeleteDialog } color="secondary">
                    Cancelar
                  </Button>
                  <Button color="primary" autoFocus onClick={ deleteFieldClick }>
                    Borrar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid container item xs={3} alignItems="center" justifyContent="center" onClick={ openStatusDialog }>
              <Grid item>
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
                open={statusDialog}
                onClose={closeStatusDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title"> Deseas {statusField()}</DialogTitle>
                <DialogContent>
                  Realmente deseas { statusField() }
                </DialogContent>
                <DialogActions>
                  <Button onClick={ closeStatusDialog } color="secondary">
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
          </Hidden>
        </Grid>
      </Paper>
    </Grid>
  )
}


export default  withStyles(styles)(Field);