import React, { useState, useEffect }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import IconButton                               from '@material-ui/core/IconButton';
import Menu                                     from '@material-ui/core/Menu';
import MenuItem                                 from '@material-ui/core/MenuItem';
import Switch                                   from '@material-ui/core/Switch';
import MoreVertIcon                             from '@material-ui/icons/MoreVert';
import { useQuery }                             from '@apollo/client';
import { useMutation }                          from '@apollo/client';
import { UPDATE_PROCEDURE_FIELD_VALUE }         from '../../queries_and_mutations/queries';
import { GET_PROCEDURE_FIELD_VALUES }           from '../../queries_and_mutations/queries';
import { GET_PROCEDURES_AUDITLOG }              from '../../queries_and_mutations/queries';
import TextField                                from './text_field';
import NumberField                              from './number_field';
import FileField                                from './file_field';

const FieldsRows = (props) => {

  const { procedure, field } = props
  
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fieldValueId, setFieldValueId] = useState();
  const [fieldValue, setFieldValue] = useState("");
  const [fieldValueActive, setFieldValueActive] = useState(true);
  const [initFieldValue, setInitFieldValue] = useState("");
  const [saveButtonStatus, setSaveButtonStatus] = useState(true);
  const [fieldStatus, setFieldStatus] = useState(true);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  
  const {  loading, data } = useQuery(
    GET_PROCEDURE_FIELD_VALUES,
    {
      variables: { "proceduresTemplateFieldId": field.id, "procedureId": procedure.id }
    }
  );
  
  useEffect(() => {
    if(data && data.procedureFieldValue) {
      setFieldValueId(data.procedureFieldValue.id);
      setInitFieldValue(data.procedureFieldValue.value);
      setFieldValue(data.procedureFieldValue.value);
      setFieldValueActive(data.procedureFieldValue.active);
      setFileName(data.procedureFieldValue.fileName)
      setFileUrl(data.procedureFieldValue.fileUrl)
    }
  }, [loading, data]);

  const openMenu = ( event ) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  }

  const cancelMenu = () => {
    setMenuState(false);
    setAnchorEl(null);
  }

  const updateFieldValue = ( event ) => {
    updateProcedureFieldValue (
      {
        variables: {
          "id": fieldValueId && fieldValueId,
          "value": fieldValue,
          "proceduresTemplateFieldId": field.id,
          "procedureId": procedure.id
        }
      }
    )
  }

  const updateFieldValueFile = ( files, event ) => {
    updateProcedureFieldValueFile (
      {
        variables: {
          "id": fieldValueId && fieldValueId,
          "value": "",
          "file": files[0],
          "proceduresTemplateFieldId": field.id,
          "procedureId": procedure.id
        }
      }
    )
  }

  const updateFieldValueActive = ( checked ) => {
    updateProcedureFieldValue (
      {
        variables: {
          "id": fieldValueId && fieldValueId,
          "active": checked,
          "proceduresTemplateFieldId": field.id,
          "procedureId": procedure.id
        }
      }
    )
  }

  const [updateProcedureFieldValue] =
    useMutation(
      UPDATE_PROCEDURE_FIELD_VALUE,
      {
        onCompleted(cacheData) {
          setInitFieldValue(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.value);
          setFieldValueId(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.id);
          setFieldValueActive(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.active);
          setFieldStatus(true);
          setSaveButtonStatus(true);
        },
        refetchQueries: [
          {
            query: GET_PROCEDURE_FIELD_VALUES,
            variables: { "proceduresTemplateFieldId": field.id, "procedureId": procedure.id }
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
          setInitFieldValue(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.value);
          setFieldValueId(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.id);
          setFieldValueActive(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.active);
          setFieldStatus(true);
          setSaveButtonStatus(true);
        },
        refetchQueries: [
          {
            query: GET_PROCEDURE_FIELD_VALUES,
            variables: { "proceduresTemplateFieldId": field.id, "procedureId": procedure.id }
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

  const renderFieldType = (field) => {
    switch (field.style) {
      case "string":
        return (
          <TextField
            field={field}
            initFieldValue={initFieldValue}
            fieldValue={fieldValue}
            setFieldValue={setFieldValue}
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
            field={field}
            initFieldValue={initFieldValue}
            fieldValue={fieldValue}
            setFieldValue={setFieldValue}
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
            field={field}
            fileName={fileName}
            fileUrl={fileUrl}
            updateFieldValueFile={updateFieldValueFile}
            updateProcedureFieldValueFileLoading={updateProcedureFieldValueFileLoading}
          />
        )
      default:
        return("")
    }
  }

  return (
    <Grid container item style={{ minHeight: '70px' }} key={field.id + 'field-row'} justifyContent="center" >
      <Grid container xs={12} item >
        {
          renderFieldType(field)
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
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FieldsRows;
