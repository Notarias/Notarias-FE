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

const FieldsRows = (props) => {

  const { procedure, field } = props

  const [selected, setSelected] = useState(null);
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fieldValueId, setFieldValueId] = useState();
  const [fieldValue, setFieldValue] = useState("");
  const [fieldValueActive, setFieldValueActive] = useState(true);
  const [initFieldValue, setInitFieldValue] = useState("");
  const [saveButtonStatus, setSaveButtonStatus] = useState(true);
  const [fieldStatus, setFieldStatus] = useState(false);
  
  const {  loading, data, refetch } = useQuery(
    GET_PROCEDURE_FIELD_VALUES,
    {
      variables: { "proceduresTemplateFieldId": field.id, "procedureId": procedure.id },
      fetchPolicy: "no-cache"
    }
  );

  useEffect(() => {
    if(data && data.procedureFieldValue) {
      setFieldValueId(data.procedureFieldValue.id);
      setInitFieldValue(data.procedureFieldValue.value);
      setFieldValue(data.procedureFieldValue.value);
      setFieldValueActive(data.procedureFieldValue.active)
      setFieldStatus(true);
    }
  }, [loading, data]);

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
    setFieldValue(initFieldValue);
    setFieldStatus(true);
  }

  const enableEditField = () => {
    setFieldStatus(false);
  }
  const fieldValueChange = ({ target }) => {
    let { value } = target
    setFieldValue(value);
    if(value === "") {
      setSaveButtonStatus(true);
    } else {
      setSaveButtonStatus(false);
    }
  }

  const [createProcedureFieldValue, { loading: createProcedureFieldValueLoading }] =
  useMutation(
    CREATE_PROCEDURE_FIELD_VALUE,
    {
      onCompleted(cacheData) {
        setInitFieldValue(cacheData && cacheData.createProcedureFieldValue.procedureFieldValue.value);
        setFieldValueId(cacheData && cacheData.createProcedureFieldValue.procedureFieldValue.id);
        setFieldValueActive(cacheData && cacheData.updateProcedureFieldValue.procedureFieldValue.active);
        setFieldStatus(true);
        setSaveButtonStatus(true);
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

  const saveNewFieldValue = ( event ) => {
    createProcedureFieldValue ({ variables: {"proceduresTemplateFieldId": field.id, "procedureId": procedure.id, "value": fieldValue} })
  }
  
  const [updateProcedureFieldValue, { loading: updateProcedureFieldValueLoading }] =
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
          }
        ],
        awaitRefetchQueries: true
      }
    )

  const updateNewFieldValue = ( checked ) => {
    updateProcedureFieldValue ({ variables: {"id": fieldValueId, "value": fieldValue, "active": checked} })
  }

  const handleChange = (event) => {
    updateNewFieldValue(event.target.checked);
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
                value={fieldValue}
                disabled={fieldStatus}
                multiline
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item xs={2} width="100%" justifyContent="flex-end">
            <Grid item>
              { !initFieldValue ? 
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
                onClick={initFieldValue ? updateNewFieldValue : saveNewFieldValue}
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

export default FieldsRows;
