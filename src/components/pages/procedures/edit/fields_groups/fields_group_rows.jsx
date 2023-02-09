import React, { useState }                      from 'react';
import Grid                                     from '@material-ui/core/Grid';
import Typography                               from '@material-ui/core/Typography';
import IconButton                               from '@material-ui/core/IconButton';
import Menu                                     from '@material-ui/core/Menu';
import MenuItem                                 from '@material-ui/core/MenuItem';
import ListItemIcon                             from '@material-ui/core/ListItemIcon';
import Switch                                   from '@material-ui/core/Switch';
import DeleteForeverIcon                        from '@material-ui/icons/DeleteForever';
import MoreVertIcon                             from '@material-ui/icons/MoreVert';
import { useMutation }                          from '@apollo/client';
import { UPDATE_PROCEDURE_FIELD_VALUE }         from '../../queries_and_mutations/queries';
import { GET_PROCEDURE_FIELD_GROUP_VALUES }     from '../../queries_and_mutations/queries';
import { DESTROY_PROCEDURE_FIELD_GROUP_VALUES } from '../../queries_and_mutations/queries';
import { GET_PROCEDURES_AUDITLOG }              from '../../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                       from '../../../../../resolvers/queries';
import client                                   from '../../../../../../src/apollo';
import TextField                                from './text_field';
import NumberField                              from './number_field';
import FileField                                from './file_field';
import DateField                                from './date_field';
import ListField                                from './list_field';

const FieldsGroupsRows = (props) => {

  const { procedure, group, fieldGroupValue } = props
  
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [duplicate] = useState(fieldGroupValue && fieldGroupValue.duplicate);
  const [templateField] = useState(fieldGroupValue && fieldGroupValue.proceduresTemplateField);
  const [procedureFieldValue] = useState(fieldGroupValue && fieldGroupValue.procedureFieldValue);
  const [fieldValueActive, setFieldValueActive] = useState(fieldGroupValue && fieldGroupValue.procedureFieldValue.active);
  const [value, setValue] = useState(fieldGroupValue && fieldGroupValue.procedureFieldValue.value);
  const [fileName, setFileName] = useState(fieldGroupValue && fieldGroupValue.procedureFieldValue.fileName)
  const [fileUrl, setFileUrl] = useState(fieldGroupValue && fieldGroupValue.procedureFieldValue.fileUrl)
  const [fieldStatus, setFieldStatus] = useState(true);
  const [saveButtonStatus, setSaveButtonStatus] = useState(true);

  const openMenu = ( event ) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  }

  const closeMenu = () => {
    setMenuState(false);
    setAnchorEl(null);
  }
  
  const updateFieldValue = ( event ) => {
    updateProcedureFieldValue (
      {
        variables: {
          id: procedureFieldValue && procedureFieldValue.id,
          procedureId: procedure.id,
          proceduresTemplateFieldId: group.fields.proceduresTemplateFieldsGroupId,
          value: value
        }
      }
    )
  }

  const updateFieldValueFile = ( files, event ) => {
    updateProcedureFieldValueFile (
      {
        variables: {
          id: procedureFieldValue && procedureFieldValue.id,
          procedureId: procedure.id,
          proceduresTemplateFieldId: group.fields.proceduresTemplateFieldsGroupId,
          value: "",
          file: files[0]
        }
      }
    )
  }

  const updateFieldValueActive = ( checked ) => {
    updateProcedureFieldValue ({ variables: {"id": procedureFieldValue.id, "active": checked} })
  }
  
  const [updateProcedureFieldValue] =
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
          },
          {
            query: GET_PROCEDURES_AUDITLOG,  
              variables: { "procedureId": procedure.id }
          }
        ],
        awaitRefetchQueries: true
      }
    )

    const [updateProcedureFieldValueFile, { loading: updateProcedureFieldValueFileLoading }] =
    useMutation(
      UPDATE_PROCEDURE_FIELD_VALUE,
      {
        context: { hasUpload: true },
        onCompleted(cacheData) {
          setValue(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.value);
          setFieldValueActive(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.active);
          setFileName(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.fileName);
          setFileUrl(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.fileUrl);
          setFieldStatus(true);
          setSaveButtonStatus(true);
        },
        refetchQueries: [
          {
            query: GET_PROCEDURE_FIELD_GROUP_VALUES,
            variables: { "fieldGroupId": group.id, "procedureId": procedure.id }
          },
          {
            query: GET_PROCEDURES_AUDITLOG,  
              variables: { "procedureId": procedure.id }
          }
        ],
        awaitRefetchQueries: true
      }
    )

  const handleChange = (event) => {
    updateFieldValueActive(event.target.checked);
  };

  const [destroyProcedureFieldGroupValues] =
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
            return(error.message)
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
          },
          {
            query: GET_PROCEDURES_AUDITLOG,  
              variables: { "procedureId": procedure.id }
          }
        ],
        awaitRefetchQueries: true
      }
    )

  const destroyFieldGroup = () => {
    destroyProcedureFieldGroupValues({ variables: {"id": fieldGroupValue.id} });
    closeMenu();
  }

  const renderFieldType = (fieldType) => {
    switch (fieldType.style) {
      case "string":
        return (
          <TextField
            templateField={templateField}
            procedureFieldValue={procedureFieldValue}
            value={value}
            setValue={setValue}
            fieldStatus={fieldStatus}
            setFieldStatus={setFieldStatus}
            saveButtonStatus={saveButtonStatus}
            setSaveButtonStatus={setSaveButtonStatus}
            updateFieldValue={updateFieldValue}
          />
        )
      case "number":
        return (
          <NumberField
            templateField={templateField}
            initFieldValue={procedureFieldValue}
            value={value}
            setValue={setValue}
            fieldStatus={fieldStatus}
            setFieldStatus={setFieldStatus}
            saveButtonStatus={saveButtonStatus}
            setSaveButtonStatus={setSaveButtonStatus}
            updateFieldValue={updateFieldValue}
          />
        )
      case "file":
        return (
          <FileField
            templateField={templateField}
            fileName={fileName && fileName}
            fileUrl={fileUrl && fileUrl}
            updateFieldValueFile={updateFieldValueFile}
            updateProcedureFieldValueFileLoading={updateProcedureFieldValueFileLoading}
          />
        )
      case "date":
        return (
          <DateField
            templateField={templateField}
            initFieldValue={procedureFieldValue}
            value={value}
            setValue={setValue}
            fieldStatus={fieldStatus}
            setFieldStatus={setFieldStatus}
            saveButtonStatus={saveButtonStatus}
            setSaveButtonStatus={setSaveButtonStatus}
            updateFieldValue={updateFieldValue}
          />
        )
      case "list":
        return (
          <ListField
            templateField={templateField}
            initFieldValue={procedureFieldValue}
            value={value}
            setValue={setValue}
            fieldStatus={fieldStatus}
            setFieldStatus={setFieldStatus}
            saveButtonStatus={saveButtonStatus}
            setSaveButtonStatus={setSaveButtonStatus}
            updateFieldValue={updateFieldValue}
          />
        )
      default:
        return("")
    }
  }

  return (
    <Grid container item style={{ minHeight: '70px' }} key={templateField.id + 'field-row'} justifyContent="center" >
      {
        <Grid container xs={12} item >
          {
            renderFieldType(templateField)
          }
          <Grid item xs={1} width="100%">
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
