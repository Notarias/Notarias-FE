import React, {useEffect}           from 'react'
import { withStyles }               from '@material-ui/core/styles';
import { styles }                   from '../styles';
import Avatar                       from '@material-ui/core/Avatar';
import Typography                   from '@material-ui/core/Typography';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';
import TextField                    from '@material-ui/core/TextField';
import { useMutation }              from '@apollo/react-hooks';
import { UPDATE_COMMENT }           from '../../clients_queries_and_mutations/queries';
import { LOAD_CLIENT_COMMENTS}      from '../../clients_queries_and_mutations/queries';
import Link                         from '@material-ui/core/Link';
import { DESTROY_COMMENT }          from '../../clients_queries_and_mutations/queries';
import Dialog                       from '@material-ui/core/Dialog';
import DialogActions                from '@material-ui/core/DialogActions';
import DialogTitle                  from '@material-ui/core/DialogTitle';


const ClientComments = (props) => {
  const { classes, comment, currentUserData} = props

  const [commentValue, setCommentValue] = React.useState(comment.body)
  const [commentShowed, setCommentShowed] = React.useState(true)
  const [open, setOpen] = React.useState(false)
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = React.useState(false)

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
          query: LOAD_CLIENT_COMMENTS,
          variables: { "clientId": Number(comment.user.id), "page": 1, "per": 100 }
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

  const [destroyCommentMutation, {loading: destroyCommentloading}] =
  useMutation(
    DESTROY_COMMENT,
    {
      onError(apolloError) {
        setErrors(apolloError)
        setPristine(true)
      },
      onCompleted(cacheData) {
      },
      refetchQueries: [
        {
          query: LOAD_CLIENT_COMMENTS,
          variables: { "clientId": Number(comment.commentableId), "page": 1, "per": 100 }
        },
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

  const currentUserActive = () => {
    if(currentUserData.id === comment.user.id) {
      return(
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
            onClick={handleClickOpen}
          >
            Eliminar
          </a>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Se eliminará este comentario
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>
                Cancelar
              </Button>
              <Button 
                onClick={destroyComment} 
                disabled={destroyCommentloading}
              >
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      ) 
    } else {
      return(
        ""
      )
    }
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
            errorskey={ "body" }
          />
        </Grid>
        <Grid container item justifyContent="flex-start" >
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
            disabled={pristine || updateCommentLoading}
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
            {comment.body}
          </Typography>
        </Grid>
        {currentUserActive()}
      </Grid>
    )
  }


  return(
    <Grid container className={classes.gridCommentsContainer}>
      <Grid container item xs={2}  justifyContent="center" alignItems="flex-start" className={classes.avatarComment}>
        <Avatar src={ comment.user.avatarThumbUrl} size="small" />
      </Grid>
      <Grid container direction="column" item xs={10} justifyContent="flex-start" alignItems="flex-start">
        <Grid container item>
        <Typography variant="subtitle2">
          {comment.user.firstName}  {comment.user.lastName}
        </Typography>
        </Grid>
        {commentShowed ? renderTextComment() : renderCommentEditingInput()}
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(ClientComments);
