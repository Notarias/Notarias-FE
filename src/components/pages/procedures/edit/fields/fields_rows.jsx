import React, { useState, useEffect }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
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
      setFieldStatus(!data.procedureFieldValue.value ? false : true);
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
    setSaveButtonStatus(false);    
  }

  const saveNewFieldValue = ( event ) => {
    createProcedureFieldValue ({ variables: {"proceduresTemplateFieldId": field.id, "procedureId": procedure.id, "value": fieldValue} })
  }

  const [createProcedureFieldValue, { loading: createProcedureFieldValueLoading }] =
  useMutation(
    CREATE_PROCEDURE_FIELD_VALUE,
    {
      onCompleted(cacheData) {
        setInitFieldValue(cacheData && cacheData.createProcedureFieldValue.procedureFieldValue.value);
        setFieldValueId(cacheData && cacheData.createProcedureFieldValue.procedureFieldValue.id);
        setFieldValueActive(cacheData && cacheData.createProcedureFieldValue.procedureFieldValue.active);
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

  const updateFieldValue = ( event ) => {
    updateProcedureFieldValue ({ variables: {"id": fieldValueId, "value": fieldValue} })
  }

  const updateFieldValueActive = ( checked ) => {
    updateProcedureFieldValue ({ variables: {"id": fieldValueId, "active": checked} })
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

  const handleChange = (event) => {
    updateFieldValueActive(event.target.checked);
  };

  return (
    <Grid container item style={{ minHeight: '70px' }} key={field.id + 'field-row'} justifyContent="center" >
      {
        <Grid container xs={12} item >
          <Grid container item xs={9} xl={10} justifyContent="flex-start">
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor={field.id}>{field.name}</InputLabel>
                <Input
                  id={field.id}
                  key={field.name}
                  label={field.name}
                  value={fieldValue}
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
          <Grid container item xs={3} xl={2} width="100%" justifyContent="flex-end">
            <Grid item>
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
                <MenuItem disabled={!fieldStatus}>
                  <ListItemIcon onClick={enableEditField}>
                    <EditIcon fontSize="small"/>
                  </ListItemIcon>
                  <Typography>
                    Editar
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
        </Grid>
      }
    </Grid>
  )
}

export default FieldsRows;
