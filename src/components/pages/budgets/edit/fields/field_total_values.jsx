import React                                        from 'react'
import Typography                                   from '@material-ui/core/Typography';
import Grid                                         from '@material-ui/core/Grid';
import { withStyles }                               from '@material-ui/core/styles';
import { styles }                                   from '../../styles';
import { useQuery }                                 from '@apollo/client';
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
      <Grid container item xs={7} justifyContent="flex-end">
        <Typography variant="body2">
          Total cargos 
        </Typography>
      </Grid>
      <Grid container item xs={5} justifyContent="flex-end" className={classes.totalsGridAmount}>
        <NumberFormat 
          value={data && data.budgetTotals.total / 100}
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </Grid>
      <Grid container item xs={7} justifyContent="flex-end">
        <Typography variant="body2">
          Ingresos
        </Typography>
      </Grid>
      <Grid container item xs={5} justifyContent="flex-end" className={classes.totalsGridAmount}>
        <NumberFormat 
          value={data && data.budgetTotals.totalCredit / 100}
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </Grid>
      <Grid container item xs={7} justifyContent="flex-end">
        <Typography variant="body2">
          Por saldar
        </Typography>
      </Grid>
      <Grid container item xs={5} justifyContent="flex-end" className={classes.totalsGridAmount}>
        <NumberFormat 
          value={data && data.budgetTotals.totalDebt / 100}
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'$ '}
          decimalScale={2}
        />
      </Grid>
      <Grid container item xs={7} justifyContent="flex-end">
        <Typography variant="body2">
          Egresos
        </Typography>
      </Grid>
      <Grid container item xs={5} justifyContent="flex-end" className={classes.totalsGridAmount}>
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
