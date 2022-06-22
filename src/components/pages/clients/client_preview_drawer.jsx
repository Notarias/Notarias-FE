import React, {useState}            from 'react';
import Drawer                       from '@material-ui/core/Drawer';
import Grid                         from '@material-ui/core/Grid';
import Divider                      from '@material-ui/core/Divider';
import Button                       from '@material-ui/core/Button';
import IconButton                   from '@material-ui/core/IconButton';
import CloseIcon                    from '@material-ui/icons/Close';
import VisibilityIcon               from '@material-ui/icons/Visibility';
import Typography                   from '@material-ui/core/Typography';
import Link                         from '@material-ui/core/Link';
import CircularProgress             from '@material-ui/core/CircularProgress';
import { styles }                   from './styles';
import { withStyles }               from '@material-ui/core/styles';
import { useQuery }                 from '@apollo/client';
import { GET_CLIENT }               from './clients_queries_and_mutations/queries';
import CountriesList                from './edit/countries_list.json';


const clientPreviewDrawer = (props) => {
  const { classes, clientId } = props
  
  const { loading, data } = useQuery(GET_CLIENT, { variables: { "id": clientId } });

  const [drawerState, setDrawerState] = useState(false);
  const [clientProps] = useState(["firstName",
                                  "lastName",
                                  "email",
                                  "phone",
                                  "curp",
                                  "zipCode",
                                  "address",
                                  "countryCode",
                                  "state",
                                  "city",
                                ]);

  const [clientLegalProps] = useState(["business",
                                       "rfc",
                                       "moral",
                                       "legalPhone",
                                       "legalZipCode",
                                       "legalAddress",
                                       "legalCountryCode",
                                       "legalState",
                                       "legalCity",
                                      ]);  

  const [clientFieldName] = useState(["Nombre",
                                      "Apellido",
                                      "Correo",
                                      "Teléfono",
                                      "CURP",
                                      "Código Postal",
                                      "Dirección",
                                      "País",
                                      "Estado",
                                      "Ciudad",
                                    ]);

  const [clientLegalFieldName] = useState(["Razón Social",
                                           "RFC",
                                           "Tipo de Persona",
                                           "Teléfono",
                                           "Código Postal",
                                           "Dirección",
                                           "País",
                                           "Estado",
                                           "Ciudad",
                                         ]);

  const printCountryName = (propertyValue) => {
    if(typeof propertyValue === 'boolean'){
      return(
        <>
          {propertyValue ? 'Moral' : 'Fisica'}
        </>
      )
    } 
    if(typeof propertyValue === 'string'){
      let countryObj = CountriesList.find(country => (country.country_short_name === propertyValue))
      return(
        <>
          {countryObj && countryObj.country_name}
        </>
      )
    }
  }

  const drawerAction = () => {
    setDrawerState(!drawerState)
  }

  return (
    <>
      {loading || !data ?
        <CircularProgress />
      :
        <>
          <Button onClick={drawerAction}><VisibilityIcon/></Button>
          <Drawer variant="persistent" anchor="right" open={drawerState} onClose={drawerAction}>
            <Grid container item style={{padding:'30px', maxWidth:'450px'}}>
              <Grid container item xs={12} alignItems='center'>
                <Grid container item xs justifyContent='flex-end'>
                  <Typography variant='h6' align='right' style={{padding:'20px'}}>
                    <strong>
                      Información del Cliente
                    </strong>
                  </Typography>
                </Grid>
                <Grid container item xs={3} justifyContent='flex-end'>
                  <IconButton  onClick={drawerAction}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{padding:'20px'}}>
                <Divider/>
              </Grid>
              <Grid id='clientData' item xs={12}>
              {
                clientProps.map((clientProp, index) => {
                  return(
                    <Grid container item xs={12} key={`client-${clientProp}`}>
                      <Grid item xs={5}>
                        <Typography variant='subtitle1' align='left'>
                          <strong>
                            {`${clientFieldName[index]}:`}
                          </strong>
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant='subtitle1' align='left'>
                          {clientProp === 'countryCode' ?
                            printCountryName(data.client[clientProp])
                          :
                            data.client[clientProp]
                          }
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                })
              }
              </Grid>
              <Grid item xs={12} style={{padding:'20px'}}>
                <Divider/>
              </Grid>
              <Grid id='clientLegalData' item xs={12}>
              {
                clientLegalProps.map((clientLegalProp, index) => {
                  return(
                    <Grid container item xs={12} key={`client-${clientLegalProp}`}>
                      <Grid item xs={5}>
                        <Typography variant='subtitle1' align='left'>
                          <strong>
                            {`${clientLegalFieldName[index]}:`}
                          </strong>
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant='subtitle1' align='left'>
                          { clientLegalProp === 'moral' || clientLegalProp === 'legalCountryCode' ?
                            printCountryName(data.client[clientLegalProp])
                          :
                            data.client[clientLegalProp]
                          }
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                })
              }
              </Grid>
            </Grid>
            <Typography className={ classes.moreDetailsLink } variant="overline" align="center" display='block' >
              <Link href={`/clients/${ data && data.client.id}`} >
                Ver más detalles
              </Link>
            </Typography>
          </Drawer>
        </>
      }
    </>
  );
}

export default withStyles(styles)(clientPreviewDrawer);
