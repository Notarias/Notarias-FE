import React                          from 'react'
import Grid                           from '@material-ui/core/Grid';
import Dialog                         from '@material-ui/core/Dialog';
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
  const { procedure, commentDialog, statsCommentDialog} = props
  
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
      <Grid style={{width: "500px"}}>
        <Card>
          <CardHeader
            avatar={procedure.asignee ?
              <Avatar aria-label={procedure.asignee.firstName} src={procedure.asignee.avatarThumbUrl}/>
            :
              <Avatar src={AccountCircleIcon}/>
            }
            action={
              <IconButton aria-label="settings" color="secondary" onClick={statsCommentDialog}>
                <CloseIcon />
              </IconButton>
            }
            title={
              <Typography>
                {<strong>{`Presupuesto: ${procedure.proceduresTemplate.name}`}</strong>}
              </Typography>
            }
            subheader={procedure.asignee ?
              <Typography variant="body2">
                {`Encargado: ${procedure.asignee.firstName} ${procedure.asignee.lastName}`}
              </Typography>
            :
              <Typography variant="body2">
                {"Sin usuario asignado"}
              </Typography>
            }
          />
          <Divider variant="middle"/>
          <CardContent>
            {
              procedure.comments.map((comment) => {

                return(
                  <Card variant="outlined" key={`${procedure.proceduresTemplate.name}-${procedure.id}`}>
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
          </CardContent>
        </Card>
      </Grid>
    </Dialog>
  )
}

export default CommentsDialog;
