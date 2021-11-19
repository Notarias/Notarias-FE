import React, { useState, useEffect, useRef }               from 'react';
import Grid                                         from '@material-ui/core/Grid';
import TextField                                    from '@material-ui/core/TextField';
import InputAdornment                               from '@material-ui/core/InputAdornment';
import Button                                       from '@material-ui/core/Button';
import BorderColorIcon                              from '@material-ui/icons/BorderColor';
import NumberFormat                                 from 'react-number-format';
import PropTypes                                    from 'prop-types';
import ClearIcon                                    from '@material-ui/icons/Clear';

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
    editing,
    setEditing,
    value,
    pristine,
    setValue,
    budgetFieldValue,
    editingValue,
    setEditingValue
  } = props

  const inputRef = useRef()

  const handleChange = (event) => {
    if(Number(event.target.value) && pristine) {
      setPristine(false)
    } else if(!event.target.value) {
      setPristine(true)
    } else if(event.target.value === '0.00'){
      setPristine(false)
    } else if(!pristine) {
      setPristine(true)
    }
    setEditingValue(event.target.value);
  }

  const cancelEditing = () => {
    setEditing(false)
    setPristine(true)
    setEditingValue(value)
  }

  const enableEditing = () => {
    setEditingValue(value ? value : '')
    setPristine(true)
    setEditing(true)
  }

  useEffect(() => {
    if(editing && pristine) {
      inputRef.current.lastChild.focus()
    }
  }, [editing, pristine])

  return(
    <Grid container item>
      <Grid container item xs={8} direction="row" justifyContent="flex-end">
        <TextField
          onChange={editing ? handleChange : () => {}}
          label="Total"
          disabled={!editing}
          value={editing ? editingValue : value}
          id="standard-start-adornment"
          InputProps={{
            ref: inputRef,
            inputComponent: NumberFormatCustom,
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
        />
      </Grid>
      <Grid  container item xs={4} alignItems="flex-end" justifyContent="center">
        <Button onClick={editing ? cancelEditing : enableEditing}>
          { editing ? <ClearIcon/> : <BorderColorIcon/> }
        </Button>
      </Grid>
    </Grid>
  )
} 

export default TotalValue
