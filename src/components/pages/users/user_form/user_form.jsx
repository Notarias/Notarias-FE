import React, { useState }              from 'react';
import Button                           from '@material-ui/core/Button';
import MenuItem                         from '@material-ui/core/MenuItem';
import ListItemText                     from '@material-ui/core/ListItemText';
import withStyles                       from '@material-ui/core/styles/withStyles';
import { styles }                       from './styles';
import CircularProgress                 from '@material-ui/core/CircularProgress';
import Grid                             from '@material-ui/core/Grid';
import Input                            from '@material-ui/core/Input';
import Chip                             from '@material-ui/core/Chip';
import FormHelperText                   from '@material-ui/core/FormHelperText';
import TextField                        from '@material-ui/core/TextField';
import Select                           from '@material-ui/core/Select';
import InputLabel                       from '@material-ui/core/InputLabel';
import FormControl                      from '@material-ui/core/FormControl';
import { useQuery, useMutation }        from '@apollo/client';
import { Redirect }                     from 'react-router-dom';
import { LOAD_ROLES, UPDATE_USER}       from '../queries_and_mutations/queries'
import { GLOBAL_MESSAGE }               from '../../../../resolvers/queries';

const UserForm = (props) => {
  const { classes, userData } = props

  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
                            id: userData.id,
                            firstName: !!userData.firstName ? userData.firstName : "",
                            lastName: !!userData.lastName ? userData.lastName : "",
                            email: !!userData.email ? userData.email : "",
                            address: !!userData.address ? userData.address : "",
                            phone: !!userData.phone ? userData.phone : "",
                            roles: !!userData.roles ? userData.roles : "",
                            password: "",
                            passwordConfirmation: ""
                          })
  const [selectedIds, setSelectedIds] = useState(
    userData && userData.roles.map((role) => {
      return(role.id)
    })
  );

  const { data } = useQuery(LOAD_ROLES)

  const handleChange = ({ target }) => {
    const {name, value} = target
    setUser({ ...user, [name]: value })
  }

  const selectRoles = (event) => {
    setSelectedIds(event.target.value)
  };

  const printSelectedsNames = (id) => {
    return(
      data && data.roles.map((role) => {
        if(role.id === id) {
          return(
            `${role.name}`
          )
        }
        return('')
      })
    )
  }

  const [updateUserMutation, { loading }] =
    useMutation(
      UPDATE_USER,
      {
        onError(error) {
          let errorsHash = {}
          error.graphQLErrors.map((error) => {
            errorsHash[error.extensions.attribute] = error.message
            return(error.message)
          }) 
          setErrors(errorsHash)
        },
        update(store, { data: { updateUser } }) {
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
          setTimeout(() => { setRedirect(true) }, 3000)
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
        roleIds: selectedIds,
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
      <Grid container classes={{root: classes.editUserFormGrid}} >
        <form style={{ width: "100%" }} onSubmit={(e) => e.preventDefault()}>
          <Grid justifyContent='center' item container className={classes.marginInputs} >
            <Grid item xs={6}>
              <TextField
                value={user.firstName}
                fullWidth
                onChange={handleChange}
                label="Nombre"
                error={!!errors.firstName}
                name="firstName"/>
              <FormHelperText error>{errors.first_name}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                value={user.lastName}
                fullWidth
                onChange={handleChange}
                label="Apellido"
                error={!!errors.lastName}
                name="lastName"/>
              <FormHelperText error>{errors.last_name}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                value={user.email}
                fullWidth
                onChange={handleChange}
                label="Correo"
                error={!!errors.email}
                name="email"/>
              <FormHelperText error>{errors.email}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                value={user.address}
                fullWidth
                onChange={handleChange}
                label="Dirección"
                error={!!errors.address}
                name="address"/>
              <FormHelperText error>{errors.address}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                value={user.phone}
                fullWidth
                onChange={handleChange}
                label="Telefono"
                error={!!errors.phone}
                name="phone"/>
              <FormHelperText error>{errors.phone}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                type={'password'}
                value={user.password}
                fullWidth
                onChange={handleChange}
                label="Contraseña"
                error={!!errors.password}
                name="password"/>
              <FormHelperText error>{errors.password}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <TextField
                type={'password'}
                value={user.passwordConfirmation}
                fullWidth
                onChange={handleChange}
                label="Confirmar Contraseña"
                error={!!errors.passwordConfirmation}
                name="passwordConfirmation"/>
              <FormHelperText error>{errors.password_confirmation}</FormHelperText>
            </Grid>
          </Grid>
          <Grid justifyContent='center' item container className={classes.marginInputs}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-mutiple-chip-label">Roles</InputLabel>
                <Select
                  multiline
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  fullWidth
                  value={selectedIds}
                  onChange={selectRoles}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {selected.map((id) => (
                        <Chip 
                          id={id}
                          size="small"
                          key={`selected-edit-${id}`}
                          style={{ margin: 2 }}
                          label={printSelectedsNames(id)}
                          variant="outlined"
                        />
                      ))}
                    </div>
                  )}
                >
                  {data && data.roles.map((role) => (
                    <MenuItem id={role.id} key={`edit-user-roles-${role.id}`} value={role.id}>
                      <ListItemText primary={role.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item justifyContent='center' container className={classes.buttonMargin}>
            <Grid item xs={6}>
              <Button
                fullWidth
                disabled={loading || redirect}
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
