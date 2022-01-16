import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export default (props) => {
  const { causant } = props;

  return(
    <React.Fragment key='causant-data-fragment'>
      <ListItem button key="causant-data" style={{ paddingBottom: '0px' }}>
        <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary="Causante"/>
      </ListItem>

      <ListItem button key="causant-name">
        <ListItemText
          primary="Nombre:"
          style={{ margin: '0px' }}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                { causant && causant.fullName || 'N/A'}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </React.Fragment>
  )
}