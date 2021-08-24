import React, { useState, useEffect }     from 'react';
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
import ClientSearch                       from './new/client_search';
import CausantSearch                      from './new/causant_search';  
import { useMutation }                    from '@apollo/react-hooks';
import { CREATE_CLIENT }                  from './queries_and_mutations/queries'
import { CREATE_BUDGET }                  from './queries_and_mutations/queries'

import Dialog                             from '@material-ui/core/Dialog';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import DialogActions                      from '@material-ui/core/DialogActions';
import { Redirect }                       from 'react-router-dom';
import AddAsigneed                        from './new/add_asigneed';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: '/budgets' },
  { name: "Crear", path: null }
]

const useStyles = makeStyles((theme) => ({
  paperNewbudget: {
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
    height: "400px"
  },
  grid100: {
    height: "60px"
  },
  textClientInfo: {
    height: "60px",
    width: "200px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  textFieldNewClientInfo: {
    height: "70px",
    width: "300px",
    margin: "5px"
  },
  procedureInfoText: {
    marginTop: "10px",
    width: "182px"
  },
  titleDataInfo: {
    marginTop: "10px",
  },
  titleDataProcedureInfo: {
    marginTop: "10px",
    marginLeft: "70px",

  },
  asigneeGrid: {
    marginTop:"20px",
    marginLeft: "45px"
  }
}));

const NewBudget = (props) => {
  const classes = useStyles();

  const defaultUser = {
    avatarThumbUrl: "/broken-image.jpg",
    firstName: "Agregue un",
    lastName: "encargado",
    id: null
  }

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
  const [openSkip, setOpenSkip] = React.useState(false)
  const [openNewBudget, setOpenNewBudget] = React.useState(false);
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = React.useState(false)
  const inputsList = ["first_name", "last_name"]
  const [redirect, setRedirect] = useState(false)
  const [asignee, setAsignee] = useState(defaultUser)
  const [disableNextButton, setDisableNextButton] = useState(true)
  const [searchInitialView, setSearchInitialView] = useState(true)
  const [selectCausantView, setSelectCausantView] = useState(true)
  const [causantInfo, setCausantInfo] = useState("");

  let variables = {
    firstName: firstName,
    lastName: lastName,
    rfc: rfcClient,
    curp: curpClient
  }

  let causantVariables = {
    firstName: firstName,
    lastName: lastName,
    rfc: rfcClient,
    curp: curpClient,
    causant: true
  }

  useEffect(() => {
    setProcedureInfo(procedureInfo)
  }, [procedureInfo])

  const [createClientMutation, { loading: createClientLoading}] =
  useMutation(
    CREATE_CLIENT,
    {
      onError(apolloError) {
        setErrors(apolloError)
        setOpen(false);
        setPristine(true)
      },
      onCompleted(cacheData) {
        (activeStep === 0) ? setClientInfo(cacheData.createClient.client) : setCausantInfo(cacheData.createClient.client)
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      },
      fetchPolicy: "no-cache",
    }
  )

  const createNewClient = (event) => {
    createClientMutation({ variables:(activeStep === 0) ? variables : causantVariables})
  }

  const [createBudgetMutation, {loading: createBudgetLoading}] =
  useMutation(
    CREATE_BUDGET,
    {
      onError(apolloError) {
      },
      onCompleted(cacheData) {
        const id = cacheData.createBudget.budget.id
        id && setRedirect(
          <Redirect to={{ pathname: `/budgets/${id}/edit` }} />
        )
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
          "budgetingTemplateId": budgetInfo.id,
          "asigneeId": asignee.id,
          "causantId": causantInfo.id
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

  const handleOmitCausant = () => {
    setCausantInfo(clientInfo)
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const changeInitialView = () => {
    setSearchInitialView(!searchInitialView)
    setClientInfo("")
  };

  const changeCausantView = () => {
    setSelectCausantView(!selectCausantView)
    setCausantInfo("")
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setOpenSkip(false)
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
    setPristine(false)
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

  const handleSkipOpen = () => {
    setOpenSkip(true)
  }

  const handleSkipClose = () => {
    setOpenSkip(false)
  }

  const clickOpenNewBudget = (event) => {
    setOpenNewBudget(true);
  };

  const closeNewBudget = () => {
    setOpenNewBudget(false);
  };

  const renderInitialView = () => {
    if(searchInitialView){
      return(
        <>
          <Grid container item alignItems="center" justifyContent="center" className={classes.grid300}>
            <ClientSearch
              searchLoading={searchLoading}
              onChangeSearch={onChangeSearch.bind(this)}
              setClientInfo={ setClientInfo }
            />
          </Grid>
          <Grid container item alignItems="flex-start" justifyContent="flex-end" className={classes.grid100}>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!clientInfo}
                className={classes.button}
              >
                Siguiente
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={changeInitialView}
                className={classes.button}
              >
                Crear
              </Button>
            </Grid>
          </Grid>
        </>
      )
    } else {
      return(
        <Grid container item alignItems="center">
          <Grid container item  direction="column" alignItems="center" justifyContent="center" className={classes.grid300}>

              <TextField 
                id="first-name-basic" 
                label="Nombres" 
                className={classes.textFieldNewClientInfo}
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
                className={classes.textFieldNewClientInfo}
                onChange={handleLastNameChange}
                required
                variant="outlined"
                error={ !!error["last_name"] && true }
                helperText={error["last_name"] || " "}
                errorskey={ "last_name" }
                name={ "last_name" }
              />
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
          <Grid container item alignItems="flex-start" justifyContent="flex-end" className={classes.grid100}>
            <Button
              onClick={changeInitialView}
              className={classes.button}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={ handleClickOpen }
              className={classes.button}
              disabled={pristine}
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
            <Button onClick={ createNewClient } disabled={createClientLoading}>
              Continuar
            </Button>
          </DialogActions>
          </Dialog>
        </Grid>
      )
    }
  }

  const renderCausantView = () => {
    if(selectCausantView){
      return(
        <>
          <Grid container item alignItems="center" justifyContent="center" className={classes.grid300}>
            <CausantSearch
              searchLoading={searchLoading}
              onChangeSearch={onChangeSearch.bind(this)}
              setCausantInfo={setCausantInfo}
            />
          </Grid>
          <Grid container item direction="row" className={classes.grid100}>
            <Grid container item xs={2} alignItems="center" justifyContent="center">
              <Button
                onClick={handleBack}
              >
                Regresar
              </Button>
            </Grid>
            <Grid container item xs={10} alignItems="flex-start" justifyContent="flex-end">
              <Button
                variant="contained"
                color="inherit"
                onClick={handleSkipOpen}
                className={classes.button}
              >
                Omitir
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!causantInfo}
                className={classes.button}
              >
                Siguiente
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={changeCausantView}
                className={classes.button}
              >
                Crear
              </Button>
            </Grid>
          </Grid>
          <Dialog open={openSkip} onClose={ handleSkipClose }>
            <DialogTitle>
              Omitir causante
            </DialogTitle>
            <DialogContent>
              Se seleccionará al cliente como causante
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleSkipClose }>
                Cancelar
              </Button>
              <Button onClick={ handleOmitCausant }>
                Continuar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )
    } else {
      return(
        <Grid container item alignItems="center">
          <Grid container item  direction="column" alignItems="center" justifyContent="center" className={classes.grid300}>
            <TextField 
              id="first-name-basic" 
              label="Nombres" 
              className={classes.textFieldNewClientInfo}
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
              className={classes.textFieldNewClientInfo}
              onChange={handleLastNameChange}
              required
              variant="outlined"
              error={ !!error["last_name"] && true }
              helperText={error["last_name"] || " "}
              errorskey={ "last_name" }
              name={ "last_name" }
            />
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
          <Grid container item alignItems="flex-start" justifyContent="flex-end" className={classes.grid100}>
            <Button
              onClick={changeCausantView}
              className={classes.button}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={ handleClickOpen }
              className={classes.button}
              disabled={pristine}
            >
              Guardar
            </Button>
          </Grid>
          <Dialog open={open} onClose={ handleClose }>
          <DialogTitle>
            Desea crear un nuevo causante
          </DialogTitle>
          <DialogContent>
            Verifique que la información sea correcta antes de continuar.
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleClose }>
              Cancelar
            </Button>
            <Button onClick={ createNewClient } disabled={createClientLoading}>
              Continuar
            </Button>
          </DialogActions>
          </Dialog>
        </Grid>
      )
    }
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container justifyContent="center" className={classes.gridFather}>
        <Grid container item xs={7} direction="row" >
          <Paper className={classes.paperNewbudget}>
            <Grid container item xs={12} >
              <Stepper activeStep={activeStep} alternativeLabel className={classes.stepperIconLabel}>
                <Step key={ 0 + "step"}  >
                  <StepLabel>{"Agregar cliente"}</StepLabel>
                </Step>
                <Step key={ 1 + "step"}>
                  <StepLabel>{"Agregar causante"}</StepLabel>
                </Step>
                <Step key={ 2 + "step"}>
                  <StepLabel>{"Trámite y Presupuesto"}</StepLabel>
                </Step>
              </Stepper>
            </Grid>
            <Grid container item xs={12} >
              { (activeStep === 0) && (
                renderInitialView()
              )} 
              { (activeStep === 1) && (
                renderCausantView()
              )}
              { (activeStep === 2) && (
                <Grid  container direction="row" item alignItems="center" justifyContent="center" >
                  <Grid className={classes.grid300}>
                    <Typography variant="body2" color="textSecondary" >
                      Selecciona un trámite
                    </Typography>
                    <ProceduresSearch
                      setProcedureInfo={ setProcedureInfo }
                    />
                  </Grid>
                  <Grid className={classes.grid300}>
                    <Typography variant="body2" color="textSecondary" >
                      Selecciona un presupuesto ligado al trámite
                    </Typography>
                    <BudgetSelector
                      procedureId={ procedureInfo && Number(procedureInfo.id)}
                      setbudgetInfo={ setbudgetInfo }
                      setDisableNextButton={setDisableNextButton}
                    />
                  </Grid>
                  <Grid container item direction="row" className={classes.grid100}>
                    <Grid container item xs={2} alignItems="center" justifyContent="center">
                      <Button
                        onClick={handleBack}
                      >
                        Regresar
                      </Button>
                    </Grid>
                    <Grid container item xs={10} alignItems="flex-start" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={ clickOpenNewBudget }
                        className={classes.button}
                        disabled={disableNextButton}
                      >
                        Siguiente
                      </Button>
                    </Grid>
                    <Dialog open={openNewBudget} onClose={ closeNewBudget }>
                      <DialogTitle>
                        Se creará un nuevo presupuesto
                      </DialogTitle>
                      <DialogContent>
                        Los datos confirmados se muestran en la columna de la derecha
                        <AddAsigneed
                          setAsignee={setAsignee}
                          asignee={asignee}
                          defaultUser={defaultUser}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          className={classes.button}
                          onClick={closeNewBudget}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={createNewBudget}
                          disabled={createBudgetLoading}
                        >
                          { redirect }
                          Aceptar
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              )}
          </Grid>
         </Paper>
        </Grid>
        <Grid container item xs={3} direction="row" justifyContent="flex-end" alignItems="stretch">
          <Paper className={classes.paperNewbudget}>
            <Grid container item xs={12} justifyContent="center" className={classes.titleDataInfo} >
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
            <Grid container item xs={12} justifyContent="center" direction="column">
              <Grid container item justifyContent="flex-start" className={classes.titleDataProcedureInfo}>
                Causante asignado
              </Grid>
              <Grid container item justifyContent="flex-start" className={classes.titleDataProcedureInfo}>
                <Typography variant="body2" color="textSecondary">
                  { causantInfo ? causantInfo.firstName : "sin asignar"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center" direction="column">
              <Grid container item justifyContent="flex-start" className={classes.titleDataProcedureInfo}>
                Nombre del trámite
              </Grid>
              <Grid container item justifyContent="flex-start" className={classes.titleDataProcedureInfo}>
                <Typography variant="body2" color="textSecondary">
                  { procedureInfo ? procedureInfo.name : "....................................."}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center" direction="column">
              <Grid container item justifyContent="flex-start" className={classes.titleDataProcedureInfo}>
                Presupuesto vinculado
              </Grid>
              <Grid container item justifyContent="flex-start" className={classes.titleDataProcedureInfo}>
                <Typography variant="body2" color="textSecondary">
                { budgetInfo ? budgetInfo.name : "....................................."}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center" direction="column">
              <Grid container item justifyContent="flex-start" className={classes.titleDataProcedureInfo}>
                Encargado asignado
              </Grid>
              <Grid container item justifyContent="flex-start" className={classes.titleDataProcedureInfo}>
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

export default NewBudget;
