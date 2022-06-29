import React, { useState, useEffect }    from 'react';
import TextField                         from '@material-ui/core/TextField';
import MenuItem                          from '@material-ui/core/MenuItem';
import Skeleton                          from '@material-ui/lab/Skeleton';
import { State }                         from 'country-state-city';

const SelectState = (props) => {
  const { selectedCountry, selectedState, fieldName, setFormValue, errors} = props

  const [states, setStates] = useState([]);

  useEffect(() =>{
    if (states.length > 0) {
      setStates([])
    }
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry))
    }
  }, [selectedCountry])

  return (
    <>
      {states.length > 0 || !selectedState ?
        <TextField
          id='client-state'
          name={fieldName}
          label="Estado"
          type='text'
          variant="outlined"
          size="small"
          fullWidth
          select
          value={states.length < 1 || selectedState == null ? "" : selectedState}
          onChange={setFormValue}
          error={!!errors.state}
          helperText={errors.state}
        >
          <MenuItem key={"city-00"} value={""}>
            Seleccione un Estado
          </MenuItem>
          { states && states.map(state => (
              <MenuItem key={`city-${state.name}`} value={state.name}>
                {state.name}
              </MenuItem>
            ))
          }
        </TextField>
      :
        <Skeleton variant="rect" width={'100%'} height={40} />
      }
    </>
  )
}
export default SelectState;
