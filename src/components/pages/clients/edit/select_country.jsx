import React, { useEffect }    from 'react';
import TextField               from '@material-ui/core/TextField';
import MenuItem                from '@material-ui/core/MenuItem';
import Skeleton                from '@material-ui/lab/Skeleton';
import CountriesList           from './countries_list.json';

const SelectCountry = (props) => {
  const { clientInfo, clearCitiesList, countryCode, selectedCountry, setSelectedCountry, setFormValue, fieldName, errors } = props;

  useEffect(() => {
    if (!!countryCode) {
      setSelectedCountry(CountriesList.find(country => (country.country_short_name === countryCode)));
    }
  }, [CountriesList, selectedCountry, clientInfo]);

  return (
    <>
      {CountriesList && CountriesList.length > 0 ?
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
            onOpen: clearCitiesList
          }}
        >
          <MenuItem key={"country-00"} value={""}>
            Seleccione un Pais
          </MenuItem>
          {CountriesList.map(country => (
              <MenuItem key={`country-${country.country_short_name}`} value={country.country_short_name}>
                {country.country_name}
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
