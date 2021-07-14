import React, { Component } from 'react';
import { styles }           from './styles';
import { Grid }             from '@material-ui/core';
import { withStyles }       from '@material-ui/core/styles';
import Typography           from '@material-ui/core/Typography';
import Paper                from '@material-ui/core/Paper';
import Link                 from '@material-ui/core/Link';
import MenuItem             from '@material-ui/core/MenuItem';
import BudgetsIcon          from '../../../../icons/presupuestos.svg';

class LastBudgets extends Component {

  render() {
    const { classes } = this.props

    return(
        <Grid classes={{root: classes.paperFullHeight}}>
          <Paper classes={{root: classes.paperFullHeight}}>
            <Grid classes={{root: classes.marginGridBudgets}}>
              <Grid container classes={{root: classes.gridTitle}}>
                <Typography variant="h5">
                  Últimos Presupuestos
                </Typography>
              </Grid>
              <Grid classes={{root: classes.gridBottomComponents}}>
                <Typography aling="left">
                  <MenuItem>
                    <img alt={"presupuestos"} src={BudgetsIcon} className={ classes.imgSizeCustomer }/>
                    <span className={ classes.spanClientData }>
                      Presupuestos Reciente 1
                      <br/>
                      dd/mm/aa
                    </span>
                  </MenuItem>
                  <MenuItem>
                  <img alt={"presupuestos"} src={BudgetsIcon} className={ classes.imgSizeCustomer }/>
                    <span className={ classes.spanClientData }>
                      Presupuestos Reciente 2
                      <br/>
                      dd/mm/aa
                    </span>
                  </MenuItem>
                  <MenuItem>
                  <img alt={"presupuestos"} src={BudgetsIcon} className={ classes.imgSizeCustomer }/>
                    <span className={ classes.spanClientData }>
                      Presupuestos Reciente 3
                      <br/>
                      dd/mm/aa
                    </span>
                  </MenuItem>
                  <MenuItem>
                <img alt={"presupuestos"} src={BudgetsIcon} className={ classes.imgSizeCustomer }/>
                  <span className={ classes.spanClientData }>
                    Presupuestos Reciente 4
                    <br/>
                    dd/mm/aa
                  </span>
                </MenuItem>
                </Typography>
              </Grid>
              <Grid container justifyContent="flex-end" classes={{root: classes.seeMore}}>
                <Grid item>
                  <Typography >
                      <Link>
                        Ver más
                      </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
    )
  }
}
export default withStyles(styles)(LastBudgets);