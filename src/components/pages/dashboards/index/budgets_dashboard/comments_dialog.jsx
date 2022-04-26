import React                          from 'react'
import Grid                           from '@material-ui/core/Grid';
import Dialog                         from '@material-ui/core/Dialog';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import DialogContent                  from '@material-ui/core/DialogContent';
import Card                           from '@material-ui/core/Card';
import CardHeader                     from '@material-ui/core/CardHeader';
import CardContent                    from '@material-ui/core/CardContent';
import Typography                     from '@material-ui/core/Typography';
import Avatar                         from '@material-ui/core/Avatar';
import Chip                           from '@material-ui/core/Chip';
import IconButton                     from '@material-ui/core/IconButton';
import Divider                        from '@material-ui/core/Divider';
import CloseIcon                      from '@material-ui/icons/Close';
import AccountCircleIcon              from '@material-ui/icons/AccountCircle';

const CommentsDialog = (props) => {
  const { budget, commentDialog, statsCommentDialog} = props
  
  const buildDate = (value, separator='/') => {
    let newDate = new Date(value)
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
  
    return (
      `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} - ${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
    )
  }
  
  return (
    <Dialog onClose={statsCommentDialog} aria-labelledby="comments-title" open={commentDialog}>
      <DialogTitle style={{ padding: '16px'}}>
        <Grid container item xs={12} justifyContent='flex-start' alignItems='center'>
          <Grid item xs={1}>
            {budget.asignee ?
              <Avatar aria-label={budget.asignee.firstName} src={budget.asignee.avatarThumbUrl}/>
            :
              <Avatar src={AccountCircleIcon}/>
            }
          </Grid>
          <Grid container item xs direction='row' justifyContent='center' alignItems='stretch' style={{paddingLeft: '15px'}}>
            <Grid item xs={12}>
              <Typography>
                <strong>{`Presupuesto: ${budget.budgetingTemplate.name}`}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {budget.asignee ?
                <Typography variant="body2">
                  {`Encargado: ${budget.asignee.firstName} ${budget.asignee.lastName}`}
                </Typography>
              :
                <Typography variant="body2">
                  {"Sin usuario asignado"}
                </Typography>
              }
            </Grid>
          </Grid>
          <Grid container item xs={1} justifyContent='center'>
            <Grid item>
              <IconButton aria-label="settings" color="secondary" onClick={statsCommentDialog}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        {
          budget.comments.map((comment) => {

            return(
              <Card variant="outlined" key={`${budget.budgetingTemplate.name}-${budget.id}`}>
                <CardHeader
                  avatar={
                    <Avatar src={ comment.user.avatarThumbUrl} size="small"/>
                  }
                  title={`${comment.user.firstName}  ${comment.user.lastName}`}
                  subheader={`Creado: ${buildDate(comment.createdAt)}`}
                  action={
                    comment.createdAt === comment.updatedAt ? 
                      <></>
                    :
                      <Chip 
                        label="Editado"
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{marginTop: "10px", marginRight: "7px"}}
                      />
                  }
                />
                <Divider variant="middle"/>
                <CardContent>
                  <Typography variant="body1" color="textSecondary" align="left">
                    {comment.body}
                  </Typography>
                </CardContent>
              </Card>
            )
          })
        }
      </DialogContent>
    </Dialog>
  )
}

export default CommentsDialog;
