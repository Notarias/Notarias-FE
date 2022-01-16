import React, { useState, useEffect } from 'react'
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
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

  const deleteAsignee = () => {
    setAsignee("");
  }

  return(
    <Grid container item direction="column" style={{ paddingLeft: '20px' }}>
      <Grid container item direction="column" style={{ marginTop: "10px", paddingRight: '10px' }}>
        <Grid item style={{ marginBottom: "10px" }}>
          <Typography variant="body1" style={{ fontWeight: "600" }} align='left'>
            Cliente
          </Typography>
        </Grid>
        <Grid item container style={{ marginBottom: "5px" }}>
          <Grid item>
            <Typography variant='body1'>
              Nombre:
            </Typography>
          </Grid>
          <Grid item style={{ paddingLeft: "10px" }}>
            <Typography variant='body2'>
              { clientInfo ? clientInfo.fullName : "N/A" }
            </Typography>
          </Grid>
        </Grid>

        <Grid item container style={{ marginBottom: "5px" }}>
          <Grid item>
            <Typography variant='body1'>
              RFC:
            </Typography>
          </Grid>
          <Grid item style={{ paddingLeft: "10px" }}>
            <Typography variant='body2'>
              { clientInfo ? clientInfo.rfc : "N/A" }
            </Typography>
          </Grid>
        </Grid>

        <Grid item container style={{ marginBottom: "5px" }}>
          <Grid item>
            <Typography variant='body1'>
              CURP:
            </Typography>
          </Grid>
          <Grid item style={{ paddingLeft: "10px" }}>
            <Typography variant='body2'>
              { clientInfo ? clientInfo.curp : "N/A" }
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider/>

      <Grid container item direction="column" style={{ marginTop: "10px", paddingRight: '10px' }}>
        <Grid item style={{ marginBottom: "10px" }}>
          <Typography ariant="body1" style={{ fontWeight: "600" }} align='left'>
            Causante
          </Typography>
        </Grid>
        <Grid item container style={{ marginBottom: "5px" }}>
          <Grid item>
            <Typography variant='body1'>
              Nombre:
            </Typography>
          </Grid>
          <Grid item style={{ paddingLeft: "10px" }}>
            <Typography variant='body2'>
              { causantInfo ? causantInfo.fullName : "N/A" }
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider/>

      <Grid container item direction="column" style={{ marginTop: "10px", paddingRight: '10px' }}>
        <Grid item style={{ marginBottom: "10px" }}>
          <Typography ariant="body1" style={{ fontWeight: "600" }} align='left'>
            Trámite
          </Typography>
        </Grid>
        <Grid item container style={{ marginBottom: "5px" }}>
          <Grid item>
            <Typography variant='body1'>
              Nombre:
            </Typography>
          </Grid>
          <Grid item style={{ paddingLeft: "10px" }}>
            <Typography variant='body2'>
              { selectedProcedure ? selectedProcedure.name : "N/A" }
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider/>

      <Grid container item direction="column" style={{ marginTop: "10px", paddingRight: '10px' }}>
        <Grid item style={{ marginBottom: "10px" }}>
          <Typography ariant="body1" style={{ fontWeight: "600" }} align='left'>
            Presupuesto
          </Typography>
        </Grid>
        <Grid item container style={{ marginBottom: "5px" }}>
          <Grid item>
            <Typography variant='body1'>
              Nombre:
            </Typography>
          </Grid>
          <Grid item style={{ paddingLeft: "10px" }}>
            <Typography variant='body2'>
              { selectedBudget ? selectedBudget.name : "N/A" }
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider/>

      <Grid container item direction="column" style={{ marginTop: "10px", paddingRight: '10px' }}>
        <Grid item style={{ marginBottom: "10px" }}>
          <Typography ariant="body1" style={{ fontWeight: "600" }} align='left'>
            Responsable
          </Typography>
        </Grid>
        <Grid item container style={{ marginBottom: "5px" }}>
          {/* <Grid item>
            <Typography variant='body1'>
              {asignee ? <Chip icon={<FaceIcon />} label={asignee.fullName} onDelete={deleteAsignee}/> : <Grid/> }
            </Typography>
          </Grid> */}
          <Grid item>
            <Chip
              onClick={openAsigneeDialog}
              color="primary"
              label={asignee ? asignee.fullName : 'Asignar Responsable'}
              // onDelete={handleDelete}
              avatar={<Avatar src={asignee.avatarThumbUrl} />}
            />
          </Grid>

          <Dialog onClose={closeAsigneeDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
            <SelectAsigneeDialog asignee={asignee} setAsignee={setAsignee} closeAsigneeDialog={closeAsigneeDialog}/>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Summary;