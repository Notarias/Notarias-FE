import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import { CREATE_CLIENT } from '../queries_and_mutations/queries'
import { Hidden } from '@material-ui/core';

const FastCreateClientForm = (props) => {

  const { setNewClientForm, activeStep, handleNext, setClientInfo, setCausantInfo} = props;

  const [errors, setErrors] = useState({});
  const [errorFormSpacing, setErrorFormSpacing] = useState(2);
  const [pristine, setPristine] = useState(true);
  const [newClient, setNewClient] = useState({
                                      firstName: "",
                                      lastName: "",
                                      curp: "",
                                      rfc: "",
                                      moral: false,
                                      causant: false,
                                    });

  let variables = {
    firstName: newClient.firstName,
    lastName: newClient.lastName,
    rfc: newClient.rfc,
    curp: newClient.curp,
    moral: newClient.moral,
    causant: newClient.causant,
  }

  const setFormValue = ({ target }) => {
    const {name, value} = target
    setNewClient({ ...newClient, [name]: value })
    setPristine(false)
  }

  const closeCreateClientForm = () => {
    setNewClientForm(false);
  }

  const [createClient, { loading: createClientLoading }] =
  useMutation(
    CREATE_CLIENT,
    {
      onError(error) {
        let errorsHash = {}
        error.graphQLErrors.map((error) => {
          errorsHash[error.extensions.attribute] = error.message
        })
        setErrorFormSpacing(0);
        setErrors(errorsHash)
        setPristine(true)
      },
      onCompleted(cacheData) {
        (activeStep === 0) ? setClientInfo(cacheData.createClient.client) : setCausantInfo(cacheData.createClient.client);
        closeCreateClientForm();
        setErrorFormSpacing(2);
        handleNext();
      },
      fetchPolicy: "no-cache"
    }
  )

  const createNewClient = (event) => {
    createClient({ variables: variables })
  }

  return (
    <Grid container item xs={6} alignItems="center" fullWidth={true}>
      <Card style={{ minWidth: "100%" }}>
        <CardContent>
          <Grid container item direction="column" spacing={errorFormSpacing} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
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
              />
              {console.log(errors)}
            </Grid>
            <Grid item xs={12}>
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

              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                id="rfc-basic" 
                label="RFC" 
                onChange={setFormValue}
                variant="outlined"
                value={newClient.rfc}
                error={!!errors.rfc}
                helperText={errors.rfc}
                name="rfc"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                id="curp-basic" 
                label="CURP" 
                onChange={setFormValue}
                variant="outlined"
                value={newClient.curp}
                disabled={newClient.moral}
                error={!!errors.curp}
                helperText={errors.curp}
                name="curp"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="moral-client-basic"
                    checked={newClient.moral}
                    name="moral"
                    color="primary"
                  />
                }
                label="El Cliente es Persona Moral"
                margin="dense"
              />
            </Grid>
            { (activeStep === 1) ? newClient.causant = true : newClient.causant = false }
            <Grid container item xs={12} direction="row" justifyContent="center">
              <Grid item xs={5}>
                <Button
                  onClick={ closeCreateClientForm }>
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  onClick={ createNewClient }>
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default FastCreateClientForm;
