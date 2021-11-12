import React, { useState } from 'react';
import Avatar              from '@material-ui/core/Avatar';
import UserDefaultImg      from '../../../images/user_default_img.png';
import Dropzone            from 'react-dropzone';
import { gql }                 from '@apollo/client';
import { GET_CURRENT_USER } from '../../../resolvers/queries';
import { useQuery, useMutation }         from '@apollo/client';
import CircularProgress     from '@material-ui/core/CircularProgress';

const ADD_AVATAR = gql`
  mutation uploadAvatar($id: ID!, $avatar: Upload!) {
    avatarUpload(input: { id: $id, avatar: $avatar }) {
      midUrl
      thumbUrl
      url
    }
  }
`;

const AvatarUploader = (props) => {
  const { classes, user } = props
  // const { loading, data, refetch } = useQuery(
  const { data: currentUserData } = useQuery(
    GET_CURRENT_USER, { vairables: {}, errorPolicy: 'all' }
  );
  const [image, setImage] = useState(currentUserData && currentUserData.currentUser && currentUserData.currentUser.avatarUrl)

  const [uploadImageMutation, { loading: uploadingImageLoading}] =
    useMutation(
      ADD_AVATAR,
      {
        context: { hasUpload: true },
        onCompleted(cacheData) {
          setImage(cacheData.avatarUpload.url)
        },
      }
    )

  const onDrop = (files) => {
    uploadImageMutation(
      {
        variables: {
          id: user.id,
          avatar: files[0]
        }
      }
    )
  }

  return(
    <Dropzone
      accept="image/*"
      multiple={false}
      onDrop={onDrop}>
      {
        ({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={classes.avatarWrapper}>
              { uploadingImageLoading && <CircularProgress thickness={1} size={326} className={classes.avatarUploadProgress}/> }
              <Avatar alt="default_img" src={image || UserDefaultImg} className={classes.large}/>
            </div>
          </div>
        )
      }
    </Dropzone>
  )
}

export default AvatarUploader;
