import React, { useState }          from 'react'
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useMutation }              from '@apollo/client';
import { UPDATE_COMMENT }           from '../../../queries_and_mutations/queries';
import { GET_COMMENTABLE_COMMENTS } from '../../../queries_and_mutations/queries';
import { DESTROY_COMMENT }          from  '../../../queries_and_mutations/queries';
import { GET_BUDGETS_AUDITLOG }     from '../../../queries_and_mutations/queries';

const CommentEdit = (props) => {
  const { comment, budget } = props

  const [commentValue, setCommentValue] = useState(comment.body);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [error, setError] = useState(false);

  const inputsList = ["body"]

  const [updateCommentMutation, {loading: updateCommentLoading}] =
  useMutation(
    UPDATE_COMMENT,
    {
      onError(apolloError) {
        setErrors(apolloError);
      },
      onCompleted(cacheData) {
        setEditStatus(false);
        setError(false);
      },
      refetchQueries: [
        {
          query: GET_COMMENTABLE_COMMENTS, variables: {"commentableType": "Budget" , commentableId: budget.id }
        },
        {
          query: GET_BUDGETS_AUDITLOG, variables: { "budgetId": budget.id }
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

  const [destroyCommentMutation, {loading: destroyCommentloading}] =
  useMutation(
    DESTROY_COMMENT,
    {
      onCompleted(cacheData) {
      },
      refetchQueries: [
        {
          query: GET_COMMENTABLE_COMMENTS, variables: {"commentableType": "Budget" , commentableId: budget.id }
        },
        {
          query: GET_BUDGETS_AUDITLOG, variables: {"budgetId": budget.id}
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const getCurrentDate = (comment, separator='/') => {
    let newDate = new Date(Date.parse(comment.createdAt))
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
  
    return (
      `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} -
        ${hours}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
    )
  }

  const updateComment = (event) => {
    updateCommentMutation({
      variables:{
        "id": comment.id ,
        "body": commentValue
      }
    })
  }

  const destroyComment = (event) => {
      destroyCommentMutation({
        variables:{
          "id": comment.id 
        }
      })
  }

  const onChangeCommentInput = (event) => {
    setCommentValue(event.target.value)
  }

  const editComment = () => {
    setCommentValue(comment.body);
    setEditStatus(true);
  }

  const cancelEdit = () => {
    setCommentValue(comment.body);
    setEditStatus(false);
  }

  const openDestroyConfirm = () => {
    setConfirmDelete(true);
  };

  const closeDestroyConfirm = () => {
    setConfirmDelete(false);
  };

  return(
    <>
      <Grid container direction="row" spacing={2}>
        <Grid container item xs={1}  justifyContent="center" alignItems="flex-start">
          <Avatar src={ comment.user.avatarThumbUrl} size="small"/>
        </Grid>

        <Grid container item xs={9} justifyContent="flex-start" alignItems="flex-start">
          <Grid container item direction="row" spacing={2} justifyContent="flex-start">
            <Grid container item xs={4} justifyContent="flex-start">
              <Grid item>
                <Typography variant="subtitle2">
                  {comment.user.firstName}  {comment.user.lastName}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={8} justifyContent="flex-start">
              <Grid item>
                <Typography color="primary" variant="body2" align="left">
                    {`Creado: ${getCurrentDate(comment)}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12} justifyContent="flex-start">
            { editStatus ?
              <>
                <Grid container item xs={12} justifyContent="flex-start">
                  <TextField 
                    id={comment.id}
                    value={ commentValue } 
                    variant="outlined" 
                    size="small"
                    onChange={ onChangeCommentInput }
                    multiline
                    fullWidth
                  />
                </Grid>
                <Grid container item direction="row" xs={12} justifyContent="flex-start">
                  <Grid item>
                    <IconButton onClick={cancelEdit} color="secondary">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={updateComment} color="primary">
                      <SaveIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </>
            :
              <>
                <Grid container item xs={12} justifyContent="flex-start">
                  <Grid item>
                    <Typography variant="body2" align="justify">
                      {comment.body}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item direction="row" xs={12} justifyContent="flex-start">
                  <Grid item>
                    <Button color="primary" onClick={editComment}>
                      Editar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button color="secondary" onClick={openDestroyConfirm}>
                      Eliminar
                    </Button>
                  </Grid>
              </Grid>
            </>
            }
          </Grid>
        </Grid>
        <Grid container item xs={2} justifyContent="flex-end">
          <Grid item>
            {(comment.createdAt === comment.updatedAt) ? 
              <></>
              :
              <Chip 
                label="Editado"
                variant="outlined"
                color="primary"
                style={{marginRight: '5px'}}
              />
            }
          </Grid>
        </Grid>
      </Grid>
      <Divider style={{margin: 5}}/>
      <Dialog open={confirmDelete} onClose={closeDestroyConfirm}>
        <DialogTitle>
          Mensaje de Confirmacion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea eliminar este comentario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={destroyComment}>
            Confirmar
          </Button>
          <Button onClick={closeDestroyConfirm}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withStyles(styles)(CommentEdit);
