import React, { Component } from 'react';
import { styles }           from '../styles';
import { Grid }             from '@material-ui/core';
import { withStyles }       from '@material-ui/core/styles';
import Typography           from '@material-ui/core/Typography';
import Procedures           from '../../../../icons/svg js/Proceso';
import Link                 from '@material-ui/core/Link';
import CheckBoxIcon         from '../../../../icons/svg js/completo';

class LastBudgetsIndex extends Component {

  render() {
    const { classes } = this.props

    return(
      <Grid xs={12} >
        <Grid xs={12}>
          <Grid item xs={12} style={{paddingBottom:"3%"}}>
            <Typography variant="h5" align="left">
              Últimos Presupuestos
            </Typography>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item container xs={12}>
              <Grid item container xs={3} justify="center">
                <CheckBoxIcon size="40" color="white" className={classes.svgCheckBoxIcon}/>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle2" gutterBottom align="left">
                  Últimos Presupuestos 1
                  <br/>
                  dd/mm/aaaa
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={3} justify="center">
                <Grid item className={classes.svgProceso}>
                  <Procedures arrowColor="white" colorNut="white" size="33" />
                </Grid>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle2" gutterBottom align="left">
                  Últimos Presupuestos 2
                  <br/>
                  dd/mm/aaaa
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={3} justify="center">
                <CheckBoxIcon size="40" color="white" className={classes.svgCheckBoxIcon}/>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle2" gutterBottom align="left">
                  Últimos Presupuestos 3
                  <br/>
                  dd/mm/aaaa
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={3} justify="center">
                <Grid item className={classes.svgProceso}>
                  <Procedures arrowColor="white" colorNut="white" size="33" />
                </Grid>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle2" gutterBottom align="left">
                  Últimos Presupuestos 4
                  <br/>
                  dd/mm/aaaa
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <Typography >
                    <Link>
                      Ver más
                    </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles)(LastBudgetsIndex);