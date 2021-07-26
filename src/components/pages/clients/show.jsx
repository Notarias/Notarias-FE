import React, {useEffect}                from 'react';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from './styles';
import { Grid }             from '@material-ui/core';
import CustomerInformation  from './show/customer_information';
import LastProcedures       from './show/last_procedures';
import LastComments         from './show/last_comments';
import NextEvents           from './show/next_events';
import LastBudgets          from './show/last_budgets';
import { GET_CLIENT }       from './clients_queries_and_mutations/queries';
import { GET_CLIENT_ATTRIBUTE } from './clients_queries_and_mutations/queries';
import { useQuery }         from '@apollo/react-hooks';
import Breadcrumbs          from '../../ui/breadcrumbs';
import Typography                           from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Paper from '@material-ui/core/Paper';
import Divider                              from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: "/clients" },
  { name: "Editar", path: null }
]

const Details = (props) => {
  const { classes, match } = props

  // const { loading, error, data } = useQuery(GET_CLIENT, { variables: { "id": match.params.id }})

  const  {loading, data}  = useQuery(GET_CLIENT_ATTRIBUTE)

  const [attributes, setAttributes] = React.useState(data ? data.clientAttributes : [] )

  useEffect(() => {
    data && setAttributes(data.clientAttributes);;
  }, [data])


  // if(loading) return <p>Loadng...</p>
  // if(error) return <p> { `Error ${error.message}` } </p>

  console.log(data.clientAttributes, "attr")
  return(
    <div style={{height:"auto"}}>
      <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      <Grid container item xs={12} justifyContent="center" alignItems="center"  style={{paddingTop:"3%", paddingLeft:"3%"}}>
        <Grid container item xs={8} style={{overflowY: "scroll", maxHeight: "500px"}}>
          <Grid container item xs={12}>
            <List style={{width:"740px"}}>
              <ListItem style={{paddingLeft:"0px"}}>
                <Typography style={{margin:"10px 0px"}} variant="h6">"Información general"</Typography>
              </ListItem>
              <Divider fullwidth="true" component="li" />
            </List>
          </Grid>
          <Grid container item xs={4}>
            <Typography style={{marginTop:"20px"}} variant="subtitle2">"Datos del cliente"</Typography>
          </Grid>
          <Grid container item xs={8}>
            <Paper>
              <List>
                <ListItem>
                  <Grid container direction="column" style={{marginRight:"10px"}}>
                    <ListItemText>Nombres</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      // label="Nombres"
                      variant="outlined"
                      size="small"

                    />
                  </Grid>
                  <Grid container direction="column" style={{marginLeft:"10px"}}>
                    <ListItemText>Apellidos</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      // label="Nombres"
                      variant="outlined"
                      size="small"

                    />
                  </Grid>
                </ListItem>
                <ListItem  >
                  <Grid container direction="column" style={{marginRight:"10px"}}>
                    <ListItemText>Empresa</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      variant="outlined"
                      size="small"

                    />
                  </Grid>
                  <Grid container direction="column" style={{marginLeft:"10px"}}>
                    <ListItemText>Dirección</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      variant="outlined"
                      size="small"

                    />
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container direction="column" style={{marginRight:"10px"}}>
                    <ListItemText>E-mail</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      variant="outlined"
                      size="small"

                    />
                  </Grid>
                  <Grid container direction="column" style={{marginLeft:"10px"}}>
                    <ListItemText>Categoria</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      variant="outlined"
                      size="small"

                    />
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container direction="column" style={{marginRight:"10px"}}>
                    <ListItemText>Telefono</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      variant="outlined"
                      size="small"

                    />
                  </Grid>
                  <Grid container direction="column" style={{marginLeft:"10px"}}>
                    <ListItemText>RFC</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      variant="outlined"
                      size="small"

                    />
                  </Grid>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid container item xs={12}>
            <List style={{width:"740px"}}>
              <Divider fullwidth="true" component="li" />
            </List>
          </Grid>
          <Grid container item xs={4}>
            <Typography style={{marginTop:"20px"}} variant="subtitle2">"Otros datos"</Typography>
          </Grid>
          <Grid container item xs={8}>
            <Paper>
              <List>
                {attributes.map((attr) =>
                  <ListItem>
                    <Grid container direction="column" style={{marginRight:"10px"}}>
                      <ListItemText>{attr.name}</ListItemText>
                      <TextField
                        id="outlined-disabled"
                        label={attr.style}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>

          <Grid container item xs={12}>
            <List style={{width:"740px"}}>
              <Divider fullwidth="true" component="li" />
            </List>
          </Grid>
          <Grid container item xs={4}>
            <Typography style={{marginTop:"20px"}} variant="subtitle2">"Últimos Presupuestos"</Typography>
          </Grid>
          <Grid container item xs={8}>
            <Paper>
              <List>
                <ListItem>
                  <Grid container direction="column" style={{marginRight:"10px"}}>
                    <ListItemText>Presupuestos</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid container item xs={12}>
            <List style={{width:"740px"}}>
              <Divider fullwidth="true" component="li" />
            </List>
          </Grid>
          <Grid container item xs={4}>
            <Typography style={{marginTop:"20px"}} variant="subtitle2">"Últimos Comentarios"</Typography>
          </Grid>
          <Grid container item xs={8}>
            <Paper>
              <List>
                <ListItem>
                  <Grid container direction="column" style={{marginRight:"10px"}}>
                    <ListItemText>Comentarios</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid container item xs={12}>
            <List style={{width:"740px"}}>
              <Divider fullwidth="true" component="li" />
            </List>
          </Grid>
          <Grid container item xs={4}>
            <Typography style={{marginTop:"20px"}} variant="subtitle2">"Últimos Trámites"</Typography>
          </Grid>
          <Grid container item xs={8}>
            <Paper>
              <List>
                <ListItem>
                  <Grid container direction="column" style={{marginRight:"10px"}}>
                    <ListItemText>Trámites</ListItemText>
                    <TextField
                      id="outlined-disabled"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid container item xs={12}>
            <List style={{width:"740px"}}>
              <Divider fullwidth="true" component="li" />
            </List>
          </Grid>
          <Grid container item xs={4}>
            <Typography style={{marginTop:"20px"}} variant="subtitle2">"Próximos eventos"</Typography>
          </Grid>
          <Grid container item xs={8}>
            <Paper>
              <List>
                <ListItem>
                  <Grid container direction="column" style={{marginRight:"10px"}}>
                    <ListItemText>Reunion 1</ListItemText>
                    <Grid item xs={4} classes={{root: classes.paddingDayMeet}}>
                      <Typography align="left" variant="subtitle2">
                        Reunion 1
                        <br/>
                        dd/mm/aaaa
                      </Typography>
                    </Grid>
                    {/* <Grid container item xs={8} style={{paddingTop:"5%", paddingLeft:"30%"}}>
                      <Grid item xs={6}>
                        <Chip label="07:30" color="primary">
                        </Chip>
                      </Grid>
                      <Grid item align="right" xs={6}>
                        <KeyboardArrowRightIcon fontSize="large"/>
                      </Grid> */}
                    </Grid>
                </ListItem>
              </List>
            </Paper>
          </Grid>

        </Grid>
      </Grid>
        {/* <Grid item xs={12} spacing={3} container >
          <Grid item xs={4} container alignItems="stretch" direction="row">
            <Grid item container>
              <CustomerInformation classes={ classes } history={props.history} match={props.match.params} data={data} />
            </Grid>
          </Grid>
          <Grid container xs={8} item spacing={3}>
            <Grid item xs={12} container spacing={3}>
              <Grid container item xs={6}>
                <LastProcedures/>
              </Grid>
              <Grid item xs={6}>
                <LastComments/>
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={3}>
              <Grid item xs={6}>
                <LastBudgets/>
              </Grid>
              <Grid item xs={6}>
                <NextEvents/>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}
    </div>
  )
}

export default withStyles(styles)(Details);
