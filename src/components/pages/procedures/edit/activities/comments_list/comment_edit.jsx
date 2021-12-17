import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import Chip from '@material-ui/core/Chip';

import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClearIcon from '@material-ui/icons/Clear';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { useMutation } from '@apollo/client';
import { UPDATE_COMMENT } from '../../../queries_and_mutations/queries';
import { GET_COMMENTABLE_COMMENTS } from '../../../queries_and_mutations/queries';
import { DESTROY_COMMENT } from '../../../queries_and_mutations/queries';
import { GET_PROCEDURES_AUDITLOG } from '../../../queries_and_mutations/queries';

const CommentEdit = (props) => {
  const { classes, comment, procedure } = props
  let body = comment.body

  const [commentValue, setCommentValue] = useState(comment.body);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [error, setError] = useState(false);

  const inputsList = ["body"]

  const [updateCommentMutation, {loading: updateCommentLoading},refetch] =
  useMutation(
    UPDATE_COMMENT,
    {
      onError(apolloError) {
        setErrors(apolloError)
      },
      onCompleted(cacheData) {
        setEditStatus(false);
        setError(false)
      },
      refetchQueries: [
        {
          query: GET_COMMENTABLE_COMMENTS, variables: {"commentableType": "Procedure" , commentableId: procedure.id }
        },
        /* {
          query: GET_PROCEDURES_AUDITLOG, variables: { "procedureId": procedure.id }
        } */
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

  /* const updateComment = (event) => {
    !pristine && (
      updateCommentMutation({
        variables:{
          "id": comment.id ,
          "body": commentValue
        }
      })
    )
  } */

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
            variables: {"commentableType": "Procedure" , commentableId: procedure.id }
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
      `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}-
        ${hours}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
    )
  }
  
  const updateComment = (event) => {
    updateCommentMutation({
      variables: {
        "id": comment.id,
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
      closeDestroyConfirm();
  }

  const onChangeCommentInput = (event) => {
    setCommentValue(event.target.value)
  }

  const openMenu = ( event ) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  }

  const closeMenu = () => {
    setMenuState(false);
    setAnchorEl(null);
  }

  const editComment = () => {
    setCommentValue(comment.body);
    setEditStatus(true);
    closeMenu();
  }

  const cancelEdit = () => {
    setCommentValue(comment.body);
    setEditStatus(false);
  }

  const openDestroyConfirm = () => {
    setConfirmDelete(true);
    closeMenu();
  };

  const closeDestroyConfirm = () => {
    setConfirmDelete(false);
  };

  return(
    <>
      <Grid container item
        key={comment.id + 'group-row'}
        style={{ flex: '1 1 auto' }}
        direction='column'
        alignItems="stretch"
        justifyContent="flex-start"
      >
        <Card>
          <CardHeader
            avatar={
              <Avatar src={ comment.user.avatarThumbUrl} size="small"/>
            }
            title={
              <Typography align="left">
                {`${comment.user.firstName}  ${comment.user.lastName}`}
              </Typography>
            }
            subheader={
              <Typography color="primary" variant="body2" align="left">
                {`Creado: ${getCurrentDate(comment)}`}
              </Typography> 
            }
            action={
              <>
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
                <IconButton aria-label="settings" onClick={openMenu}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={menuState}
                  onClose={closeMenu}
                >
                  <MenuItem onClick={editComment}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>
                      Editar
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={openDestroyConfirm}>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>
                      Eliminar
                    </Typography>
                  </MenuItem> 
                </Menu>
              </>
            }
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary" align="left">
              { editStatus ?
                <>
                  <TextField 
                    id={comment.id}
                    value={ commentValue } 
                    variant="outlined" 
                    size="small"
                    onChange={ onChangeCommentInput }
                    multiline
                    fullWidth
                  />
                  <IconButton onClick={cancelEdit} color="secondary">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={updateComment} color="primary">
                    <SaveIcon fontSize="small" />
                  </IconButton>
                </>
              :
                comment.body
              }
            </Typography>
          </CardContent>
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
        </Card>
      </Grid>
    </>
  )
}

export default withStyles(styles)(CommentEdit);
