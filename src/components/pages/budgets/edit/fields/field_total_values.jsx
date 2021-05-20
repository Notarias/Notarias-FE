import React                                        from 'react'
import Typography                                   from '@material-ui/core/Typography';
import Grid                                         from '@material-ui/core/Grid';
import { withStyles }                               from '@material-ui/core/styles';
import { styles }                                   from '../../styles';
import { useQuery }                                 from '@apollo/react-hooks';
import { GET_BUDGET_TOTALS }                        from '../../queries_and_mutations/queries'
import NumberFormat                                 from 'react-number-format';


const FieldTotalValues = (props) => {
  const { classes, budgetId } = props


  const { data } = useQuery(
    GET_BUDGET_TOTALS,
    {
      variables: { "id": budgetId }
    }
  );

  return(
    <>
      <Grid container item xs={7} justify="flex-end">
        <Typography>
          Total cargos 
        </Typography>
      </Grid>
      <Grid container item xs={5} justify="flex-end" className={classes.totalsGridAmount}>
        <NumberFormat 
          value={data && data.budgetTotals.total / 100}
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </Grid>
      <Grid container item xs={7} justify="flex-end">
        <Typography>
          Saldos
        </Typography>
      </Grid>
      <Grid container item xs={5} justify="flex-end" className={classes.totalsGridAmount}>
        <NumberFormat 
          value={data && data.budgetTotals.totalCredit / 100}
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </Grid>
      <Grid container item xs={7} justify="flex-end">
        <Typography>
          Total pagos
        </Typography>
      </Grid>
      <Grid container item xs={5} justify="flex-end" className={classes.totalsGridAmount}>
        <NumberFormat 
          value={data && data.budgetTotals.totalDebt / 100}
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </Grid>
      <Grid container item xs={7} justify="flex-end">
        <Typography>
          Presupuesto restante
        </Typography>
      </Grid>
      <Grid container item xs={5} justify="flex-end" className={classes.totalsGridAmount}>
        <NumberFormat 
          value={data && data.budgetTotals.totalPaid / 100}
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </Grid>
    </>
  )
}

export default withStyles(styles)(FieldTotalValues);
