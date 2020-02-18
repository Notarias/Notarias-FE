import ListItem             from '@material-ui/core/ListItem';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import ListItemText         from '@material-ui/core/ListItemText';
import React                from 'react';
import withStyles           from '@material-ui/core/styles/withStyles';
import { Link }             from 'react-router-dom';
import { styles }           from './navigation_menu_styles'
import Grid                 from '@material-ui/core/Grid';
import Avatar               from '@material-ui/core/Avatar';

export default withStyles(styles)((props) => {
  const { classes } = props
  return(
    <Link to="/profile">
      <ListItem button>
        <ListItemIcon >
            <Grid>
              <Avatar src="" className={classes.avatar} />
            </Grid>
          </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>
    </Link>
  )
})