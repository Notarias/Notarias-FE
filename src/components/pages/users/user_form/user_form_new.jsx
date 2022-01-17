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

const USER_CREATE_MUTATION = gql`
  mutation createUser($firstName: String, $lastName: String, $email: String, $rolePermanentLink: String, $authProvider: AuthProviderSignupData){
    createUser(input: {firstName: $firstName, lastName: $lastName, email: $email, rolePermanentLink: $rolePermanentLink, authProvider: $authProvider}){
      user{
        firstName
        lastName
        email
        role{
          name
          permanentLink
        }
      }
    }
}
`

const UserFormNew = (props) => {
  const { classes } = props

  const [errors, setErrors]     = useState({})
  const [redirect, setRedirect] = useState(false)
  const [user, setUser]         = useState({
                                    id: "",
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    address: "",
                                    phone: "",
                                    rolePermanentLink: "",
                                    password: null,
                                    passwordConfirmation: null
                                  })

  const handleChange = ({ target }) => {
    const {name, value} = target
    setUser({ ...user, [name]: value })
  }

  const onCompletedSave = (data) => {
    if (data.createUser.pointers) {
      setErrors(data.createUser.pointers)
    } else {
      setRedirect(true)
    }
  }

  const [updateUserMutation, {loading}] =
    useMutation(
      USER_CREATE_MUTATION,
      {
        onError(error) {
          let errorsHash = {}
          error.graphQLErrors.map((error) => {
            errorsHash[error.extensions.attribute] = error.message
            return(error.message)
          }) 
          setErrors(errorsHash)
        },
        onCompleted(cacheData) {
          onCompletedSave(cacheData)
        }
      }
    )

  const submitForm = () => {
    updateUserMutation({
      variables:  {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phone: user.phone,
        rolePermanentLink: user.rolePermanentLink,
        authProvider: {
          credentials: {
            password: user.password,
            passwordConfirmation: user.passwordConfirmation
          }
        }
      }
    })
  }

  return (
    <>
      { redirect && <Redirect to={{ pathname: `/users` }} /> }
      <Grid classes={{root: classes.editUserFormGrid}} >
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid item container justifyContent="center" classes={{ root: classes.gridTextFieldTop}} >
            <Grid item  md={5} xs={10}>
              <TextField
                value={user.firstName}
                onChange={handleChange}
                label="Nombre"
                fullWidth
                error={errors.firstName}
                name="firstName"/>
              <FormHelperText error>{errors.first_name}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item md={5} xs={10}>
              <TextField
                fullWidth
                value={user.lastName}
                onChange={handleChange}
                label="Apellido"
                error={errors.lastName}
                name="lastName"/>
              <FormHelperText error>{errors.last_name}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item md={5} xs={10}>
              <TextField
                fullWidth
                value={user.email}
                onChange={handleChange}
                label="Correo"
                error={errors.email}
                name="email"/>
              <FormHelperText error>{errors.email}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item md={5} xs={10}>
              <TextField
                fullWidth
                value={user.address}
                onChange={handleChange}
                label="Dirección"
                error={errors.address}
                name="address"/>
              <FormHelperText error>{errors.address}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item md={5} xs={10}>
              <TextField
                fullWidth
                value={user.phone}
                onChange={handleChange}
                label="Telefono"
                error={errors.phone}
                name="phone"/>
              <FormHelperText error>{errors.phone}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item md={5} xs={10}>
              <TextField
                fullWidth
                type={'password'}
                value={user.password}
                onChange={handleChange}
                label="Contraseña"
                error={errors.password}
                name="password"/>
              <FormHelperText error>{errors.password}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item md={5} xs={10}>
              <TextField
                fullWidth
                type={'password'}
                value={user.passwordConfirmation}
                onChange={handleChange}
                label="Confirmar Contraseña"
                error={errors.passwordConfirmation}
                name="passwordConfirmation"/>
              <FormHelperText error>{errors.password_confirmation}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item md={5} xs={10}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-required-label" >Rol</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  name={"rolePermanentLink"}
                  value={user.rolePermanentLink}
                  onChange={handleChange}
                >
                  {
                    props.data && props.data.roles.map((role)=> {
                      return(
                        <MenuItem key={role.name + "role"} value={role.permanentLink}>
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
          <Grid item container xs={12} justifyContent="center">
            <Grid item md={5} xs={10} className={ classes.submitButtonWrapper }>
              <Button
                disabled={user.pristine || loading}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                classes={{ root: classes.editUserFormSubmitButton }}
                onClick={ submitForm }>
                Guardar Cambios
                { loading && <CircularProgress className={classes.buttonProgress} size={24} /> }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  )
}

export default withStyles(styles)(UserFormNew)
