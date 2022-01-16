import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export default (props) => {
  const { procedure } = props;

  return(
    <React.Fragment key='procedure-data-fragment'>
      <ListItem button key="procedure-data" style={{ paddingBottom: '0px' }}>
        <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary="Trámite"/>
      </ListItem>

      <ListItem button key="procedure-name">
        <ListItemText
          primary={procedure && procedure.name || 'N/A'}
          style={{ margin: '0px' }}/>
      </ListItem>
    </React.Fragment>
  )
}