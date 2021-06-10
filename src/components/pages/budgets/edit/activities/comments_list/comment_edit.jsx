import React, {useEffect} from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../../styles';
import Avatar                               from '@material-ui/core/Avatar';
import Typography                           from '@material-ui/core/Typography';
import Grid                                 from '@material-ui/core/Grid';
import Button                               from '@material-ui/core/Button';
import TextField                            from '@material-ui/core/TextField';
import { useMutation }                      from '@apollo/react-hooks';
import { UPDATE_COMMENT }                   from '../../../queries_and_mutations/queries';
import { GET_COMMENTABLE_COMMENTS } from '../../../queries_and_mutations/queries';
import Link from '@material-ui/core/Link';

const CommentEdit = (props) => {
  const { classes, comment, budgetId } = props
  let body = comment.body

  const [commentValue, setCommentValue] = React.useState(comment.body)
  const [commentShowed, setCommentShowed] = React.useState(true)
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = React.useState(false)

  const inputsList = ["body"]

  const [updateCommentMutation, updateCommentProcessInfo] =
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
          variables: {"commentableType": "Budget" , commentableId: budgetId }
        },
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

  const changingInputComment = () => {
    setCommentShowed(!commentShowed)

  }

  const editingComment = (event) => {
    setCommentValue(event.target.value)
    setPristine(false)
  }

  const renderCommentEditingInput = (body) => {
    return (

        <Grid container item direction="column" >
          <Grid item className={classes.commentEditingInputGrid}>
            <TextField
              value={commentValue}
              onChange={editingComment}
              autoFocus
              size="small"
              fullWidth
              variant="outlined"
              multiline
              error={ !!error["body"] && true }
              helperText={error["body"] || " "}
              errorskey={ "body" }
            />
          </Grid>
          <Grid container item justify="flex-start" >
            <Link
              component="button"
              size="small"
              variant="body2"
              onClick={changingInputComment}
              className={classes.buttonTextComments}
              color="textPrimary"
            >
              Cancelar
            </Link>
            <Link
              component="button"
              size="small"
              variant="body2"
              onClick={updateComment}
              disabled={pristine}
              className={ pristine ? classes.buttonTextCommentsDisabled : classes.buttonTextComments }
            >
              Aceptar
            </Link>
          </Grid>
        </Grid>
    )
  }

  const renderTextComment = (body) => {
    return(
      <Grid>
        <Grid container item className={classes.commentEditingInputGrid}>
          <Typography variant="caption" align="left">
            {commentValue}
          </Typography>
        </Grid>
        <Grid container item>
          <a
            href="#"
            onClick={changingInputComment}
            className={classes.buttonTextComments}
          >
            Editar
          </a>
          <a
            href="#"
            className={classes.buttonTextComments}
          >
            Eliminar
          </a>
        </Grid>
      </Grid>
    )
  }

  return(
    <React.Fragment key={comment.id + "fragment-Comment"}>
      <Grid container className={classes.fragmentComments}>
        <Grid container item xs={2}  justify="center" alignItems="flex-start">
          <Avatar src={ comment.user.avatarThumbUrl} size="small"/>
        </Grid>
        <Grid container direction="column" item xs={10} justify="flex-start" alignItems="flex-start">
          <Grid container item>
          <Typography variant="subtitle2">
            {comment.user.firstName}  {comment.user.lastName}
          </Typography>
          </Grid>
          {commentShowed ? renderTextComment() : renderCommentEditingInput()}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default withStyles(styles)(CommentEdit);
