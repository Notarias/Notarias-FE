import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Chip from '@material-ui/core/Chip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useMutation } from '@apollo/client';
import { GET_CLIENT_COMMENTS } from '../../clients_queries_and_mutations/queries';
import { UPDATE_COMMENT } from '../../clients_queries_and_mutations/queries';
import { DESTROY_COMMENT } from '../../clients_queries_and_mutations/queries';
import { GLOBAL_MESSAGE } from '../../../../../resolvers/queries';
import client from '../../../../../apollo';

const CommentEdit = (props) => {
  const { comment, clientInfo, currentUser } = props

  const [commentValue, setCommentValue] = useState(comment.body);
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [permitActions] = useState(currentUser.id === comment.user.id);

  const [updateCommentMutation] =
  useMutation(
    UPDATE_COMMENT,
    {
      onError(error) {
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "No puedes editar comentarios de otros usuarios.",
              type: "error",
              __typename: "globalMessage"
            }
          }
        })
      },
      onCompleted(cacheData) {
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "Comentario editado con exito.",
              type: "success",
              __typename: "globalMessage"
            }
          }
        })
        setEditStatus(false);
      },
      refetchQueries: [
        {
          query: GET_CLIENT_COMMENTS, 
            variables: {clientId: clientInfo.id, per: 100 }
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const [destroyCommentMutation] =
  useMutation(
    DESTROY_COMMENT,
    {
      onError(error) {
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "No puede borrar comentarios de otros usuarios.",
              type: "error",
              __typename: "globalMessage"
            }
          }
        })
      },
      onCompleted(cacheData) {
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "Comentario borrado con exito.",
              type: "success",
              __typename: "globalMessage"
            }
          }
        })
      },
      refetchQueries: [
        {
          query: GET_CLIENT_COMMENTS,
            variables: {clientId: clientInfo.id, per: 10 }
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
      variables: {
        "id": comment.id,
        "body": commentValue
      }
    })
    setAnchorEl(null)
  }

  const destroyComment = (event) => {
      destroyCommentMutation({
        variables:{
          "id": comment.id 
        }
      })
    closeDestroyConfirm();
    setAnchorEl(null)
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

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return(
    <>
      <Grid container direction="row" justifyContent='center' style={{paddingTop:'15px'}}>
        <Grid container item xs={12} justifyContent="flex-start" alignItems="flex-start">
          <Grid container item direction="row" justifyContent="flex-start" alignItems='center'>

            <Grid container item xs={2} sm={1} lg={1} justifyContent='flex-start'>
              <Avatar src={ comment.user.avatarThumbUrl} size="small"/>
            </Grid>
            <Grid container item xs sm lg={6} direction='column' >
              <Grid item>
                <Typography variant="subtitle2" align='left'>
                  {comment.user.firstName}  {comment.user.lastName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="primary" variant="body2" align="left">
                    {getCurrentDate(comment)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={2} sm lg justifyContent='flex-end'>
              {(comment.createdAt === comment.updatedAt) ? 
                <></>
                :
                <Chip 
                  label="Editado"
                  variant="outlined"
                  color="primary"
                  size='small'
                />
              }
            </Grid>
            { permitActions ?
              <Grid container item xs={2} sm={1} lg={1} justificontent='flex-end' style={{paddingLeft:'5px'}}>
                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu} >
                  <MoreVertIcon/>
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={closeMenu}
                >
                  <MenuItem onClick={editComment}>
                    <ListItemIcon>
                      <BorderColorIcon color="primary"/>
                    </ListItemIcon>
                    <Typography>
                      Editar
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={openDestroyConfirm}>
                    <ListItemIcon>
                      <DeleteForeverIcon color="secondary"/>
                    </ListItemIcon>
                    <Typography>
                      Eliminar
                    </Typography>
                  </MenuItem>
                </Menu>
              </Grid>
            :
              <></>
            }

          </Grid>
          <Grid container item xs={12} justifyContent="flex-start" style={{padding:'10px'}}>
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
              </>
            }
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={confirmDelete} onClose={closeDestroyConfirm}>
        <DialogContent>
          <DialogContentText>
            Confirme que desea eliminar este comentario.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={destroyComment} color="primary">
            Confirmar
          </Button>
          <Button onClick={closeDestroyConfirm} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CommentEdit;
