import React, { useState }    from 'react';
import TextField              from '@material-ui/core/TextField';
import Grid                   from '@material-ui/core/Grid';
import Button                 from '@material-ui/core/Button';
import { Redirect }           from 'react-router-dom';
import { useMutation }        from '@apollo/client';
import { CREATE_CLIENT }      from './clients_queries_and_mutations/queries'
import { GLOBAL_MESSAGE }     from '../../../resolvers/queries';
import client                 from '../../../apollo';

const NewClientForm = (props) => {
  const { newClientDialogSwitch} = props;

  const [errors, setErrors] = useState({});
  const [errorFormSpacing, setErrorFormSpacing] = useState("20px");
  const [redirect, setRedirect] = useState(false)
  const [newClient, setNewClient] = useState({
                                      firstName: "",
                                      lastName: "",
                                      phone: ""
                                    });

  const setFormValue = ({ target }) => {
    const {name, value} = target
    setNewClient({ ...newClient, [name]: value })
  }

  const [createClient] =
  useMutation(
    CREATE_CLIENT,
    {
      onError(apolloError) {
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "Error al actualizar el perfil",
              type: "error",
              __typename: "globalMessage"
            }
          }
        })
        let errorsHash = {}
        apolloError.graphQLErrors.map((error) => {
          errorsHash[error.extensions.attribute] = error.message
          return(error.message)
        })
        setErrors(errorsHash)
        setErrorFormSpacing(0);
      },
      onCompleted(cacheData) {
        newClientDialogSwitch();
        setErrorFormSpacing("20px");
        setRedirect(
          <Redirect to={{ pathname: `/clients/${cacheData.createClient.client.id}/edit` }}/>
        )
      }
    }
  )

  let variables = {
    firstName: newClient.firstName,
    lastName: newClient.lastName,
    phone: newClient.phone
  }

  const createNewClient = (event) => {
    createClient({ variables: variables })
  }

  return (
    <Grid container justifyContent="center">
      <Grid container item xs={7} direction='row' justifyContent="center" alignItems='center'>
        <Grid item xs={12} style={{paddingBottom:`${errorFormSpacing}`}}>
          <TextField 
            id="first-name-basic" 
            label="Nombres"
            onChange={setFormValue}
            variant="outlined"
            value={newClient.firstName}
            error={!!errors.first_name}
            helperText={errors.first_name}
            name="firstName"
            margin="dense"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} style={{paddingBottom:`${errorFormSpacing}`}}>
          <TextField 
            id="last-name-basic" 
            label="Apellidos" 
            onChange={setFormValue}
            variant="outlined"
            value={newClient.lastName}
            error={!!errors.last_name}
            helperText={errors.last_name}
            name="lastName"
            margin="dense"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} style={{paddingBottom:`${errorFormSpacing}`}}>
          <TextField 
            id="phone-basic" 
            label="Telefono" 
            onChange={setFormValue}
            variant="outlined"
            value={newClient.phone}
            error={!!errors.phone}
            helperText={errors.phone}
            name="phone"
            margin="dense"
            fullWidth
          />
        </Grid>
        <Grid container item xs={12} direction="row" justifyContent="center" style={{paddingBottom:'10px'}}>
          <Grid container item xs={6} justifyContent='flex-start'>
            <Button
              onClick={newClientDialogSwitch}
              color='secondary'            
            >
              Cancelar
            </Button>
          </Grid>
          <Grid container item xs={6} justifyContent='flex-end'>
            <Button
              onClick={createNewClient}
              color='primary'            
            >
              {redirect}
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NewClientForm;
