import React, { useState }        from 'react'
import { styles }                 from '../../styles';
import { withStyles }             from '@material-ui/core/styles';
import Grid                       from '@material-ui/core/Grid';
import FormControl                from '@material-ui/core/FormControl';
import MenuItem                   from '@material-ui/core/MenuItem';
import InputAdornment             from '@material-ui/core/InputAdornment';
import Select                     from '@material-ui/core/Select';
import OutlinedInput              from '@material-ui/core/OutlinedInput';
import TaxFieldsSelector          from './tax_fields_selector';
import TariffTaxFieldSelector     from './tariff_tax_field_selector';

const SelectTaxType = (props) => {
  const {
    classes,
    templateData,
    setTaxedFieldsIds,
    setDefaultValue,
    defaultValue,
    setOperator,
    setTaxableSelector,
    setPristine,
    operator,
    taxableSelector
  } = props

  const [tariffSelect, setTariffSelect]    = useState(false);

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };
  
  const handlePercentageChange = (event) => {
    setDefaultValue(Number(event.target.value))
  }

  const handleTaxableSelectorChange = (event) => {
    setTaxableSelector(event.target.value);
    if(event.target.value === 'tariff'){
      setDefaultValue(0)
      setTariffSelect(true)
    } else {
      setDefaultValue(3)
      setTariffSelect(false)
    }
  }

  return(
    <>
      <Grid container >
        <Grid style={{ 'marginBottom': '12px' }} container item xs={12} alignItems="center" justifyContent="flex-start">
          <Grid container item xs={2} alignItems="flex-start" justifyContent="center">
            <FormControl variant="outlined">
              <OutlinedInput
                id="percentage"
                value={Number(defaultValue)}
                onChange={handlePercentageChange}
                endAdornment={<InputAdornment className={classes.InputAdornmentInPercentage} position="end">%</InputAdornment>}
                size="small"
                type="number"
                className={classes.InputPercentage}
                disabled={tariffSelect}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={5} alignItems="center" justifyContent="flex-end">
            <FormControl variant="outlined" className={classes.operatorMenu}>
              <Select
                style={{ height: "40px"}}
                id="demo-simple-select-outlined"
                value={operator}
                onChange={handleOperatorChange}
                displayEmpty
                size="small"
                disabled={tariffSelect}
              >
                <MenuItem value="">
                  <em>Operador</em>
                </MenuItem>
                <MenuItem value="percentile">Porcentual</MenuItem>
                <MenuItem value="flat">Plano</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={5} alignItems="center" justifyContent="flex-end">
            <FormControl variant="outlined" className={classes.operatorMenu}>
              <Select
                style={{ height: "40px"}}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={taxableSelector}
                onChange={handleTaxableSelectorChange}
                displayEmpty
                size="small"
              >
                  <MenuItem value="">
                  <em>Selector</em>
                </MenuItem>
                <MenuItem value={"apply_all"}>Todos</MenuItem>
                <MenuItem value={"highest"}>Más Alto</MenuItem>
                <MenuItem value={"tariff"}>Arancel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {tariffSelect ?
          <TariffTaxFieldSelector
            templateData={templateData}
            setTaxedFieldsIds={setTaxedFieldsIds}
            setPristine={setPristine}
          />
        :
          <TaxFieldsSelector
            templateData={templateData}
            setTaxedFieldsIds={setTaxedFieldsIds}
            setPristine={setPristine}
          />
        }

      </Grid>
    </>
  )
}

export default withStyles(styles)(SelectTaxType);
