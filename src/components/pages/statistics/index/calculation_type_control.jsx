import React            from 'react';
import Radio            from '@material-ui/core/Radio';
import RadioGroup       from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl      from '@material-ui/core/FormControl';
import FormLabel        from '@material-ui/core/FormLabel';

const CalculationTypeControl = (props) => {
  const { calculationType, setCalculationType } = props;

  const selectCalculationType = (event) => {
    console.log(event.target.value)
    setCalculationType(event.target.value);
  }

  return(
    <FormControl component="fieldset">
      <FormLabel component="legend">Tipo de cálculo</FormLabel>
      <RadioGroup aria-label="calculation-type" name="calculation-type" value={calculationType} onChange={selectCalculationType}>
        <FormControlLabel value="cumulative" control={<Radio />} label="Acumulativo" />
        <FormControlLabel value="individual" control={<Radio />} label="Individual" />
      </RadioGroup>
    </FormControl>
  )
}

export default CalculationTypeControl;
