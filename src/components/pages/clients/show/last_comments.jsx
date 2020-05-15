import React, { Component } from 'react';
import { styles }           from './styles';
import { Grid }             from '@material-ui/core';
import { withStyles }       from '@material-ui/core/styles';
import Typography           from '@material-ui/core/Typography';
import Paper                from '@material-ui/core/Paper';
import Link                 from '@material-ui/core/Link';
import MenuItem             from '@material-ui/core/MenuItem';
import MessageOutlinedIcon  from '@material-ui/icons/MessageOutlined';
import { SvgIcon }          from '@material-ui/core';

class LastComments extends Component {

  render() {
    const { classes } = this.props

    return(
        <Grid xs={12}>
          <Paper classes={{root: classes.paperFullHeight}}>
            <Grid classes={{root: classes.marginGridBudgets}}>
              <Grid container xs={12} classes={{root: classes.gridTitle}}>
                <Typography variant="h5" classes={{root: classes.titleLastProceduresAndComments}}>
                Últimos Comentarios
                </Typography>
              </Grid>
              <Grid xs={12} classes={{root: classes.gridBottomComponents}}>
                <Typography aling="left">
                  <MenuItem>
                    <Grid container>
                      <Grid item classes={{root: classes.svgComment}}>
                        <SvgIcon  component={MessageOutlinedIcon} classes={{root: classes.commentIcon}}/>
                      </Grid>
                      <Grid item classes={{root: classes.spanClientData}}>
                          Comentario Reciente 1
                          <br/>
                          dd/mm/aa
                      </Grid>
                    </Grid>
                  </MenuItem>
                  <MenuItem>
                    <Grid container>
                      <Grid item classes={{root: classes.svgComment}}>
                        <SvgIcon  component={MessageOutlinedIcon} classes={{root: classes.commentIcon}}/>
                      </Grid>
                      <Grid item classes={{root: classes.spanClientData}}>
                          Comentario Reciente 2
                          <br/>
                          dd/mm/aa
                      </Grid>
                    </Grid>
                  </MenuItem>
                  <MenuItem>
                    <Grid container>
                      <Grid item classes={{root: classes.svgComment}}>
                        <SvgIcon  component={MessageOutlinedIcon} classes={{root: classes.commentIcon}}/>
                      </Grid>
                      <Grid item classes={{root: classes.spanClientData}}>
                          Comentario Reciente 3
                          <br/>
                          dd/mm/aa
                      </Grid>
                    </Grid>
                  </MenuItem>
                  <MenuItem>
                    <Grid container>
                      <Grid item classes={{root: classes.svgComment}}>
                        <SvgIcon  component={MessageOutlinedIcon} classes={{root: classes.commentIcon}}/>
                      </Grid>
                      <Grid item classes={{root: classes.spanClientData}}>
                          Comentario Reciente 4
                          <br/>
                          dd/mm/aa
                      </Grid>
                    </Grid>
                  </MenuItem>
                </Typography>
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
export default withStyles(styles)(LastComments);