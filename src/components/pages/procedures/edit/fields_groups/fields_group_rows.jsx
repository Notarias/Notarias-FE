import React, { useState, useEffect }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import TextField                                from '@material-ui/core/TextField';
import IconButton                               from '@material-ui/core/IconButton';
import Menu                                     from '@material-ui/core/Menu';
import MenuItem                                 from '@material-ui/core/MenuItem';
import Switch                                   from '@material-ui/core/Switch';
import SaveIcon                                 from '@material-ui/icons/Save';
import EditIcon                                 from '@material-ui/icons/Edit';
import ClearIcon                                from '@material-ui/icons/Clear';
import MoreVertIcon                             from '@material-ui/icons/MoreVert';
import { useQuery }                             from '@apollo/client';
import { useMutation }                          from '@apollo/client';
import { CREATE_PROCEDURE_FIELD_VALUE }         from '../../queries_and_mutations/queries';
import { UPDATE_PROCEDURE_FIELD_VALUE }         from '../../queries_and_mutations/queries';
import { GET_PROCEDURE_FIELD_VALUES }           from '../../queries_and_mutations/queries';

const FieldsGroupsRows = (props) => {

  const { procedure, groupFieldValue } = props

  const [selected, setSelected] = useState(null);
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [field, setField] = useState(groupFieldValue && groupFieldValue.proceduresTemplateField);
  const [procedureFieldValue, setProcedureFieldValue] = useState(groupFieldValue && groupFieldValue.procedureFieldValue);
  const [fieldValueActive, setFieldValueActive] = useState(groupFieldValue && groupFieldValue.procedureFieldValue.active);
  const [value, setValue] = useState(groupFieldValue && groupFieldValue.procedureFieldValue.value);
  const [fieldStatus, setFieldStatus] = useState(groupFieldValue && !groupFieldValue.procedureFieldValue.value ? false : true);
  const [saveButtonStatus, setSaveButtonStatus] = useState(true);
  
  const openMenu = ( event ) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  }

  const closeMenu = () => {
    setMenuState(false);
    setAnchorEl(null);
  }

  const cancelMenu = () => {
    setSelected(null);
    setMenuState(false);
    setAnchorEl(null);
  }

  const cancelEditField = () => {
    setValue(procedureFieldValue.value);
    setFieldStatus(true);
  }

  const enableEditField = () => {
    setFieldStatus(false);
  }
  const fieldValueChange = ({ target }) => {
    let { value: targetValue } = target
    setValue(targetValue);
    setSaveButtonStatus(false);    
  }

  const saveNewFieldValue = ( event ) => {
    createProcedureFieldValue ({ variables: {"proceduresTemplateFieldId": field.id, "procedureId": procedure.id, "value": value} })
  }

  const [createProcedureFieldValue, { loading: createProcedureFieldValueLoading }] =
    useMutation(
      CREATE_PROCEDURE_FIELD_VALUE,
      {
        onCompleted(cacheData) {
          setValue(cacheData && cacheData.createProcedureFieldValue.procedureFieldValue.value);
          setFieldValueActive(cacheData && cacheData.createProcedureFieldValue.procedureFieldValue.active);
          setFieldStatus(true);
          setSaveButtonStatus(true);
<<<<<<< HEAD
=======
          console.log("create")
>>>>>>> Build template fields and field groups view and value saving process
        },
        refetchQueries: [
          {
            query: GET_PROCEDURE_FIELD_VALUES,
            variables: { "proceduresTemplateFieldId": field.id, "procedureId": procedure.id }
          }
        ],
        awaitRefetchQueries: true
      }
    )

  
  const updateFieldValue = ( event ) => {
    updateProcedureFieldValue ({ variables: {"id": procedureFieldValue.id, "value": value} })
  }

  const updateFieldValueActive = ( checked ) => {
    updateProcedureFieldValue ({ variables: {"id": procedureFieldValue.id, "active": checked} })
  }

  const [updateProcedureFieldValue, { loading: updateProcedureFieldValueLoading }] =
    useMutation(
      UPDATE_PROCEDURE_FIELD_VALUE,
      {
        onCompleted(cacheData) {
          setValue(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.value);
          setFieldValueActive(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.active);
          setFieldStatus(true);
          setSaveButtonStatus(true);
<<<<<<< HEAD
=======
          console.log("update")
>>>>>>> Build template fields and field groups view and value saving process
        },
        refetchQueries: [
          {
            query: GET_PROCEDURE_FIELD_VALUES,
            variables: { "proceduresTemplateFieldId": field.id, "procedureId": procedure.id }
          }
        ],
        awaitRefetchQueries: true
      }
    )

  const handleChange = (event) => {
    updateFieldValueActive(event.target.checked);
  };

  return (
    <Grid container item style={{ minHeight: '70px' }} key={field.id + 'field-row'} justifyContent="center" >
      {
        <Grid container xs={12} item >
          <Grid container item xs={10} justifyContent="flex-start">
            <Grid item xs={12}>
              <TextField 
                id={field.id}
                key={field.name}
                label={field.name}
                onChange={fieldValueChange}
                value={value}
                disabled={fieldStatus}
                multiline
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item xs={2} width="100%" justifyContent="flex-end">
            <Grid item>
              { !!value === "" ? 
                <IconButton style={{"padding": "10px"}} disabled={true}>
                  <EditIcon/>
                </IconButton>
              :
                <IconButton
                  style={{"padding": "10px"}}
                  onClick={fieldStatus ? enableEditField : cancelEditField}
                >
                  {fieldStatus ? <EditIcon/> : <ClearIcon/>}
                </IconButton>
              }
              <IconButton
                disabled={saveButtonStatus}
                style={{"padding": "10px"}}
                onClick={updateFieldValue}
              >
                <SaveIcon/>
              </IconButton>
              <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu}>
                <MoreVertIcon/>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={menuState}
                onClose={cancelMenu}
              >
                <MenuItem>
                  {fieldValueActive ? "Activo" : "Inactivo"}
                  <Switch
                    onChange={handleChange}
                    color="primary"
                    name="active"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    checked={fieldValueActive}
                  />
                </MenuItem>
                <MenuItem onClick={closeMenu}>My account</MenuItem>
                <MenuItem onClick={closeMenu}>Logout</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      }
    </Grid>
  )
}

<<<<<<< HEAD
export default FieldsGroupsRows;
=======
export default FieldsGroupsRows;
>>>>>>> Build template fields and field groups view and value saving process
