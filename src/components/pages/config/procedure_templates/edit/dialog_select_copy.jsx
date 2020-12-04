import React, { Component }                                     from 'react';
import Button                                                   from '@material-ui/core/Button';
import Dialog                                                   from '@material-ui/core/Dialog';
import DialogContent                                            from '@material-ui/core/DialogContent';
import DialogTitle                                              from '@material-ui/core/DialogTitle';
import DialogActions                                            from '@material-ui/core/DialogActions';
import Radio                                                    from '@material-ui/core/Radio';
import Grid                                                     from '@material-ui/core/Grid';
import Typography                                               from '@material-ui/core/Typography';
import { styles }                                               from '../styles';
import { withStyles }                                           from '@material-ui/core/styles';
import { useMutation }                                          from '@apollo/react-hooks';
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }                    from '../queries_and_mutations/queries'
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELD }                 from '../queries_and_mutations/queries'
import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }            from '../queries_and_mutations/queries'
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }         from '../queries_and_mutations/queries'

import AddIcon                              from '@material-ui/icons/Add';

import Tabs   from '@material-ui/core/Tabs';
import Tab    from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Divider                      from '@material-ui/core/Divider';
import StarsIcon                      from '@material-ui/icons/Stars';
import FormControlLabel               from '@material-ui/core/FormControlLabel';
import FormControl                    from '@material-ui/core/FormControl';
import Checkbox                       from '@material-ui/core/Checkbox';
import TextField                      from '@material-ui/core/TextField';
import Paper                          from '@material-ui/core/Paper';
import Select                         from '@material-ui/core/Select';
import MenuItem                       from '@material-ui/core/MenuItem';
import InputLabel                     from '@material-ui/core/InputLabel';
import StarBorderIcon                 from '@material-ui/icons/StarBorder';



const DialogSelectCopy = ({
  currentTab,
  classes,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [renderValue, setRenderValue] = React.useState();
  const [disabled, setDisabled] = React.useState(true);
  const [fieldName, setFieldName] = React.useState("");
  const [style, setStyle] = React.useState("")
  const [favourite, setFavourite] = React.useState(false)
  const [groupFieldName, setGroupFieldName] = React.useState("");
  const [optionSelect, setOptionSelect] = React.useState(0);
  const [pristine, setPristine] = React.useState(true)

  const [createProcedureTemplateTabFieldMutation, createProcessInfo] =
    useMutation(
      CREATE_PROCEDURES_TEMPLATE_TAB_FIELD,
      {
        // onError(apolloError) {
        //   setErrors(apolloError)
        // },
        onCompleted(cacheData) {
          // setRefreshAll('RefreshFields' + cacheData.createProceduresTemplateField.proceduresTemplateField.id)
          // setError(false)
          // const proceduresTemplateTabData = store.readQuery({
          //   query: GET_PROCEDURES_TEMPLATE_TABS, 
          //   variables: { "proceduresTemplateId": proceduresTemplateId }
          // });
          // console.log("cacheData", cacheData, proceduresTemplateTabData)
          // clientAttrsData.clientAttributes.push(
          //   cacheData.data.createClientAttribute.clientAttribute 
          // )
          // store.writeQuery({ query: GET_CLIENT_ATTRIBUTE, data: clientAttrsData });
          // setId(cacheData.data.createClientAttribute.clientAttribute.id)
          // )
          // store.writeQuery({ query: GET_PROCEDURES_TEMPLATE_TABS, data: clientAttrsData });
        },
        fetchPolicy: "no-cache",
        refetchQueries: [{
          query: GET_PROCEDURE_TEMPLATE_TAB_FIELDS,
          variables: { "id": currentTab && currentTab.id },
        }],
        awaitRefetchQueries: true
      }
    )


  const addNewField = (event) => {
    createProcedureTemplateTabFieldMutation(
      { 
        variables: 
          { "name": fieldName, "tabId": currentTab.id, "style": style},
          fetchPolicy: "no-cache",
      }
    )
    // const newTab = { name: tabName, id: proceduresTemplateId }
    // setTabList(tabList.concat([newTab]));//TODO: hacer la mutacion
    setOpen(false);
  }

  // const removeFromList = (index) => {
  //   fieldList.splice(index, 1)
  //   let newArray = fieldList.slice()
  //   setfieldList(newArray)
  // }

  const [createProcedureTemplateTabFieldGroupsMutation, createGroupProcessInfo] =
  useMutation(
    CREATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
    {
      // onError(apolloError) {
      //   setErrors(apolloError)
      // },
      onCompleted(cacheData) {
        // setRefreshAll('RefreshFields' + cacheData.createProceduresTemplateField.proceduresTemplateField.id)
        // setError(false)
        // const proceduresTemplateTabData = store.readQuery({
        //   query: GET_PROCEDURES_TEMPLATE_TABS, 
        //   variables: { "proceduresTemplateId": proceduresTemplateId }
        // });
        // console.log("cacheData", cacheData, proceduresTemplateTabData)
        // clientAttrsData.clientAttributes.push(
        //   cacheData.data.createClientAttribute.clientAttribute 
        // )
        // store.writeQuery({ query: GET_CLIENT_ATTRIBUTE, data: clientAttrsData });
        // setId(cacheData.data.createClientAttribute.clientAttribute.id)
        // )
        // store.writeQuery({ query: GET_PROCEDURES_TEMPLATE_TABS, data: clientAttrsData });
      },
      refetchQueries: [{
        query: GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
        variables: { "id": currentTab && currentTab.id },
      }],
      awaitRefetchQueries: true
    }
  )

  const addNewFieldsGroup = (event) => {
    createProcedureTemplateTabFieldGroupsMutation(
      { 
        variables: 
          { "name": groupFieldName, "tabId": currentTab.id },
      }
    )
    // const newTab = { name: tabName, id: proceduresTemplateId }
    // setTabList(tabList.concat([newTab]));//TODO: hacer la mutacion
    setOpen(false);
    // setFieldsGroupList(fieldsGroupList.concat([fieldsGroupList]));
  }

  const fieldHandleClickOpen = (event) => {
    setOpen(true);
    setRenderValue(true);
    setPristine(true)
    setFieldName("")
    setStyle("")
  };

  const groupHandleClickOpen = (event) => {
    setOpen(true);
    setRenderValue(false)
    setPristine(true)
    setGroupFieldName("")
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  //   setDisabled(false);
  // };

  const handleFieldNameChange = (event) => {
    setFieldName(event.target.value);
    setPristine(false)
    console.log("name", fieldName)
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    setPristine(false)
    console.log("style", style)
  };

  const handleFavouriteChange = (event) => {
    setFavourite(!favourite);
    console.log("favourite", favourite)
  };

  const handleFieldGroupNameChange = (event) => {
    setGroupFieldName(event.target.value);
    setPristine(false)
    console.log("GroupName", groupFieldName)
  };

  return (
    <>
      {/* <Button
        variant="contained"
        onClick={ handleClickOpen }
        className={ classes.buttonHeight }
        disabled={ !currentTab }
        variant="outlined"
      >
        { iconButtonType() }
      </Button> */}
      <Grid container justify="center" alignItems="center" className={ classes.addFieldsAndGroupsButton } >
        <Grid container  justify="center" alignItems="center" direction="row" >
          <Grid item xs={4}>
            <Typography variant="button" display="block" gutterBottom>
              {<Button
                variant="contained"
                color="primary"
                size="small"
                disabled={ !currentTab }
                onClick={ fieldHandleClickOpen }
              >
                Campo  <AddIcon className={ classes.addIconMargin }/>
              </Button>}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="button" display="block" gutterBottom>
              {<Button
                variant="contained"
                color="primary"
                size="small"
                disabled={ !currentTab }
                onClick={ groupHandleClickOpen }
              >
                Grupo de Campos <AddIcon className={ classes.addIconMargin }/>
              </Button>}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={ handleClose }>
        <DialogTitle 
          id="simple-dialog-title"
          className={ classes.tittleDialogWidth }
        >
          Rellena los campos para continuar
        </DialogTitle >
        <Divider/>
        <DialogContent>
          <Grid container alignItems="center"  >
            {
              (renderValue)?
                (
                  <Grid container direction="row">
                    <Grid container item xs={6}>
                      <TextField 
                        id="fieldName" 
                        label="Editar nombre"
                        className={ classes.textInputTittleName }
                        value={ fieldName }
                        onChange={ handleFieldNameChange }
                      />
                    </Grid>
                    <Grid container item xs={1}>

                    </Grid>
                    <Grid container item xs={5}>
                      <FormControl variant="outlined" className={ classes.textFieldTittleType }>
                        <InputLabel id="label-field">Selecciona el tipo de campo</InputLabel>
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
                  </Grid>
                )
              :
                (
                  <Grid>
                    <TextField 
                      id="filled-basic"
                      label="Nombre del Grupo"
                      value={ groupFieldName } 
                      variant="filled" 
                      size="small" 
                      // inputProps={{ 'aria-label': 'description' }}
                      onChange={ handleFieldGroupNameChange }
                    />
                  </Grid>
                )
            }
            {/* <Grid 
              container 
              direction="column" 
              // item xs={6} 
              justify="center" 
              alignItems="center" 
              className={ value === 'field' ?  classes.roundedBorderDialog : classes.roundedBorderDialogSelected  }
            >
            <Typography
              variant="button"
            >
              Campo
            </Typography>
            <Radio
              checked={value === 'field'}
              onChange={handleChange}
              value="field"
              name="radio-button-field"
              color="primary"
            />
            <Typography
              variant="caption"
            >
              Agrega un campo a la hoja.
            </Typography>
            </Grid>
            <Grid 
              container 
              direction="column" 
              // item xs={6} 
              justify="center" 
              alignItems="center" 
              className={ value === 'fieldsGroup' ?  classes.roundedBorderDialog : classes.roundedBorderDialogSelected }>
            <Typography
              variant="button"
            >
              Grupo de Campos
            </Typography>
            <Radio
              checked={value === 'fieldsGroup'}
              onChange={handleChange}
              value="fieldsGroup"
              name="radio-button-group"
              color="primary"
            />
            <Typography
              variant="caption"
            >
              Agrega un Grupo de campos a la hoja.
            </Typography>
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="flex-end">
            <Button onClick={ handleClose } color="secondary" >
              Cancelar
            </Button>
            <Button 
              onClick={ renderValue ? addNewField : addNewFieldsGroup } 
              color="primary"
              variant="contained"
              disabled={ pristine }
            >
              { renderValue ? "Añadir campo" : "Añadir grupo"}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default  withStyles(styles)(DialogSelectCopy);
