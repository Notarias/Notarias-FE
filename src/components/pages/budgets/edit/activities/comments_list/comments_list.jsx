import React, {useEffect} from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import Grid                                 from '@material-ui/core/Grid';
import { useQuery }                         from '@apollo/client';
import { styles }                           from '../../../styles';
import { GET_COMMENTABLE_COMMENTS }         from '../../../queries_and_mutations/queries'
import CommentEdit                          from './comment_edit';

const CommentsList = (props) => {
  const { budget } = props

  const { loading, data, refetch } = useQuery(
    GET_COMMENTABLE_COMMENTS, { variables: {"commentableType": "Budget", "commentableId": budget.id }, fetchPolicy: "no-cache" }
  );

  const [comments, setComments] = React.useState(data ? data.commentableComments : [])

  useEffect(
    () => {
      setComments(data ? data.commentableComments : [])
    },
    [data]
  )

  return(
    <Grid item container justifyContent='flex-start' spacing={2}>
      {
        comments.map((comment) => {
          return(
            <CommentEdit
              key={comment.id + "comment-edit"}
              comment={comment}
              budget={budget}
            />
          )
        })
      }
    </Grid>
  )
}

export default withStyles(styles)(CommentsList);
