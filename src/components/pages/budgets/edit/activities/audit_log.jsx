import React, {useState, useEffect}        from 'react';
import Typography               from '@material-ui/core/Typography';
import Grid                     from '@material-ui/core/Grid';
import { withStyles }           from '@material-ui/core/styles';
import { styles }               from '../../styles';
import Avatar                   from '@material-ui/core/Avatar';
import { useQuery }             from '@apollo/react-hooks';
import { GET_BUDGETS_AUDITLOG } from '../../queries_and_mutations/queries';

const AuditLog = (props) => {
  const { budgetId, classes } = props

  const { loading, data , refetch } = useQuery(
    GET_BUDGETS_AUDITLOG, { variables: {"budgetId": budgetId} }
  );

  const [auditLog, setAuditlog] = React.useState(data ? data.budgetAuditLogs : [])

  useEffect(
    () => {
      setAuditlog(data ? data.budgetAuditLogs : [])
    },
    [data]
  )


  return(
    <Grid className={classes.uditLogGrid}>
      {
        auditLog.map((obj) => {
          const getCurrentDate = (separator='/') => {
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

            function createMarkup() {
              return {__html: obj.message};
            }

          return(
            <React.Fragment key={obj.id + "fragment"}>
              <Grid container direction="row" alignItems="center" className={classes.topMarginGrid}>
                <Grid container item xs={2} alignItems="center" justifyContent="center">
                  <Avatar 
                    src={obj.user.avatarThumbUrl ? obj.user.avatarThumbUrl : "/broken-image.jpg" }
                    size="small"
                  />
                </Grid>
                <Grid container item xs={10} direction="column" alignItems="flex-start" justifyContent="flex-start">
                  <Typography variant="subtitle2">{obj.user.firstName} {obj.user.lastName}</Typography>
                  <Typography variant="caption"> fecha: {getCurrentDate()}</Typography>
                  <Typography variant="caption" className={classes.messageToLeft} dangerouslySetInnerHTML={createMarkup()} >
                    
                  </Typography>
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
