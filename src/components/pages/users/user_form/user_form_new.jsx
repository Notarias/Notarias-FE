import React, { Component } from 'react';
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

const USER_EDIT_MUTATION = gql`
  mutation createUser($firstName: String, $lastName:String, $email: String, $rolePermanentLink: String, $authProvider: AuthProviderSignupData){
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
  const { classes } = this.props

  const [errors, setErrors]     = useState({})
  const [user, setUser]         = useState({})
  const [pristine, setPristine] = useState(true)
  const [redirect, setRedirect] = useState(false)

  const handleChange = ({ target }) => {
    const {name, value} = target
    setUser({ ...user, [name]: value })
    setPristine(false)
  }

  const onCompleted = (data) => {
    if (data.createUser.pointers) {
      setErrors(data.createUser.pointers)
    } else {
      setRedirect(true)
    }
  }

  const [updateUserMutation, {loading}] =
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
        onCompleted(cacheData) {
          onCompleted(cacheData)
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
        address: user.address,submitForm,
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

  render() {
    
    return (
      <Grid classes={{root: classes.editUserFormGrid}} >
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid item container classes={{ root: classes.gridTextFieldTop}} >
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
              <TextFieldsubmitForm
                value={user.firstName}
                classes={{ root: classes.userFormTextFieldEdit }}
                onChange={handleChange}
                label="Nombre"
                error={errors.firstName}
                name="firstName"/>
              <FormHelperText error>{errors.first_name}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container >
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
              <TextField
                value={user.lastName}
                classes={{ root: classes.userFormTextFieldEdit }}
                onChange={handleChange}
                label="Apellido"
                error={errors.lastName}
                name="lastName"/>
              <FormHelperText error>{errors.last_name}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container >
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
              <TextField
                value={user.email}
                classes={{ root: classes.userFormTextFieldEdit }}
                onChange={handleChange}
                label="Correo"
                error={errors.email}
                name="email"/>
              <FormHelperText error>{errors.email}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container >
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
              <TextField
                value={this.state.address}
                classes={{ root: classes.userFormTextFieldEdit }}
                onChange={handleChange}
                label="Dirección"
                error={errors.address}
                name="address"/>
              <FormHelperText error>{errors.address}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container >
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
              <TextField
                value={this.state.phone}
                classes={{ root: classes.userFormTextFieldEdit }}
                onChange={handleChange}
                label="Telefono"
                error={errors.phone}
                name="phone"/>
              <FormHelperText error>{errors.phone}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container >
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
              <TextField
                type={'password'}
                value={this.state.password}
                classes={{ root: classes.userFormTextFieldEdit }}
                onChange={handleChange}
                label="Contraseña"
                error={errors.password}
                name="password"/>
              <FormHelperText error>{errors.password}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container >
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
              <TextField
                type={'password'}
                value={this.state.passwordConfirmation}
                classes={{ root: classes.userFormTextFieldEdit }}
                onChange={handleChange}
                label="Confirmar Contraseña"
                error={errors.passwordConfirmation}
                name="passwordConfirmation"/>
              <FormHelperText error>{errors.password_confirmation}</FormHelperText>
            </Grid>
          </Grid>
          <Grid item container >
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
              <FormControl  className={classes.formControl}>
              <InputLabel id="demo-simple-select-required-label" >Rol</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  name={"rolePermanentLink"}
                  value={this.state.rolePermanentLink}
                  onChange={handleChange}
                >
                  {
                    this.props.data && this.props.data.roles.map((role)=> {
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
          <Grid item classes={{ root: classes.buttonMarginBottom}}>
            <Button
              disabled={this.state.pristine || loading}
              variant="contained"
              color="primary"
              type="submit"
              classes={{ root: classes.editUserFormSubmitButton }}
              onClick={ submitForm }>
              Guardar Cambios
              { loading && <CircularProgress className={classes.buttonProgress} size={24} /> }
            </Button>
          </Grid>
        </form>
      </Grid>
    )
  }
}

export default withStyles(styles)(UserFormNew)
