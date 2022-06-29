import React, { useState }   from 'react';
import TextField             from '@material-ui/core/TextField';
import MenuItem              from '@material-ui/core/MenuItem';
import Skeleton              from '@material-ui/lab/Skeleton';
import { Country }           from 'country-state-city';

const SelectCountry = (props) => {
  const { clearCitiesList, returnCountryValue, countryCode, setFormValue, fieldName, errors } = props;

  const [countriesList] = useState(Country.getAllCountries());

  return (
    <>
      {countriesList && countriesList.length > 0 ?
        <TextField
          id='client-country-code'
          name={fieldName}
          label="Pais"
          type='text'
          variant="outlined"
          size="small"
          fullWidth
          select
          value={countryCode == null ? "" : countryCode}
          onChange={setFormValue}
          error={!!errors.countryCode}
          helperText={errors.countryCode}
          SelectProps={{
            onOpen: clearCitiesList,
            onClose: returnCountryValue
          }}
        >
          <MenuItem key={"country-00"} value={""}>
            Seleccione un Pais
          </MenuItem>
          {countriesList.map(country => (
              <MenuItem key={`country-${country.isoCode}`} value={country.isoCode}>
                {country.name}
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

export default SelectCountry;
