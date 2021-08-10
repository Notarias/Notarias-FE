import React            from 'react'
import { withStyles }   from '@material-ui/core/styles';
import { styles }       from './styles';
import { Grid }         from '@material-ui/core';
import List             from '@material-ui/core/List';
import ListItem         from '@material-ui/core/ListItem';
import Paper            from '@material-ui/core/Paper';
import Avatar           from '@material-ui/core/Avatar';
import ImageIcon        from '@material-ui/icons/Image';
import Typography       from '@material-ui/core/Typography';

const ClientsProcedures = (props) => {
  const { classes } = props

  return(
    <Paper className={classes.paperWidth}>
      <List>
        <ListItem>
          <Grid container direction="row" className={classes.gridsMarginRight}>
            <Grid container item xs={1}  justifyContent="center" alignItems="center">
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
            <Typography>Trámite</Typography>
            </Grid>
            <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
              <Typography>A cargo</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography>Total</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography>Adeudo</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem button>
          <Grid container direction="row" className={classes.gridsMarginRight}>
            <Grid container item xs={1}  justifyContent="center" alignItems="center">
                <Avatar className={classes.avatarImageDefault}>
                  <ImageIcon />
                </Avatar>
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Typography>dd/mm/aa</Typography>
            </Grid>
            <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
              <Avatar className={classes.avatarImageDefault}>
                <ImageIcon />
              </Avatar>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography className={classes.TypographyGreen}>$ 300,000</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography className={classes.TypographyRed}>$ 100,000</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem button>
          <Grid container direction="row" className={classes.gridsMarginRight}>
            <Grid container item xs={1}  justifyContent="center" alignItems="center">
                <Avatar className={classes.avatarImageDefault}>
                  <ImageIcon />
                </Avatar>
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Typography>dd/mm/aa</Typography>
            </Grid>
            <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
              <Avatar className={classes.avatarImageDefault}>
                <ImageIcon />
              </Avatar>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography className={classes.TypographyGreen}>$ 0</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography className={classes.TypographyRed}>$ 0</Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Paper>
  )
}

export default withStyles(styles)(ClientsProcedures);
