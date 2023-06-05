import React                  from 'react';
import TextField              from '@material-ui/core/TextField';
import InputAdornment         from '@material-ui/core/InputAdornment';
import IconButton             from '@material-ui/core/IconButton';
import CancelIcon             from '@material-ui/icons/Cancel';
import FileAttribute          from './client_attribute_type/file_attribute'
import NumberFormat           from 'react-number-format';
import PropTypes              from 'prop-types';

function NumberFormatCustom(props) {
  const { inputRef, onChange, defaultClientValue, ...other } = props;
  
  return (
    <NumberFormat
    {...other}
    getInputRef={inputRef}
    onValueChange={(values) => {
      if(values.value !== defaultClientValue ){
        onChange({
          target: {
            value: values.value,
          },
        });
      }
    }}
    isNumericString
    />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    
    onChange: PropTypes.func.isRequired,
  };
  
const AttributeField = (props) => {
  const { attr, attrValue, attributeValue, editAttrField, cancelEdit, pristine, match } = props
  const renderAttrField = () => {
    switch (attr.style) {
      case "string":
        return(
          <TextField
            id={`client-attr-${attr.id}`}
            name={attr.name}
            label={attr.name}
            variant="outlined"
            size="small"
            fullWidth
            value={attributeValue}
            onChange={editAttrField}
            InputProps={{
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    aria-label="cancel-attr-edit"
                    onClick={cancelEdit}
                    disabled={pristine}
                    edge="end"
                    color='secondary'
                  >
                    { pristine ? "" : <CancelIcon/> }
                  </IconButton>
                </InputAdornment>,
            }}
          />
        );
      case "number":
        return(
          <TextField
            id={`client-attr-${attr.id}`}
            name={attr.name}
            label={attr.name}
            variant="outlined"
            size="small"
            fullWidth
            value={attributeValue}
            onChange={editAttrField}
            InputProps={{
              defaultClientValue: attributeValue, 
              inputComponent: NumberFormatCustom,
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    aria-label="cancel-attr-edit"
                    onClick={cancelEdit}
                    disabled={pristine}
                    edge="end"
                    color='secondary'
                  >
                    { pristine ? "" : <CancelIcon/> }
                  </IconButton>
                </InputAdornment>,
            }}
          />
        );
      case "file":
        return(
          <FileAttribute
            attr={attr}
            attrValue={attrValue}
            match={match}
          />
        );
      default:
        return(<>Tipo de campo no reconocido</>);
    }
  }

  return(
    <>
      {renderAttrField()}
    </>
  )
}

export default AttributeField;
