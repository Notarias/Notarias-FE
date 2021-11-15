import React, {useState, useEffect}        from 'react';
import Typography               from '@material-ui/core/Typography';
import Grid                     from '@material-ui/core/Grid';
import { withStyles }           from '@material-ui/core/styles';
import { styles }               from '../../styles';
import Avatar                   from '@material-ui/core/Avatar';
import { useQuery }             from '@apollo/client';
import { GET_BUDGETS_AUDITLOG } from '../../queries_and_mutations/queries';

const getCurrentDate = (obj, separator='/') => {
  let newDate = new Date(Date.parse(obj.createdAt))
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();

  return (
    `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}-
      ${hours}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
  )
}

function createMarkup(obj) {
  return {__html: obj.message};
}

const AuditLog = (props) => {
  const { budget, classes } = props

  const { loading, data , refetch } = useQuery(
    GET_BUDGETS_AUDITLOG, { variables: { "budgetId": budget.id }, fetchPolicy: "no-cache" }
  );

  const [auditLog, setAuditlog] = React.useState(data ? data.budgetAuditLogs : [])

  useEffect(
    () => {
      setAuditlog(data ? data.budgetAuditLogs : [])
    },
    [loading]
  )

  return(
    <Grid container item style={{}}>
      <Grid container item justifyContent="flex-start" spacing={2}>
        {
          auditLog.map((obj) => {
            return(
              <Grid container item key={obj.id + "-audit-log"} direction="row" alignItems="center">
                <Grid container item xs={2} alignItems="center" justifyContent="center">
                  <Avatar 
                    src={obj.user.avatarThumbUrl ? obj.user.avatarThumbUrl : "/broken-image.jpg" }
                    size="small"
                  />
                </Grid>
                <Grid container item xs={10} direction="column" alignItems="flex-start" justifyContent="flex-start">
                  <Typography variant="subtitle2">{obj.user.firstName} {obj.user.lastName}</Typography>
                  <Typography variant="caption"> fecha: {getCurrentDate(obj)}</Typography>
                  <Typography variant="caption" className={classes.messageToLeft} dangerouslySetInnerHTML={createMarkup(obj)} >
                    
                  </Typography>
                </Grid>
              </Grid>
            )
          })
        }
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(AuditLog);
