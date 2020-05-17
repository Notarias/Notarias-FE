import React, { Component } from 'react';
import Button               from '@material-ui/core/Button';
import MenuItem             from '@material-ui/core/MenuItem';
import withStyles           from '@material-ui/core/styles/withStyles';
import { styles }           from './styles';
import CircularProgress     from '@material-ui/core/CircularProgress';
import Grid                 from '@material-ui/core/Grid';
import FormHelperText       from '@material-ui/core/FormHelperText';
import TextField            from '@material-ui/core/TextField';
import gql                  from 'graphql-tag';
import { Mutation }         from '@apollo/react-components';
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

class  UserFormNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pristine: true,
      errors: {},
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      rolePermanentLink: "",
      password: "",
      passwordConfirmation: "",
      roleName: "",
    }
  }

  handleChange = ({ target }) => {
    const {name, value} = target
    this.setState({ [name]: value, pristine: false })
  }

  onCompleted(data) {
    if (data.createUser.pointers) {
      this.setState({ errors: data.createUser.pointers })
    } else {
      setTimeout(() => { this.props.history.push(`/users`) }, 3000)
    }
  }
  

  submitForm(mutation) {
    mutation({
      variables:  {
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        address: this.state.address,
        phone: this.state.phone,
        rolePermanentLink: this.state.rolePermanentLink,
        authProvider: {
          credentials: {
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
          }
        }
      } 
    })
  }

  render() {
    const { classes, data } = this.props
    return (
      <Grid classes={{root: classes.editUserFormGrid}} >
        <Mutation
          mutation={USER_EDIT_MUTATION}
          onCompleted={this.onCompleted.bind(this)}>
          {
            (mutation, { loading, error, data }) => {
              return(
                <form onSubmit={(e) => e.preventDefault()}>
                  <Grid item container classes={{ root: classes.gridTextFieldTop}} >
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        value={this.state.firstName}
                        classes={{ root: classes.userFormTextFieldEdit }}
                        onChange={this.handleChange.bind(this)}
                        label="Nombre"
                        error={this.state.errors.firstName}
                        name="firstName"/>
                      <FormHelperText error>{this.state.errors.first_name}</FormHelperText>
                    </Grid>
                  </Grid>
                  <Grid item container >
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        value={this.state.lastName}
                        classes={{ root: classes.userFormTextFieldEdit }}
                        onChange={this.handleChange.bind(this)}
                        label="Apellido"
                        error={this.state.errors.lastName}
                        name="lastName"/>
                      <FormHelperText error>{this.state.errors.last_name}</FormHelperText>
                    </Grid>
                  </Grid>
                  <Grid item container >
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        value={this.state.email}
                        classes={{ root: classes.userFormTextFieldEdit }}
                        onChange={this.handleChange.bind(this)}
                        label="Correo"
                        error={this.state.errors.email}
                        name="email"/>
                      <FormHelperText error>{this.state.errors.email}</FormHelperText>
                    </Grid>
                  </Grid>
                  <Grid item container >
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        value={this.state.address}
                        classes={{ root: classes.userFormTextFieldEdit }}
                        onChange={this.handleChange.bind(this)}
                        label="Dirección"
                        error={this.state.errors.address}
                        name="address"/>
                      <FormHelperText error>{this.state.errors.address}</FormHelperText>
                    </Grid>
                  </Grid>
                  <Grid item container >
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        value={this.state.phone}
                        classes={{ root: classes.userFormTextFieldEdit }}
                        onChange={this.handleChange.bind(this)}
                        label="Telefono"
                        error={this.state.errors.phone}
                        name="phone"/>
                      <FormHelperText error>{this.state.errors.phone}</FormHelperText>
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
                        onChange={this.handleChange.bind(this)}
                        label="Contraseña"
                        error={this.state.errors.password}
                        name="password"/>
                      <FormHelperText error>{this.state.errors.password}</FormHelperText>
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
                        onChange={this.handleChange.bind(this)}
                        label="Confirmar Contraseña"
                        error={this.state.errors.passwordConfirmation}
                        name="passwordConfirmation"/>
                      <FormHelperText error>{this.state.errors.password_confirmation}</FormHelperText>
                    </Grid>
                  </Grid>
                  <Grid item container >
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={11}>
                      <FormControl  className={classes.formControl, classes.userFormTextFieldEdit}>
                      <InputLabel id="demo-simple-select-required-label" >Rol</InputLabel>
                        <Select
                          labelId="demo-simple-select-required-label"
                          id="demo-simple-select-required"
                          name={"rolePermanentLink"}
                          value={this.state.rolePermanentLink}
                          onChange={this.handleChange.bind(this)}
                        >
                         {
                            this.props.data.roles.map((role)=> {
                              return(
                                <MenuItem value={role.permanentLink}>
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
                      onClick={  this.submitForm.bind(this, mutation) }>
                      Guardar Cambios
                      { loading && <CircularProgress className={classes.buttonProgress} size={24} /> }
                    </Button>
                  </Grid>
                </form>
              )
            }
          }
        </Mutation>
      </Grid>
    )
  }
}

export default withStyles(styles)(UserFormNew)
