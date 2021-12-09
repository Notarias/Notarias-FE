import React, { useState, useEffect }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import TextField                                from '@material-ui/core/TextField';
import IconButton                               from '@material-ui/core/IconButton';
import Menu                                     from '@material-ui/core/Menu';
import MenuItem                                 from '@material-ui/core/MenuItem';
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
  const [fieldValueId, setFieldValueId] = useState();
  const [fieldValue, setFieldValue] = useState("");
  const [fieldValueActive, setFieldValueActive] = useState();
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

  const openMenu = () => {
    setMenuState(true);
  }

  const closeMenu = () => {
    setMenuState(false);
  }

  const cancelMenu = () => {
    setSelected(null);
    closeMenu();
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

  const updateNewFieldValue = ( event ) => {
    updateProcedureFieldValue ({ variables: {"id": fieldValueId, "value": fieldValue, "active": fieldValueActive} })
  }

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
                fullWidth/>
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
              <IconButton
                aria-label="more"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={openMenu}
                style={{"padding": "10px"}}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu id="simple-menu" keepMounted anchorEl={selected} open={menuState} onClose={cancelMenu} >
                <MenuItem onClick={closeMenu}>
                  Menu1
                </MenuItem>
                <MenuItem onClick={closeMenu}>
                  Menu1
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
