import React, { Component }   from 'react';
import { styles }             from '../styles';
import { Grid }               from '@material-ui/core';
import { withStyles }         from '@material-ui/core/styles';
import TextField              from '@material-ui/core/TextField';
import Typography             from '@material-ui/core/Typography';
import Chip                   from '@material-ui/core/Chip';
import Link                   from '@material-ui/core/Link';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

class NextEventsIndex extends Component {

  render() {
    const { classes } = this.props

    return(
      <Grid container classes={{root: classes.fullWidhAndHeight}}>
        <Grid item container style={{height:"100%", paddingLeft: "1%"}} xs={12} spacing={2}>
          <Grid item container xs={12} classes={{root: classes.titleNextEvents}}>
            <Typography align="left" variant="h5" style={{paddingBottom:"3%"}}>
              Próximos Eventos
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} container>
            <Grid item xs={12}>
              <form>
                <TextField
                  id="date"
                  label="Reunion"
                  type="date"
                  classes={{root: classes.textFieldEvent}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>
          </Grid>
          <Grid item container xs={12}  md={8}>
            <Grid container  xs={12}  item classes={{root: classes.calendarGridColor}}>
              <Grid item xs={5}>
                <Typography align="center" variant="subtitle2">
                  Reunion 1
                  <br/>
                  dd/mm/aaaa
                </Typography>
              </Grid>
              <Grid container item xs={7}  style={{paddingTop:"10px"}}>
                <Grid item xs={8} align="right" style={{height:"100%"}}>
                  <Chip label="07:30" color="primary">
                  </Chip>
                </Grid>
                <Grid item  xs={4} >
                  <KeyboardArrowRightIcon fontSize="large"/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item container xs={12}  md={8}>
            <Grid container  xs={12}  item classes={{root: classes.calendarGridColor}}>
              <Grid item xs={5}>
                <Typography align="center" variant="subtitle2">
                  Reunion 1
                  <br/>
                  dd/mm/aaaa
                </Typography>
              </Grid>
              <Grid container item xs={7}  style={{paddingTop:"10px"}}>
                <Grid item xs={8} align="right" style={{height:"100%"}}>
                  <Chip label="07:30" color="primary">
                  </Chip>
                </Grid>
                <Grid item  xs={4} >
                  <KeyboardArrowRightIcon fontSize="large"/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item container xs={12}  md={8}>
            <Grid container  xs={12}  item classes={{root: classes.calendarGridColor}}>
              <Grid item xs={5}>
                <Typography align="center" variant="subtitle2">
                  Reunion 1
                  <br/>
                  dd/mm/aaaa
                </Typography>
              </Grid>
              <Grid container item xs={7}  style={{paddingTop:"10px"}}>
                <Grid item xs={8} align="right" style={{height:"100%"}}>
                  <Chip label="07:30" color="primary">
                  </Chip>
                </Grid>
                <Grid item  xs={4} >
                  <KeyboardArrowRightIcon fontSize="large"/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container justifyContent="flex-end"  style={{paddingTop: "6%"}}>
            <Grid item>
              <Typography>
                  <Link>
                    Ir al calendario
                  </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles)(NextEventsIndex);
