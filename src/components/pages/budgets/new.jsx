import React, { useState }                from 'react';
import Breadcrumbs                        from '../../ui/breadcrumbs';
import { makeStyles }                     from '@material-ui/core/styles';
import Stepper                            from '@material-ui/core/Stepper';
import Step                               from '@material-ui/core/Step';
import StepLabel                          from '@material-ui/core/StepLabel';
import StepContent                        from '@material-ui/core/StepContent';
import Button                             from '@material-ui/core/Button';
import Paper                              from '@material-ui/core/Paper';
import Typography                         from '@material-ui/core/Typography';
import TextField                          from '@material-ui/core/TextField';
import Grid                               from '@material-ui/core/Grid';
import Divider                            from '@material-ui/core/Divider';
import ProceduresSearch                   from './new/procedures_search';
import BudgetSelector                     from './new/budget_selector'
import SearchIcon                         from '@material-ui/icons/Search';
import PageviewIcon                       from '@material-ui/icons/Pageview';
import AccountCircleIcon                  from '@material-ui/icons/AccountCircle';
import ClientSearch                       from './new/client_search';
import { useMutation }                    from '@apollo/react-hooks';
import { CREATE_CLIENT }                  from './queries_and_mutations/queries'
import { CREATE_BUDGET }                  from './queries_and_mutations/queries'

import Dialog                             from '@material-ui/core/Dialog';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import DialogActions                      from '@material-ui/core/DialogActions';
import { Link }                           from 'react-router-dom';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: '/budgets' },
  { name: "Crear", path: null }
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '20px'
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
    height: "420px"
  },
  grid100: {
    height: "60px"
  },
  textClientInfo: {
    height: "60px"
  },
  textFieldNames: {
    height: "70px",
    width: "200px",
    margin: "5px"
  },
  textFieldNewClientInfo: {
    height: "70px",
    width: "250px",
    margin: "5px"
  },
  procedureInfoText: {
    marginTop: "10px",
    width: "182px"
  },
  titleDataInfo: {
    marginTop: "10px"
  },
  titleDataProcedureInfo: {
    marginTop: "10px",
    maxHeight: "100px"
  }
}));

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return `Selecciona un cliente de la tabla de búsqueda.`;
//     case 1:
//       return 'Crea un cliente.';
//     case 2:
//       return `Agrega un tramite desde la tabla de búsqueda.`;
//     case 3:
//       return `Agrega un tramite desde la tabla de búsqueda.`;
//     default:
//       return 'Unknown step';
//   }
// }

const NewBudget = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchValue, setSearchValue]     = useState("");
  const [timeout, setSetTimeout]          = useState(null);
  const [clientInfo, setClientInfo] = useState("");
  const [procedureInfo, setProcedureInfo] = useState("");
  const [budgetInfo, setbudgetInfo] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [rfcClient, setRfcClient] = useState("")
  const [curpClient, setCurpClient] = useState("")
  const [open, setOpen] = React.useState(false);
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = React.useState(false)
  const inputsList = ["first_name", "last_name"]

  let variables = {
    firstName: firstName,
    lastName: lastName,
    rfc: rfcClient,
    curp: curpClient
  }

  const [createClientMutation, createClientProcessInfo] =
  useMutation(
    CREATE_CLIENT,
    {
      onError(apolloError) {
        setErrors(apolloError)
        setOpen(false);
        // setPristine(true)
      },
      onCompleted(cacheData) {
        setClientInfo(cacheData.createClient.client)
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        //setLoading(false)
      },
      fetchPolicy: "no-cache",
      // refetchQueries: [{
      //   query: GET_BUDGETING_TEMPLATE_TAB_FIELDS,
      //   variables: { "id": currentTab && currentTab.id },
      // }],
      // awaitRefetchQueries: true
    }
  )

  const createNewClient = (event) => {
    createClientMutation({ variables: variables})
  }

  const [createBudgetMutation, createBudgetProcessInfo] =
  useMutation(
    CREATE_BUDGET,
    {
      onError(apolloError) {
        // setErrors(apolloError)
        // setPristine(true)
      },
      onCompleted(cacheData) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        //setLoading(false)
      },
      fetchPolicy: "no-cache",
    }
  )

  const createNewBudget = (event) => {
    createBudgetMutation(
      { 
        variables: { 
          "proceduresTemplateId": procedureInfo.id, 
          "clientId": clientInfo.id, 
          "budgetingTemplateId": budgetInfo.id 
        }
      }
    )
  }

  const setErrors = (apolloError) => {
    let errorsList = {}
    let errorTemplateList = apolloError.graphQLErrors
    
    for ( let i = 0; i < errorTemplateList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorTemplateList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorTemplateList[i].message
        }
      }
    }
    setError(errorsList);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const createClient = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setClientInfo(false)
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

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleRfcClientChange = (event) => {
    setRfcClient(event.target.value);
  };

  const handleCurpClientChange = (event) => {
    setCurpClient(event.target.value);
  };

  const onChangeSearch = (event) => {
    timeout && clearTimeout(timeout)
    setSearchLoading(true)
    let value = event.target.value

    setSetTimeout(setTimeout(() => {
      setSearchValue(value)
      setSearchLoading(false)
    }, 2000))
  }

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  console.log(clientInfo.id, "client")
  console.log(procedureInfo.budgetingTemplatesIds, "proc")
  console.log(budgetInfo.id, "budget")
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
                <StepLabel>{"Crear cliente"}</StepLabel>
              </Step>
              <Step key={ 2 + "step"}>
                <StepLabel>{"Buscar Trámite"}</StepLabel>
              </Step>
              <Step key={ 3 + "step"}>
                <StepLabel>{"Seleccionar Presupuesto"}</StepLabel>
              </Step>
            </Stepper>
          </Grid>
          <Grid container item xs={12} >
            { (activeStep === 0) && (
            <>
              <Grid container item alignItems="center" justify="center" className={classes.grid300}>
                <ClientSearch
                  searchLoading={searchLoading}
                  onChangeSearch={onChangeSearch.bind(this)}
                  setClientInfo={ setClientInfo }
                />
              </Grid>
              <Grid container item alignItems="flex-start" justify="flex-end" className={classes.grid100}>
                <Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleToProcedure}
                    className={classes.button}
                    disabled={ !clientInfo }
                  >
                    Siguiente
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={createClient}
                    className={classes.button}
                  >
                    Crear
                  </Button>
                </Grid>
              </Grid>
            </>
            )} 
              { (activeStep === 1) && (
                <Grid container item alignItems="center">
                  <Grid container item alignItems="center" justify="center" className={classes.grid300}>
                    <Grid>
                      <TextField 
                        id="first-name-basic" 
                        label="Nombres" 
                        className={classes.textFieldNames}
                        onChange={handleFirstNameChange}
                        required
                        variant="outlined"
                        error={ !!error["first_name"] && true }
                        helperText={error["first_name"] || " "}
                        errorskey={ "first_name" }
                        name={ "first_name" }
                      />
                      <TextField 
                        id="last-name-basic" 
                        label="Apellidos" 
                        className={classes.textFieldNames}
                        onChange={handleLastNameChange}
                        required
                        variant="outlined"
                        error={ !!error["last_name"] && true }
                        helperText={error["last_name"] || " "}
                        errorskey={ "last_name" }
                        name={ "last_name" }
                      />
                    </Grid>
                    <Grid>
                      <TextField 
                        id="rfc-basic" 
                        label="RFC" 
                        className={classes.textFieldNewClientInfo}
                        onChange={handleRfcClientChange}
                        variant="outlined"
                      />
                      <TextField 
                        id="curp-basic" 
                        label="CURP" 
                        className={classes.textFieldNewClientInfo}
                        onChange={handleCurpClientChange}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid container item alignItems="flex-start" justify="flex-end" className={classes.grid100}>
                    <Button
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Atrás
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={ handleClickOpen }
                      className={classes.button}
                    >
                      Guardar
                    </Button>
                  </Grid>
                  <Dialog open={open} onClose={ handleClose }>
                  <DialogTitle>
                    Desea crear un nuevo cliente
                  </DialogTitle>
                  <DialogContent>
                    Verifique que la información sea correcta antes de continuar.
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={ handleClose }>
                      Cancelar
                    </Button>
                    <Button onClick={ createNewClient }>
                      Continuar
                    </Button>
                  </DialogActions>
                  </Dialog>
                </Grid>
              )}
              { (activeStep === 2) && (
                <Grid  container item alignItems="center" justify="center" >
                  <Grid className={classes.grid300}>
                    <ProceduresSearch
                      setProcedureInfo={ setProcedureInfo }
                    />
                  </Grid>
                  <Grid container item alignItems="flex-start" justify="flex-end" className={classes.grid100}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={ handleNext }
                      className={classes.button}
                    >
                      Siguiente
                    </Button>
                  </Grid>
                </Grid>
              )}
              { (activeStep === 3) && (
                <Grid  container item alignItems="center" justify="center" >
                  <Grid container item direction="column" alignItems="center" justify="center" className={classes.grid300}>
                    <Typography variant="body2" color="textSecondary" >
                      Selecciona un presupuesto ligado al trámite
                    </Typography>
                    <BudgetSelector
                      procedureId={ procedureInfo ? procedureInfo.id : "" }
                      setbudgetInfo={ setbudgetInfo }
                    />
                  </Grid>
                  <Grid container item alignItems="flex-start" justify="flex-end" className={classes.grid100}>
                  <Button
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Atrás
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={createNewBudget}
                      className={classes.button}
                    >
                      Finalizar
                    </Button>
                  </Grid>
                </Grid>
              )}
              { (activeStep === 4) && (
                <Grid  container item alignItems="center" justify="center" >
                  <Grid container item direction="column" alignItems="center" justify="center" className={classes.grid300}>
                    <Typography variant="h6" color="textSecondary" >
                      Se ha creado exitosamente el Presupuesto
                    </Typography>
                  </Grid>
                  <Grid container item alignItems="flex-start" justify="flex-end" className={classes.grid100}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      component={Link} 
                      to="/budgets/new"
                    >
                      Redireccionar
                    </Button>
                  </Grid>
                </Grid>
              )}
          </Grid>
         </Paper>
        </Grid>
        <Grid container item xs={3} direction="row" justify="flex-end" alignItems="stretch">
          <Paper className={classes.root}>
            <Grid container item xs={12} justify="center" className={classes.titleDataInfo} >
              Datos del cliente
              <Grid>
                <TextField 
                  id="Nombres-toShow" 
                  label={ clientInfo ? clientInfo.firstName : "Nombres"} 
                  disabled
                  helperText={ clientInfo ? "Nombres" : ""}
                  className={classes.textClientInfo}
                />
                <TextField 
                  id="Apellidos-toShow" 
                  label={ clientInfo ? clientInfo.lastName : "Apellidos"}
                  disabled
                  helperText={ clientInfo ? "Apellidos" : ""}
                  className={classes.textClientInfo}
                />
                <TextField 
                  id="RFC-toShow" 
                  label={ clientInfo ? clientInfo.rfc : "RFC"} 
                  disabled
                  helperText={ clientInfo ? "RFC" : ""}
                  className={classes.textClientInfo}
                />
                <TextField 
                  id="curp-toShow" 
                  label={ clientInfo ? clientInfo.curp : "CURP"} 
                  disabled
                  helperText={ clientInfo ? "CURP" : ""}
                  className={classes.textClientInfo}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} justify="center" direction="column" alignItems="center">
              <Grid container item justify="center" className={classes.titleDataProcedureInfo}>
                Nombre del trámite
              </Grid>
              <Typography variant="body2" color="textSecondary" className={classes.procedureInfoText} >
                { procedureInfo ? procedureInfo.name : "......................"}
              </Typography>
            </Grid>
            <Grid container item xs={12} justify="center" direction="column" alignItems="center">
              <Grid container item justify="center" className={classes.titleDataProcedureInfo}>
                Presupuesto vinculado
              </Grid>
              <Typography variant="body2" color="textSecondary" className={classes.titleDataInfo} >
              { budgetInfo ? budgetInfo.name : "......................"}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default NewBudget;
