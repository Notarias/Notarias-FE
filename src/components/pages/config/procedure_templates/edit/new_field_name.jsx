import React, {useState}    from 'react';
import Button               from '@material-ui/core/Button';
import Grid                 from '@material-ui/core/Grid';
import AddIcon              from '@material-ui/icons/Add';
import RemoveIcon           from '@material-ui/icons/Remove';
import FormControl          from '@material-ui/core/FormControl';
import TextField            from '@material-ui/core/TextField';
import Select               from '@material-ui/core/Select';
import MenuItem             from '@material-ui/core/MenuItem';
import InputLabel           from '@material-ui/core/InputLabel';
import { styles }           from '../styles';
import { withStyles }       from '@material-ui/core/styles';
import DropdownOption       from './dropdown_option';

const NewFieldName = (props) => {
  const {
    classes,
    fieldName,
    handleFieldNameChange,
    error,
    style,
    handleStyleChange,
    options,
    setOptions,
    addSelectOption
  } = props

  const [removeOption, setRemoveOption] = useState(true);

  const addOption = (option, index) => {
    options[index] = option
    setOptions(options)
  }

  const removeLastOption = () => {
    options.pop()
    setRemoveOption(!removeOption)
  }

  console.log("options --------", options)
  return(
    <Grid container direction='row'>
      <Grid container item xs={6}>
        <TextField 
          id="fieldName" 
          label="Editar nombre"
          variant="filled" 
          size='small'
          value={ fieldName }
          onChange={ handleFieldNameChange }
          error={ !!error["name"] && true }
          helperText={error["name"] || " "}
          errorskey={ "name" }
          name='name'
        />
      </Grid>
      <Grid container item xs={1}>
      </Grid>
      <Grid container item xs={5}>
        <FormControl variant="outlined" className={ classes.textFieldTittleType }>
          <InputLabel id="label-field">Selecciona el tipo de campo</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            name='style'
            value={ style }
            onChange={ handleStyleChange }
            error={ !!error["style"] && true }
            errorskey={ "style" }
          >
            <MenuItem key='string' value={'string'}>Texto</MenuItem>
            <MenuItem key='number' value={'number'}>Numerico</MenuItem>
            <MenuItem key='file' value={'file'}>Archivo</MenuItem>
            <MenuItem key='date' value={'date'}>Fecha</MenuItem>
            <MenuItem key='dropdown' value={'dropdown'}>Desplegable</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container item xs={12} alignItems='flex-start'>
        { style === "dropdown" ?
          <>
            <Grid container item xs={6} justifyContent="flex-start">
              { options.map((option, index) => {
                return(
                  <DropdownOption
                    key={`dropdown-options-${index}`}
                    index={index}
                    addOption={addOption}
                  />
                )
              })}
            </Grid>
            <Grid container item xs={6} justifyContent='flex-end'>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={ addSelectOption }
                  fullWidth
                >
                  Agregar Campo  <AddIcon/>
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={ removeLastOption }
                  fullWidth
                >
                  Eliminar Campo  <RemoveIcon/>
                </Button>
              </Grid>
            </Grid>
          </>
          : ""
        }
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(NewFieldName);
