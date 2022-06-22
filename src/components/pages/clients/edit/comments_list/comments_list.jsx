import React, { useState, useEffect }       from 'react'
import Grid                                 from '@material-ui/core/Grid';
import Divider                              from '@material-ui/core/Divider';
import CommentEdit                          from './comment_edit';
import LoadingComments                      from './loading_comments';
import { useQuery }                         from '@apollo/client';
import { GET_CURRENT_USER }                 from '../../clients_queries_and_mutations/queries';
import { GET_CLIENT_COMMENTS }              from '../../clients_queries_and_mutations/queries'

const CommentsList = (props) => {
  const { clientInfo } = props

  const [array] = useState([1,2,3,4,5,6]);
  const [currentUser, setCurrentUser] = useState()
  const [comments, setComments] = useState([]);


  const { data: currentUserData } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    setCurrentUser(currentUserData && currentUserData.currentUser)
  }, [currentUserData])

  const { loading, data } = useQuery(
    GET_CLIENT_COMMENTS, { variables: { clientId: clientInfo.id, per: 200 }, fetchPolicy: "cache-and-network" }
  );

  useEffect(() => {
    setComments(data && data.clientComments)
  }, [loading, data])

  return(
    <>
      <Grid item xs={12} style={{paddingTop:'5px', paddingBottom:'10px'}}>
        <Divider variant='middle'/>
      </Grid>
      <Grid container item xs={12} direction="row" justifyContent='center' spacing={3} style={{paddingTop:'10px'}}>
        { loading || !data.clientComments ? array.map(
            (index) => {
              return(
                <LoadingComments key={index + "commentLoading"}/>
              )
            }
        ) : (
          comments && comments.map((comment) => {
            return(
              <CommentEdit
                key={`client-comment-${comment.id}`}
                comment={comment}
                setComments={setComments}
                clientInfo={clientInfo}
                currentUser={currentUser}
              />
            )
          })
        )}
      </Grid>
    </>
  )
}

export default CommentsList;
