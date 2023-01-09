import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const EmailInput = (props) => {

  const { emailCollection } = props

  const [reload, setReload] = useState(false);
  const [invalidMail, setInvalidMail] = useState(false);
  const [mailExist, setMailExist] = useState(false)
  const [fieldValue, setFieldValue] = useState("");

  const validEmail = (email) => {
    return /[\w\d.-]+@[\w\d.-]+.[\w\d.-]+/.test(email);
  }

  const handleChange = (event) => {
    if (!(event.target.value.charAt(event.target.value.length-1) === ",")) {
      setFieldValue(event.target.value)
      setMailExist(false)
    }
  }

  const catchKey = (event) => {
    if (event.key === ',' && event.keyCode === 188) {
      if (emailCollection.includes(fieldValue)) {
        setMailExist(true)
        setFieldValue("")
      } else {
        if (!(validEmail(fieldValue))){
          setInvalidMail(true)
        }
        emailCollection.push(fieldValue)
        setFieldValue("")
      }
    }
  }

  const removeMail = (mail, index) => {
    var invalidCount = 0
    if (emailCollection[index] === mail) {
      emailCollection.splice(index, 1)
      setReload(!reload)
      emailCollection.map((mail) => {
        if (!(validEmail(mail))){
          invalidCount = invalidCount + 1
        }
        return("")
      })
      if (invalidCount < 1 || emailCollection.length < 1) {
        setInvalidMail(false)
      }
    }
  }
  
  return(
    <>
      { invalidMail || mailExist ? 
      <Grid item xs={12}>
        <Typography variant="caption" display="block" gutterBottom color='secondary'>
          { invalidMail ? "Hay un correo invalido." : "" } { mailExist ? "El correo ya existe" : "" }
        </Typography>
      </Grid>
      :
        ""
      }
      {emailCollection.length > 0 ?
        emailCollection.map((mail, index) => (
          <Chip 
            id={index}
            key={index}
            style={{ margin: 2 }}
            label={mail}
            size="small"
            variant="outlined"
            onDelete={() => removeMail(mail, index)}
            color={validEmail(mail) ? "default" : "secondary" }
          />
        ))
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
        error={invalidMail || mailExist}
      />
    </>
  )
} 
export default EmailInput;