import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import Breadcrumbs from '../../ui/breadcrumbs';
import { Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import ClientSearch from './new/client_search';
import CausantSearch from './new/causant_search';
import FastCreateClientForm from './new/fast_create_client_form';
import ProcedureSelectorList from './new/procedure_selector_list';
import BudgetSelectorList from './new/budget_selector_list';
import Summary from './new/summary';
import ConfirmDialog from './new/confirm_dialog';
import { useMutation } from '@apollo/client';
import { CREATE_BUDGET } from './queries_and_mutations/queries';
import { GLOBAL_MESSAGE } from '../../../resolvers/queries';
import client from '../../../apollo';
import Hidden from '@material-ui/core/Hidden';
import WizardSummmary from './new/wizard_summary';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: '/budgets' },
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
  errorMesages: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function getSteps() {
  return ['Agregar cliente', 'Agregar causante', 'Trámite y Presupuesto'];
}

function getStepContent(stepIndex, listData) {
  const {
    setClientInfo, 
    setCausantInfo, 
    selectedProcedure, 
    setSelectedProcedure, 
    selectedBudget, 
    setSelectedBudget, 
    setActiveStep, 
    handleNext, 
    newClientForm, 
    setNewClientForm
   } = listData

  switch (stepIndex) {
    case 0:
      return (
        <Grid container item justifyContent="center">
          {
            newClientForm ? 
              <FastCreateClientForm
                newClientForm={newClientForm}
                setNewClientForm={setNewClientForm}
                activeStep={stepIndex}
                setActiveStep={setActiveStep}
                setClientInfo={setClientInfo}
                handleNext={handleNext}
              /> : 
              <ClientSearch
                setNewClientForm={setNewClientForm}
                setClientInfo={setClientInfo}
              />
          }
        </Grid>
      )
    case 1:
      return (
        <Grid container item justifyContent="center">
          { 
            newClientForm ? 
              <FastCreateClientForm
                newClientForm={newClientForm}
                setNewClientForm={setNewClientForm}
                activeStep={stepIndex}
                setActiveStep={setActiveStep}
                setCausantInfo={setCausantInfo}
                handleNext={handleNext}
              /> : 
              <CausantSearch
                setNewClientForm={setNewClientForm}
                setCausantInfo={setCausantInfo}
              />
          }
        </Grid>
      )
    case 2:
      return (
        <Grid  container item direction="row" spacing={3} alignItems="center" justifyContent="center" >
          <Grid item xs={5}>
            <List>
              <ProcedureSelectorList 
                selectedProcedure={selectedProcedure}
                setSelectedProcedure={setSelectedProcedure}
                setSelectedBudget={setSelectedBudget}
              />
            </List>
          </Grid>
          <Grid item xs={5}>
            <BudgetSelectorList
              selectedProcedure={selectedProcedure}
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
            />
          </Grid>
        </Grid>
      )
    default:
      return 'Unknown stepIndex';
  }
};

const NewBudget = (params) => {

  const [clientInfo, setClientInfo] = useState("");
  const [causantInfo, setCausantInfo] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [asignee, setAsignee] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [newClientForm, setNewClientForm] = useState(false);
  const [redirect, setRedirect] = useState();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const classes = useStyles();
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);}
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);}
  };

  const clientAsCausant = () => {
    setCausantInfo(clientInfo);
    handleNext();
  }

  const [createBudgetMutation] =
    useMutation(
      CREATE_BUDGET,
      {
        onError(apolloError) {
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Ocurrió un error",
                type: "error",
                __typename: "globalMessage"
              }
            }
          })
          setOpenConfirmation(false);
        },
        onCompleted(cacheData) {
          const id = cacheData.createBudget.budget.id
          id && setRedirect(
            <Redirect to={{ pathname: `/budgets/${id}/edit` }} />
          );
        }
      }
    )
  
  const createNewBudget = (event) => {
    createBudgetMutation(
      { 
        variables: { 
          "clientId": clientInfo.id,
          "causantId": causantInfo.id,
          "proceduresTemplateId": selectedProcedure.id,
          "budgetingTemplateId": selectedBudget.id,
          "asigneeId": asignee.id
        }
      }
    )
  }

  const openSaveConfirm = () => {
    setOpenConfirmation(true);
  }

  const closeSaveConfirm = () => {
    setOpenConfirmation(false);
  }

  const handleReset = () => {
    setClientInfo("");
    setCausantInfo("");
    setSelectedProcedure("");
    setSelectedBudget("");
    setNewClientForm(false);
    setActiveStep(0);
  };

  const stepperButtons = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={clientInfo ? false : true}
          >
            Sigiente
          </Button>
        )
      case 1:
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={causantInfo ? handleNext : clientAsCausant}
          >
            {causantInfo ? 'Siguiente' : 'Omitir'}
          </Button>
        )
      case 2:
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={openSaveConfirm}>
            Guardar
          </Button>
        )
      default:
        return 'Unknown stepIndex';
    }
  };

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
    <Grid container direction="column" justifyContent="flex-start">
      
      <Grid item>
        <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
        <Divider/>
      </Grid>

      <Grid item container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={10} lg={10}>
          <Paper>
            <Grid container>
              <Grid item container xs={12} md={12} lg={9}>
                <Grid container direction="column" justifyContent="flex-start">
                  <Grid container item>
                    <Grid item xs={10} lg={12}>
                      <Stepper activeStep={activeStep} alternativeLabel >
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Grid>
                    <Hidden lgUp>
                      <Grid container item xs={2} lg={0} alignItems='center' justifyContent='center' style={{ paddingRight: "20px" }}>
                        <WizardSummmary
                          clientInfo={clientInfo}
                          causantInfo={causantInfo}
                          selectedProcedure={selectedProcedure}
                          selectedBudget={selectedBudget}
                          asignee={asignee}
                          setAsignee={setAsignee}
                          classes={classes}/>
                      </Grid>
                    </Hidden>
                  </Grid>
                  <Grid container item direction="column" justifyContent="flex-start">
                    {activeStep === steps.length ? (
                      <>
                        <Typography>
                          All steps completed
                        </Typography>
                      </>
                    ) : (
                      <>
                        {getStepContent(activeStep, listData)}
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
                          {stepperButtons(activeStep)}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
                
              <Hidden mdDown>
                <Grid container item xs={3}>
                  <Summary
                    clientInfo={clientInfo}
                    causantInfo={causantInfo}
                    selectedProcedure={selectedProcedure}
                    selectedBudget={selectedBudget}
                    asignee={asignee}
                    setAsignee={setAsignee}
                  />
                </Grid>
              </Hidden>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={openConfirmation} onClose={ closeSaveConfirm }>
        <ConfirmDialog
          createNewBudget={createNewBudget}
          openConfisrmation={openConfirmation}
          closeSaveConfirm={closeSaveConfirm}
          redirect={redirect}
        />
      </Dialog>
    </Grid>
  )
}

export default NewBudget;
