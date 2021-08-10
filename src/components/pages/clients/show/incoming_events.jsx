import React          from 'react'
import { withStyles } from '@material-ui/core/styles';
import { styles }     from './styles';
import { Grid }       from '@material-ui/core';
import List           from '@material-ui/core/List';
import ListItem       from '@material-ui/core/ListItem';
import Paper          from '@material-ui/core/Paper';
import Typography     from '@material-ui/core/Typography';
import Avatar         from '@material-ui/core/Avatar';
import ImageIcon      from '@material-ui/icons/Image';
import Chip           from '@material-ui/core/Chip';

const IncomingEvents = (props) => {
  const { classes } = props

  return(
    <Paper className={classes.paperWidth}>
      <List>
        <ListItem button>
          <Grid container direction="row" className={classes.gridsMarginRight}>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Avatar className={classes.avatarEvents}>
                <ImageIcon />
              </Avatar>
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Typography align="left" variant="subtitle2">
                dd/mm/aaaa
              </Typography>
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Chip label="07:30 p.m." color="primary">
              </Chip>
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Typography align="left" variant="subtitle2">
                Notaria 78, sala de juntas
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem button>
          <Grid container direction="row" className={classes.gridsMarginRight}>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Avatar className={classes.avatarEvents}>
                <ImageIcon />
              </Avatar>
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Typography align="left" variant="subtitle2">
                dd/mm/aaaa
              </Typography>
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Chip label="09:30 a.m." color="primary">
              </Chip>
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Typography align="left" variant="subtitle2">
                Notaria 78, Recepción
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Paper>
  )
}

export default withStyles(styles)(IncomingEvents);
