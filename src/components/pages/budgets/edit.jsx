import React, { useState }                  from 'react';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from './styles';
import Breadcrumbs                          from '../../ui/breadcrumbs'
import Grid                                 from '@material-ui/core/Grid';
import Paper                                from '@material-ui/core/Paper';
import InformationTabs                      from './edit/information_tabs/information_tabs'
import GenericDropdownMenu                  from '../../ui/generic_dropdown_menu';
import { useQuery }                         from '@apollo/client';
import { GET_BUDGET }                       from './queries_and_mutations/queries'
import Typography                           from '@material-ui/core/Typography';
import OpenInNewIcon                        from '@material-ui/icons/OpenInNew';
import Button                               from '@material-ui/core/Button';
import MenuItem                             from '@material-ui/core/MenuItem';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import TextField                            from '@material-ui/core/TextField';
import Divider                              from '@material-ui/core/Divider';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import CurrentUserAvatar                    from './edit/current_user_avatar';
import Avatar                               from '@material-ui/core/Avatar';
import { GET_CURRENT_USER }                 from '../../../resolvers/queries';
import { useMutation }                      from '@apollo/client'
import { CREATE_CREDIT_PAYMENT }            from './queries_and_mutations/queries'
import PaymentDrawer                        from './edit/payment_drawer'
import { GET_BUDGET_TOTALS }                from './queries_and_mutations/queries'
import PaymentList                          from './edit/credit_payment_list/credit_payment_list'
import ListItemText                         from '@material-ui/core/ListItemText';
import Activities                           from './edit/activities/activities'
import Asignee                              from './edit/asignee'
import { GET_CREDIT_PAYMENTS }              from './queries_and_mutations/queries';
import { Link }                             from 'react-router-dom';
import { GET_BUDGETS_AUDITLOG }             from './queries_and_mutations/queries';
import InputLabel                           from '@material-ui/core/InputLabel';
import FormControl                          from '@material-ui/core/FormControl';
import Select                               from '@material-ui/core/Select';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: '/budgets' },
  { name: "Editar", path: null }
]

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
 
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      decimalSeparator="."
      decimalScale={2}
      fixedDecimalScale

    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const BudgetsEdit = (props) => {
  const { classes, match }              = props
  const [open, setOpen]                 = React.useState(false);
  const [valuePayment, setValuePayment] = React.useState(0)
  const [notePayment, setNotePayment]   = React.useState("")
  const [pristine, setPristine]         = React.useState(false)
  const [payType, setPayType]           = React.useState("cash")
  const [error, setError]               = useState(false)


  const inputsList = ["total"]

  const { loading: budgetLoading, data: budgetData , refetch } = useQuery(
    GET_BUDGET, { variables: {"id": match.params.id } }
  );

  const budget                          = budgetData && budgetData.budget
  const budgetingTemplate               = budget && budget.budgetingTemplate
  const proceduresTemplate              = budget && budget.proceduresTemplate  

  const { loading: currentUserLoading , data: queryBData } = useQuery(
    GET_CURRENT_USER
  );

  const [createCreditPaymentMutation, {loading: createCreditPaymentLoading}] =
  useMutation(
    CREATE_CREDIT_PAYMENT,
    {
      onError(apolloError) {
        setErrors(apolloError)
        setPristine(false)
      },
      onCompleted(cacheData) {
        setOpen(false);
      },
      refetchQueries: [
        {
          query: GET_BUDGET,
            variables: {"id": match.params.id }
        },
        {
          query: GET_BUDGET_TOTALS,
            variables: {"id": match.params.id }
        },
        {
          query: GET_CREDIT_PAYMENTS,
            variables: { "budgetId": match.params.id }
        },
        {
          query: GET_BUDGETS_AUDITLOG,  
            variables: {"budgetId": match.params.id}
        }
      ],
      awaitRefetchQueries: true
    }
  )

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
    setError(errorsList)
  }

  const createNewCreditPayment = (event) => {
    createCreditPaymentMutation({
       variables:{
        "note": notePayment,
        "budgetId": match.params.id, 
        "total": (valuePayment * 100),
        "paymentType":payType
       }
    })
  }

  const handleNotePaymentChange = (event) => {
    setNotePayment(event.target.value);
  }

  const handleValuePaymentChange = (event) => {
    setValuePayment(event.target.value);
    setPristine(true)
    setError(false)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPristine(false)
  };

  const getCurrentDate = (separator='/') => {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return (`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`)
  }

  const handleSelectChange = (event) => {
    setPayType(event.target.value)
  }


  return(
    <Grid container direction='column' alignItems="stretch" justifyContent="flex-start" style={{ minHeight: "100vh" }}>
      <Grid item >
        <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      </Grid>
      <Grid container item style={{ flex: '1 1 auto' }}>
        <Grid item xs={8}>
          <Paper elevation={5} style={{ height: "100%" }} variant='outlined'>
            <Grid container item direction="column"  justifyContent="flex-start" alignItems="stretch" style={{ height: "100%" }}>
              <Grid container item alignItems="center">
                <Grid container item xs={5} justifyContent="flex-start" alignItems="center">
                  <Typography variant="h6" gutterBottom className={classes.marginTitleBudgetName}>
                    { budgetingTemplate && budgetingTemplate.name }
                  </Typography>
                  <Button>
                    <OpenInNewIcon/>
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" gutterBottom>
                    { proceduresTemplate && proceduresTemplate.name }
                  </Typography>
                </Grid>
                <Grid container item xs={2} justifyContent="flex-end">
                  <PaymentDrawer
                    budgetId={match.params.id}
                  />
                </Grid>
                <Grid item xs={1}>
                  <GenericDropdownMenu>
                    <MenuItem key="1-abono" onClick={handleClickOpen}>
                      <ListItemText primary="Nuevo Ingreso"/>
                    </MenuItem>
                    <MenuItem key="2-paymentList">
                      <PaymentList
                        budgetId={match.params.id}
                      />
                    </MenuItem>
                    <Link
                      to={`/budgets/${ match.params.id }/invoice`}
                      color="inherit"
                      underline="none"
                      className={classes.linkDefault}
                      key="3-paymentList"
                    >
                      <MenuItem >
                        <ListItemText primary="Imprimir presupuesto"/>
                      </MenuItem>
                    </Link>
                  </GenericDropdownMenu>
                  <Dialog open={open} onClose={handleClose} fullWidth>
                    <DialogTitle>
                      Datos del Ingreso
                    </DialogTitle>
                    <DialogContent>
                      <Grid container alignItems="center" >
                        <Grid container item justifyContent="center" alignItems="center">
                          fecha:  {getCurrentDate()}
                        </Grid>
                        <Grid container item direction="row">
                          <Grid container item xs={6} justifyContent="center" alignItems="center">
                            <FormControl >
                              <InputLabel htmlFor="age-native-simple">Tipo de pago"</InputLabel>
                              <Select
                                native
                                value={payType}
                                onChange={handleSelectChange}
                                label="Tipo de pago"
                              >
                                <option value={"cash"}>Efectivo</option>
                                <option value={"deposit"}>Deposito</option>
                                <option value={"wire"}>Transferencia</option>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid container item xs={6} justifyContent="flex-start" alignItems="center">
                            <TextField
                              className={classes.selectPayType}
                              onChange={handleValuePaymentChange}
                              label="Ingreso"
                              id="margin-normal"
                              helperText="Cantidad"
                              margin="normal"
                              error={ !!error["total"] && true }
                              helperText={error["total"] || " "}
                              errorskey={ "total" }
                              required
                              InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <CurrentUserAvatar classes={classes}/>
                      <Grid>
                        <TextField
                          fullWidth
                          onChange={handleNotePaymentChange}
                          id="outlined-textarea"
                          placeholder="Comentarios"
                          multiline
                          variant="outlined"
                        />
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>
                        Cancelar
                      </Button>
                      <Button onClick={createNewCreditPayment} disabled={!pristine || createCreditPaymentLoading}>
                        Aceptar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
              <Grid container item style={{ flex: "1 1 auto" }}  alignItems="stretch">
                <InformationTabs
                  budgetTemplateId={ budgetingTemplate && budgetingTemplate.id }
                  budgetInfo={ budget }
                  budgetId={match.params.id}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={0} style={{ minHeight: "100%" }}>
            <Activities budgetId={match.params.id}/>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(BudgetsEdit);
