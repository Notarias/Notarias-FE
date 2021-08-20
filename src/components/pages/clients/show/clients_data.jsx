import React, { useEffect }       from 'react';
import { withStyles }             from '@material-ui/core/styles';
import { styles }                 from './styles';
import { Grid }                   from '@material-ui/core';
import { GET_CLIENT }             from '../clients_queries_and_mutations/queries';
import { useQuery }               from '@apollo/react-hooks';
import TextField                  from '@material-ui/core/TextField';
import List                       from '@material-ui/core/List';
import ListItem                   from '@material-ui/core/ListItem';
import ListItemText               from '@material-ui/core/ListItemText';
import Paper                      from '@material-ui/core/Paper';
import Typography                 from '@material-ui/core/Typography';
import Divider                    from '@material-ui/core/Divider';
import Collapse                   from '@material-ui/core/Collapse';
import Button                     from '@material-ui/core/Button';
import { UPDATE_CLIENT_MUTATION } from '../clients_queries_and_mutations/queries';
import { useMutation }            from '@apollo/react-hooks';

const ClientsData = (props) => {
  const { classes, match } = props
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false)
  const [pristine, setPristine] = React.useState(true)

  const inputsList = [
    "email", "first_name", "last_name", "rfc",
  ]

  const openSaveButton = () => {
    setOpen(true);
  };

  const closeSaveButton = () => {
    setOpen(false);
    setPristine(true)
  }

  const { loading: loadingClient, error: errorClient, data: dataClient } = useQuery(GET_CLIENT, { variables: { "id": match.params.id }})

  const [client, setClient] = React.useState(dataClient ? dataClient.client : [])

  useEffect(() => {
    dataClient && setClient(dataClient.client)
  }, [dataClient])

  const [clientInfo, setClientInfo] = React.useState({
    firstName:  client.firstName,
    lastName:   client.lastName,
    business:   client.business,
    rfc:        client.rfc,
    address:    client.address,
    email:      client.email,
    category:   client.category,
    phone:      client.phone,
    curp:       client.curp,
  })

  const [updateClientMutation, {loading: updateClientLoading} ] =
  useMutation(
    UPDATE_CLIENT_MUTATION,
    {
      onError(apolloError) {
        setErrors(apolloError)
      },
      onCompleted(cacheData) {
        setOpen(false);
        // if(data.data.updateClient.pointer){
        //   setErrors(data.data.updateClient.pointers)
        // }
      },
      refetchQueries: [
        {
          query: GET_CLIENT,
            variables: {"id": match.params.id }
        },
      ],
      awaitRefetchQueries: true
    }
  )

  const setErrors = (apolloError) => {
    let errorsList = {}
    let errorTemplateList = apolloError.graphQLErrors
    for ( let i = 0; i < errorTemplateList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorTemplateList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorTemplateList[i].message
        }
      }
    }
    setError(errorsList)
  }

  const updateClient = (event) => {
    updateClientMutation({
      variables:{
        "id":         match.params.id,
        "firstName":  clientInfo.firstName,
        "lastName":   clientInfo.lastName,
        "business":   clientInfo.business,
        "rfc":        clientInfo.rfc,
        "address":    clientInfo.address,
        "email":      clientInfo.email,
        "category":   clientInfo.category,
        "phone":      clientInfo.phone,
        "curp":       clientInfo.curp,
      }
    })
  }

  return(
    <Paper className={classes.paperWidth}>
      <List>
        <ListItem>
          <Grid container item xs={12}>
            <Typography>
              Número de registro: {client.serialNumber} 
            </Typography>
          </Grid>
        </ListItem>
        <Divider className={classes.dividerInDataFirst} fullwidth="true"/>
        <ListItem className={classes.ListItemNoPaddingBottom}>
          <Grid container item xs={6} direction="column" className={classes.gridsMarginRight}>
            <ListItemText>Nombres</ListItemText>
            <TextField
              id="outlined-firstName"
              value={clientInfo.firstName || ""}
              onChange={ (event)=> {
                setClientInfo(
                  {...clientInfo,
                    firstName: event.target.value
                  },
                  setPristine(false)
                )
              }}
              onFocus={openSaveButton}
              variant="outlined"
              size="small"
              error={ !!error["first_name"] && true }
              helperText={error["first_name"] || " "}
              errorskey={ "first_name" }
            />
          </Grid>
          <Grid container  item xs={6} direction="column" className={classes.gridsMarginLeft}>
            <ListItemText>Apellidos</ListItemText>
            <TextField
              id="outlined-lastName"
              value={clientInfo.lastName || ""}
              onChange={ (event)=> {
                setClientInfo(
                  {
                  ...clientInfo,
                  lastName: event.target.value
                  },
                  setPristine(false)
                )
              }}
              onFocus={openSaveButton}
              variant="outlined"
              size="small"
              error={ !!error["last_name"] && true }
              helperText={error["last_name"] || " "}
              errorskey={ "last_name" }
            />
          </Grid>
        </ListItem>
        <ListItem className={classes.ListItemNoPaddingBottom}>
          <Grid container direction="column" className={classes.gridsMarginRight}>
            <ListItemText>RFC</ListItemText>
            <TextField
              id="outlined-rfc"
              value={clientInfo.rfc || ""}
              onChange={ (event)=> {
                setClientInfo(
                  {
                    ...clientInfo,
                    rfc: event.target.value
                  },
                  setPristine(false)
                )
              }}
              onFocus={openSaveButton}
              variant="outlined"
              size="small"
              error={ !!error["rfc"] && true }
              helperText={error["rfc"] || " "}
              errorskey={ "rfc" }
            />
          </Grid>
          <Grid container direction="column" className={classes.gridsMarginLeft}>
            <ListItemText>Curp</ListItemText>
            <TextField
              id="outlined-curp"
              value={clientInfo.curp || ""}
              onChange={ (event)=> {
                setClientInfo(
                  {
                    ...clientInfo,
                    curp: event.target.value
                  },
                )
              }}
              onFocus={openSaveButton}
              variant="outlined"
              size="small"
              error={ !!error["body"] && true }
              helperText={error["body"] || " "}
              errorskey={ "body" }
            />
          </Grid>
        </ListItem>
        <ListItem className={classes.ListItemNoPaddingBottom}>
          <Grid container direction="column" className={classes.gridsMarginRight}>
            <ListItemText>E-mail</ListItemText>
            <TextField
              type="email"
              id="outlined-email"
              value={clientInfo.email || ""}
              onChange={ (event)=> {
                setClientInfo(
                  {
                    ...clientInfo,
                    email: event.target.value
                  },
                  setPristine(false)
                )
              }}
              onFocus={openSaveButton}
              variant="outlined"
              size="small"
              error={ !!error["email"] && true }
              helperText={error["email"] || " "}
              errorskey={ "email" }
            />
          </Grid>
          <Grid container direction="column" className={classes.gridsMarginLeft}>
            <ListItemText>Categoria</ListItemText>
            <TextField
              id="outlined-category"
              value={clientInfo.category || ""}
              onChange={ (event)=> {
                setClientInfo({
                  ...clientInfo,
                  category: event.target.value
                })
              }}
              onFocus={openSaveButton}
              variant="outlined"
              size="small"
              error={ !!error["body"] && true }
              helperText={error["body"] || " "}
              errorskey={ "body" }
            />
          </Grid>
        </ListItem>
        <ListItem className={classes.ListItemNoPaddingBottom}>
          <Grid container direction="column" className={classes.gridsMarginRight}>
            <ListItemText>Empresa</ListItemText>
            <TextField
              id="outlined-business"
              value={clientInfo.business || ""}
              onChange={ (event)=> {
                setClientInfo({
                  ...clientInfo,
                  business: event.target.value
                })
              }}
              onFocus={openSaveButton}
              variant="outlined"
              size="small"
              error={ !!error["body"] && true }
              helperText={error["body"] || " "}
              errorskey={ "body" }
            />
          </Grid>
          <Grid container direction="column" className={classes.gridsMarginLeft}>
            <ListItemText>Telefono</ListItemText>
            <TextField
              id="outlined-phone"
              value={clientInfo.phone || ""}
              onChange={ (event)=> {
                const onlyString = event.target.value.toString()
                const onlyNums = onlyString.replace(/[^0-9]/g, '');
                event.target.value = onlyNums
                setClientInfo({
                  ...clientInfo,
                  phone: event.target.value
                })
              }}
              onFocus={openSaveButton}
              variant="outlined"
              size="small"
              error={ !!error["body"] && true }
              helperText={error["body"] || " "}
              errorskey={ "body" }
            />
          </Grid>
        </ListItem>
        <ListItem className={classes.ListItemNoPaddingBottom}>
          <Grid container direction="column">
            <ListItemText>Dirección</ListItemText>
            <TextField
              id="outlined-address"
              value={clientInfo.address || ""}
              onChange={ (event)=> {
                setClientInfo({
                  ...clientInfo,
                  address: event.target.value
                })
              }}
              onFocus={openSaveButton}
              variant="outlined"
              size="small"
              error={ !!error["body"] && true }
              helperText={error["body"] || " "}
              errorskey={ "body" }
              multiline
              maxRows={2}
            />
          </Grid>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.gridsMarginLeft}>
                <Grid container item xs={8} alignItems="center" justifyContent="flex-end">
                  <Button onClick={closeSaveButton} variant="contained">Cancelar</Button>
                </Grid>
                <Grid container item xs={4} alignItems="center" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateClient}
                    disabled={pristine || updateClientLoading}
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Paper>
  )
}

export default withStyles(styles)(ClientsData);
