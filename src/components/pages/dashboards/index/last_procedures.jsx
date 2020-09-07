import React, { Component } from 'react';
import { styles }           from '../styles';
import { Grid }             from '@material-ui/core';
import { withStyles }       from '@material-ui/core/styles';
import Typography           from '@material-ui/core/Typography';
import Procedures           from '../../../../icons/svg js/Proceso';
import Link                 from '@material-ui/core/Link';
import CheckBoxIcon         from '../../../../icons/svg js/completo';

class LastProceduresIndex extends Component {

  render() {
    const { classes } = this.props

    return(
      <Grid >
        <Grid container >
          <Grid item xs={12} style={{paddingBottom:"3%"}}>
            <Typography variant="h5" align="left">
              Últimos Trámites
            </Typography>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item container xs={12}>
              <Grid item container xs={2} justify="flex-start" style={{paddingLeft: "3.3%"}}>
                <CheckBoxIcon size={40} color="white" className={classes.svgCheckBoxIcon}/>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="subtitle2" gutterBottom align="left">
                  Últimos Trámites 1
                  <br/>
                  dd/mm/aaaa
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
            <Grid item container xs={2} justify="flex-start" style={{paddingLeft: "3.3%"}}>
              <Grid item className={classes.svgProceso}>
                <Procedures arrowcolor="white" colornut="white" size={37} />
              </Grid>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="subtitle2" gutterBottom align="left">
                  Últimos Trámites 2
                  <br/>
                  dd/mm/aaaa
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={2} justify="flex-start" style={{paddingLeft: "3.3%"}}>
                <CheckBoxIcon size={40} color="white" className={classes.svgCheckBoxIcon}/>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="subtitle2" gutterBottom align="left">
                  Últimos Trámites 1
                  <br/>
                  dd/mm/aaaa
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={2} justify="flex-start" style={{paddingLeft: "3.3%"}}>
                <Grid item className={classes.svgProceso}>
                  <Procedures arrowcolor={"white"} colornut={"white"} size={37} />
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="subtitle2" gutterBottom align="left">
                  Últimos Trámites 2
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
export default withStyles(styles)(LastProceduresIndex);