import React, { useState, useEffect }               from 'react';
import Grid                                         from '@material-ui/core/Grid';
import TextField                                    from '@material-ui/core/TextField';
import InputAdornment                               from '@material-ui/core/InputAdornment';
import Button                                       from '@material-ui/core/Button';
import BorderColorIcon                              from '@material-ui/icons/BorderColor';
import NumberFormat                                 from 'react-number-format';
import PropTypes                                    from 'prop-types';
import CancelIcon                                   from '@material-ui/icons/Cancel';

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
    withValue, 
    initialFieldValue, 
    changeInputStatus, 
    setChangeInputStatus,
    setChangeFieldValue,
    changeFieldValue,
  } = props

  const [statusChange, setStatusChange] = React.useState(withValue)

  useEffect(() => {
    setStatusChange(withValue);
  }, [withValue])

  useEffect(() => {
    changingIntime()

  }, [changeInputStatus])

  const changingIntime = () => {
    return(
    changeInputStatus ? setStatusChange(true) : false
    )
  }
  // const [values, setValues] = React.useState("0");

  // const handleChange = (event) => {
  //   setValues(event.target.value);
  // };


  const handleChange = (event) => {
    setChangeFieldValue(event.target.value);
    setPristine(true)
  }


  const onFocusPue = () => {
    setChangeInputStatus(false)
  }

  const totalInput = () => {
    return(
      <Grid container item>
        <Grid container item xs={8} direction="row" justify="flex-end">
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
        <Grid  container item xs={4} alignItems="flex-end" justify="center">
          {
            withValue ?
            <Button onClick={changeValueTypeToTrue} >
              <CancelIcon/>
            </Button>
            :
            <Button  disabled={true}>
            <CancelIcon/>
          </Button>

          }
        </Grid>
      </Grid>
    )
  }

  const changeValueType = () => {
    setStatusChange(false)
    setChangeFieldValue(initialFieldValue)
  }

  const changeValueTypeToTrue = () => {
    setStatusChange(true)
    setPristine(false)
  }


  const totalFlat = () => {
    return(
     <Grid container item>
       <Grid container item xs={8} direction="row" justify="flex-end">
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
      <Grid  container item xs={4} alignItems="flex-end" justify="center">
        <Button onClick={changeValueType} >
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
