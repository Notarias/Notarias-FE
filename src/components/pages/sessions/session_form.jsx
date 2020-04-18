import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { gql } from 'apollo-boost';
import { Mutation } from '@apollo/react-components';
import TextField from '@material-ui/core/TextField';
import { GET_CURRENT_USER } from '../../../resolvers/queries'

const LOGIN_MUTATION = gql`
  mutation signIn($email:String!, $password:String!) {
    signIn(input: { email: $email, password: $password }) {
      authToken
      error
      currentUser {
        firstName
        lastName
        id
        address
        email
        lockedAt
        phone
        role {
          name
          permanentLink
        }
      }
    }
  }
`

let SessionForm = props => {
  let { classes } = props
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pristine, setPristine] = useState(true)

  const handleSubmit = (mutation, e) => {
    e.preventDefault()
    mutation(
      {
        variables: { email, password },
        update: (store, { data: { signIn } }) => {
          store.writeQuery({ query: GET_CURRENT_USER, data: { currentUser: signIn.currentUser } });
        }
      }
    )
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
    <Mutation
      mutation={LOGIN_MUTATION}
      onCompleted={ completeSignIn.bind(this) }>
      {
        (mutation, { loading }) => {
        
          return(
            <form className={ classes.form } onSubmit={ handleSubmit.bind(this, mutation) }>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={ classes.submit }
                  disabled={ pristine || loading }>
                  Entrar
                </Button>
            </form>
          )
        }
      }
    </Mutation>
  )
}

export default SessionForm;
