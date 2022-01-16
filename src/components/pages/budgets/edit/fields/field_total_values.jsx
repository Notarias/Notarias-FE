import React                                        from 'react'
import Typography                                   from '@material-ui/core/Typography';
import Grid                                         from '@material-ui/core/Grid';
import { withStyles }                               from '@material-ui/core/styles';
import { styles }                                   from '../../styles';
import { useQuery }                                 from '@apollo/client';
import { GET_BUDGET_TOTALS }                        from '../../queries_and_mutations/queries'
import NumberFormat                                 from 'react-number-format';
import Box                                          from '@material-ui/core/Box';


const FieldTotalValues = (props) => {
  const { classes, budget } = props


  const { data } = useQuery(
    GET_BUDGET_TOTALS,
    {
      variables: { "id": budget.id }
    }
  );

  return(
    <>
      <Grid container item direction="column"  justifyContent="flex-start" alignItems="stretch">
        <Grid container item>
          <Grid container item xs={7} justifyContent="flex-end">
            <Typography component="div" variant="body1">
              <Box color="success.main">
                Ingresos
              </Box>
            </Typography>
          </Grid>
          <Grid container item xs={5} justifyContent="flex-start" className={classes.totalsGridAmount}>
            <Typography component="div" variant="body1">
              <NumberFormat 
                value={data && data.budgetTotals.totalCredit / 100}
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'$ '}
                decimalScale={2}
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid container item xs={7} justifyContent="flex-end">
            <Typography component="div" variant="body1">
              Total cargos 
            </Typography>
          </Grid>
          <Grid container item xs={5} justifyContent="flex-start" className={classes.totalsGridAmount}>
            <NumberFormat 
              value={data && data.budgetTotals.total / 100}
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={'$ '}
              decimalScale={2}
            />
          </Grid>
        </Grid>
        <Grid container item>
          <Grid container item xs={7} justifyContent="flex-end">
            <Box color="secondary.main">
              <Typography variant="body2">
                Egresos
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs={5} justifyContent="flex-start" className={classes.totalsGridAmount}>
            <NumberFormat 
              value={data && data.budgetTotals.totalPaid / 100}
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={'$ '}
              decimalScale={2}
            />
          </Grid>
        </Grid>
        <Grid container item>
          <Grid container item xs={7} justifyContent="flex-end">
            <Box color={"primary.main"}>
              <Typography variant="body2">
                Por saldar
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs={5} justifyContent="flex-start" className={classes.totalsGridAmount}>
            <NumberFormat 
              value={data && data.budgetTotals.totalDebt / 100}
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={'$ '}
              decimalScale={2}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(FieldTotalValues);
