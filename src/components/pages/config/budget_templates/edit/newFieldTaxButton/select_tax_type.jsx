import React                      from 'react'
import { styles }                 from '../../styles';
import { withStyles }             from '@material-ui/core/styles';
import Grid                       from '@material-ui/core/Grid';
import FormControl                from '@material-ui/core/FormControl';
import FormControlLabel           from '@material-ui/core/FormControlLabel';
import Checkbox                   from '@material-ui/core/Checkbox';
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
    taxableSelector,
    setTariffSelect,
    tariffSelect
  } = props

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };
  
  const handlePercentageChange = (event) => {
    setDefaultValue(Number(event.target.value))
  }

  const handleTaxableSelectorChange = (event) => {
    setTaxableSelector(event.target.value);
  }

  const handleTariffTax = (event) => {
    if(event.target.checked){
      setDefaultValue(0)
      setTariffSelect(true)
    } else {
      setTariffSelect(false)
    }
  }

  return(
    <>
      <Grid style={{ 'marginBottom': '12px' }} container item xs={12} alignItems="center">
        <Grid item xs={2}>
          <FormControl variant="outlined" style={{ 'paddingRight': '10px' }}>
            <OutlinedInput
              id="percentage"
              value={Number(defaultValue)}
              onChange={handlePercentageChange}
              endAdornment={<InputAdornment className={classes.InputAdornmentInPercentage} position="end">%</InputAdornment>}
              size="small"
              type="number"
              className={classes.InputPercentage}
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl variant="outlined" className={classes.operatorMenu}>
            <Select
              style={{ height: "40px"}}
              id="demo-simple-select-outlined"
              value={operator}
              onChange={handleOperatorChange}
              displayEmpty
              size="small"
              fullWidth
            >
              <MenuItem value="">
                <em>Operador</em>
              </MenuItem>
              <MenuItem value="percentile">Porcentual</MenuItem>
              <MenuItem value="flat">Plano</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl variant="outlined" className={classes.operatorMenu}>
            <Select
              style={{ height: "40px"}}
              labelId="demo-simple-select-outlined-label"
              value={taxableSelector}
              onChange={handleTaxableSelectorChange}
              displayEmpty
              size="small"
              fullWidth
            >
              <MenuItem value="">
                <em>Selector</em>
              </MenuItem>
              <MenuItem value={"apply_all"}>Todos</MenuItem>
              <MenuItem value={"highest"}>Más Alto</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container item xs={2} justifyContent='flex-end'>
          <FormControlLabel style={{ 'paddingLeft': '10px', 'margin': '0'}}
            control={
              <Checkbox
                id="tariff-taxes"
                checked={tariffSelect}
                onChange={handleTariffTax}
                name="tariff"
                color="primary"
              />
            }
            label="Arancel"
            margin="dense"
          />
        </Grid>
      </Grid>
      <TaxFieldsSelector
        templateData={templateData}
        setTaxedFieldsIds={setTaxedFieldsIds}
        setPristine={setPristine}
      />
    </>
  )
}

export default withStyles(styles)(SelectTaxType);
