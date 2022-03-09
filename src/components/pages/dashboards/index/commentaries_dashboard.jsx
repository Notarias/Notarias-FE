import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import { useQuery }                   from '@apollo/client';
import { GET_COMMENTS }               from '../index_queries_and_mutations/queries';
import Commentary                     from './commentaries_dashboard/commentary';
import LoadingCommentaries            from './commentaries_dashboard/loading_commentaries'
import Typography                     from '@material-ui/core/Typography';
import Paper                          from '@material-ui/core/Paper';

const CommentariesDashboard = (props) => {
  const [sortField]     = useState("created_at");
  const [sortDirection] = useState("desc");
  const [page] = useState(1);
  const [per]           = useState(10);
  const [array] = useState([1,2,3,4,5,6,7,8,9]);
  const [comments, setComments] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField
  }   

  const  { loading, data } = useQuery(
    GET_COMMENTS, { variables: variables, fetchPolicy: "no-cache" }
  );
  
  useEffect( () =>{
    data && comments.length === 0 && setComments(data.comments)
  }, [loading, data])

  return(
    <Grid container item direction='column' alignItems="stretch"  justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      { loading || !data ?
        array.map((index) => {
          return(
            <Grid item key={`budgetLoading-${index}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
              <LoadingCommentaries/>
            </Grid>
          )
        })
      :
        comments && comments ?
          comments.map((comment) => {
            return(
              <Grid item key={`${comment.__typename}-${comment.id}`} style={{ paddingBottom: "20px", paddingRight: "30px" }}>
                <Commentary comment={comment}/>
              </Grid>
            )
          })
        :
          <Paper>
            <Typography variant='h4' style={{padding: "20px"}}>
              No hay comentarios por el momento
            </Typography>
          </Paper>
      }
    </Grid>
  )
}

export default CommentariesDashboard;
