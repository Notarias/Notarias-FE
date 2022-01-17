import React, { useState } from 'react';
import InputText            from "./input_with_icon"
import VpnKeyIcon           from '@material-ui/icons/VpnKey';
import VpnKeyOutlinedIcon   from '@material-ui/icons/VpnKeyOutlined';
import Button               from '@material-ui/core/Button';
import { withStyles }       from '@material-ui/core/styles';
import Visibility           from '@material-ui/icons/Visibility';
import VisibilityOff        from '@material-ui/icons/VisibilityOff';
import IconButton           from '@material-ui/core/IconButton';
import InputAdornment       from '@material-ui/core/InputAdornment';
import { gql, useMutation }                  from '@apollo/client';
import CircularProgress     from '@material-ui/core/CircularProgress';
import { GET_CURRENT_USER } from '../../../resolvers/queries';
import { GLOBAL_MESSAGE }   from '../../../resolvers/queries';

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

const SecurityForm = (props) => {
  const { classes } = props

  const [user, setUser] = useState({ id: props.currentUser.id, password: "", passwordConfirmation: "" })
  const [errors, setErrors] = useState({});
  const [pristine, setPristine] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = ({ target }) => {
    const {name, value} = target
    setUser({ ...user, [name]: value })
    setPristine(false)
  }

  const handleClickShowPassword = (event) => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [updateUserMutation, { loading }] =
    useMutation(
      UPDATE_USER_PASSWORD,
      {
        onError(error) {
          let errorsHash = {}
          error.graphQLErrors.map((error) => {
            errorsHash[error.extensions.attribute] = error.message
            return(error.message)
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
        },
        onCompleted(data) {
          setPristine(true)
          setUser({ ...user, password: "", passwordConfirmation: "" })
        }
      }
    )
  
  const canSubmit = () => {
    if (pristine === true && !loading) {
      return true
    } else if (pristine === false && !loading) {
      return false
    } else if (pristine === false && loading) {
      return true
    }
  }
  

  const submitForm = (e) => {
    e.preventDefault()
    updateUserMutation(
      {
        variables: {
          input: {
            id: user.id,
            authProvider: {
              credentials: {
                password: user.password,
                passwordConfirmation: user.passwordConfirmation
              }
            },
          }
        }
      }
    )
  }

  return(
      <div>
        <form onSubmit={ onSubmit }>
          <InputText
            className={classes.iconStyle}
            errors={errors} 
            errorsKey={"password"}
            name='password' 
            handleChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            htmlFor="standard-adornment-password"
            value={user.password}
            label="Contraseña"
            icon={ <VpnKeyIcon/>}
            inputProps={{endAdornment:
              (<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>)}}
            />
          <InputText
            style={{ marginBottom: '30px' }}
            errors={errors}
            errorsKey={"password_confirmation"}
            name='passwordConfirmation'
            handleChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            htmlFor="standard-adornment-password"
            value={user.passwordConfirmation}
            label="Confirmar Contraseña"
            icon={ < VpnKeyOutlinedIcon/>}
            inputProps={{endAdornment:
              (<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>)}}
          />
          <Button
            disabled={canSubmit(loading)}
            variant="contained"
            color="primary"
            type="submit"
            className={classes.inputBase}
            onClick={ submitForm }>
            Guardar Cambios
            { loading && <CircularProgress className={classes.buttonProgress} size={24} /> }
          </Button>
        </form>
      </div>
  )
}

export default withStyles(styles)(SecurityForm);
