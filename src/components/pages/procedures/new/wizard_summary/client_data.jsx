import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export default (props) => {
  const { client } = props;

  return(
    <React.Fragment key='client-data-fragment'>
      <ListItem button key="client-data" style={{ paddingBottom: '0px' }}>
        <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary="Cliente"/>
      </ListItem>

      <ListItem button key="client-name" style={{ paddingBottom: '0px' }}>
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
                { (client && client.fullName) || 'N/A' }
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem button key="client-rfc" style={{ paddingBottom: '0px' }}>
        <ListItemText
          primary="RFC:"
          style={{ margin: '0px' }}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                { (client && client.rfc) || 'N/A' }
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem button key="client-curp">
        <ListItemText
          primary="CURP:"
          style={{ margin: '0px' }}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                { (client && client.curp) || 'N/A' }
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </React.Fragment>
  )
}