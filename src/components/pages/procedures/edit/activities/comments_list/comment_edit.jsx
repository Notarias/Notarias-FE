import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMutation } from '@apollo/client';
import { UPDATE_COMMENT } from '../../../queries_and_mutations/queries';
import { GET_COMMENTABLE_COMMENTS } from '../../../queries_and_mutations/queries';
import { DESTROY_COMMENT } from '../../../queries_and_mutations/queries';
import { GET_PROCEDURES_AUDITLOG } from '../../../queries_and_mutations/queries';

const CommentEdit = (props) => {
  const { classes, comment, procedure } = props
  let body = comment.body

  const [commentValue, setCommentValue] = useState(comment.body)
  const [commentShowed, setCommentShowed] = useState(true)
  const [open, setOpen] = useState(false)
  const [pristine, setPristine] = useState(true)
  const [error, setError] = useState(false)

  const inputsList = ["body"]

  const [updateCommentMutation, {loading: updateCommentLoading}] =
  useMutation(
    UPDATE_COMMENT,
    {
      onError(apolloError) {
        setErrors(apolloError)
        setPristine(true)
      },
      onCompleted(cacheData) {
        setCommentShowed(true)
        setPristine(true)
        setError(false)
      },
      refetchQueries: [
        {
          query: GET_COMMENTABLE_COMMENTS,
          variables: {"commentableType": "Tramites" , commentableId: procedure.id }
        },
        {
          query: GET_PROCEDURES_AUDITLOG,  
            variables: { "procedureId": procedure.id }
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const setErrors = (apolloError) => {
    let errorsList = {}
    let errorTemplateList = apolloError.graphQLErrors
    for ( let i = 0; i < errorTemplateList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorTemplateList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorTemplateList[i].message
        }
      }
    }
    setError(errorsList)
  }

  const updateComment = (event) => {
    !pristine && (
      updateCommentMutation({
        variables:{
          "id": comment.id ,
          "body": commentValue
        }
      })
    )
  }

  const [destroyCommentMutation, {loading: destroyCommentloading}] =
  useMutation(
    DESTROY_COMMENT,
    {
      onError(apolloError) {
        // setErrors(apolloError)
        // setPristine(true)
      },
      onCompleted(cacheData) {
      },
      refetchQueries: [
        {
          query: GET_COMMENTABLE_COMMENTS,
          variables: {"commentableType": "Tramites" , commentableId: procedure.id }
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const destroyComment = (event) => {
      destroyCommentMutation({
        variables:{
          "id": comment.id 
        }
      })
  }

  const changingInputComment = () => {
    setCommentShowed(!commentShowed)
    setCommentValue(comment.body)
    setPristine(true)
  }

  const editingComment = (event) => {
    setCommentValue(event.target.value)
    setPristine(false)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <React.Fragment key={comment.id + "fragment-Comment"}>
      <Grid container className={classes.fragmentComments}>
        <Grid container item xs={2}  justifyContent="center" alignItems="flex-start">
          <Avatar src={ comment.user.avatarThumbUrl} size="small"/>
        </Grid>
        <Grid container direction="column" item xs={10} justifyContent="flex-start" alignItems="flex-start">
          <Grid container item>
          <Typography variant="subtitle2">
            {comment.user.firstName}  {comment.user.lastName}
          </Typography>
          </Grid>
          {
            commentShowed ? 
            <renderTextComment
              classes={classes}
              comment={comment}
              open={open}
              changingInputComment={changingInputComment}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              destroyComment={destroyComment}
              destroyCommentloading={destroyCommentloading}
            /> 
            : 
            <renderCommentEditingInput
              classes={classes}
              commentValue={commentValue}
              error={error}
              pristine={pristine}
              updateCommentLoading={updateCommentLoading}
              editingComment={editingComment}
              changingInputComment={changingInputComment}
            />
          }
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default withStyles(styles)(CommentEdit);
