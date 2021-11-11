import React, {useState}            from "react"
import TextField                    from '@material-ui/core/TextField';
import Grid                         from '@material-ui/core/Grid';
import { withStyles }               from '@material-ui/core/styles';
import { styles }                   from '../../styles';
import Avatar                       from '@material-ui/core/Avatar';
import Button                       from '@material-ui/core/Button';
import { GET_CURRENT_USER }         from '../../../../../resolvers/queries';
import { useMutation }              from '@apollo/client'
import { CREATE_COMMENT }           from '../../queries_and_mutations/queries';
import { GET_COMMENTABLE_COMMENTS } from '../../queries_and_mutations/queries';
import { GET_BUDGETS_AUDITLOG }     from '../../queries_and_mutations/queries';


const CreateComments = (props) => {
  const { classes, budgetId } = props
  const [textFieldSelected, setTextFieldSelected] = React.useState(false)
  const [commentValue, setCommentValue] = React.useState("")
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = useState(false)

  const inputsList = ["body"]

  const [createCommentMutation, {loading: createCommentLoading}] =
  useMutation(
    CREATE_COMMENT,
    {
      onError(apolloError) {
        setErrors(apolloError)
        setPristine(true)
      },
      onCompleted(cacheData) {
        handleCancel()
      },
      refetchQueries: [
        {
          query: GET_COMMENTABLE_COMMENTS,
          variables: {"commentableType": "Budget" , commentableId: budgetId }
        },
        {
          query: GET_BUDGETS_AUDITLOG,  
            variables: {"budgetId": budgetId }
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

  const createNewComment = (event) => {
    createCommentMutation({
       variables:{
        "commentableId": budgetId ,
        "commentableType": "budget" , 
        "body": commentValue
       }
    })
  }

  const renderTextField = () => {
    if(textFieldSelected) {
      return(
        <Grid container item xs={10} direction="row" justifyContent="flex-start" alignItems="flex-start">
          <TextField
            value={commentValue}
            onChange={valueChange}
            onFocus={clearErrors}
            autoFocus
            fullWidth
            placeholder="Agregar un comentario"
            variant="outlined"
            error={ !!error["body"] && true }
            helperText={error["body"] || " "}
            errorskey={ "body" }
            multiline
          />
          <Button onClick={ handleCancel }>Cancelar</Button>
          <Button 
            onClick={ createNewComment }
            disabled={pristine || createCommentLoading}
          >
            Aceptar
          </Button>
        </Grid>
      )
    } else {
      return(
        <Grid container item xs={10} direction="row" justifyContent="flex-start" alignItems="flex-start">
          <TextField
            value={commentValue}
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

  const valueChange = (event) => {
    setCommentValue(event.target.value)
    setPristine(false)
  }

  const changeTextField = () => {
    setTextFieldSelected(true)
  }

  const handleCancel = () => {
    setTextFieldSelected(false)
    setPristine(true)
    setCommentValue("")
  }

  const clearErrors = () => {
    setError(false)
  }


  return(
    <>
      <Grid container item xs={2} justifyContent="center" alignItems="flex-start">
        {/* <Query
        query={GET_CURRENT_USER}
        >
          {({id, loading, error, data}) => {
              return(
                <Grid container justifyContent="center">
                  <Avatar 
                    src={data && data.currentUser && data.currentUser.avatarThumbUrl} 
                    className={classes.avatarInDialogToAddPayment}
                    className={classes.avatarWithoutTopMargin}
                  />
                </Grid>
              )
            }
          }
        </Query> */}
      </Grid>
      {renderTextField()}
    </>
  )
}

export default withStyles(styles)(CreateComments);
