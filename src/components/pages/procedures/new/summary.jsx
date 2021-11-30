import React, { useState, useEffect } from 'react'
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Dialog from '@material-ui/core/Dialog';
import SelectAsigneeDialog from './select_asignee_dialog';

const Summary = (props) => {

  const { clientInfo, causantInfo, selectedProcedure, selectedBudget, asignee, setAsignee} = props
  const [openDialog, setOpenDialog] = useState(false);

  const closeAsigneeDialog = () => {
    setOpenDialog(false);
  }

  const openAsigneeDialog = () => {
    setOpenDialog(true);
  }

  const deleteAsigneed = () => {
    setAsignee("");
  }

  return(
    <Grid container item xs={8} direction="column" alignItems="stretch" style={{minHeight: "635px", marginTop: "10px"}}>
      <Grid item style={{minHeight: "200px", marginTop: "10px"}}>
        <Typography variant="subtitle1">
          Datos del Cliente
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem dense={true}>
            <ListItemText style={{margin: "0"}}
              primary={clientInfo ? `${clientInfo.firstName} ${clientInfo.lastName}` : "Nombre Completo" }
              secondary={clientInfo ? "Nombre Completo" : ""} />
          </ListItem>
          <ListItem dense={true}>
            <ListItemText style={{margin: "0"}}
              primary={clientInfo ? clientInfo.rfc : "RFC" }
              secondary={clientInfo ? "RFC" : ""} />
          </ListItem>
          <ListItem dense={true}>
            <ListItemText style={{margin: "0"}}
              primary={clientInfo ? clientInfo.curp : "CURP" }
              secondary={clientInfo ? "CURP" : ""} />
          </ListItem>
        </List>
      </Grid>
      <Divider/>
      <Grid item style={{minHeight: "230px", marginTop: "10px"}}>
        <Typography variant="subtitle2">
          Causante Asignado
        </Typography>
        <List>
          <ListItem dense={true}>
            <ListItemText style={{minHeight: "50px", margin: "0"}}
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
      <Grid container item justifyContent="center" style={{marginTop: "10px"}}>
        <Grid item>
            <Typography variant="subtitle2">
              {asignee ? "Responsable Asignado" : "Asignar Responsable" }
            </Typography>
        </Grid>
        <Grid container item justifyContent="center" style={{minHeight: "85px", marginTop: "10px"}}>
          <Grid item style={{minHeight: "85px"}}>
            {asignee ? <Chip icon={<FaceIcon />} label={asignee.fullName} onDelete={deleteAsigneed}/> : <Grid/> }
          </Grid>
        </Grid>
        <Grid item>
          <Button onClick={openAsigneeDialog}>
            Asignar Responsable
          </Button>
        </Grid>
        <Dialog onClose={closeAsigneeDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
          <SelectAsigneeDialog asignee={asignee} setAsignee={setAsignee} closeAsigneeDialog={closeAsigneeDialog}/>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default Summary;