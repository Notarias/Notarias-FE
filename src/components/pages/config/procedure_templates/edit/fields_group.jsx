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

import Dialog                                                   from '@material-ui/core/Dialog';
import DialogContent                                            from '@material-ui/core/DialogContent';
import DialogTitle                                              from '@material-ui/core/DialogTitle';
import DialogActions                                            from '@material-ui/core/DialogActions';
import FormControl                    from '@material-ui/core/FormControl';
import Select                         from '@material-ui/core/Select';
import MenuItem                       from '@material-ui/core/MenuItem';
import InputLabel                     from '@material-ui/core/InputLabel';

import { useMutation }                                          from '@apollo/react-hooks';

import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }                from '../queries_and_mutations/queries'

import { UPDATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }         from '../queries_and_mutations/queries'
import Typography                         from '@material-ui/core/Typography';

import FieldsGroupMenu from './fields_group_menu';
import SaveIcon                           from '@material-ui/icons/Save';
import CreateIcon                         from '@material-ui/icons/Create'



const FieldsGroup = (props) => {

  const { classes, group, groupId, currentTab, active } = props
  const [groupName, setGroupName] = React.useState(group.name);

  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(true);
  

  const [updateProceduresTemplateTabFieldsGroupMutation, updateGroupProcessInfo] =
  useMutation(
    UPDATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
    {
      // onError(apolloError) {
      //   setErrors(apolloError)
      // },
      update(store, cacheData) {
        // console.log(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.favourite, "---2--")
        // // setError(false)
        // setPristine(true)
        // const clientAttrsData = store.readQuery({ query: GET_CLIENT_ATTRIBUTE });
      },
      refetchQueries: [{
        query: GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
        variables: { "id": currentTab.id },
      }],
      awaitRefetchQueries: true
    }
  )

  const updateFieldsGroup = (event) => {
    console.log(groupId, "-------------------------------------------------------")
    updateProceduresTemplateTabFieldsGroupMutation({ variables: { "id": groupId, "name": groupName, "active": active }})
    setEditing(!editing)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const changeStatus = () => {
    return( true )
  }

  const editFieldGroup = () => {
    setEditing(!editing)
  }

  const markStatus = () => {
    if(!active) {
      return  classes.statusTemplateRow 
    }
  }

  const renderTextGroupName = () => {
    return(
      <>
        <Grid className={ classes.textPlainGoupName } onClick={ editFieldGroup }>
          <Typography variant="overline">
            { groupName }
          </Typography>
        </Grid>
          <Button onClick={ editFieldGroup } className={ classes.editGroupNameIcon }>
            <CreateIcon />
          </Button>
      </>
    )
  }

  const renderInputGroupName = () => {
    return(
      <>
        <TextField 
          id="filled-basic"
          label="Nombre del Grupo"
          value={ groupName } 
          variant="filled" 
          size="small"
          className={ classes.inputTittleGroupName }
          onChange={ handleGroupNameChange }
        />
        <Button  onClick={ updateFieldsGroup }>
          <SaveIcon color="primary" className={ classes.saveGroupNameIcon }/>
        </Button>
      </>
    )
  }


  console.log("actiGRF",  group.active )
  return(
    <Paper className={ classes.roundedBorderGruop }>
      <Divider/>
      <Grid container>
        <Grid container  alignItems="center" className={ markStatus() }>
          <Grid container item xs={11} alignItems="flex-start">
            { editing ? renderTextGroupName() : renderInputGroupName() }
          </Grid>
          <Grid container item xs={1} alignItems="center" justify="flex-end">
            <FieldsGroupMenu
              groupName={ groupName }
              active={ active }
              changeStatus={ changeStatus }
              editFieldGroup={ editFieldGroup }
              currentTab={ currentTab }
              groupId={ groupId }

            />
          </Grid>
          <Grid>
          {/* <Dialog open={open} onClose={ handleClose }>
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
          </Dialog> */}
          </Grid>
        </Grid>
        <FieldsGroupFieldList

          groupId={ groupId }
          // removeFromList={ removeFromList }
        />
      </Grid>
    </Paper>
  )
}

export default  withStyles(styles)(FieldsGroup);
