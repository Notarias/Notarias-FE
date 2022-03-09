import React                          from 'react'
import Grid                           from '@material-ui/core/Grid';
import Dialog                         from '@material-ui/core/Dialog';
import Card                           from '@material-ui/core/Card';
import CardHeader                     from '@material-ui/core/CardHeader';
import CardContent                    from '@material-ui/core/CardContent';
import Typography                     from '@material-ui/core/Typography';
import Avatar                         from '@material-ui/core/Avatar';
import IconButton                     from '@material-ui/core/IconButton';
import Divider                        from '@material-ui/core/Divider';
import CloseIcon                      from '@material-ui/icons/Close';

const CommentsDialog = (props) => {
  const { comment, commentDialog, statsCommentDialog } = props

  return (
    <Dialog onClose={statsCommentDialog} aria-labelledby="comments-title" open={commentDialog}>
      <Grid style={{width: "500px"}}>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="asignee" src={comment.user.avatarThumbUrl}/>
            }
            action={
              <IconButton aria-label="settings" color="secondary" onClick={statsCommentDialog}>
                <CloseIcon />
              </IconButton>
            }
            title={
              <Typography variant='h6'>
                {comment.commentableType}
              </Typography>
            }
            subheader={
              <Typography variant="body2">
                {`Encargado: ${comment.user.fullName}`}
              </Typography>
            }
          />
          <Divider variant="middle"/>
          <CardContent>
            <Typography variant="body1" color="textSecondary" align="left">
              {comment.body}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Dialog>
  )
}

export default CommentsDialog;
