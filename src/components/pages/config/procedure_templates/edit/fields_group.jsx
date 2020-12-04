import React                        from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';
import AddIcon                      from '@material-ui/icons/Add';
import TextField                    from '@material-ui/core/TextField';
import FieldsGroupFieldList         from './fields_groups_fields_list';
import Paper                        from '@material-ui/core/Paper';
import Divider                      from '@material-ui/core/Divider';
import AddBoxIcon                   from '@material-ui/icons/AddBox';

import Dialog                                                   from '@material-ui/core/Dialog';
import DialogContent                                            from '@material-ui/core/DialogContent';
import DialogTitle                                              from '@material-ui/core/DialogTitle';
import DialogActions                                            from '@material-ui/core/DialogActions';
import FormControl                    from '@material-ui/core/FormControl';
import Select                         from '@material-ui/core/Select';
import MenuItem                       from '@material-ui/core/MenuItem';
import InputLabel                     from '@material-ui/core/InputLabel';

import { useMutation }                                          from '@apollo/react-hooks';
import { GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS }         from '../queries_and_mutations/queries'
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELD }                 from '../queries_and_mutations/queries'


const FieldsGroup = (props) => {

  const { classes, group, groupName, groupId, currentTab } = props
  const [open, setOpen] = React.useState(false);
  const [fieldName, setFieldName] = React.useState("");
  const [style, setStyle] = React.useState("")
  const [pristine, setPristine] = React.useState(true)

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

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
        query: GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS,
        variables: { "fieldsGroupId": groupId },
      }],
      awaitRefetchQueries: true
    }
  )

  const addNewField = (event) => {
    createProcedureTemplateTabFieldMutation(
      { 
        variables: 
          { "name": fieldName, "tabId": currentTab.id, "style": style, "fieldsGroupId": groupId },
          fetchPolicy: "no-cache",
      }
    )
    // const newTab = { name: tabName, id: proceduresTemplateId }
    // setTabList(tabList.concat([newTab]));//TODO: hacer la mutacion
    setOpen(false);
  }

  const handleFieldNameChange = (event) => {
    setFieldName(event.target.value);
    setPristine(false)
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    setPristine(false)
  };

  // const handleGroupNameChange = (event) => {
  //   setGroupName(event.target.value);
  // };
  console.log("gID", groupId)
  return(
    <Paper className={ classes.roundedBorderGruop }>
      <Divider/>
      <Grid container>
        <Grid container  alignItems="center" className={ classes.buttonAddFieldInGroup }>
          <Grid container item xs={5} alignItems="flex-start">
            <TextField 
              id="filled-basic"
              label="Nombre del Grupo"
              value={ groupName } 
              variant="filled" 
              size="small" 
              // inputProps={{ 'aria-label': 'description' }}
              // onChange={ handleGroupNameChange }
            />
            { groupId }
          </Grid>
          <Grid container item xs={2} alignItems="center">
            <Button>
              borrar
            </Button>
          </Grid>
          <Grid container item xs={3} alignItems="center">
            <Button>
              desactivar
            </Button>
          </Grid>
          <Grid container item xs={2} justify="flex-end">
            <Button
              onClick={ handleClickOpen }
              // variant="outlined"
              // color="primary"
              // size="small"
            >
              <AddBoxIcon/>
            </Button>
          </Grid>
          <Grid>
          <Dialog open={open} onClose={ handleClose }>
            <DialogTitle>
              Añade un campo al grupo { groupName }
            </DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions>
              <Grid container direction="row" justify="flex-end">
                <Button onClick={ handleClose } color="secondary" >
                  Cancelar
                </Button>
                <Button 
                  onClick={ addNewField } 
                  color="primary"
                  variant="contained"
                >
                  "Añadir campo"
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>
          </Grid>
        </Grid>
        <FieldsGroupFieldList
          // addNewField={ addNewField }
          groupId={ groupId }
          // removeFromList={ removeFromList }
        />
      </Grid>
    </Paper>
  )
}

export default  withStyles(styles)(FieldsGroup);
