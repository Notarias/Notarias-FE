import React, { useState, useEffect }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import TextField                                from '@material-ui/core/TextField';
import InputAdornment                           from '@material-ui/core/InputAdornment';
import Button                                   from '@material-ui/core/Button';
import BorderColorIcon                          from '@material-ui/icons/BorderColor';
import NumberFormat                             from 'react-number-format';
import PropTypes                                from 'prop-types';
import ReplayIcon                               from '@material-ui/icons/Replay';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      decimalSeparator="."
      decimalScale={2}
      fixedDecimalScale
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,

  onChange: PropTypes.func.isRequired,
};

const TotalValue = (props) => {
  const {
    setPristine,
    statusChange,
    setStatusChange,
    initialFieldValue, 
    changeInputStatus, 
    setChangeInputStatus,
    setChangeFieldValue,
    changeFieldValue,
  } = props

  useEffect(() => {
    changeInputStatus && setStatusChange(true)
  }, [changeInputStatus])

  const handleChange = (event) => {
    setChangeFieldValue(event.target.value);
    setPristine(true)
  }

  const onFocusPue = () => {
    setChangeInputStatus(false)
  }

  const activateEdit = () => {
    setStatusChange(false)
    setChangeFieldValue(initialFieldValue)
  }

  const disableEdit = () => {
    setStatusChange(true)
    setPristine(false)
  }

  const totalInput = () => {
    return(
      <Grid container item>
        <Grid container item xs={8} direction="row" justifyContent="flex-end">
          <TextField
            onChange={handleChange}
            label="Total"
            onFocus={onFocusPue}
            value={changeFieldValue}
            id="standard-start-adornment"
            InputProps={{
              inputComponent: NumberFormatCustom,
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
          />
        </Grid>
        <Grid  container item xs={4} alignItems="flex-end" justifyContent="center">
          <Button onClick={disableEdit} >
            <ReplayIcon/>
          </Button>
        </Grid>
      </Grid>
    )
  }

  const totalFlat = () => {
    return(
     <Grid container item>
       <Grid container item xs={8} direction="row" justifyContent="flex-end">
          <TextField
          label="Total"
          disabled
          value={initialFieldValue}
          id="standard-start-adornment"
          InputProps={{
            inputComponent: NumberFormatCustom,
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
        />
      </Grid>
      <Grid  container item xs={4} alignItems="flex-end" justifyContent="center">
        <Button onClick={activateEdit} >
          <BorderColorIcon/>
        </Button>
      </Grid>
    </Grid>
    )
  }

  return(
    
    statusChange ? totalFlat() : totalInput()
    
  )
} 

export default TotalValue
