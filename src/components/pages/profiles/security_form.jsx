import React, { Component } from 'react';
import InputText from "./input_with_icon"
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Button from '@material-ui/core/Button';
import { withStyles }       from '@material-ui/core/styles';
import store from '../../../store';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { gql }                 from 'apollo-boost';
import { Mutation }            from '@apollo/react-components';
import CircularProgress        from '@material-ui/core/CircularProgress';
import { GET_CURRENT_USER }    from '../../../resolvers/queries';
import { GLOBAL_MESSAGE }      from '../../../resolvers/queries';

const styles = {
  inputBase: {
    margin: '20px 0px ',
  },
  iconStyle: {
    marginBottom: '19px',
    marginRigth: '0px',
  }
}

const UPDATE_USER_PASSWORD = gql`
mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    user {
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
    errors
    pointers
  }
}
`

class SecurityForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: props.currentUser.id,
      password: "",
      passwordConfirmation: "",
      errors: {},
      submitting: false,
      pristine: true,
      showPassword: false,
    }
  }

  onCompleteUpdate(data) {
    this.setState({ errors: data.updateUser.pointers || {} })
  }

  onSubmit(e) {
    e.preventDefault()
  }

  handleChange = ({ target }) => {
    const {name, value} = target
    this.setState({ [name]: value, pristine: false })
  }

  canSubmit(loading) {
    if (this.state.pristine == true && !loading) {
      return true
    } else if (this.state.pristine == false && !loading) {
      return false
    } else if (this.state.pristine == false && loading) {
      return true
    }
  }

  handleClickShowPassword = event => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  submitForm(mutation, e) {
    e.preventDefault()
    mutation(
      {
        variables: {
          input: {
            id: this.state.id,
            authProvider: {
              credentials: {
                password: this.state.password,
                passwordConfirmation: this.state.passwordConfirmation
              }
            },
          }
        },
        update: (store, { data: { updateUser } }) => {
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
        }
      }
    )
  }

  render() {
    const { classes } = this.props
    return(
        <div>
          <form onSubmit={ this.onSubmit.bind(this) }>
            <InputText
              className={classes.iconStyle}
              errors={this.state.errors} 
              errorsKey={"password"}
              name='password' 
              handleChange={this.handleChange.bind(this)}
              type={this.state.showPassword ? 'text' : 'password'}
              htmlFor="standard-adornment-password"
              value={this.state.password}
              label="Contraseña"
              icon={ <VpnKeyIcon/>}
              inputProps={{endAdornment:
                (<InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword.bind(this)}
                    onMouseDown={this.handleMouseDownPassword.bind(this)}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>)}}
              />
            <InputText
              style={{ marginBottom: '30px' }}
              errors={this.state.errors}
              errorsKey={"password_confirmation"}
              name='passwordConfirmation'
              handleChange={this.handleChange.bind(this)}
              type={this.state.showPassword ? 'text' : 'password'}
              htmlFor="standard-adornment-password"
              value={this.state.passwordConfirmation}
              label="Confirmar Contraseña"
              icon={ < VpnKeyOutlinedIcon/>}
              inputProps={{endAdornment:
                (<InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword.bind(this)}
                    onMouseDown={this.handleMouseDownPassword.bind(this)}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>)}}
            />
            <Mutation
              mutation={UPDATE_USER_PASSWORD}
              onCompleted={this.onCompleteUpdate.bind(this)}>
              {
                (mutation, { loading, error, data }) => {
                  return(
                    <Button
                      disabled={this.canSubmit(loading)}
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.inputBase}
                      onClick={ this.submitForm.bind(this, mutation) }>
                      Guardar Cambios
                      { loading && <CircularProgress className={classes.buttonProgress} size={24} /> }
                    </Button>
                  )
                }
              }
            </Mutation>
          </form>
        </div>
    )
  }
}

export default withStyles(styles)(SecurityForm);
