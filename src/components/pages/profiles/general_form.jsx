import React, { useState }     from 'react';
import Grid                    from '@material-ui/core/Grid';
import InputText               from "./input_with_icon"
import PersonIcon              from '@material-ui/icons/Person';
import PersonOutlineIcon       from '@material-ui/icons/PersonOutline';
import PersonPinCircleIcon     from '@material-ui/icons/PersonPinCircle';
import PhoneIcon               from '@material-ui/icons/Phone';
import MailIcon                from '@material-ui/icons/Mail';
import Button                  from '@material-ui/core/Button';
import { gql, useMutation }    from '@apollo/client';
import CircularProgress        from '@material-ui/core/CircularProgress';
import { GET_CURRENT_USER }    from '../../../resolvers/queries'
import { GLOBAL_MESSAGE }      from '../../../resolvers/queries';

const UPDATE_USER_PROFILE = gql`
mutation updateUser(
    $id: ID!,
    $firstName: String,
    $lastName: String,
    $email: String,
    $phone: String,
    $address: String,
  ) {
  updateUser(
    input: {
      id: $id,
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      phone: $phone,
      address: $address
    }
  ) {
    user {
      firstName
      lastName
      id
      address
      email
      lockedAt
      phone
      avatarThumbUrl
      avatarMidUrl
      avatarUrl
      roles {
        id
        name
        permanentLink
      }
    }
  }
}
`

const GeneralForm = (props) => {

  const [currentUser, setCurrentUser] = useState(props.currentUser);
  const [pristine, setPristine] = useState(true);
  const [errors, setErrors] = useState({})

  const onCompleteUpdate = (data) => {
    setCurrentUser(data.updateUser.user)
    setErrors(data.errors || {})
  }

  const [uploadImageMutation, { loading }] =
    useMutation(
      UPDATE_USER_PROFILE,
      {
        context: { hasUpload: true },
        onCompleted(cacheData) {
          onCompleteUpdate(cacheData)
        },
        onError(error) {
          let errorsHash = {}
          error.graphQLErrors.map((error) => {
            errorsHash[error.extensions.attribute] = error.message
            return(error.message)
          }) 
          setErrors(errorsHash)
        }
      }
    )

  const handleChange = (e) => {
    const {name, value} = e.currentTarget
    setCurrentUser({ ...currentUser, [name]: value })
    setPristine(false)
  }

  const canSubmit = () => {
    if (pristine && !loading) {
      return true
    } else if (!pristine && !loading) {
      return false
    } else if (!pristine && loading) {
      return true
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const submitForm = (e) => {
    e.preventDefault()
    uploadImageMutation(
      {
        variables: { ...currentUser },
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
  
  return(
      <Grid item container xs direction='column' justifyContent='center'>
        <form onSubmit={onSubmit}>
          <InputText
            errors={errors}
            errorsKey={"first_name"}
            name='firstName'
            handleChange={handleChange}
            value={currentUser.firstName}
            label="nombre(s)"
            icon={ <PersonIcon/>}
          />
          <InputText
            errors={errors}
            errorsKey={"last_name"}
            name='lastName'
            handleChange={handleChange}
            value={currentUser.lastName}
            label="apellido(s)"
            icon={ <PersonOutlineIcon/>}
          />
          <InputText
            errors={errors}
            errorsKey={"address"}
            name='address'
            handleChange={handleChange}
            value={currentUser.address}
            label="direccion"
            icon={ <PersonPinCircleIcon/>}
          />
          <InputText
            errors={errors}
            errorsKey={"email"}
            name='email'
            handleChange={handleChange}
            value={currentUser.email}
            label="e-mail"
            icon={ <MailIcon/>}
          />
          <InputText
            errors={errors}
            errorsKey={"phone"}
            name='phone'
            handleChange={handleChange}
            value={currentUser.phone}
            label="telefono"
            icon={ <PhoneIcon/>}
          />
          <Button
            disabled={canSubmit()}
            variant="contained"
            color="primary"
            type="submit"
            onClick={ submitForm }
          >
            Guardar Cambios
            { loading && <CircularProgress size={14} /> }
          </Button>
        </form>
      </Grid>
  )
}

export default GeneralForm;
