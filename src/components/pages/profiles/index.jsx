import React        from 'react';
import ProfilePanel from './profile_panel';
import { withStyles }       from '@material-ui/core/styles';
import { GET_CURRENT_USER } from '../../../resolvers/queries'
import { useQuery }         from '@apollo/react-hooks';

const styles = {
  columsWraper: {
    height: '100%',
    backgroundColor: "white",
  }
}

const ProfilesIndex = (props) => {
  const { loading, data, refetch } = useQuery(GET_CURRENT_USER);

  return(
    <div style={ styles.columsWraper }>
      <ProfilePanel currentUser={data.currentUser} loading={loading} refetch={refetch}/>
    </div>
  )
}
export default withStyles(()=>{})(ProfilesIndex);
