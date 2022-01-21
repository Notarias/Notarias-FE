import React, { useState } from 'react'
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Dialog from '@material-ui/core/Dialog';
import SelectAsigneeDialog from './select_asignee_dialog';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),  
  },
  marginChip: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Summary = (props) => {

  const { clientInfo, causantInfo, selectedProcedure, selectedBudget, asignee, setAsignee} = props
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();

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
    <Grid container item xs={10} direction="column" justifyContent="center" alignItems="stretch" style={{marginTop: "10px"}}>
      <Grid item style={{marginTop: "10px"}}>
        <Typography variant="body1" style={{ fontWeight: "600" }}>
          Datos del Cliente
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem dense={true}>
            <ListItemText
              primary={"Nombre Completo"}
              secondary={clientInfo ? `${clientInfo.firstName} ${clientInfo.lastName}` : "N/A"} />
          </ListItem>
          <ListItem dense={true}>
            <ListItemText
              primary={"RFC"}
              secondary={clientInfo ? clientInfo.rfc : "N/A"} />
          </ListItem>
          <ListItem dense={true}>
            <ListItemText
              primary={"CURP"}
              secondary={clientInfo ? clientInfo.curp : "N/A"} />
          </ListItem>
        </List>
      </Grid>
      <Divider/>
      <Grid item style={{marginTop: "10px"}}>
        <Typography ariant="body1" style={{ fontWeight: "600" }}>
          Causante:
        </Typography>
        <List>
          <ListItem dense={true}>
            <ListItemText
              secondary={causantInfo ? `${causantInfo.firstName} ${causantInfo.lastName}` : "N/A"} />
          </ListItem>
          <Divider/>
          <Typography variant="subtitle2" style={{ marginTop: "10px", fontWeight: "600" }}>
            Tramite
          </Typography>
          <ListItem dense={true}>
            <ListItemText 
              secondary={selectedProcedure ? selectedProcedure.name : "N/A" }/>
          </ListItem>
          <Divider/>
          <Typography variant="subtitle2" style={{ marginTop: "10px", fontWeight: "600" }}>
            Presupuesto
          </Typography>
          <ListItem dense={true}>
            <ListItemText 
              secondary={selectedBudget ? selectedBudget.name : "N/A" }/>
          </ListItem>
        </List>
      </Grid>
      <Divider/>
      <Grid container item justifyContent="center" style={{marginTop: "10px"}}>
        <Grid item>
            <Typography variant="subtitle2">
              {asignee ? "Responsable Asignado" : "Responsable" }
            </Typography>
        </Grid>
        <Grid container item justifyContent="center" style={{marginTop: "40px"}} className={classes.marginChip}>
          <Chip
            onClick={openAsigneeDialog}
            color="primary"
            label={asignee ? asignee.fullName : 'Asignar Responsable'}
            onDelete={deleteAsigneed}
            avatar={<Avatar src={asignee.avatarThumbUrl} />}
          />
        </Grid>
        <Dialog onClose={closeAsigneeDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
          <SelectAsigneeDialog asignee={asignee} setAsignee={setAsignee} closeAsigneeDialog={closeAsigneeDialog}/>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default Summary;
