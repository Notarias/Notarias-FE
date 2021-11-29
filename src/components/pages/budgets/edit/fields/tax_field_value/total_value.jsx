import React, { useState, useEffect, useRef } from 'react';
import Grid                                   from '@material-ui/core/Grid';
import TextField                              from '@material-ui/core/TextField';
import InputAdornment                         from '@material-ui/core/InputAdornment';
import Button                                 from '@material-ui/core/Button';
import Chip                                   from '@material-ui/core/Chip';
import Avatar                                 from '@material-ui/core/Avatar';
import BorderColorIcon                        from '@material-ui/icons/BorderColor';
import AttachMoneyIcon                        from '@material-ui/icons/AttachMoney';
import NumberFormat                           from 'react-number-format';
import PropTypes                              from 'prop-types';
import ClearIcon                              from '@material-ui/icons/Clear';

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
    templateField,
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

  const inferOperatorAdornment = () => {
    if(templateField.operator == 'percentile') {
      return(`%${templateField.defaultValue || 0}`)
    }
  }

  const formatValue = (value) => {
    value = value || 0
    return((value * 1.0) / 100).toFixed(2)
  }

  const loadChip = () => {
    return(
      <Chip
        icon={<AttachMoneyIcon/>}
        label={`${formatValue(budgetFieldValue.value)}`}
      />
    )
  }

  return(
    <Grid container item>
      <Grid container item direction="row" justifyContent="flex-end">
        <Grid item container spacing={1}>
          <Grid item>
            <Chip label={`${inferOperatorAdornment()}`} variant="outlined" color='secondary' />
          </Grid>
          <Grid item>
            {budgetFieldValue && loadChip()}
          </Grid>
        </Grid>
        {/*
          <TextField
            onChange={editing ? handleChange : () => {}}
            label="Total"
            disabled={!editing}
            value={editing ? editingValue : value}
            id="standard-start-adornment"
            InputProps={{
              ref: inputRef,
              inputComponent: NumberFormatCustom,
              startAdornment: <InputAdornment position="start">{inferOperatorAdornment()}</InputAdornment>
            }}/>
        */}
      </Grid>
      {/* <Grid  container item xs={4} alignItems="flex-end" justifyContent="center">
        <Button onClick={editing ? cancelEditing : enableEditing}>
          { editing ? <ClearIcon/> : <BorderColorIcon/> }
        </Button>
      </Grid> */}
    </Grid>
  )
} 

export default TotalValue
