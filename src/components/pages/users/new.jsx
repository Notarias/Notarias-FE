import React, { useState }          from 'react';
import Button                       from '@material-ui/core/Button';
import CircularProgress             from '@material-ui/core/CircularProgress';
import Typography                   from '@material-ui/core/Typography';
import Grid                         from '@material-ui/core/Grid';
import DialogActions                from '@material-ui/core/DialogActions';
import DialogContent                from '@material-ui/core/DialogContent';
import DialogTitle                  from '@material-ui/core/DialogTitle';
import Divider                      from '@material-ui/core/Divider';
import FormHelperText               from '@material-ui/core/FormHelperText';
import TextField                    from '@material-ui/core/TextField';
import { useMutation }              from '@apollo/client';
import { Redirect }                 from 'react-router-dom';
import { LOAD_USERS, USER_CREATE }  from './queries_and_mutations/queries'

const UserNew = (props) => {
  
  const { switchCreateDialog, userQueriVariables } = props

  const [errors, setErrors]     = useState({});
  const [redirect, setRedirect] = useState(false);
  const [user, setUser]         = useState({
                                    id: "",
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    address: "",
                                    phone: "",
                                    password: "",
                                    passwordConfirmation: ""
                                  });

  const handleChange = ({ target }) => {
    const {name, value} = target
    setUser({ ...user, [name]: value })
  }

  const [createUser, {loading}] =
    useMutation(
      USER_CREATE,
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
          switchCreateDialog();
          setRedirect(true);
        },
        refetchQueries: [
          {
            query: LOAD_USERS, variables: userQueriVariables
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const submitForm = () => {
    createUser({
      variables:  {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phone: user.phone,
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
      <Grid>
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogTitle>
            <Grid item container justifyContent="center">
              <Grid item  md={8} xs={10}>
                <Typography variant='h6' align='center'>
                  Nuevo Usuario
                </Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <Grid item container justifyContent="center">
              <Grid item  md={8} xs={10}>
                <TextField
                  required
                  value={user.firstName}
                  onChange={handleChange}
                  label="Nombre"
                  fullWidth
                  error={!!errors.firstName}
                  name="firstName"/>
                <FormHelperText error>{errors.first_name}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container justifyContent="center">
              <Grid item md={8} xs={10}>
                <TextField
                  required
                  fullWidth
                  value={user.lastName}
                  onChange={handleChange}
                  label="Apellido"
                  error={!!errors.lastName}
                  name="lastName"/>
                <FormHelperText error>{errors.last_name}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container justifyContent="center">
              <Grid item md={8} xs={10}>
                <TextField
                  required
                  fullWidth
                  value={user.email}
                  onChange={handleChange}
                  label="Correo"
                  error={!!errors.email}
                  name="email"/>
                <FormHelperText error>{errors.email}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container justifyContent="center">
              <Grid item md={8} xs={10}>
                <TextField
                  fullWidth
                  value={user.address}
                  onChange={handleChange}
                  label="Dirección"
                  error={!!errors.address}
                  name="address"/>
                <FormHelperText error>{errors.address}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container justifyContent="center">
              <Grid item md={8} xs={10}>
                <TextField
                  fullWidth
                  value={user.phone}
                  onChange={handleChange}
                  label="Telefono"
                  error={!!errors.phone}
                  name="phone"/>
                <FormHelperText error>{errors.phone}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container justifyContent="center">
              <Grid item md={8} xs={10}>
                <TextField
                  required
                  fullWidth
                  type={'password'}
                  value={user.password}
                  onChange={handleChange}
                  label="Contraseña"
                  error={!!errors.password}
                  name="password"/>
                <FormHelperText error>{errors.password}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container justifyContent="center">
              <Grid item md={8} xs={10}>
                <TextField
                  required
                  fullWidth
                  type={'password'}
                  value={user.passwordConfirmation}
                  onChange={handleChange}
                  label="Confirmar Contraseña"
                  error={!!errors.passwordConfirmation}
                  name="passwordConfirmation"/>
                <FormHelperText error>{errors.password_confirmation}</FormHelperText>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider variant="middle" />
          <DialogActions>
            <Grid item container xs={12} justifyContent="center" style={{padding: '20px'}}>
              <Grid item container md={12} xs={12} justifyContent='flex-end'>
                <Grid item xs={3} style={{paddingRight: '10px'}}>
                  <Button
                    disabled={user.pristine || loading}
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                    onClick={ switchCreateDialog }
                  >
                    Cancelar
                    { loading && <CircularProgress size={24} /> }
                  </Button>
                </Grid>
                <Grid item xs={3} style={{paddingLeft: '10px'}}>
                  <Button
                    disabled={user.pristine || loading}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    onClick={ submitForm }
                  >
                    Crear
                    { loading && <CircularProgress size={24} /> }
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </Grid>
    </>
  )
}

export default UserNew;

