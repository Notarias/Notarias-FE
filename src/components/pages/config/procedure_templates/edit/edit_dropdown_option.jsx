import React, {useEffect, useState}     from 'react';
import TextField                        from '@material-ui/core/TextField';

const DropdownOption = (props) => {
  const { option, index, addOption, setChangeOptions, changeOptions } = props

  const [optionName, setOptionName] = useState(option ? option : "");

  useEffect(() => {
    addOption(optionName, index)
    setChangeOptions(!changeOptions)
  },[optionName])

  const changeOptionName = (event) => {
    setOptionName(event.target.value)
  }

  return(
    <TextField 
      id="option-field"
      value={ optionName }
      placeholder={`Opcion ${index + 1}`}
      onChange={ changeOptionName }
      variant="outlined"
      size='small'
      fullWidth
      style={{'backgroundColor': 'rgb(200, 200, 200)'}}
      />
  )
}

export default DropdownOption;
