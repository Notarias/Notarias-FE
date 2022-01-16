import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
          style={{ margin: '0px' }}/>
      </ListItem>
    </React.Fragment>
  )
}