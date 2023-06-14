import React                from 'react';
import ListItem             from '@material-ui/core/ListItem';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import ListItemText         from '@material-ui/core/ListItemText';
import withStyles           from '@material-ui/core/styles/withStyles';
import { Link }             from 'react-router-dom';
import { styles }           from './navigation_menu_styles'

export default withStyles(styles)((props) => {
  const { classes, iconComponent, linkPath, menuText, nested, rawIcon } = props;
  const IconComponent = iconComponent
  return(
    <Link to={linkPath} style={{ textDecoration: 'none', color: "black" }}>
      <ListItem className={ nested ? classes.nested : ""} button>
        <ListItemIcon>
          {rawIcon ? <IconComponent/> :  <img alt={menuText} src={iconComponent}  className={classes.iconMenu}/> }
        </ListItemIcon>
        <ListItemText primary={menuText} />
      </ListItem>
    </Link>
  )
})

