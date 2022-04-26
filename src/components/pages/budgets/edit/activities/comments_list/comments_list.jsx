import React, {useState, useEffect}         from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import Grid                                 from '@material-ui/core/Grid';
import { useQuery }                         from '@apollo/client';
import { styles }                           from '../../../styles';
import { GET_COMMENTABLE_COMMENTS }         from '../../../queries_and_mutations/queries'
import CommentEdit                          from './comment_edit';
import LoadingComments                      from './loading_comments';

const CommentsList = (props) => {
  const { budget } = props

  const [array] = useState([1,2,3,4,5,6])

  const { loading, data } = useQuery(
    GET_COMMENTABLE_COMMENTS, { variables: {"commentableType": "Budget", "commentableId": budget.id } }
  );

  const [comments, setComments] = React.useState(data ? data.commentableComments : [])

  useEffect(
    () => {
      setComments(data ? data.commentableComments : [])
    },
    [loading, data]
  )

  return(
    <Grid item container justifyContent='flex-start' spacing={2}>
      { loading || !data ? array.map(
          (index) => {
            return(
              <LoadingComments key={index + "commentLoading"}/>
            )
          }
      ) : (
        comments.map((comment) => {
          return(
            <CommentEdit
              key={comment.id + "comment-edit"}
              comment={comment}
              budget={budget}
            />
          )
        })
      )}
    </Grid>
  )
}

export default withStyles(styles)(CommentsList);
