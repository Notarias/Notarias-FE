import React from 'react'
import { withStyles }               from '@material-ui/core/styles';
import { styles }                   from '../styles';
import { useMutation }              from '@apollo/react-hooks';
import { DESTROY_COMMENT }          from '../../clients_queries_and_mutations/queries';
import { LOAD_CLIENT_COMMENTS}      from '../../clients_queries_and_mutations/queries';
import Dialog                       from '@material-ui/core/Dialog';
import DialogActions                from '@material-ui/core/DialogActions';
import DialogTitle                  from '@material-ui/core/DialogTitle';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';


const CurrentUserActive = (props) => {
  const{ comment, classes, currentUserData, setCommentValue, setCommentShowed, commentShowed } = props
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState(false)

  const inputsList = ["body"]

  const changingInputComment = () => {
    setCommentShowed(!commentShowed)
    setCommentValue(comment.body)
  }

  const [destroyCommentMutation, {loading: destroyCommentloading}] =
  useMutation(
    DESTROY_COMMENT,
    {
      onError(apolloError) {
        setErrors(apolloError)
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

  const destroyComment = (event) => {
    destroyCommentMutation({
      variables:{
        "id": comment.id 
      }
    })
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

  return(
    currentUserActive()
  )
}

export default withStyles(styles)(CurrentUserActive)