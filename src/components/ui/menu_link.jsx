import ListItem             from '@material-ui/core/ListItem';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import ListItemText         from '@material-ui/core/ListItemText';
import withStyles           from '@material-ui/core/styles/withStyles';
import React                from 'react';
import { Link }             from 'react-router-dom';
import { styles }           from './navigation_menu_styles'

export default withStyles(styles)((props) => {
  const { classes, iconComponent, linkPath, menuText, nested } = props;
  return(
    <Link to={linkPath} style={{ textDecoration: 'none', color: "black" }}>
      <ListItem className={ nested ? classes.nested : ""} button>
        <ListItemIcon>
          <img alt={menuText} src={iconComponent}  className={classes.iconMenu}/>
          </ListItemIcon>
        <ListItemText primary={menuText} />
      </ListItem>
    </Link>
  )
})

