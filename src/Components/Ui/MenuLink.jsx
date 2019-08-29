import ListItem             from '@material-ui/core/ListItem';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import ListItemText         from '@material-ui/core/ListItemText';
import React                from 'react';
import withStyles           from '@material-ui/core/styles/withStyles';
import { Link }             from 'react-router-dom';
import { styles }           from './NavigationMenuStyles'

export default withStyles(styles)((props) => {
  const { classes, iconComponent, linkPath, menuText } = props;
  return(
    <Link to={linkPath} style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <img alt={menuText} src={iconComponent}  className={classes.iconMenu}/>
          </ListItemIcon>
        <ListItemText primary={menuText} />
      </ListItem>
    </Link>
  )
})

