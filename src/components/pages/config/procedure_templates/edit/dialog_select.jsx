import React                                        from 'react';
import Button                                       from '@material-ui/core/Button';
import Dialog                                       from '@material-ui/core/Dialog';
import DialogContent                                from '@material-ui/core/DialogContent';
import DialogTitle                                  from '@material-ui/core/DialogTitle';
import DialogActions                                from '@material-ui/core/DialogActions';
import Radio                                        from '@material-ui/core/Radio';
import Grid                                         from '@material-ui/core/Grid';
import Typography                                   from '@material-ui/core/Typography';
import { styles }                                   from '../styles';
import { withStyles }                               from '@material-ui/core/styles';
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELD }     from '../queries_and_mutations/queries'
import PostAddIcon                                  from '@material-ui/icons/PostAdd';
import { useMutation }                              from '@apollo/react-hooks';
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }        from '../queries_and_mutations/queries'

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



const DialogSelect = ({
  currentTab,
  // setRefreshAll,
  ...props
}) => {
  const { classes } = props
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [fieldName, setFieldName] = React.useState("Editar nombre");
  const[style, setStyle] = React.useState()
  const [favourite, setFavourite] = React.useState()
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
      refetchQueries: [{
        query: GET_PROCEDURE_TEMPLATE_TAB_FIELDS,
        variables: { "id": currentTab && currentTab.id },
      }],
      awaitRefetchQueries: true
    }
  )


  const handleOptionChange = (event, newOptionSelect, setValue, index) => {
    setOptionSelect(newOptionSelect);
    if (index === [0]) {
      return (
        setValue("field")
      )
    } else {
        return "Elige una opcion"
    }
  };


  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (

            <Typography>{children}</Typography>

        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  


  
  const addNewField = (event) => {
    createProcedureTemplateTabFieldMutation(
      { 
        variables: 
          { "name": fieldName, "tabId": currentTab.id },
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

  const addNewFieldsGroup = (event) => {
    // setFieldsGroupList(fieldsGroupList.concat([fieldsGroupList]));
    setOpen(false);
  }

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setDisabled(false);
  };

  const handleNameChange = (event) => {
    setFieldName(event.target.value);
    setPristine(false)
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    setPristine(false)
  };

  const radioSelect = () => {
    if (value === "field" || value === "fieldsGroup") {
      return (
        "Añadir"
      )
    } else {
      return "Elige una opcion"
    }
  };



  return (
    <>
      <Button
        variant="contained"
        onClick={ handleClickOpen }
        className={ classes.buttonHeight }
        disabled={ !currentTab }
      >
      <PostAddIcon/>
      </Button>
      <Dialog open={open} onClose={ handleClose }>
        <DialogTitle 
          id="simple-dialog-title"
          className={ classes.tittleDialogWidth }
        >
          <AppBar position="static"></AppBar>
          <Tabs value={ optionSelect } onChange={ handleOptionChange } aria-label="simple tabs example">
            <Tab label="Añadir un campo" {...a11yProps(0)} />
            <Tab label="Grupo de campos" {...a11yProps(1)} />
          </Tabs>
        </DialogTitle >
        <Divider/>
        <DialogContent>
          <TabPanel value={ optionSelect } index={0}>
            <Grid>
              Para continuar rellena los campos
            </Grid>
            <Grid container item xs={12} alignItems="center" justify="center" direction="row" className={ classes.fieldSelect }>
              <Grid container item xs={6}>
                <TextField 
                  id="standard-basic" 
                  label="Nombre del campo"
                  className={ classes.textInputTittleName }
                  value={ fieldName }
                  onChange={ handleNameChange }
                />
              </Grid>
              <Grid container item xs={4}>
                <FormControl variant="outlined" className={ classes.textFieldTittleType }>
                  <InputLabel id="label-field">Tipo de campo</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    name='name'
                    value={ style }
                    onChange={ handleStyleChange }
                  >
                    <MenuItem key='string' value={'string'}>Texto</MenuItem>
                    <MenuItem key='number' value={'number'}>Numerico</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid container item direction="column"  alignItems="center" justify="center" item xs={2}>
                <FormControlLabel
                  control={<Checkbox icon={<StarBorderIcon />} 
                    checkedIcon={<StarsIcon />} 
                    name="favourite"
                    // checked={ favourite }
                  />}
                  label=" "
                  color="primary"
                  className={ classes.formControlPadding }
                  // onChange={ handleClickOpenb }
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={ optionSelect } index={1}>
            <Grid>
              Para continuar rellena los campos
            </Grid>
            <Grid className={ classes.fieldSelect }>
              algo que mostrar
            </Grid>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="flex-end">
            <Button onClick={ handleClose } color="secondary" >
              Cancelar
            </Button>
            <Button 
              onClick={ value === 'field' ? addNewField : addNewFieldsGroup } 
              color="primary"
              variant="contained"
              disabled={ pristine }
            >
              { radioSelect() }
            </Button>
          </Grid>
        </DialogActions>
        {/* <DialogContent>
          <Grid container alignItems="center"  >
            <Grid 
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="flex-end">
            <Button onClick={ handleClose } color="secondary" >
              Cancelar
            </Button>
            <Button 
              onClick={ value === 'field' ? addNewField : addNewFieldsGroup } 
              color="primary"
              variant="contained"
              disabled={ disabled }
            >
              { radioSelect() }
            </Button>
          </Grid>
        </DialogActions> */} 
      </Dialog>
    </>
  )
}

export default  withStyles(styles)(DialogSelect);
