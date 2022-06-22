import React, {useState}            from "react"
import Grid                         from '@material-ui/core/Grid';
import Avatar                       from '@material-ui/core/Avatar';
import TextField                    from '@material-ui/core/TextField';
import InputAdornment               from '@material-ui/core/InputAdornment';
import IconButton                   from '@material-ui/core/IconButton';
import CancelIcon                   from '@material-ui/icons/Cancel';
import SaveIcon                     from '@material-ui/icons/Save';
import { useMutation, useQuery }    from '@apollo/client'
import { GET_CURRENT_USER }         from '../../../../resolvers/queries';
import { CREATE_COMMENT }           from '../clients_queries_and_mutations/queries';
import { GET_CLIENT_COMMENTS }      from '../clients_queries_and_mutations/queries';

const ClientCommentInput = (props) => {
  const { clientInfo } = props;
  const [commentValue, setCommentValue] = useState("");
  const [pristine, setPristine] = useState(true);

  const { loading, data } = useQuery(GET_CURRENT_USER);
  const [createCommentMutation] =
    useMutation(
      CREATE_COMMENT,
      {
        onCompleted() {
          cancelComment()
          setCommentValue("")
        },
        refetchQueries: [
          {
            query: GET_CLIENT_COMMENTS,
            variables: { clientId: clientInfo.id, per: 2000 }
          }
        ],
        awaitRefetchQueries: true
      }
    )

  const createNewComment = () => {
    createCommentMutation({
       variables:{
        "commentableId": clientInfo.id ,
        "commentableType": "client" , 
        "body": commentValue
       }
    })
  }

  const valueChange = (event) => {
    setCommentValue(event.target.value);
    setPristine(false);
  }

  const cancelComment = () => {
    setCommentValue("");
    setPristine(true);
  }

  return(
    <Grid container item direction='row' alignItems='center'>
      <Grid item xs={2} sm={1}>
        {
          !loading && data &&
          <Avatar 
            src={data.currentUser.avatarThumbUrl} 
          />
        }
      </Grid>
      <Grid item xs={pristine ? 10 : 8} sm={pristine ? 11 : 10}>
        <TextField
          name="client-comment"
          label='Escribir Comentario'
          variant="outlined"
          size="small"
          fullWidth
          value={commentValue}
          onChange={valueChange}
          InputProps={{
            endAdornment: 
              <InputAdornment position="end">
                <IconButton
                  aria-label="cancel_comment"
                  onClick={cancelComment}
                  disabled={pristine}
                  edge="end"
                  color='secondary'
                >
                  { pristine ? "" : <CancelIcon/> }
                </IconButton>
              </InputAdornment>,
          }}
        />
      </Grid>
      {pristine ?
        ""
      :
        <Grid item xs={2} sm={1}>
          <IconButton
            onClick={createNewComment}
            disabled={pristine}
            color='primary'
          >
            <SaveIcon/>
          </IconButton>
        </Grid>
      }
    </Grid>
  )
}

export default ClientCommentInput;
