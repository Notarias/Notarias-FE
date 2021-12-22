import React, {useState}            from "react"
import Grid                         from '@material-ui/core/Grid';
import Avatar                       from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon                     from '@material-ui/icons/Send';
import ClearIcon                    from '@material-ui/icons/Clear';
import { withStyles }               from '@material-ui/core/styles';
import { styles }                   from '../../styles';
import { GET_CURRENT_USER }         from '../../../../../resolvers/queries';
import { useMutation, useQuery }    from '@apollo/client'
import { CREATE_COMMENT }           from '../../queries_and_mutations/queries';
import { GET_COMMENTABLE_COMMENTS } from '../../queries_and_mutations/queries';
import { GET_PROCEDURES_AUDITLOG }  from '../../queries_and_mutations/queries';


const CreateComments = (props) => {
  const { classes, procedure } = props;
  const [commentValue, setCommentValue] = useState("");
  const [showCancel, setShowCancel] = useState(false);
  const [showSendButton, setShowSendButton] = useState(true);
  const [error, setError] = useState(false);

  const inputsList = ["body"]

  const { loading, data, refetch } = useQuery(GET_CURRENT_USER);
  const [createCommentMutation, {loading: createCommentLoading}] =
    useMutation(
      CREATE_COMMENT,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        onCompleted(cacheData) {
          cancelComment()
          setCommentValue("")
        },
        refetchQueries: [
          {
            query: GET_COMMENTABLE_COMMENTS,
            variables: { "commentableType": "Procedure" , commentableId: procedure.id }
          },
          /* {
            query: GET_PROCEDURES_AUDITLOG,  
            variables: { "procedureId": procedure.id }
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

  const createNewComment = (event) => {
    createCommentMutation({
       variables:{
        "commentableId": procedure.id ,
        "commentableType": "procedure" , 
        "body": commentValue
       }
    })
  }

  const valueChange = (event) => {
    setCommentValue(event.target.value);
    setShowCancel(true);
    setShowSendButton(false);
  }

  const cancelComment = () => {
    setCommentValue("");
    setShowCancel(false);
    setShowSendButton(true);
  }

  const clearErrors = () => {
    setError(false)
  }

  return(
    <>
      <Grid container item direction="row" justifyContent="center" alignItems="center" style={{paddingLeft: "25px", paddingRight: "25px", marginBottom: "15px"}}>
        <Grid item xs={1} justifyContent="flex-start" alignItems="flex-start">
          <Grid item >
            {
              !loading && data &&
              <Avatar 
                src={data.currentUser.avatarThumbUrl} 
                className={classes.avatarInDialogToAddPayment}
                className={classes.avatarWithoutTopMargin}
              />
            }
          </Grid>
        </Grid>
        <Grid item xs={10} justifyContent="flex-start" alignItems="flex-start">
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              id="comment_field"
              value={commentValue}
              onChange={valueChange}
              size="small"
              placeholder="Agregar un comentario"
              variant="outlined"
              multiline
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="cancel_comment"
                    onClick={cancelComment}
                    edge="end"
                  >
                    {showCancel ? <ClearIcon/> : ""}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={0}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1} direction="row" justifyContent="center" alignItems="center">
          <IconButton 
            onClick={createNewComment}
            disabled={showSendButton}
          >
            <SendIcon/>
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(CreateComments);
