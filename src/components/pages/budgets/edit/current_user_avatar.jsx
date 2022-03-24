import React  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid   from '@material-ui/core/Grid';
import Typography   from '@material-ui/core/Typography';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../../../resolvers/queries';


export default (props) => {
  const { data } = useQuery(GET_CURRENT_USER)

  return(
    <Grid>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Avatar src={data && data.currentUser && data.currentUser.avatarThumbUrl} />
        </Grid>
        <Grid item>
          <Typography variant="caption">{data.currentUser.firstName}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

