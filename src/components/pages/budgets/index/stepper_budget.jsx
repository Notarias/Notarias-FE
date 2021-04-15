import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'left'
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

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

const StepperBudget = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
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

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={ 1 + "step"}>
          <StepLabel classes={ { labelContainer: classes.labelLeft } } >{"Buscar cliente"}</StepLabel>
          <StepContent>
          <Typography>{getStepContent(0)}</Typography>
            <TextField id="outlined-basic" label="Buscar" variant="outlined" />
            <div className={classes.actionsContainer}>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
        <Step key={ 1 + "step"}>
            <StepLabel>{"Agregar cliente"}</StepLabel>
            <StepContent>
            <Typography>{getStepContent(1)}</Typography>
             <TextField id="outlined-basic" label="Nombres" variant="outlined" />
             <TextField id="outlined-basic" label="Apellidos" variant="outlined" />
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        <Step key={ 2 + "step"}>
            <StepLabel>Agregar trámite</StepLabel>
            <StepContent>
            <Typography>{getStepContent(2)}</Typography>
             <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
      </Stepper>

        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>

    </div>
  );
}

export default StepperBudget
