import React, {useState, useEffect}        from 'react';
import Typography                          from '@material-ui/core/Typography';
import Grid                                from '@material-ui/core/Grid';
import Skeleton                            from '@material-ui/lab/Skeleton';
import { withStyles }                      from '@material-ui/core/styles';
import { styles }                          from '../../styles';
import Avatar                              from '@material-ui/core/Avatar';
import { useQuery }                        from '@apollo/client';
import { GET_BUDGETS_AUDITLOG }            from '../../queries_and_mutations/queries';

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
  const { budget } = props

  const [auditLog, setAuditlog] = useState();
  const [array] = useState([1,2,3,4,5,6,7,8,9]);

  const { loading, data } = useQuery(
    GET_BUDGETS_AUDITLOG, { 
      variables: { "budgetId": budget.id }
    }
  );
  
  useEffect(
    () => {
      data && setAuditlog(data ? data.budgetAuditLogs : []);
    },
    [loading, data]
  );

  return(
    <Grid container item>
      <Grid container item justifyContent="flex-start" spacing={2}>
        { loading || !auditLog ? array.map(
            (index) => {
              return(
                <Grid container item key={index + "-audit-log"} direction="row" alignItems="center">
                  <Grid item xs={1}>
                    <Skeleton variant="circle" width={40} height={40} />
                  </Grid>
                  <Grid item xs>
                    <Skeleton variant="rect" width="100%"/>
                    <Skeleton variant="rect" width="100%"/>
                  </Grid>
                </Grid>
              )
            }
        ) : (
          auditLog.map((obj) => {
            return(
              <Grid container item key={obj.id + "-audit-log"} direction="row" alignItems="center">
                <Grid container item xs={2} alignItems="center" justifyContent="flex-start">
                  <Avatar 
                    src={obj.user.avatarThumbUrl ? obj.user.avatarThumbUrl : "/broken-image.jpg" }
                    size="small"
                  />
                </Grid>
                <Grid container item xs={10} direction="row">
                  <Grid container item xs={6} justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="subtitle2" align='left'>{obj.user.firstName} {obj.user.lastName}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={6} justifyContent="flex-end">
                    <Grid item>
                      <Typography variant="caption" align='rigth'> Fecha: {getCurrentDate(obj)}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="caption" align='justify' dangerouslySetInnerHTML={createMarkup(obj)}/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
          })
        )}
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(AuditLog);
