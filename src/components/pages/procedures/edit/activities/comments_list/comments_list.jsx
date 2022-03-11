import React, { useState, useEffect }       from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import Grid                                 from '@material-ui/core/Grid';
import { useQuery }                         from '@apollo/client';
import { styles }                           from '../../../styles';
import { GET_COMMENTABLE_COMMENTS }         from '../../../queries_and_mutations/queries'
import CommentEdit                          from './comment_edit';
import LoadingComments                      from './loading_comments';

const CommentsList = (props) => {
  const { procedure } = props

  const [array] = useState([1,2,3,4,5,6])

  const { loading, data } = useQuery(
    GET_COMMENTABLE_COMMENTS, { variables: {"commentableType": "Procedure", "commentableId": procedure.id } }
  );

  const [comments, setComments] = useState([])

  useEffect(
    () => {
      setComments(data ? data.commentableComments : [])
    },
    [loading, data]
  )

  return(
    <Grid container item xs={12} direction="row" justifyContent='center' spacing={3}>
      { loading || !data ? array.map(
          (index) => {
            return(
              <LoadingComments/>
            )
          }
      ) : (
        comments.map((comment) => {
          return(
            <CommentEdit
              key={comment.id + "comment-edit"}
              comment={comment}
              procedure={procedure}
            />
          )
        })
      )}
    </Grid>
  )
}

export default withStyles(styles)(CommentsList);
