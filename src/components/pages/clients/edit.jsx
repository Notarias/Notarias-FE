import React, { useState, useEffect }   from 'react';
import Grid                             from '@material-ui/core/Grid';
import Divider                          from '@material-ui/core/Divider';
import Typography                       from '@material-ui/core/Typography';
import Button                           from '@material-ui/core/Button';
import IconButton                       from '@material-ui/core/IconButton';
import Paper                            from '@material-ui/core/Paper';
import ArrowBackIcon                    from '@material-ui/icons/ArrowBack';
import Breadcrumbs                      from '../../ui/breadcrumbs';
import ClientGeneralForm                from './edit/client_general_form'
import ClientLegalForm                  from './edit/client_legal_form'
//import ClientsAttributesList            from './edit/clients_attributes_list'
import { Link }                         from 'react-router-dom';
import { useQuery, useMutation }        from '@apollo/client';
import { GET_CLIENT }                   from './clients_queries_and_mutations/queries';
import { UPDATE_CLIENT_MUTATION }       from './clients_queries_and_mutations/queries';
import { GLOBAL_MESSAGE }               from '../../../resolvers/queries';
import client                           from '../../../apollo';

const BREADCRUMBS = [
    { name: "Inicio", path: "/" },
    { name: "Clientes", path: "/clients" },
    { name: "Editar", path: null }
  ]

const Edit = (props) => {
  const { match } = props

  const [errors, setErrors] = useState({});
  const [pristine, setPristine] = useState(false);
  const [clientInfo, setClientInfo] = useState({
                                                id: "",
                                                firstName: "",
                                                lastName: "",
                                                email: "",
                                                phone: "",
                                                curp: "",
                                                zipCode: "",
                                                address: "",
                                                countryCode: "",
                                                state: "",
                                                city: "",
                                                business: "",
                                                rfc: "",
                                                moral: "",
                                                legalPhone: "",
                                                legalZipCode: "",
                                                legalAddress: "",
                                                legalCountryCode: "",
                                                legalState: "",
                                                legalCity: ""
                                              });

  if (!localStorage.wwToken) {
    useEffect(() => {
      fetch("https://www.universal-tutorial.com/api/getaccesstoken",
        {headers:{
          "Accept": "application/json",
          "api-token": "0If1aY4jUevUbNrnxPYspSVjiD6ik8aNw-LF7QetOdIO0xCTX52--39Zh8iEaAeI1M4",
          "user-email": "roga.zero@gmail.com"
        }}
      )
      .then(response => response.json())
      .then(response => localStorage.setItem('wwToken', response.auth_token))
    }, [localStorage])
  }

  const setFormValue = (event) => {
    /* const {name, value} = target
    setClientInfo({...clientInfo, [name]: value});
    setPristine(false); */
    console.log(event)
  }



  const { loading, data } = useQuery(
    GET_CLIENT, { variables: {"id": match.params.id } }
  );

  useEffect(() => {
    if(data && data.client) {
      setClientInfo(data.client)
    }
  }, [loading, data]);

  

  const [updateClient] = useMutation(
    UPDATE_CLIENT_MUTATION,
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
      },
      onCompleted(cacheData) {
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "El perfil se actualizo con exito.",
              type: "success",
              __typename: "globalMessage"
            }
          }
        })
        setPristine(true);
      }
    }
  )

  let variables = {
    id: clientInfo.id,
    firstName: clientInfo.firstName,
    lastName: clientInfo.lastName,
    email: clientInfo.email,
    phone: clientInfo.phone,
    curp: clientInfo.curp,
    zipCode: clientInfo.zipCode,
    address: clientInfo.address,
    countryCode: clientInfo.countryCode,
    state: clientInfo.state,
    city: clientInfo.city,
    business: clientInfo.business,
    rfc: clientInfo.rfc,
    moral: clientInfo.moral,
    legalPhone: clientInfo.legalPhone,
    legalZipCode: clientInfo.legalZipCode,
    legalAddress: clientInfo.legalAddress,
    legalCountryCode: clientInfo.legalCountryCode,
    legalState: clientInfo.legalState,
    legalCity: clientInfo.legalCity
  }

  const saveClientChanges = (event) => {
    updateClient({ variables: variables })
  }

  const cancelClientEdit = () => {
    setPristine(true);
    setClientInfo({});
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid container item xs={10} md={8} direction='row' justifyContent='flex-start' alignItems='center' style={{paddingTop:'15px', paddingBottom:'10px'}}>
          <Grid container item xs={8} alignItems='center'>
            <Grid item style={{paddingRight:'10px'}}>
              <IconButton 
                component={Link} 
                to="/clients"
                onClick={cancelClientEdit}
              >
                <ArrowBackIcon/>
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Regresar a Clientes
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={4} justifyContent='flex-end'>
            <Grid item style={{paddingRight:'10px'}}>
              <Button variant="contained" color="primary" disabled={pristine} onClick={saveClientChanges}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} md={8}>
          <Divider/>
        </Grid>
        <Grid container item xs={10} md={8} direction='row' justifyContent='flex-start' alignItems='flex-start' style={{paddingTop:'10px', paddingBottom:'10px'}}>
          <Grid item xs={12} lg={4}>
            <Typography variant="subtitle1" align='left' style={{paddingTop:'10px', paddingBottom:'10px', paddingLeft:'10px'}}>
              Informacion General
            </Typography>
          </Grid>
          <Grid item xs style={{paddingRight:'10px'}}>
            <Paper variant="outlined" style={{padding:'20px'}}>
              <Grid container direction='row' justifyContent='center' alignItems='center'>
                <ClientGeneralForm clientInfo={clientInfo} setClientInfo={setClientInfo} setFormValue={setFormValue} errors={errors}/>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={10} md={8}>
          <Divider/>
        </Grid>
        <Grid container item xs={10} md={8} direction='row' justifyContent='flex-start' alignItems='flex-start' style={{paddingTop:'10px', paddingBottom:'10px'}}>
          <Grid item xs={12} lg={4}>
            <Typography variant="subtitle1" align='left' style={{paddingTop:'10px', paddingBottom:'10px', paddingLeft:'10px'}}>
              Informacion Fiscal
            </Typography>
          </Grid>
          <Grid item xs style={{paddingRight:'10px'}}>
            <Paper variant="outlined" style={{padding:'20px'}}>
              <Grid container direction='row' justifyContent='center' alignItems='center'>
                <ClientLegalForm clientInfo={clientInfo} setClientInfo={setClientInfo} setFormValue={setFormValue} errors={errors}/>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={10} md={8}>
          <Divider/>
        </Grid>
        <Grid container item xs={10} md={8} direction='row' justifyContent='flex-start' alignItems='flex-start' style={{paddingTop:'10px', paddingBottom:'10px'}}>
          <Grid item xs={12} lg={4}>
            <Typography variant="subtitle1" align='left' style={{paddingTop:'10px', paddingBottom:'10px', paddingLeft:'10px'}}>
              Atributos
            </Typography>
          </Grid>
          <Grid item xs style={{paddingRight:'10px'}}>
            <Paper variant="outlined" style={{padding:'20px'}}>
              <Grid container direction='row' justifyContent='center' alignItems='center'>
                {/* <ClientsAttributesList/> */}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={10} md={8}>
          <Divider/>
        </Grid>
        <Grid container item xs={10} md={8} direction='row' justifyContent='flex-start' alignItems='flex-start' style={{paddingTop:'10px', paddingBottom:'10px'}}>
          <Grid item xs={12} lg={4}>
            <Typography variant="subtitle1" align='left' style={{paddingTop:'10px', paddingBottom:'10px', paddingLeft:'10px'}}>
              Comentaríos
            </Typography>
          </Grid>
          <Grid item xs style={{paddingRight:'10px'}}>
            <Paper variant="outlined" style={{padding:'20px'}}>
              <Grid container direction='row' justifyContent='center' alignItems='center'>
                
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Edit;
