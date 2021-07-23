import React, { Component }   from 'react';
import { styles }             from './styles';
import { Grid }               from '@material-ui/core';
import { withStyles }         from '@material-ui/core/styles';
import Paper                  from '@material-ui/core/Paper';
import TextField              from '@material-ui/core/TextField';
import Typography             from '@material-ui/core/Typography';
import Chip                   from '@material-ui/core/Chip';
import Link                   from '@material-ui/core/Link';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

class NextEvents extends Component {

  render() {
    const { classes } = this.props

    return(
      <Grid container item xs={12} classes={{root: classes.fullWidhAndHeight}} >
        <Paper classes={{root: classes.fullWidhAndHeight}}>
          <Grid item style={{height:"100%"}}>
            <Grid container classes={{root: classes.titleNextEvents}}>
              <Typography aling="left" variant="h5">
                Próximos Eventos
              </Typography>
            </Grid>
            <Grid container item xs={12} style={{height:"60%"}}>
              <Grid item xs={6}>
                <form>
                  <TextField
                    id="date"
                    label="Reunion"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </Grid>
              <Grid container item xs={6} spacing={3}>
                <Grid container item xs={12}>
                  <Grid container item classes={{root: classes.calendarGridColor}}>
                    <Grid item xs={4} classes={{root: classes.paddingDayMeet}}>
                      <Typography align="left" variant="subtitle2">
                        Reunion 1
                        <br/>
                        dd/mm/aaaa
                      </Typography>
                    </Grid>
                    <Grid container item xs={8} style={{paddingTop:"5%", paddingLeft:"30%"}}>
                      <Grid item xs={6}>
                        <Chip label="07:30" color="primary">
                        </Chip>
                      </Grid>
                      <Grid item align="right" xs={6}>
                        <KeyboardArrowRightIcon fontSize="large"/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid container item classes={{root: classes.calendarGridColor}}>
                    <Grid item xs={4} classes={{root: classes.paddingDayMeet}}>
                      <Typography align="left" variant="subtitle2">
                        Reunion 1
                        <br/>
                        dd/mm/aaaa
                      </Typography>
                    </Grid>
                    <Grid container item xs={8} style={{paddingTop:"5%", paddingLeft:"30%"}}>
                      <Grid item xs={6}>
                        <Chip label="07:30" color="primary">
                        </Chip>
                      </Grid>
                      <Grid item align="right" xs={6}>
                        <KeyboardArrowRightIcon fontSize="large"/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid container item classes={{root: classes.calendarGridColor}}>
                    <Grid item xs={4} classes={{root: classes.paddingDayMeet}}>
                      <Typography align="left" variant="subtitle2">
                        Reunion 1
                        <br/>
                        dd/mm/aaaa
                      </Typography>
                    </Grid>
                    <Grid container item xs={8} style={{paddingTop:"5%", paddingLeft:"30%"}}>
                      <Grid item xs={6}>
                        <Chip label="07:30" color="primary">
                        </Chip>
                      </Grid>
                      <Grid item align="right" xs={6}>
                        <KeyboardArrowRightIcon fontSize="large"/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container style={{height:"20%"}}>
              <Grid container item justifyContent="flex-end"  alignItems="center">
                <Typography variant="subtitle2">
                    <Link>
                      Ir al calendario
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
export default withStyles(styles)(NextEvents);