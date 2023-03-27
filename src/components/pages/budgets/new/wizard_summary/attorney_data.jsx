import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export default (props) => {
  const { attorney } = props;

  return(
    <React.Fragment key='attorney-data-fragment'>
      <ListItem button key="attorney-data" style={{ paddingBottom: '0px' }}>
        <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary="Despacho Solicitante"/>
      </ListItem>

      <ListItem button key="attorney-name">
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
                { (attorney && attorney.fullName) || 'N/A'}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </React.Fragment>
  )
}
