import React, {useEffect}                from 'react';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from './styles';
import { Grid }             from '@material-ui/core';
import CustomerInformation  from './show/customer_information';
import LastProcedures       from './show/last_procedures';
import LastComments         from './show/last_comments';
import NextEvents           from './show/next_events';
import LastBudgets          from './show/last_budgets';
import Breadcrumbs          from '../../ui/breadcrumbs';
import Typography                           from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider                              from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ClientsAttributesList from './show/clients_attributes.jsx/clients_attributes_list';
import ClientsData from './show/clients_data';
import ClientsBudgets from './show/clients_budgets';
import ClientsProcedures from './show/clients_procedures';
import ClientsComments from './show/clients_comments'
import IncomingEvents from './show/incoming_events'

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: "/clients" },
  { name: "Editar", path: null }
]

const Details = (props) => {
  const { classes, match } = props


  // if(loading) return <p>Loadng...</p>
  // if(error) return <p> { `Error ${error.message}` } </p>


  return(
    <div style={{height:"auto"}}>
      <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      <Grid 
        container 
        item 
        xs={12} 
        justifyContent="center"
        alignItems="center" 
        style={{paddingLeft: "3%", overflowY: "scroll", maxHeight: "600px"}}
      >
        <Grid container item xs={8} style={{}}>
          <Grid container item xs={12}>
            <List >
              <ListItem style={{paddingLeft:"0px"}}>
                <Typography style={{margin:"10px 0px"}} variant="h6">Información general</Typography>
              </ListItem>
            </List>
            <Divider fullwidth="true" component="li" style={{width:"93%", marginBottom: "6px"}}/>
          </Grid>
          <Grid container item xs={4}>
            <Typography style={{marginTop:"20px"}} variant="subtitle2">Datos del cliente</Typography>
          </Grid>
          <Grid container item xs={8}>
            <ClientsData
              match={match}
            />
          </Grid>
          <Grid container item xs={12}>
            <Divider fullwidth="true" component="li" style={{width:"98%", marginBottom: "6px", marginTop: "6px"}}/>
          </Grid>
          <Grid container item xs={4}>
            <Typography style={{marginTop:"20px"}} variant="subtitle2">Otros datos</Typography>
          </Grid>
          <Grid container item xs={8}>
            <ClientsAttributesList
              match={match}
            />
          </Grid>
          <Grid container item xs={12}>
            <Divider fullwidth="true" component="li" style={{width:"98%", marginBottom: "6px", marginTop: "6px"}}/>
          </Grid>
          <Grid container item xs={4}>
            <Typography style={{marginTop:"20px"}} variant="subtitle2">Últimos Presupuestos</Typography>
          </Grid>
          <Grid container item xs={8}>
            <ClientsBudgets/>
          </Grid>
          <Grid container item xs={12}>
            <Divider fullwidth="true" component="li" style={{width:"98%", marginBottom: "6px", marginTop: "6px"}}/>
          </Grid>
          <Grid container item xs={4}>
            <Typography style={{marginTop:"20px"}} variant="subtitle2">Últimos Trámites</Typography>
          </Grid>
          <Grid container item xs={8}>
            <ClientsProcedures/>
          </Grid>
          <Grid container item xs={12}>
            <Divider fullwidth="true" component="li" style={{width:"98%", marginBottom: "6px", marginTop: "6px"}}/>
          </Grid>
            <Grid container item xs={4}>
              <Typography style={{marginTop:"20px"}} variant="subtitle2">Próximos eventos</Typography>
            </Grid>
            <Grid container item xs={8}>
              <IncomingEvents/>
            </Grid>
          <Grid container item xs={12}>
            <Divider fullwidth="true" component="li" style={{width:"98%", marginBottom: "6px", marginTop: "6px"}}/>
          </Grid>
          <Grid container item xs={12} justifyContent="center" alignItems="center" >
            <ClientsComments/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Details);
