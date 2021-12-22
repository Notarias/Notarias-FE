import React, { useState }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography                               from '@material-ui/core/Typography';
import IconButton                               from '@material-ui/core/IconButton';
import Menu                                     from '@material-ui/core/Menu';
import MenuItem                                 from '@material-ui/core/MenuItem';
import ListItemIcon                             from '@material-ui/core/ListItemIcon';
import Switch                                   from '@material-ui/core/Switch';
import SaveIcon                                 from '@material-ui/icons/Save';
import EditIcon                                 from '@material-ui/icons/Edit';
import ClearIcon                                from '@material-ui/icons/Clear';
import DeleteForeverIcon                        from '@material-ui/icons/DeleteForever';
import MoreVertIcon                             from '@material-ui/icons/MoreVert';
import { useMutation }                          from '@apollo/client';
import { UPDATE_PROCEDURE_FIELD_VALUE }         from '../../queries_and_mutations/queries';
import { GET_PROCEDURE_FIELD_GROUP_VALUES }     from '../../queries_and_mutations/queries';
import { DESTROY_PROCEDURE_FIELD_GROUP_VALUES } from '../../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                       from '../../../../../resolvers/queries';
import client                                   from '../../../../../../src/apollo';

const FieldsGroupsRows = (props) => {

  const { procedure, group, fieldGroupValue } = props

  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [duplicate, setDuplicate] = useState(fieldGroupValue && fieldGroupValue.duplicate);
  const [field, setField] = useState(fieldGroupValue && fieldGroupValue.proceduresTemplateField);
  const [procedureFieldValue, setProcedureFieldValue] = useState(fieldGroupValue && fieldGroupValue.procedureFieldValue);
  const [fieldValueActive, setFieldValueActive] = useState(fieldGroupValue && fieldGroupValue.procedureFieldValue.active);
  const [value, setValue] = useState(fieldGroupValue && fieldGroupValue.procedureFieldValue.value);
  const [fieldStatus, setFieldStatus] = useState(fieldGroupValue && !fieldGroupValue.procedureFieldValue.value ? false : true);
  const [saveButtonStatus, setSaveButtonStatus] = useState(true);
  
  const openMenu = ( event ) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  }

  const closeMenu = () => {
    setMenuState(false);
    setAnchorEl(null);
  }

  const cancelEditField = () => {
    setValue(procedureFieldValue.value);
    setFieldStatus(true);
    setSaveButtonStatus(true);
  }

  const enableEditField = () => {
    setFieldStatus(false);
  }
  const fieldValueChange = ({ target }) => {
    let { value: targetValue } = target
    setValue(targetValue);
    setSaveButtonStatus(false);
  }
  
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
        },
        refetchQueries: [
          {
            query: GET_PROCEDURE_FIELD_GROUP_VALUES,
            variables: { "fieldGroupId": group.id, "procedureId": procedure.id }
          }
        ],
        awaitRefetchQueries: true
      }
    )

  const handleChange = (event) => {
    updateFieldValueActive(event.target.checked);
  };

  const [destroyProcedureFieldGroupValues, { loading: destroyProcedureFieldGroupValuesLoading }] =
    useMutation(
      DESTROY_PROCEDURE_FIELD_GROUP_VALUES,
      { onCompleted(cacheData) {
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Campo eliminado con éxito",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
        },
        onError(errorData) {
          let errorsHash = {}
          errorData.graphQLErrors.map((error) => {
            errorsHash[error.extensions.attribute] = error.message
          })
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: errorsHash.duplicate,
                type: "error",
                __typename: "globalMessage"
              }
            }
          })
        },
        refetchQueries: [
          {
            query: GET_PROCEDURE_FIELD_GROUP_VALUES,
            variables: { "fieldGroupId": group.id, "procedureId": procedure.id }
          }
        ],
        awaitRefetchQueries: true
      }
    )

  const destroyFieldGroup = () => {
    destroyProcedureFieldGroupValues({ variables: {"id": fieldGroupValue.id} });
    closeMenu();
  }
  
  return (
    <Grid container item style={{ minHeight: '70px' }} key={field.id + 'field-row'} justifyContent="center" >
      {
        <Grid container xs={12} item >
          <Grid container item xs={10} justifyContent="flex-start">
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor={field.id}>{field.name}</InputLabel>
                <Input
                  id={field.id}
                  key={field.name}
                  label={field.name}
                  value={value}
                  onChange={fieldValueChange}
                  disabled={fieldStatus}
                  size="small"
                  variant="outlined"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="cancel_edit"
                        onClick={cancelEditField}
                        edge="end"
                      >
                        {fieldStatus ? "" : <ClearIcon/>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={1} width="100%" justifyContent="center">
            <IconButton
              disabled={saveButtonStatus}
              style={{"padding": "10px"}}
              onClick={updateFieldValue}
            >
              <SaveIcon color={saveButtonStatus ? "" : "primary"}/>
            </IconButton>
          </Grid>
          <Grid item xs={1} width="100%" justifyContent="flex-end">
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu}>
              <MoreVertIcon/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={menuState}
              onClose={closeMenu}
            >
              <MenuItem disabled={!fieldStatus}>
                <ListItemIcon onClick={enableEditField}>
                  <EditIcon fontSize="small"/>
                </ListItemIcon>
                <Typography>
                  Editar
                </Typography>
              </MenuItem>
              <MenuItem onClick={destroyFieldGroup} disabled={!duplicate}>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" color="secondary"/>
                </ListItemIcon>
                <Typography>
                  Eliminar
                </Typography>
              </MenuItem>
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
            </Menu>
          </Grid>
        </Grid>
      }
    </Grid>
  )
}

export default FieldsGroupsRows;
