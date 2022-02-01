import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import { useQuery }                   from '@apollo/client';
import { GET_COMMENTS }               from '../index_queries_and_mutations/queries';
import Commentary                     from './commentaries_dashboard/commentary';

const CommentariesDashboard = (props) => {
  const [sortField]     = useState("created_at");
  const [sortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [per]           = useState(10);
  const [comments, setComments] = useState([]);

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField
  }   

  const  { loading, data } = useQuery(
    GET_COMMENTS, { variables: variables, fetchPolicy: "cache-and-network" }
  );
  
  useEffect( () =>{
    data && comments.length === 0 && setComments(data.comments)
  }, [data])

  return(
    <Grid container item direction='column' alignItems="stretch"  justifyContent="flex-start" style={{ paddingTop: "30px" }}>
      {
        comments.map((comment) => {
          return <Commentary comment={comment}/>
        })
      }
    </Grid>
  )
}

export default CommentariesDashboard;
