import React                from 'react';
import ProfilePanel         from './profile_panel';
import LoadingProfile       from './loading_profile';
import { GET_CURRENT_USER } from '../../../resolvers/queries';
import { useQuery }         from '@apollo/client';

const ProfilesIndex = (props) => {
  const { loading, data } = useQuery(GET_CURRENT_USER);

  return(
    <>
      {loading ?
        <LoadingProfile/>
      :
        <ProfilePanel currentUser={data.currentUser}/>
      }
    </>
  )
}
export default ProfilesIndex;
