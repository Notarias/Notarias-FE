import React, { useState, useEffect }    from 'react';
import TextField                         from '@material-ui/core/TextField';
import MenuItem                          from '@material-ui/core/MenuItem';
import Skeleton                          from '@material-ui/lab/Skeleton';

const SelectState = (props) => {
  const { selectedCountry, selectedState, setFormValue, fieldName, errors} = props

  const [states, setStates] = useState([]);

  useEffect(() =>{
    if (states.length > 0) {
      setStates([])
    }
    if (selectedCountry) {
      fetch(`https://www.universal-tutorial.com/api/states/${selectedCountry.country_name}`,
        {headers:{
          "Authorization": `Bearer ${window.localStorage.wwToken}`,
          "Accept": "application/json"
        }}
      )
      .then(response => response.json())
      .then(response => setStates(response))
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
              <MenuItem key={`city-${state.state_name}`} value={state.state_name}>
                {state.state_name}
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
