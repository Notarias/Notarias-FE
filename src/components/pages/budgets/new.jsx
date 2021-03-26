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
import SearchIcon from '@material-ui/icons/Search';
import PageviewIcon from '@material-ui/icons/Pageview';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ControlsBar                  from '../clients/controls_bar';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: '/budgets' },
  { name: "Crear", path: null }
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  stepperIconLabel: {
    width: '100%',
    height: "100px"
  },
  gridFather: {
    height: "500px"
  },
  grid300: {
    height: "300px"
  },
  grid100: {
    height: "100px"
  }
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
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchValue, setSearchValue]     = useState("")
  const [timeout, setSetTimeout]          = useState(null)

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

  const onChangeSearch = (event) => {
    timeout && clearTimeout(timeout)
    setSearchLoading(true)
    let value = event.target.value

    setSetTimeout(setTimeout(() => {
      setSearchValue(value)
      setSearchLoading(false)
    }, 2000))
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container justify="center" className={classes.gridFather}>
        <Grid container item xs={7} direction="row" >
        <Paper className={classes.root}>
          <Grid container item xs={12} >
            <Stepper activeStep={activeStep} alternativeLabel className={classes.stepperIconLabel}>
              <Step key={ 0 + "step"}  >
                <StepLabel>{"Buscar cliente"}</StepLabel>
              </Step>
              <Step key={ 1 + "step"}>
                <StepLabel classes={ { root: classes.labelLeft }}>{"Crear cliente"}</StepLabel>
              </Step>
              <Step key={ 2 + "step"}>
                <StepLabel classes={ { root: classes.labelLeft }}>{"Buscar Trámite"}</StepLabel>
              </Step>
            </Stepper>
          </Grid>
          <Grid container item xs={12} >
            { (activeStep === 0) && (
            <>
              <Grid container item alignItems="center" justify="center" className={classes.grid300}>
                <ControlsBar
                classes={classes}
                searchLoading={searchLoading}
                onChangeSearch={onChangeSearch.bind(this)}
                />
              </Grid>
              <Grid container item justify="flex-end" className={classes.grid100}>
                <Grid>
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
            </>
            )} 
              { (activeStep === 1) && (
                <div>
                  <Typography>{getStepContent(1)}</Typography>
                    <TextField id="first-name-basic" label="Nombres" variant="outlined" />
                    <TextField id="last-name-basic" label="Apellidos" variant="outlined" />
                    <TextField id="rfc-basic" label="RFC" variant="outlined" />
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
                </div>
              )}
              { (activeStep === 2) && (
                <div>
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
                </div>
              )}
              {/* {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>All steps completed - you&apos;re finished</Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </Paper>
              )} */}

          </Grid>
          </Paper>
        </Grid>
        <Grid container item xs={3} direction="row" justify="flex-end" alignItems="stretch">
          <Paper className={classes.root}>
            <Grid container item xs={12} justify="center" >
              Datos del cliente
              <Grid>
                <TextField id="Nombres-basic" label="Nombres" variant="outlined" />
                <TextField id="Apellidos-basic" label="Apellidos" variant="outlined" />
                <TextField id="RFC-basic" label="RFC" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container item xs={12} justify="center">
              Trámite
              <Grid>
                <TextField id="Nombre-basic" label="Nombre del trámite" variant="outlined" />
                <TextField id="-basic" label="RFC" variant="outlined" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* <Typography>{getStepContent(2)}</Typography> */}
    </>
  )
}

export default NewBudget;
