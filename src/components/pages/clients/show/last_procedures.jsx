import React, { Component } from 'react';
import { styles }           from './styles';
import { Grid }             from '@material-ui/core';
import { withStyles }       from '@material-ui/core/styles';
import Typography           from '@material-ui/core/Typography';
import Paper                from '@material-ui/core/Paper';
import Procedures           from '../../../../icons/tramites.svg';
import MenuItem             from '@material-ui/core/MenuItem';
import Link                 from '@material-ui/core/Link';

class LastProcedures extends Component {

  render() {
    const { classes } = this.props

    return(
      <Grid item xs={12}>
        <Paper classes={{root: classes.paperFullHeight}}>
          <Grid classes={{root: classes.marginGridBudgets}}>
            <Grid container item xs={12} classes={{root: classes.gridTitle}}>
              <Typography  variant="h5" classes={{root: classes.titleLastProceduresAndComments}}>
                Últimos Trámites
              </Typography>
            </Grid>
            <Grid item xs={12} classes={{root: classes.gridBottomComponents}}>
              <MenuItem>
                <img alt={"phone"} src={Procedures} className={ classes.svgPosition }/>
                <span className={ classes.spanClientData }>
                  Trámite Reciente 1
                  <br/>
                  dd/mm/aa
                </span>
              </MenuItem>
              <MenuItem>
                <img alt={"phone"} src={Procedures} className={ classes.svgPosition }/>
                <span className={ classes.spanClientData }>
                  Trámite Reciente 2
                  <br/>
                  dd/mm/aa
                </span>
              </MenuItem>
              <MenuItem>
                <img alt={"phone"} src={Procedures} className={ classes.svgPosition }/>
                <span className={ classes.spanClientData }>
                  Trámite Reciente 3
                  <br/>
                  dd/mm/aa
                </span>
              </MenuItem>
              <MenuItem>
                <img alt={"phone"} src={Procedures} className={ classes.svgPosition }/>
                <span className={ classes.spanClientData }>
                  Trámite Reciente 4
                  <br/>
                  dd/mm/aa
                </span>
              </MenuItem>
            </Grid>
            <Grid container justify="flex-end" classes={{root: classes.seeMore}}>
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
export default withStyles(styles)(LastProcedures);