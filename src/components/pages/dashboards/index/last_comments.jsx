import React, { Component }         from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid                         from '@material-ui/core/Grid';
import Typography           from '@material-ui/core/Typography';

class LastComments extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={3} xs={12}>
        <Grid item container xs={12}>
          <Grid item xs={3}  align="right">
            <Avatar aria-label="recipe">
              R
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" gutterBottom>
              Shrimp and Chorizo Paella 
              <br/>
              September 14, 2016
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}  align="right">
            <Avatar aria-label="recipe">
              R
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" gutterBottom>
              Shrimp and Chorizo Paella 
              <br/>
              September 14, 2016 dsjadnjasndjkashdjasdhjasndjaskdj
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}  align="right">
            <Avatar aria-label="recipe">
              R
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" gutterBottom>
              Shrimp and Chorizo Paella 
              <br/>
              September 14, 2016
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}  align="right">
            <Avatar aria-label="recipe">
              R
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" gutterBottom>
              Shrimp and Chorizo Paella 
              <br/>
              September 14, 2016
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}  align="right">
            <Avatar aria-label="recipe">
              R
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" gutterBottom>
              Shrimp and Chorizo Paella 
              <br/>
              September 14, 2016
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}  align="right">
            <Avatar aria-label="recipe">
              R
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" gutterBottom>
              Shrimp and Chorizo Paella 
              <br/>
              September 14, 2016
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}  align="right">
            <Avatar aria-label="recipe">
              R
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" gutterBottom>
              Shrimp and Chorizo Paella 
              <br/>
              September 14, 2016
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}  align="right">
            <Avatar aria-label="recipe">
              R
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" gutterBottom>
              Shrimp and Chorizo Paella 
              <br/>
              September 14, 2016
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}  align="right">
            <Avatar aria-label="recipe">
              R
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" gutterBottom>
              Shrimp and Chorizo Paella 
              <br/>
              September 14, 2016
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}  align="right">
            <Avatar aria-label="recipe">
              R
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" gutterBottom>
              Shrimp and Chorizo Paella 
              <br/>
              September 14, 2016
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(LastComments);