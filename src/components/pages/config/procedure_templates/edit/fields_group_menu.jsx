
import React                        from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';
import StatusRadioButton              from '../index/statusRadioButton';
import IconButton                     from '@material-ui/core/IconButton';
import MoreVertIcon                   from '@material-ui/icons/MoreVert';
import Menu                         from '@material-ui/core/Menu';
import FormControl                    from '@material-ui/core/FormControl';
import Select                         from '@material-ui/core/Select';
import MenuItem                       from '@material-ui/core/MenuItem';
import InputLabel                     from '@material-ui/core/InputLabel';
import AddBoxIcon                   from '@material-ui/icons/AddBox';
import Divider                      from '@material-ui/core/Divider';
import TextField                    from '@material-ui/core/TextField';
import DeleteForeverIcon              from '@material-ui/icons/DeleteForever';


import Dialog                                                   from '@material-ui/core/Dialog';
import DialogContent                                            from '@material-ui/core/DialogContent';
import DialogTitle                                              from '@material-ui/core/DialogTitle';
import DialogActions                                            from '@material-ui/core/DialogActions';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useMutation }                                          from '@apollo/react-hooks';
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELD }                 from '../queries_and_mutations/queries'
import { GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS }         from '../queries_and_mutations/queries'




const FieldsGroupMenu = (props) => {

  const { classes, groupName, active, changeStatus, currentTab, groupId } = props

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openB, setOpenB] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [pristine, setPristine] = React.useState(true)
  const [fieldName, setFieldName] = React.useState("");
  const [style, setStyle] = React.useState("")

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
        variables: { "id": groupId },
      }],
      awaitRefetchQueries: true
    }
  )

  const addNewField = (event) => {
    console.log("PASA CREATE ----",currentTab.id, groupId)
    createProcedureTemplateTabFieldMutation(
      { 
        variables: 
          { "name": fieldName, "tabId": currentTab.id, "style": style, "fieldsGroupId": groupId },
          fetchPolicy: "no-cache",
      }
    )
    // const newTab = { name: tabName, id: proceduresTemplateId }
    // setTabList(tabList.concat([newTab]));//TODO: hacer la mutacion
    setOpenB(false);
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
        // className={ selected ? classes.activeMenuTab : classes.menuTabDefault }
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
              Se eliminara de manera permantente este grupo de campos
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleCloseDialogDelete } color="secondary">
                Cancelar
              </Button>
              <Button
                color="primary"
                autoFocus
                // onClick={ deleteFieldClick }
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
          <ListItemIcon>
            <AddBoxIcon className={ classes.defaultIcon }  onClick={ handleClickOpen}/>
          </ListItemIcon>
          <ListItemText primary="Campo" onClick={ handleClickOpen}/>
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
        </MenuItem>
      </Menu>
    </>
  )
}

export default  withStyles(styles)(FieldsGroupMenu);
