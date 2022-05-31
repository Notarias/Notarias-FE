import React                       from 'react'
import Typography                  from '@material-ui/core/Typography';
import Grid                        from '@material-ui/core/Grid';
import Hidden                      from '@material-ui/core/Hidden';
import HelpOutlineIcon             from '@material-ui/icons/HelpOutline';
import { withStyles }              from '@material-ui/core/styles';
import { styles }                  from '../../styles';
import { useQuery }                from '@apollo/client';
import { GET_BUDGET_TOTALS }       from '../../queries_and_mutations/queries'
import NumberFormat                from 'react-number-format';
import Box                         from '@material-ui/core/Box';
import Divider                     from '@material-ui/core/Divider';


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
      <Grid container item xs={6}>
        <Grid container item direction="column" alignItems="stretch">
          <Grid container item style={{paddingRight: '25px'}}>
            <Hidden smDown>
              <Grid container item xs={6} justifyContent="flex-end">
                <Typography component="div" variant="body1">
                  <Box>
                    Total cargos
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid container item xs={1} justifyContent="flex-end" style={{marginLeft: '25px'}}>
                <Typography component="div" variant="body1">
                  <Box>
                    <HelpOutlineIcon/>
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Grid container item xs justifyContent='flex-end' className={classes.totalsGridAmount}>
              <Typography component="div" variant="body1">
                <NumberFormat
                  value={data && data.budgetTotals.total / 100}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$ '}
                  decimalScale={2}
                />
              </Typography>
            </Grid>
          </Grid>
          <Grid container item style={{paddingRight: '25px'}}>
            <Hidden smDown>
              <Grid container item xs={6} justifyContent="flex-end">
                <Typography component="div" variant="body1">
                  <Box color="success.main">
                    Ingresos
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid container item xs={1} justifyContent="flex-end" style={{marginLeft: '25px'}}>
                <Typography component="div" variant="body1">
                  <Box color="success.main">
                    <HelpOutlineIcon/>
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Grid container item xs justifyContent='flex-end' className={classes.totalsGridAmount}>
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
          <Divider style={{ margin: '15px' }}/>
          <Grid container item style={{paddingRight: '25px'}}>
            <Hidden smDown>
              <Grid container item xs={6} justifyContent="flex-end">
                <Typography component="div" variant="body1">
                  <Box color={"primary.main"}>
                    <Typography variant="body1">
                      Por saldar
                    </Typography>
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid container item xs={1} justifyContent="flex-end" style={{marginLeft: '25px'}}>
                <Typography component="div" variant="body1">
                  <Box color="primary.main">
                    <HelpOutlineIcon/>
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Grid container item xs justifyContent='flex-end' className={classes.totalsGridAmount}>
              <Typography component="div" variant="body1">
                <NumberFormat 
                  value={data && data.budgetTotals.totalDebt / 100}
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$ '}
                  decimalScale={2}
                />
              </Typography>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
      <Grid container item xs={6}>
        <Grid container item direction="column"  justifyContent="flex-start" alignItems="stretch">
          <Grid container item style={{paddingRight: '25px'}}>
            <Hidden smDown>
              <Grid container item xs={6} justifyContent="flex-end">
                <Typography component="div" variant="body1">
                  <Box>
                    Total cargos
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid container item xs={1} justifyContent="flex-end" style={{marginLeft: '25px'}}>
                <Typography component="div" variant="body1">
                  <Box>
                    <HelpOutlineIcon/>
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Grid container item xs justifyContent='flex-end' className={classes.totalsGridAmount}>
              <Typography component="div" variant="body1">
                <NumberFormat
                  value={data && data.budgetTotals.total / 100}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$ '}
                  decimalScale={2}
                />
              </Typography>
            </Grid>
          </Grid>
          <Grid container item style={{paddingRight: '25px'}}>
            <Hidden smDown>
              <Grid container item xs={6} justifyContent="flex-end">
                <Typography component="div" variant="body1">
                  <Box color="secondary.main">
                    Egresos
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid container item xs={1} justifyContent="flex-end" style={{marginLeft: '25px'}}>
                <Typography component="div" variant="body1">
                  <Box color="secondary.main">
                    <HelpOutlineIcon/>
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Grid container item xs justifyContent='flex-end' className={classes.totalsGridAmount}>
              <Typography component="div" variant="body1">
                <NumberFormat 
                  value={data && data.budgetTotals.totalPaid / 100}
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$ '}
                  decimalScale={2}
                />
              </Typography>
            </Grid>
          </Grid>
          <Divider style={{ margin: '15px' }}/>
          <Grid container item style={{paddingRight: '25px'}}>
            <Hidden smDown>
              <Grid container item xs={6} justifyContent="flex-end">
                <Typography component="div" variant="body1">
                  <Box color="secondary.main">
                    Por pagar
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid container item xs={1} justifyContent="flex-end" style={{marginLeft: '25px'}}>
                <Typography component="div" variant="body1">
                  <Box color="secondary.main">
                    <HelpOutlineIcon/>
                  </Box>
                </Typography>
              </Grid>
            </Hidden>
            <Grid container item xs justifyContent='flex-end' className={classes.totalsGridAmount}>
              <Typography component="div" variant="body1">
                <NumberFormat 
                  value={data && data.budgetTotals.totalPayable / 100}
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$ '}
                  decimalScale={2}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(FieldTotalValues);
