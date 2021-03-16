import React                                from 'react';
import { styles }                           from '../styles';
import { withStyles }                       from '@material-ui/core/styles';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemText                         from '@material-ui/core/ListItemText';

const CategoriesList = (props) => {
  const [template] = React.useState(props.template)
  const classes = props

  const clickHandler = () => {
    props.selectItem(template)
  }

  return(
    <List className={classes.root}>
      {
        categories.map((category) => {
        const labelId = `checkbox-list-label-${category.id}`;
          return (
              <>
              <ListItem key={labelId} role={undefined} dense button onClick={handleToggle(category)}>
                  <ListItemIcon>
                  <Checkbox
                      edge="start"
                      checked={checked.indexOf(category) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                  />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={` ${ category.name }`} />
              </ListItem>
              <Divider/>
              </>
          );
        })
      }
    </List> 
  )
}

export default withStyles(styles)(CategoriesList);
