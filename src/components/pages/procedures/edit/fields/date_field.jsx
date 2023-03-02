import React                                    from 'react';
import Grid                                     from '@material-ui/core/Grid';
import FormControl                              from '@material-ui/core/FormControl';
import Input                                    from '@material-ui/core/Input';
import InputLabel                               from '@material-ui/core/InputLabel';
import InputAdornment                           from '@material-ui/core/InputAdornment';
import IconButton                               from '@material-ui/core/IconButton';
import SaveIcon                                 from '@material-ui/icons/Save';
import EditIcon                                 from '@material-ui/icons/Edit';
import ClearIcon                                from '@material-ui/icons/Clear';

const DateField = (props) => {
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
    setFieldValue(value);
    setSaveButtonStatus(false);
  }

  return(
    <>
      <Grid container item xs={10} justifyContent="flex-start">
          <Grid container item xs={12}>
            <Grid item xs>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor={field.id}>{field.name}</InputLabel>
              <Input
                id={field.id}
                key={field.name}
                value={fieldValue}
                onChange={fieldValueChange}
                disabled={fieldStatus}
                type='date'
                size="small"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={fieldStatus ? enableEditField : cancelEditField}
                      edge="end"
                    >
                      {fieldStatus ? <EditIcon fontSize="small"/> : <ClearIcon fontSize="small"/>}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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

export default DateField;
