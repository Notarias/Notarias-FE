import React, { useEffect }    from 'react';
import TextField               from '@material-ui/core/TextField';
import MenuItem                from '@material-ui/core/MenuItem';
import Skeleton                from '@material-ui/lab/Skeleton';

const SelectCountry = (props) => {
  const { clientInfo, clearCitiesList, countriesList, setCountriesList, countryCode, selectedCountry, setSelectedCountry, setFormValue, fieldName, errors } = props;

  useEffect(() => {
    if (countriesList.length < 1) {
      fetch("https://www.universal-tutorial.com/api/countries/",
      {headers:{
        "Authorization": `Bearer ${window.localStorage.wwToken}`,
        "Accept": "application/json"
      }}
      )
      .then(response => response.json())
      .then(response => setCountriesList(response));
    };
    if (!!countryCode) {
      setSelectedCountry(countriesList.find(country => (country.country_short_name === countryCode)));
    }
  }, [countriesList, selectedCountry, clientInfo]);

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
            onOpen: clearCitiesList
          }}
        >
          <MenuItem key={"country-00"} value={""}>
            Seleccione un Pais
          </MenuItem>
          {countriesList.map(country => (
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
