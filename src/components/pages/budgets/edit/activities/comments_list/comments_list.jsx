import React, {useEffect} from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../../../styles';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_COMMENTABLE_COMMENTS } from '../../../queries_and_mutations/queries'
import Avatar                               from '@material-ui/core/Avatar';
import Typography                           from '@material-ui/core/Typography';
import Grid                         from '@material-ui/core/Grid';
import Button                               from '@material-ui/core/Button';
import TextField                            from '@material-ui/core/TextField';
import CommentEdit                          from './comment_edit';

const CommentsList = (props) => {
  const { classes, budgetId } = props

  const { loading, data, refetch } = useQuery(
    GET_COMMENTABLE_COMMENTS, { variables: {"commentableType": "Budget", "commentableId": budgetId } }
  );

  const [comments, setComments] = React.useState(data ? data.commentableComments : [])

  useEffect(
    () => {
      setComments(data ? data.commentableComments : [])
    },
    [data]
  )

  return(
    comments.map((comment) => {
      return(
        <CommentEdit
          key={comment.id + "comment-edit"}
          comment={comment}
          budgetId={budgetId}
        />
      )
    })
  )
}

export default withStyles(styles)(CommentsList);
