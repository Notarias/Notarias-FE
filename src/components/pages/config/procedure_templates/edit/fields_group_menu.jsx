
import React                                                    from 'react';
import { styles }                                               from '../styles';
import { withStyles }                                           from '@material-ui/core/styles';
import Grid                                                     from '@material-ui/core/Grid';
import Button                                                   from '@material-ui/core/Button';
import StatusRadioButton                                        from '../index/statusRadioButton';
import IconButton                                               from '@material-ui/core/IconButton';
import MoreVertIcon                                             from '@material-ui/icons/MoreVert';
import Menu                                                     from '@material-ui/core/Menu';
import FormControl                                              from '@material-ui/core/FormControl';
import Select                                                   from '@material-ui/core/Select';
import MenuItem                                                 from '@material-ui/core/MenuItem';
import InputLabel                                               from '@material-ui/core/InputLabel';
import AddBoxIcon                                               from '@material-ui/icons/AddBox';
import Divider                                                  from '@material-ui/core/Divider';
import TextField                                                from '@material-ui/core/TextField';
import DeleteForeverIcon                                        from '@material-ui/icons/DeleteForever';
import Typography                                               from '@material-ui/core/Typography';
import Dialog                                                   from '@material-ui/core/Dialog';
import DialogContent                                            from '@material-ui/core/DialogContent';
import DialogTitle                                              from '@material-ui/core/DialogTitle';
import DialogActions                                            from '@material-ui/core/DialogActions';
import ListItemIcon                                             from '@material-ui/core/ListItemIcon';
import ListItemText                                             from '@material-ui/core/ListItemText';
import { useMutation }                                          from '@apollo/client';
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELD }                 from '../queries_and_mutations/queries'
import { GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS }         from '../queries_and_mutations/queries'
import { DESTROY_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }        from '../queries_and_mutations/queries'
import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }            from '../queries_and_mutations/queries'


const FieldsGroupMenu = (props) => {

  const { classes, groupName, active, changeStatus, currentTab, groupId } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openB, setOpenB] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [fieldName, setFieldName] = React.useState("");
  const [style, setStyle] = React.useState("")
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = React.useState(false)
  const inputsList = ["name", "style"]

  const [createProcedureTemplateTabFieldMutation] =
  useMutation(
    CREATE_PROCEDURES_TEMPLATE_TAB_FIELD,
    {
      onError(apolloError) {
        setErrors(apolloError)
      },
      onCompleted(cacheData) {
        setError(false)
        setPristine(true)
        setOpenB(false);
        setAnchorEl(null)
      },
      fetchPolicy: "no-cache",
      refetchQueries: [{
        query: GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS,
        variables: { "id": groupId },
      }],
      awaitRefetchQueries: true
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

  const addNewField = (event) => {
    createProcedureTemplateTabFieldMutation(
      { 
        variables: 
          { "name": fieldName, "tabId": currentTab.id, "style": style, "fieldsGroupId": groupId },
          fetchPolicy: "no-cache",
      }
    )
  }

  const [destroyProceduresTemplateTabFieldsGroupMutation] =
  useMutation(
    DESTROY_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS, 
    {
      refetchQueries: [{
        query: GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
        variables: { "id": currentTab && currentTab.id },
      }],
      awaitRefetchQueries: true
    }
  )

  const deleteFieldsGroupClick = () => {
    destroyProceduresTemplateTabFieldsGroupMutation(
      { variables: { id: groupId } }
    )
  }

  const handleFieldNameChange = (event) => {
    setFieldName(event.target.value);
    setPristine(false)
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    setPristine(false)
  };


  let open = Boolean(anchorEl);

  const handleClickOpen = () => {
    setOpenB(true);
  }

  const handleClose = () => {
    setOpenB(false);
  };

  const handleClickOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleCloseMenu = () => {
    setAnchorEl(null)
  };

  const handleClickOpenDialogDelete = () => {
    setOpenDialog(true);
  }

  const handleCloseDialogDelete = () => {
    setOpenDialog(false);
  };



  return(
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={ handleClickOpenMenu }
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        keepMounted
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleCloseMenu }
      >
        <MenuItem onClick={ handleClickOpenDialogDelete }>
          <ListItemIcon>
            <DeleteForeverIcon className={ classes.defaultIcon }/>
          </ListItemIcon>
          <ListItemText primary="Borrar" />
        </MenuItem>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialogDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Eliminar grupo"}</DialogTitle>
            <DialogContent>
              Se eliminara de manera permantente este grupo de campos:
              <Typography variant="subtitle2" className={ classes.texPlainTittleName }>
                { groupName }
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleCloseDialogDelete } color="secondary">
                Cancelar
              </Button>
              <Button
                color="primary"
                autoFocus
                onClick={ deleteFieldsGroupClick }
              >
                Borrar
              </Button>
            </DialogActions>
          </Dialog>
        <Divider/>
        <MenuItem>
          <StatusRadioButton
            active={ active }
            changeStatus= { changeStatus }
          />
        </MenuItem>
        <Divider/>
        <MenuItem>
          <ListItemIcon onClick={ handleClickOpen}>
            <AddBoxIcon className={ classes.defaultIcon } />
          </ListItemIcon>
          <ListItemText primary="&#8288;Campo" onClick={ handleClickOpen}/>
          <Dialog open={openB} onClose={ handleClose }>
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
                    error={ !!error["name"] && true }
                    helperText={error["name"] || " "}
                    errorskey={ "name" }
                    name='name'
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
                      error={ !!error["style"] && true }
                      helperText={error["style"] || " "}
                      errorskey={ "style" }
                    >
                      <MenuItem key='string' value={'string'}>Texto</MenuItem>
                      <MenuItem key='number' value={'number'}>Numerico</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid container direction="row" justifyContent="flex-end">
                <Button onClick={ handleClose } color="secondary" >
                  Cancelar
                </Button>
                <Button 
                  onClick={ addNewField } 
                  color="primary"
                  variant="contained"
                  disabled={ pristine }
                >
                  "Añadir campo"
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </Menu>
    </>
  )
}

export default  withStyles(styles)(FieldsGroupMenu);
