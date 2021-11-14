import React, { useState } from 'react';
import Button               from '@material-ui/core/Button';
import MenuItem             from '@material-ui/core/MenuItem';
import withStyles           from '@material-ui/core/styles/withStyles';
import { styles }           from './styles';
import CircularProgress     from '@material-ui/core/CircularProgress';
import Grid                 from '@material-ui/core/Grid';
import FormHelperText       from '@material-ui/core/FormHelperText';
import TextField            from '@material-ui/core/TextField';
import { gql, useMutation } from '@apollo/client';
import Select               from '@material-ui/core/Select';
import InputLabel           from '@material-ui/core/InputLabel';
import FormControl          from '@material-ui/core/FormControl';
import { Redirect }         from 'react-router-dom';
import { GET_CURRENT_USER, GLOBAL_MESSAGE } from '../../../../resolvers/queries';

const USER_EDIT_MUTATION = gql`
  mutation updateUser($id: ID!, $firstName: String, $lastName: String, $email: String, $address: String, $phone: String, $rolePermanentLink: String, $authProvider: AuthProviderSignupData) {
    updateUser(input: {id: $id, firstName: $firstName, lastName: $lastName, email: $email, address: $address, phone: $phone, rolePermanentLink: $rolePermanentLink, authProvider: $authProvider}) {
      user {
        id
        firstName
        lastName
        email
        lockedAt
        address
        phone
        role {
          name
          permanentLink
        }
      }
      errors
      pointers
    }
  }
`

const UserForm = (props) => {
  const { classes } = props
  const { user, roles } = props.data

  const [id, setId] = useState(parseInt(user.id))
  const [pristine, setPristine] = useState(true)
  const [errors, setErrors] = useState({})
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [address, setAddress] = useState(user.address)
  const [phone, setPhone] = useState(user.phone)
  const [rolePermanentLink, setRolePermanentLink] = useState(user.role && user.role.permanentLink)
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [redirect, setRedirect] = useState(false)

  const handleChange = ({ target }) => {
    let {name, value} = target
    name = name.charAt(0).toUpperCase() + name.slice(1);
    eval(`set${name}("${value}")`)
    setPristine(false)
  }

  const [updateUserMutation, { loading }] =
    useMutation(
      USER_EDIT_MUTATION,
      {
        onError(error) {
          let errorsHash = {}
          error.graphQLErrors.map((error) => {
            errorsHash[error.extensions.attribute] = error.message
          }) 
          setErrors(errorsHash)
          setPristine(true)
        },
        update(store, { data: { updateUser } }) {
          store.writeQuery({ query: GET_CURRENT_USER, data: { currentUser: updateUser.user } });
          store.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Se actualizo el perfil exitosamente",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
          setTimeout(() => { setRedirect(true) }, 3000)
        }
      }
    )
  
  const submitForm = () => {
    updateUserMutation({
      variables:  {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        phone: phone,
        rolePermanentLink: rolePermanentLink,
        authProvider: {
          credentials: {
            password: password,
            passwordConfirmation: passwordConfirmation
          }
        }
      } 
    })
  }

  return (
    <>
      { redirect && <Redirect to={{ pathname: `/users` }} /> }
      <Grid container classes={{root: classes.editUserFormGrid}} >
        <form style={{ width: "100%" }} onSubmit={(e) => e.preventDefault()}>
          <Grid justifyContent='center' item container className={classes.marginInputs} >
            <Grid item xs={6}>
              <TextField
                value={firstName}
                fullWidth
                onChange={handleChange}
                label="Nombre"
                error={errors.firstName}
                name="firstName"/>
              <FormHelperText error>{errors.first_name}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                value={lastName}
                fullWidth
                onChange={handleChange}
                label="Apellido"
                error={errors.lastName}
                name="lastName"/>
              <FormHelperText error>{errors.last_name}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                value={email}
                fullWidth
                onChange={handleChange}
                label="Correo"
                error={errors.email}
                name="email"/>
              <FormHelperText error>{errors.email}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                value={address}
                fullWidth
                onChange={handleChange}
                label="Dirección"
                error={errors.address}
                name="address"/>
              <FormHelperText error>{errors.address}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                value={phone}
                fullWidth
                onChange={handleChange}
                label="Telefono"
                error={errors.phone}
                name="phone"/>
              <FormHelperText error>{errors.phone}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                type={'password'}
                value={password}
                fullWidth
                onChange={handleChange}
                label="Contraseña"
                error={errors.password}
                name="password"/>
              <FormHelperText error>{errors.password}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                type={'password'}
                value={passwordConfirmation}
                fullWidth
                onChange={handleChange}
                label="Confirmar Contraseña"
                error={errors.passwordConfirmation}
                name="passwordConfirmation"/>
              <FormHelperText error>{errors.password_confirmation}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-required-label" >Rol</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  name={"rolePermanentLink"}
                  value={rolePermanentLink}
                  fullWidth
                  onChange={handleChange}
                >
                  {
                    roles.map((role)=> {
                      return(
                        <MenuItem key={role.createdAt + "role"} value={role.permanentLink}>
                          {role.name}
                        </MenuItem>
                      )
                      }
                    )
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item justifyContent='center' container className={classes.buttonMargin}>
            <Grid item xs={6}>
              <Button
                fullWidth
                disabled={pristine || loading || redirect}
                variant="contained"
                color="primary"
                type="submit"
                classes={{ root: classes.editUserFormSubmitButton }}
                onClick={ submitForm }>
                { redirect ? "Redirigiendo..." : "Guardar" }
                { loading && <CircularProgress className={classes.buttonProgress} size={24} /> }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  )
}

export default withStyles(styles)(UserForm)
