import React  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid   from '@material-ui/core/Grid';
import Typography   from '@material-ui/core/Typography';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../../../resolvers/queries';


export default (props) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER)

  return(
    <Grid container>
      <Grid item direction="row" alignItems="center">
        <Avatar src={data && data.currentUser && data.currentUser.avatarThumbUrl} />
        <Typography variant="caption">{data.currentUser.firstName}</Typography>
      </Grid>
    </Grid>
  )
}

