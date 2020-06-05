import React, { Component }         from 'react';
import Grid                         from '@material-ui/core/Grid';
import Paper                        from '@material-ui/core/Paper';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Typography                   from '@material-ui/core/Typography';

class LastPayments extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid item container xs={12}>
          <Typography align="justify" variant="subtitle2" gutterBottom>
            Útimos Pagos
          </Typography>
        </Grid>
        <Grid>
          
        </Grid>
        <Grid></Grid>
      </div>
    );
  }
}

export default withStyles(styles)(LastPayments);
