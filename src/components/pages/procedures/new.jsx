import React, { useState, useEffect } from 'react'
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
import ClientSearch from './new/client_search';
import CausantSearch from './new/causant_search';
import FastCreateClientForm from './new/fast_create_client_form';
import SelectorList from './new/selector_list';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Tramites", path: '/procedures' },
  { name: "Crear", path: null }
]

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),  
  },
  marginButtons: {
    marginBottom: theme.spacing(2),

  },
  buttonsMargin: {
    marginTop: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Agregar cliente', 'Agregar causante', 'Trámite y Presupuesto'];
}

function getStepContent(stepIndex, listData) {

  switch (stepIndex) {
    case 0:
      return (
        <Grid container justifyContent="center">
          {
            listData.newClientForm ? 
              <FastCreateClientForm
              newClientForm={listData.newClientForm}
              setNewClientForm={listData.setNewClientForm}
                activeStep={stepIndex}
                setActiveStep={listData.setActiveStep}
                setClientInfo={listData.setClientInfo}
                handleNext={listData.handleNext}
              /> : 
              <ClientSearch
                setNewClientForm={listData.setNewClientForm}
                setClientInfo={listData.setClientInfo}
              />
          }
        </Grid>
      )
    case 1:
      return (
        <Grid container justifyContent="center">
          { 
            listData.newClientForm ? 
              <FastCreateClientForm
                newClientForm={listData.newClientForm}
                setNewClientForm={listData.setNewClientForm}
                activeStep={stepIndex}
                setActiveStep={listData.setActiveStep}
                setCausantInfo={listData.setCausantInfo}
                handleNext={listData.handleNext}
              /> : 
              <CausantSearch
                setNewClientForm={listData.setNewClientForm}
                setCausantInfo={listData.setCausantInfo}
              />
          }
        </Grid>
      )
    case 2:
      return (
        <Grid  container direction="row" spacing={3} item alignItems="center" justifyContent="center" >
          <Grid item xs={5}>
            <SelectorList 
              selectedProcedure={listData.selectedProcedure}
              setSelectedProcedure={listData.setSelectedProcedure}
            />
          </Grid>
          <Grid item xs={5}>
            <SelectorList/>
          </Grid>
        </Grid>
      )
    default:
      return 'Unknown stepIndex';
  }
};

const NewProcedure = (params) => {

  const defaultUser = {
    avatarThumbUrl: "/broken-image.jpg",
    firstName: "Agregue un",
    lastName: "encargado",
    id: null
  }

  const [clientInfo, setClientInfo] = useState("");
  const [causantInfo, setCausantInfo] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [asignee, setAsignee] = useState(defaultUser);
  const [activeStep, setActiveStep] = useState(0);
  const [newClientForm, setNewClientForm] = useState(false);
  const classes = useStyles();
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setClientInfo("");
    setCausantInfo("");
    setNewClientForm(false);
    setActiveStep(0);
  };

  useEffect(() => {
    setSelectedBudget(selectedBudget)
  }, [selectedBudget])

  let listData = {
    setClientInfo: setClientInfo,
    setCausantInfo: setCausantInfo,
    selectedProcedure: selectedProcedure,
    setSelectedProcedure: setSelectedProcedure,
    selectedBudget: selectedBudget,
    setSelectedBudget: setSelectedBudget,
    setActiveStep: setActiveStep,
    handleNext: handleNext,
    newClientForm: newClientForm,
    setNewClientForm: setNewClientForm,
  }
  
  return (
    <Grid container direction="column" alignItems="stretch" justifyContent="flex-start" style={{minHeight: "100vh"}}>
      <Grid item>
        <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
        <Divider/>
      </Grid>
      <Grid item container style={{ flex: "1 1 auto" }} justifyContent="center" className={classes.root}>
        <Grid item xs={7}>
          <Paper style={{ height: "75%" }}>
            <Grid container direction="column" alignItems="stretch" justifyContent="flex-start" style={{height: "100%"}}>
              <Grid item>
                <Stepper activeStep={activeStep} alternativeLabel >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item style={{ height: "69%" }}>
                {activeStep === steps.length ? (
                  <>
                    <Typography>
                      All steps completed
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography>
                      {getStepContent(activeStep, listData)}
                    </Typography>
                  </>
                )}
              </Grid>
              <Grid container item direction="column" justifyContent="flex-end"  style={{ flex: "1 1 auto" }} className={classes.marginButtons}>
                <Grid container item justifyContent="center">
                  <Grid container item xs={6} justifyContent="flex-start">
                    <Grid item>
                      <Button
                        onClick={handleReset}
                        color="secondary"
                        hidden={activeStep ? true : false}>
                        Cancelar
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container item xs={2} justifyContent="flex-end">
                    <Grid item>
                      <Button disabled={activeStep === 0} onClick={handleBack}>
                        Regresar
                      </Button>
                      </Grid>
                  </Grid>
                  <Grid container item xs={2} justifyContent="flex-end">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={clientInfo ? false : true}
                      >
                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Sigiente'}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper style={{ height: "75%" }}>
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
                  { setSelectedBudget ? setSelectedBudget.name : "....................................."}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center" direction="column">
              <Grid container item justifyContent="flex-start">
                Presupuesto vinculado
              </Grid>
              <Grid container item justifyContent="flex-start">
                <Typography variant="body2" color="textSecondary">
                { selectedBudget ? selectedBudget.name : "....................................."}
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
    </Grid>
  )
}

export default NewProcedure;
