import React, { useState, useEffect } from 'react'
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

const Summary = (props) => {

  const { clientInfo, causantInfo, selectedProcedure, selectedBudget } = props

  return(
    <Grid content item xs={8} direction="column" alignItems="center" style={{marginTop: "10px"}}>
      <Grid content item style={{marginTop: "10px"}}>
        <Typography variant="subtitle2">
          Datos del Cliente
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem dense={true}>
            <ListItemText 
              primary={clientInfo ? `${clientInfo.firstName} ${clientInfo.lastName}` : "Nombre Completo" }
              secondary={clientInfo ? "Nombre Completo" : ""} />
          </ListItem>
          <ListItem dense={true}>
            <ListItemText 
              primary={clientInfo ? clientInfo.rfc : "RFC" }
              secondary={clientInfo ? "RFC" : ""} />
          </ListItem>
          <ListItem dense={true}>
            <ListItemText 
              primary={clientInfo ? clientInfo.curp : "CURP" }
              secondary={clientInfo ? "CURP" : ""} />
          </ListItem>
        </List>
      </Grid>
      <Divider/>
      <Grid content item style={{marginTop: "10px"}}>
        <Typography variant="subtitle2">
          Causante Asignado
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem dense={true}>
            <ListItemText 
              primary={causantInfo ? `${causantInfo.firstName} ${causantInfo.lastName}` : "Nombre Completo" }
              secondary={causantInfo ? "Nombre Completo" : ""} />
          </ListItem>
          <Divider/>
          <Typography variant="subtitle2" style={{marginTop: "10px"}}>
            Tramite Seleccionado
          </Typography>
          <ListItem dense={true}>
            <ListItemText 
              primary={selectedProcedure ? selectedProcedure.name : "Tramite" }/>
          </ListItem>
          <Divider/>
          <Typography variant="subtitle2" style={{marginTop: "10px"}}>
            Presupuesto Vinculado
          </Typography>
          <ListItem dense={true}>
            <ListItemText 
              primary={selectedBudget ? selectedBudget.name : "Presupuesto" }/>
          </ListItem>
        </List>
      </Grid>
      <Divider/>
    </Grid>
  );
};

export default Summary;