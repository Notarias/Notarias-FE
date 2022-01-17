import React, { useEffect}          from 'react'
import { withStyles }               from '@material-ui/core/styles';
import { styles }                   from '../styles';
import { Avatar, Grid }             from '@material-ui/core';
import List                         from '@material-ui/core/List';
import ListItem                     from '@material-ui/core/ListItem';
import ListItemText                 from '@material-ui/core/ListItemText';
import Paper                        from '@material-ui/core/Paper';
import TextField                    from '@material-ui/core/TextField';
import { LOAD_CLIENT_COMMENTS}      from '../../clients_queries_and_mutations/queries';
import { useQuery }                 from '@apollo/client';
import Button                       from '@material-ui/core/Button';
import { useMutation }              from '@apollo/client'
import { CREATE_COMMENT }           from '../../clients_queries_and_mutations/queries';
import ClientComment                from './client_comment'
import { GET_CURRENT_USER }         from '../../clients_queries_and_mutations/queries';

const ClientComments = (props) => {
  const {classes, match } = props
  const [textFieldSelected, setTextFieldSelected] = React.useState(false)
  const [commentValue, setCommentValue] = React.useState("")
  const [pristine, setPristine] = React.useState(true)

  const { data: clientCommentsData } = useQuery(LOAD_CLIENT_COMMENTS, { 
                                         variables: { "clientId": Number(match.params.id), "page": 1, "per": 100 }
                                       })

  const { data: currentUserData } = useQuery(
    GET_CURRENT_USER
  );

  const [clientComments, setClientComments] = React.useState([])

  useEffect(() => {
    clientCommentsData && setClientComments(clientCommentsData.clientComments)
  }, [clientCommentsData])


  const [createCommentMutation, {loading: createCommentLoading}] =
  useMutation(
    CREATE_COMMENT,
    {
      onError() {
        setPristine(true)
      },
      onCompleted(cacheData) {
        handleCancel()
      },
      refetchQueries: [
        {
          query: LOAD_CLIENT_COMMENTS,
          variables: { "clientId": Number(match.params.id), "page": 1, "per": 100 }
        },
      ],
      awaitRefetchQueries: true
    }
  )

  const createNewClientComment = (event) => {
    createCommentMutation({
       variables:{
        "commentableId": match.params.id,
        "commentableType": "client" , 
        "body": commentValue
       }
    })
  }

  
  const changeTextField = () => {
    setTextFieldSelected(true)
  }

  const handleCancel = () => {
    setTextFieldSelected(false)
    setPristine(true)
    setCommentValue("")
  }

  const valueChange = (event) => {
    setCommentValue(event.target.value)
    setPristine(false)
  }

  const renderTextField = () => {
    if(textFieldSelected) {
      return(
        <Grid container item xs={10} direction="row" justifyContent="flex-start" alignItems="flex-start">
          <TextField
            value={commentValue}
            onChange={valueChange}
            autoFocus
            fullWidth
            placeholder="Agregar un comentario"
            variant="outlined"
            multiline
          />
          <Button onClick={ handleCancel }>Cancelar</Button>
          <Button 
            disabled={pristine || createCommentLoading}
            onClick={createNewClientComment}
          >
            Aceptar
          </Button>
        </Grid>
      )
    } else {
      return(
        <Grid container item xs={10} direction="row" justifyContent="flex-start" alignItems="flex-start">
          <TextField
            fullWidth
            size="small"
            onFocus={changeTextField}
            placeholder="Agregar un comentario"
            variant="outlined"
          />
        </Grid>
      )
    }
  }

  return(
    <Paper className={classes.paperComments} >
      <List>
        <ListItem>
          <Grid  container item xs={12} direction="column">
            <Grid container item direction="row" justifyContent="center" alignItems="flex-start">
              <Avatar className={classes.avatarImageDefault}
                src={(currentUserData && currentUserData.currentUser && currentUserData.currentUser.avatarThumbUrl)
                   || "/broken-image.jpg" }
              />
              {renderTextField()}
            </Grid>
            <Grid container item xs={12} direction="column" className={classes.gridsMarginRight}>
              <Grid container item xs={12}>
                <ListItemText>Comentarios</ListItemText>
              </Grid>
              <Grid container item xs={12}>
                {clientComments.map((comment) => {
                  return(
                    <ClientComment
                      key={comment.id + "comment-edit"}
                      comment={comment}
                      currentUserData={currentUserData.currentUser}
                    />
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Paper>
  )
}

export default withStyles(styles)(ClientComments);
