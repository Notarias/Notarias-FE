import React, { useState, useEffect }                 from 'react';
import Grid                                           from '@material-ui/core/Grid';
import TextField                                      from '@material-ui/core/TextField';
import Button                                         from '@material-ui/core/Button';
import IconButton                                     from '@material-ui/core/IconButton';
import FormControl                                    from '@material-ui/core/FormControl';
import Select                                         from '@material-ui/core/Select';
import MenuItem                                       from '@material-ui/core/MenuItem';
import InputBase                                      from '@material-ui/core/InputBase';
import Paper                                          from '@material-ui/core/Paper';
import Typography                                     from '@material-ui/core/Typography';
import AddIcon                                        from '@material-ui/icons/Add';
import RemoveIcon                                     from '@material-ui/icons/Remove';
import DeleteForeverIcon                              from '@material-ui/icons/DeleteForever';
import SaveIcon                                       from '@material-ui/icons/Save';
import CreateIcon                                     from '@material-ui/icons/Create';
import SettingsIcon                                   from '@material-ui/icons/Settings';
import { withStyles }                                 from '@material-ui/core/styles';
import { styles }                                     from '../styles';
import { useMutation }                                from '@apollo/client';
import { UPDATE_PROCEDURES_TEMPLATE_TAB_FIELD }       from '../queries_and_mutations/queries'
import { DESTROY_PROCEDURES_TEMPLATE_TAB_FIELD }      from '../queries_and_mutations/queries'
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }          from '../queries_and_mutations/queries'
import EditDropdownOption                             from './edit_dropdown_option';
import FieldSettingsDialog                            from './field_settings_dialog';
import DeleteFieldDialog                              from './delete_field_dialog';


const INPUT_TYPES = {
  string: "Texto",
  number: "Numerico",
  file: "Archivo",
  date: "Fecha",
  dropdown: "Desplegable"
}

const Field = (props) => {

  const { classes, id, currentTab } = props

  const [settingsDialog, setSettingsDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
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
          setPrintable(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.printable)
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

  const openSettingsDialog = () => {
    setSettingsDialog(true);
  };

  const closeSettingsDialog = () => {
    setSettingsDialog(false);
  };

  const openDeleteDialog = () => {
    setDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const checkFavoriteField = () => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: id, favourite: !favourite }})
    setFavourite(!favourite);
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
  };

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
        <Grid item xs={1}>
          <IconButton
            onClick={ editField }
          >
            <CreateIcon/>
          </IconButton>
        </Grid>
        <Grid container item xs={7} justifyContent='flex-start'>
          <InputBase
            value={ name }
            readOnly={true}
            inputProps={{ 'aria-label': 'naked' }}
            fullWidth
            style={{paddingLeft: '5px'}}
          />
        </Grid>
        <Grid container item xs={4} alignItems='center'>
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
        <Grid item xs={1}>
          <Button
            onClick={ updateField }
          >
            <SaveIcon />
          </Button>
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="standard-basic"
            value={ name }
            onChange={ handleNameChange }
            variant="outlined"
            style={{'backgroundColor': 'rgb(200, 200, 200)'}}
          />
        </Grid>
        <Grid item xs={4}>
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
    <Grid id='fields-rows' container item xs={12} direction='column' justifyContent="center" style={{padding:'5px'}}>
      <Paper style={{padding:'5px'}}>
        <Grid container item xs={12} direction='row' justifyContent="center">
          <Grid container item xs={10} alignItems="center" justifyContent="center">
            { editing ? renderTextField() : renderInputField() }
          </Grid>
          <Grid container item xs={1} alignItems="center" justifyContent="center">
            <Grid item>
              <IconButton onClick={ openSettingsDialog }>
                <SettingsIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid container item xs={1} alignItems="center" justifyContent="center">
            <Grid item>
              <IconButton color="secondary" onClick={ openDeleteDialog }>
                <DeleteForeverIcon/>
              </IconButton>
            </Grid>
          </Grid>
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
      <FieldSettingsDialog
        settingsDialog={settingsDialog}
        closeSettingsDialog={closeSettingsDialog}
        checkFavoriteField={checkFavoriteField}
        checkPrintableField={checkPrintableField}
        checkPrintPositionField={checkPrintPositionField}
        changeFieldStatus={changeFieldStatus}
        active={active}
        favourite={favourite}
        printable={printable}
        printPosition={printPosition}
      />
      <DeleteFieldDialog
        deleteDialog={deleteDialog}
        closeDeleteDialog={closeDeleteDialog}
        deleteFieldClick={deleteFieldClick}
        fieldName={name}
      />
    </Grid>
  )
}

export default  withStyles(styles)(Field);
