import React, { Component }         from 'react';
import Grid                         from '@material-ui/core/Grid';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Typography                   from '@material-ui/core/Typography';
import Link                 from '@material-ui/core/Link';

class LastPayments extends Component {

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" align="left">
              Últimos Pagos
            </Typography>
          </Grid>
          <Grid item container justify="center">
            <Grid item style={{ backgroundColor: "black", width: "180px", height: "200px"}}></Grid>
          </Grid>
          <Grid item xs={12} container justify="flex-end">
            <Typography style={{paddingRight: "1%", paddingTop: "2%"}}>
                <Link>
                  Ver más
                </Link>
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(LastPayments);
