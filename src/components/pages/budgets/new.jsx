import React, { useState }                from 'react';
import Breadcrumbs                        from '../../ui/breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid                               from '@material-ui/core/Grid';
import Divider                              from '@material-ui/core/Divider';
import ProceduresSearch                 from './new/procedures_search';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: '/budgets' },
  { name: "Crear", path: null }
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: "left",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Selecciona un cliente de la tabla de búsqueda.`;
    case 1:
      return 'Crea un cliente.';
    case 2:
      return `Agrega un tramite desde la tabla de búsqueda.`;
    default:
      return 'Unknown step';
  }
}

const NewBudget = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleToProcedure = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 2);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getSteps() {
    return ['Añadir un cliente', 'Crear un cliente', 'Añadir un Trámite'];
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container justify="center">
        <Grid container item justify="flex-start" xs={7}>
          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step key={ 1 + "step"}>
                <StepLabel classes={ { root: classes.labelLeft } }>{"Buscar cliente"}</StepLabel>
                <StepContent>
                {/* <Typography>{getStepContent(0)}</Typography> */}
                  <TextField id="outlined-basic" label="Buscar" variant="outlined" />
                  <Grid container>
                    <Grid container item alignItems="center" justify="flex-end" >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleToProcedure}
                        className={classes.button}
                      >
                        Siguiente
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Crear
                      </Button>
                    </Grid>
                  </Grid>
                </StepContent>
              </Step>
              <Step key={ 1 + "step"}>
                <StepLabel>{"Agregar cliente"}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(1)}</Typography>
                  <TextField id="outlined-basic" label="Nombres" variant="outlined" />
                  <TextField id="outlined-basic" label="Apellidos" variant="outlined" />
                  <TextField id="outlined-basic" label="RFC" variant="outlined" />
                  <Grid container>
                    <Grid container item alignItems="center" justify="flex-end" >
                        <Button
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Atrás
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          Siguiente
                        </Button>
                      </Grid>
                    </Grid>
                  </StepContent>
                </Step>
              <Step key={ 2 + "step"}>
                  <StepLabel>{"Agregar trámite"}</StepLabel>
                  <StepContent>
                  {/* <Typography>{getStepContent(2)}</Typography> */}
                  <Grid container alignItems="center" justify="center">
                    <ProceduresSearch/>
                  </Grid>
                  <Grid container>
                    <Grid container item alignItems="center" justify="flex-end" >
                        <Button
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Atrás
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          Terminar
                        </Button>
                      </Grid>
                    </Grid>
                  </StepContent>
                </Step>
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            )}
          </div>
        </Grid>
        <Grid container item xs={3} direction="row" justify="flex-end" alignItems="stretch">
          <Paper className={classes.root}>
            <Grid container item xs={12} justify="center" >
              Datos del cliente
              <Grid>
                <TextField id="outlined-basic" label="Nombres" variant="outlined" />
                <TextField id="outlined-basic" label="Apellidos" variant="outlined" />
                <TextField id="outlined-basic" label="RFC" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container item xs={12} justify="center">
              Trámite
              <Grid>
                <TextField id="outlined-basic" label="Nombre del trámite" variant="outlined" />
                <TextField id="outlined-basic" label="RFC" variant="outlined" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default NewBudget;