import ListItem             from '@material-ui/core/ListItem';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import ListItemText         from '@material-ui/core/ListItemText';
import React                from 'react';
import withStyles           from '@material-ui/core/styles/withStyles';
import { Link }             from 'react-router-dom';
import { styles }           from './navigation_menu_styles'
import Grid                 from '@material-ui/core/Grid';
import Avatar               from '@material-ui/core/Avatar';
import { GET_CURRENT_USER } from '../../resolvers/queries';
import { useQuery }    from '@apollo/client';

const ProfileLink = (props) => {
  const { classes } = props
  const { data } = useQuery(GET_CURRENT_USER);

  return(
    <Link to="/profiles/general">
      <ListItem button>
        <ListItemIcon >
            <Grid>
              <Avatar src={data && data.currentUser && data.currentUser.avatarThumbUrl} className={classes.avatar} />
            </Grid>
          </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>
    </Link>
  )
}

export default withStyles(styles)(ProfileLink)
