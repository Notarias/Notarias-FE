import React, { useState } from 'react'
import Breadcrumbs from '../../ui/breadcrumbs';
import { Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Tramites", path: '/procedures' },
  { name: "Crear", path: null }
]

const useStyles = makeStyles((theme) => ({
  paperNewProcedure: {
    height: '600px',
  },
  root: {
    marginTop: '20px',
    width: '100%',
    height: '500px',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Agregar cliente', 'Agregar causante', 'Trámite y Presupuesto'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'seleccionar un cliente';
    case 1:
      return 'seleccionar un causante';
    case 2:
      return 'Vincular Tramite a un presupuesto';
    default:
      return 'Unknown stepIndex';
  }
}

const NewProcedure = (params) => {

  const defaultUser = {
    avatarThumbUrl: "/broken-image.jpg",
    firstName: "Agregue un",
    lastName: "encargado",
    id: null
  }
  
  const [procedureInfo, setProcedureInfo] = useState("");
  const [budgetInfo, setbudgetInfo] = useState("");
  const [clientInfo, setClientInfo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rfcClient, setRfcClient] = useState("");
  const [curpClient, setCurpClient] = useState("");
  const [moralClient, setMoralClient] = useState(false);
  const [causantInfo, setCausantInfo] = useState("");
  const [asignee, setAsignee] = useState(defaultUser);

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
 console.log(classes.paperNewProcedure)
  return (
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container justifyContent="center" direction="row" className={classes.root}>
        <Grid item xs={7}>
          <Paper className={classes.paperNewProcedure}>
            <div >
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>All steps completed</Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperNewProcedure}>
            <Grid container item xs={12} justifyContent="center">
              Datos del cliente
              <Grid>
                <TextField 
                  id="Nombres-toShow" 
                  label={ clientInfo ? clientInfo.firstName : "Nombres"} 
                  disabled
                  helperText={ clientInfo ? "Nombres" : ""}
                />
                <TextField 
                  id="Apellidos-toShow" 
                  label={ clientInfo ? clientInfo.lastName : "Apellidos"}
                  disabled
                  helperText={ clientInfo ? "Apellidos" : ""}
                />
                <TextField 
                  id="RFC-toShow" 
                  label={ clientInfo ? clientInfo.rfc : "RFC"} 
                  disabled
                  helperText={ clientInfo ? "RFC" : ""}
                />
                <TextField 
                  id="curp-toShow" 
                  label={ clientInfo ? clientInfo.curp : "CURP"} 
                  disabled
                  helperText={ clientInfo ? "CURP" : ""}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center" direction="column">
              <Grid container item justifyContent="flex-start">
                Causante asignado
              </Grid>
              <Grid container item justifyContent="flex-start">
                <Typography variant="body2" color="textSecondary">
                  { causantInfo ? causantInfo.firstName : "sin asignar"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center" direction="column">
              <Grid container item justifyContent="flex-start">
                Nombre del trámite
              </Grid>
              <Grid container item justifyContent="flex-start">
                <Typography variant="body2" color="textSecondary">
                  { procedureInfo ? procedureInfo.name : "....................................."}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center" direction="column">
              <Grid container item justifyContent="flex-start">
                Presupuesto vinculado
              </Grid>
              <Grid container item justifyContent="flex-start">
                <Typography variant="body2" color="textSecondary">
                { budgetInfo ? budgetInfo.name : "....................................."}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center" direction="column">
              <Grid container item justifyContent="flex-start">
                Encargado asignado
              </Grid>
              <Grid container item justifyContent="flex-start">
                <Typography variant="body2" color="textSecondary">
                { asignee ? `${asignee.firstName} ${asignee.lastName}` : "......................"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default NewProcedure;
