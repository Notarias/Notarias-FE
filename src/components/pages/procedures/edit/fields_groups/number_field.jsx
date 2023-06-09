import React                                    from 'react';
import Grid                                     from '@material-ui/core/Grid';
import FormControl                              from '@material-ui/core/FormControl';
import Input                                    from '@material-ui/core/Input';
import InputLabel                               from '@material-ui/core/InputLabel';
import IconButton                               from '@material-ui/core/IconButton';
import SaveIcon                                 from '@material-ui/icons/Save';
import EditIcon                                 from '@material-ui/icons/Edit';
import ClearIcon                                from '@material-ui/icons/Clear';

const NumberField = (props) => {
  const { 
    templateField,
    procedureFieldValue,
    value,
    setValue,
    fieldStatus,
    setFieldStatus,
    saveButtonStatus,
    setSaveButtonStatus,
    updateFieldValue 
  } = props;

  const cancelEditField = () => {
    setValue(procedureFieldValue);
    setFieldStatus(true);
    setSaveButtonStatus(true);
  }

  const enableEditField = () => {
    setFieldStatus(false);
  }
  const fieldValueChange = ({ target }) => {
    let { value } = target
    setValue(value);
    setSaveButtonStatus(false);
  }

  return(
    <>
      <Grid container item xs={10} justifyContent="flex-start">
        <Grid container item xs={12}>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel htmlFor={templateField.id}>{templateField.name}</InputLabel>
              <Input
                id={templateField.id}
                key={templateField.name}
                label={templateField.name}
                value={value}
                onChange={fieldValueChange}
                disabled={fieldStatus}
                type='number'
                size="small"
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={1}>
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

export default NumberField;
