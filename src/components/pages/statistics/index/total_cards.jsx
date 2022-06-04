import React, { useState, useEffect }     from 'react';
import { useQuery }                       from '@apollo/client';
import { GET_GENERAL_STATISTICS }         from '../queries/queries';
import NumberFormat                       from 'react-number-format';

import { makeStyles }                     from '@material-ui/core/styles';
import Typography                         from '@material-ui/core/Typography';
import Grid                               from '@material-ui/core/Grid';
import Paper                              from '@material-ui/core/Paper';
import Avatar                             from '@material-ui/core/Avatar';
import AccountBalanceIcon                 from '@material-ui/icons/AccountBalance';
import CreditCardIcon                     from '@material-ui/icons/CreditCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  red: {
    color: '#b71c1c',
    backgroundColor: '#ffcdd2',
  },
  green: {
    color: '#1b5e20',
    backgroundColor: '#c8e6c9',
  },
  creditPaymentTotal: {
    paddingTop:'25px',
    paddingBottom:'25px',
    boxShadow: 'inset 10px 0px 0px -5px #4caf50'
  },
  paymentTotal: {
    paddingTop:'25px',
    paddingBottom:'25px',
    boxShadow: 'inset 10px 0px 0px -5px #f44336'
  }
}));

const TotalCards = (props) => {
  const { date } = props;

  const classes = useStyles();
  const [payment, setPayment] = useState();
  const [creditPayment, setCreditPayment] = useState();
  const [timeFrame] = useState(null);
  const [timeZone] = useState(null);
  const [status] = useState(null);
  const [userId] = useState(null);
  const [clientId] = useState(null);

  let variables = {
    date: date,
    timeFrame: timeFrame,
    timeZone: timeZone,
    status: status,
    userId: userId,
    clientId: clientId
  }

  const  { loading, data } = useQuery(
    GET_GENERAL_STATISTICS, { variables: variables, fetchPolicy: "no-cache" }
  );

  useEffect( () => {
    setPayment(data && data.statisticsPaymentsTotal.total);
    setCreditPayment(data && data.statisticsCreditPaymentsTotal.total);
  }, [loading, data])

  return(
    <Grid container direction='row' style={{marginBottom:'15px'}}>
      <Grid item xs style={{paddingRight:'15px'}}>
        <Paper variant="outlined" 
          className={classes.creditPaymentTotal}>
          <Grid container justifyContent='center'>
            <Grid container item xs={10} justifyContent='flex-start'>
              <Grid container item xs={3} justifyContent='center' alignItems='center'>
                <Avatar className={classes.green}>
                  <AccountBalanceIcon/>
                </Avatar>
              </Grid>
              <Grid container item xs={9} direction='column'style={{paddingLeft:'15px'}}>
                <Typography variant="h6" align='left' style={{color: '#1b5e20'}}>
                  Ingresos
                </Typography>
                <Typography variant="subtitle2" align='left' style={{color: '#1b5e20'}}>
                  {(date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })).toUpperCase()}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={10} style={{paddingLeft:'10px', paddingTop:'20px'}}>
              <Typography variant="h6" align='left'>
              <NumberFormat
                value={Math.abs(payment/100)}
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'$ '}
                decimalScale={2}
                fixedDecimalScale={true}
              />
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs style={{paddingRight:'15px'}}>
        <Paper variant="outlined" 
          className={classes.paymentTotal}>
          <Grid container justifyContent='center'>
              <Grid container item xs={10} justifyContent='flex-start'>
                <Grid container item xs={3} justifyContent='center' alignItems='center'>
                <Avatar className={classes.red}>
                  <CreditCardIcon/>
                </Avatar>
              </Grid>
              <Grid container item xs={9} direction='column' style={{paddingLeft:'15px'}}>
                <Typography variant="h6" align='left' style={{color: '#f44336'}}>
                  Egresos
                </Typography>
                <Typography variant="subtitle2" align='left' style={{color: '#f44336'}}>
                  {(date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })).toUpperCase()}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={10} style={{paddingLeft:'10px', paddingTop:'20px'}}>
              <Typography variant="h6" align='left'>
                <NumberFormat
                  value={Math.abs(creditPayment/100)}
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$ '}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs style={{paddingRight:'15px'}}>
        <Paper variant="outlined"
          style={{
            paddingTop:'15px',
            paddingBottom:'15px',
            boxShadow: 'inset 10px 0px 0px -5px #2196f3'
          }}>
        
        </Paper>
      </Grid>
      <Grid item xs style={{paddingRight:'15px'}}>
        <Paper variant="outlined"
          style={{
            paddingTop:'15px',
            paddingBottom:'15px',
            boxShadow: 'inset 10px 0px 0px -5px #ffeb3b'
          }}>
        
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper variant="outlined"
          style={{
            paddingTop:'15px',
            paddingBottom:'15px',
            boxShadow: 'inset 10px 0px 0px -5px #9c27b0'
          }}>
        
        </Paper>
      </Grid>
    </Grid>
  )
}

export default TotalCards;
