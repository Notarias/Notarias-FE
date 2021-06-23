import React, {useState} from 'react';
import Typography                   from '@material-ui/core/Typography';
import Grid                         from '@material-ui/core/Grid';
import { withStyles }                 from '@material-ui/core/styles';
import { styles }                     from '../../styles';
import Avatar                         from '@material-ui/core/Avatar';
import { useQuery } from '@apollo/react-hooks';
import { GET_HISTORIAL } from '../../queries_and_mutations/queries';

const AuditLog = (props) => {
  const { budgetId, classes } = props

  const { loading, data , refetch } = useQuery(
    GET_HISTORIAL, { variables: {"auditableId": budgetId, "auditableType": "Budget" } }
  );


  const auditLog = data && data.auditLogsFromAuditable

  console.log(auditLog)
  return(
    <Grid className={classes.uditLogGrid}>
      {
        auditLog.map((obj) => {
          return(
            <React.Fragment key={obj.id + "fragment"}>
              <Grid container direction="row" alignItems="center">
                <Grid container item xs={2} alignItems="center" justify="center">
                  <Avatar 
                    src={obj.user.avatarThumbUrl ? obj.user.avatarThumbUrl : "/broken-image.jpg" }
                    size="small"
                  />
                </Grid>
                <Grid container item xs={10} direction="column" alignItems="flex-start" justify="center">
                  <Typography variant="subtitle2">{obj.user.firstName} {obj.user.lastName}</Typography>
                  <Typography variant="caption"> fecha: {obj.createdAt}</Typography>
                  <Typography variant="caption">{obj.message}</Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          )
        })
      }
    </Grid>
  )
}

export default withStyles(styles)(AuditLog);
