import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { gql } from 'apollo-boost';
import { Mutation } from '@apollo/react-components';
import TextField from '@material-ui/core/TextField';

const LOGIN_MUTATION = gql`
  mutation signIn($email:String!, $password:String!) {
    signIn(input: { email: $email, password: $password }) {
      authToken
      error
      user {
        firstName
        lastName
      }
    }
  }
`

let SessionForm = props => {
  let { classes } = props
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pristine, setPristine] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const completeSignIn = (data) => {
    if (data.signIn.error) {
      props.setError(data.signIn.error.user_authentication[0])
    } else {
      localStorage.setItem("jwtToken", data.signIn.authToken)
      props.history.push(`/`)
    }
  }

  return(
    <form className={ classes.form } onSubmit={ handleSubmit.bind(this) }>
      <TextField
        name="email" 
        type="email" 
        id="email"
        style={{ width: "100%", marginBottom: "20px" }}
        required
        autoComplete="email"
        value={email}
        onChange={ (e)=> { setEmail(e.target.value); setPristine(false) } }
        label="Correo Electrónico"/>
      <TextField 
        name="password"
        type="password"
        id="password"
        style={{ width: "100%", marginBottom: "20px" }}
        required
        autoComplete="current-password"
        value={password}
        onChange={ (e)=> { setPassword(e.target.value); setPristine(false) } }
        label="Contraseña"/>
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={{ email, password }}
        onCompleted={ completeSignIn.bind(this) }>
        {
          mutation => (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={ classes.submit }
              onClick={ mutation }
              disabled={ pristine }>
              Entrar
            </Button>
        )}
      </Mutation>
    </form>
  )
}

export default SessionForm;
