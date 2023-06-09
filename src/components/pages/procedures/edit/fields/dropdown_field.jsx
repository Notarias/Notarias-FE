import React                                    from 'react';
import Grid                                     from '@material-ui/core/Grid';
import FormControl                              from '@material-ui/core/FormControl';
import Select                                   from '@material-ui/core/Select';
import MenuItem                                 from '@material-ui/core/MenuItem';
import InputLabel                               from '@material-ui/core/InputLabel';
import IconButton                               from '@material-ui/core/IconButton';
import SaveIcon                                 from '@material-ui/icons/Save';
import EditIcon                                 from '@material-ui/icons/Edit';
import ClearIcon                                from '@material-ui/icons/Clear';

const DropdownField = (props) => {
  const { 
    field,
    initFieldValue,
    fieldValue,
    setFieldValue,
    fieldStatus,
    setFieldStatus,
    saveButtonStatus,
    setSaveButtonStatus,
    updateFieldValue 
  } = props;

  const cancelEditField = () => {
    setFieldValue(initFieldValue);
    setFieldStatus(true);
    setSaveButtonStatus(true);
  }

  const enableEditField = () => {
    setFieldStatus(false);
  }
  const fieldValueChange = ({ target }) => {
    let { value } = target
    setFieldValue(String(value));
    setSaveButtonStatus(false);
  }

  return(
    <>
      <Grid container item xs={10} justifyContent="flex-start">
        <Grid container item xs={12}>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel htmlFor={field.id}>{field.name}</InputLabel>
              <Select
                id={field.id}
                key={field.name}
                label={field.name}
                value={fieldValue}
                onChange={fieldValueChange}
                disabled={fieldStatus}
                size="small"
                fullWidth
              >
                {field.defaultValue.map((option, index) =>{
                  return(
                    <MenuItem key={`${index}-${option}`} value={option}>{option}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid continer item xs={1}>
            <IconButton
              onClick={fieldStatus ? enableEditField : cancelEditField}
              edge="end"
            >
              {fieldStatus ? <EditIcon fontSize="small"/> : <ClearIcon fontSize="small"/>}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} width="100%">
        <IconButton
          disabled={saveButtonStatus}
          style={{"padding": "10px"}}
          onClick={updateFieldValue}
        >
          <SaveIcon/>
        </IconButton>
      </Grid>
    </>
  )
}

export default DropdownField;
