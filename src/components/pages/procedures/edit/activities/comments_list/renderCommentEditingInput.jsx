import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';

const renderCommentEditingInput = (props) => {
  const { 
    classes, 
    commentValue, 
    error, 
    pristine, 
    updateCommentLoading, 
    editingComment, 
    changingInputComment 
  } = props

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

export default renderCommentEditingInput;
