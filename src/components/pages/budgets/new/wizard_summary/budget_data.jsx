import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Chip from '@material-ui/core/Chip';

export default (props) => {
  const { budget } = props;

  return(
    <React.Fragment key='budget-data-fragment'>
      <ListItem button key="budget-data" style={{ paddingBottom: '0px' }}>
        <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary="Presupuesto"/>
      </ListItem>

      <ListItem button key="budget-name">
        <ListItemText
          primary={ (budget && budget.name) || 'N/A' }
          style={{ margin: '0px' }}
        />
        <ListItemIcon>
          <Chip
            size="small"
            color={ budget.active ? "primary" : "secondary" }
            label={ `${budget.version ? budget.version : "0"}.0` }
          />
        </ListItemIcon>
      </ListItem>
    </React.Fragment>
  )
}
