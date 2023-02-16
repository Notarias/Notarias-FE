import React, {useEffect, useState}     from 'react';
import Grid                             from '@material-ui/core/Grid';
import TextField                        from '@material-ui/core/TextField';

const DropdownOption = (props) => {
  const { index, addOption } = props

  const [optionName, setOptionName] = useState("");

  useEffect(() => {
    addOption(optionName, index)
  },[optionName])

  const changeOptionName = (event) => {
    setOptionName(event.target.value)
  }

  return(
    <Grid item xs={10}>
      <TextField 
        id="option-field"
        value={ optionName }
        placeholder={`Opcion ${index + 1}`}
        onChange={ changeOptionName }
        fullWidth
      />
    </Grid>
  )
}

export default DropdownOption;
