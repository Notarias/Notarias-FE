import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const EmailInput = (props) => {

  const { emailCollection } = props

  const [reload, setReload] = useState(false);
  const [error, setError] = useState("")
  const [fieldValue, setFieldValue] = useState("");

  const validEmail = (email) => {
    return /[\w\d.-]+@[\w\d.-]+.[\w\d.-]+/.test(email);
  }

  const handleChange = (event) => {
    if (!(event.target.value.charAt(event.target.value.length-1) === ",")) {
      setFieldValue(event.target.value)
    }
  }

  const catchKey = (event) => {
    if (event.key === ',' && event.keyCode === 188) {
      if (emailCollection.includes(fieldValue)) {
        setError("Correo duplicado")
        setFieldValue("")
      } else {
        if (validEmail(fieldValue)){
          emailCollection.push(fieldValue)
        } else {
          setError("Correo no valido")
        }
        setFieldValue("")
      }
    } else {
      setError("")
    }
  }

  const removeMail = (mail, index) => {
    if (emailCollection[index] === mail) {
      emailCollection.splice(index, 1)
      setReload(!reload)
    }
  }
  
  return(
    <>
      { error ? 
      <Grid item xs={12}>
        <Typography variant="caption" display="block" gutterBottom color='secondary'>
          { error }
        </Typography>
      </Grid>
      :
        ""
      }
      {emailCollection.length > 0 ?
        <Grid item xs={12} style={{paddingBottom:"5px"}}>
          {emailCollection.map((mail, index) => (
            <Chip 
              id={index}
              key={index}
              style={{ margin: 2 }}
              label={mail}
              size="small"
              variant="outlined"
              onDelete={() => removeMail(mail, index)}
            />
          ))}
        </Grid>
      :
        ""
      }
      <TextField
        id="client-emails"
        label="Correo de Participantes"
        onKeyDown={catchKey}
        onChange={handleChange}
        value={fieldValue}
        helperText="Separar cada correo con comas. Ejemplo: correo@dominio.com, correo2@dom..."
        fullWidth
        multiline
        error={!!error}
      />
    </>
  )
} 
export default EmailInput;