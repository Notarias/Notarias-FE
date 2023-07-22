import React, { useState, useEffect }                 from 'react';
import Grid                                           from '@material-ui/core/Grid';
import TextField                                      from '@material-ui/core/TextField';
import StarsIcon                                      from '@material-ui/icons/Stars';
import FormControlLabel                               from '@material-ui/core/FormControlLabel';
import Checkbox                                       from '@material-ui/core/Checkbox';
import StarBorderIcon                                 from '@material-ui/icons/StarBorder';
import Button                                         from '@material-ui/core/Button';
import AddIcon                                        from '@material-ui/icons/Add';
import RemoveIcon                                     from '@material-ui/icons/Remove';
import DeleteForeverIcon                              from '@material-ui/icons/DeleteForever';
import FormControl                                    from '@material-ui/core/FormControl';
import Switch                                         from '@material-ui/core/Switch';
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
import EditDropdownOption from './edit_dropdown_option';


const INPUT_TYPES = {
  string: "Texto",
  number: "Numerico",
  file: "Archivo",
  date: "Fecha",
  dropdown: "Desplegable"
}

const Field = (props) => {

  const { classes, id, currentTab } = props

  const [favoriteDialog, setFavoriteDialog] = useState(false);
  const [printableDialog, setPrintableDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [statusDialog, setStatusDialog] = useState(false);
  const [editing, setEditing] = useState(true);
  const [name, setName] = useState(props.name);
  const [style, setStyle] = useState(props.style);
  const [defaultValue, setDefaultValue] = useState(props.defaultValue || [])
  const [active, setActive] = useState(props.active);
  const [favourite, setFavourite] = useState(props.favourite);
  const [printable, setPrintable] = useState(props.printable);
  const [printPosition, setPrintPosition] = useState(props.printPosition === "bottom")
  const [changeOptions, setChangeOptions] = useState(true);
  const [options, setOptions] = useState([]);
  //const [error, setError] = useState(false);

  const [updateProceduresTemplateTabFieldMutation] =
    useMutation(
      UPDATE_PROCEDURES_TEMPLATE_TAB_FIELD,
      {
        /* onError(apolloError) {
          setErrors(apolloError)
        }, */
        update(store, cacheData) {
          setDefaultValue(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.defaultValue || [])
          setFavourite(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.favourite)
          setActive(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.active)
          setPrintPosition(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.printPosition === "bottom")
          //setError(false)
          setEditing(true)
          setOptions([])

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
    if (style === "dropdown"){
      updateProceduresTemplateTabFieldMutation({ variables: { id: id, name: name, style: style, defaultValue: options}})
    } else {
      updateProceduresTemplateTabFieldMutation({ variables: { id: id, name: name, style: style}})
    }
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
  }

  const checkPrintPositionField = (event) => {
    !printPosition ?
      updateProceduresTemplateTabFieldMutation({ variables: { id: id, printPosition: "bottom" }})
    :
      updateProceduresTemplateTabFieldMutation({ variables: { id: id, printPosition: "top" }})
    setPrintPosition(!printPosition);
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
          variables: { "id": currentTab && currentTab.id }
        }],
        awaitRefetchQueries: true
      }
    )

  const deleteFieldClick = () => {
    destroyProceduresTemplateTabFieldMutation( { variables: { id: id } })
    setDeleteDialog(false);
  }

  const editField = () => {
    setEditing(!editing)
    defaultValue.map((option)=>{
      options.push(option)
      return("")
    })
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

  const addOption = (option, index) => {
    options[index] = option
    setOptions(options)
  }

  const removeLastOption = () => {
    options.pop()
    setChangeOptions(!changeOptions)
  }

  const addSelectOption = () => {
    options.push("")
    setChangeOptions(!changeOptions)
  }

  useEffect(() => {
    setChangeOptions(!changeOptions)
  },[options])


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
            { INPUT_TYPES[style] }
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
              <MenuItem key='dropdown' value={'dropdown'}>Desplegable</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid id='fields-rows' container item xs={12} direction='row' justifyContent="center" style={{padding:'5px'}}>
      <Paper style={{padding:'5px'}}>
        <Grid container item xs={12} direction='row' justifyContent="center">
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
            </Grid>
            <Grid container item xs={1} alignItems="center" justifyContent="center">
              <Grid item>
                <Button onClick={ openDeleteDialog }>
                  <DeleteForeverIcon/>
                </Button>
              </Grid>
            </Grid>
            <Grid container item xs={1} alignItems="center" justifyContent="center" onClick={ openStatusDialog }>
              <Grid item>
                { active ?
                  <Button>
                    <RadioButtonCheckedIcon className={classes.radioButtonActiveGreen}/>
                  </Button>
                :
                  <Button>
                    <RadioButtonUncheckedIcon color="secondary" className={ classes.defaultIcon }/>
                  </Button>
                }
              </Grid>
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
            </Grid>
            <Grid container item xs={3} alignItems="center" justifyContent="center">
              <Grid item>
                <Button onClick={ openDeleteDialog }>
                  <DeleteForeverIcon/>
                </Button>
              </Grid>
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
            </Grid>
          </Hidden>
        </Grid>
        { style === 'dropdown' ?
          editing ?
            <Grid container item xs={12} direction='column' style={{padding:'5px'}}>
              {defaultValue && defaultValue.map((option, index) => {
                return(
                  <Grid key={`select-field-option-${index}`} item xs={12}>
                    <TextField
                      id="standard-basic"
                      value={ option }
                      variant="outlined"
                      size='small'
                      fullWidth
                      disabled
                    />
                  </Grid>
                )
              })}
            </Grid>
          :
            <Grid container item xs={12} direction='column' justifyContent='center' alignItems='stretch' style={{padding:'5px'}}>
              <Grid item xs={12} >
                <Grid container direction='row' justifyContent='center' alignItems='center' style={{paddingTop:'5px'}}>
                  <Grid item xs={8} style={{padding:'5px'}}>
                    {options && options.map((option, index) => {
                      return(
                        <Grid key={`select-field-option-${index}`} item xs={12} style={{paddingTop:'5px'}}>
                          <EditDropdownOption
                            index={index}
                            option={option}
                            addOption={addOption}
                            setChangeOptions={setChangeOptions}
                            changeOptions={changeOptions}
                          />
                        </Grid>
                      )
                    })}
                  </Grid>
                  <Grid item xs={4} style={{padding:'5px'}}>
                    <Grid item xs={12} style={{paddingTop:'5px'}}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={ addSelectOption }
                        fullWidth
                        >
                        Agregar Opcion <AddIcon/>
                      </Button>
                    </Grid>
                    <Grid item xs={12} style={{paddingTop:'5px'}}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={ removeLastOption }
                        fullWidth
                        >
                        Eliminar Opcion <RemoveIcon/>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
        :
          ""
        }
      </Paper>

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
      <Dialog
        open={printableDialog}
        onClose={closePrintableDialog}
        aria-labelledby="print-aletrt"
        aria-describedby="print-alert-dialog"
      >
        <DialogTitle id="favorite-alert">
          Preferencias de Imprimibles
        </DialogTitle>
        <DialogContent>
          <Grid>
            <Grid>
              <FormControlLabel
                control={
                  <Switch
                    checked={printable}
                    onChange={checkPrintableField}
                    color="primary"
                    name={"printable"}
                  />
                }
                label={printable ? 
                  "El campo aparecera en el formato imprimible del presupuesto"
                :
                  "El campo no aparecerea en el formato imprimible del presupuesto"
                }
              />
            </Grid>
            <Grid>
              <FormControlLabel
                disabled={!printable}
                control={
                  <Switch
                    checked={printPosition}
                    onChange={checkPrintPositionField}
                    color="primary"
                    name={"printPosition"}
                  />
                }
                label={printPosition ?
                  "El campo se imprimira al fondo del presupuesto"
                :
                  "El campo se imprimira al tope del presupuesto"
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={ closePrintableDialog } >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
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
  )
}


export default  withStyles(styles)(Field);