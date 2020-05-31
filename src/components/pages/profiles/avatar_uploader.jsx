import React, { useState } from 'react';
import Avatar              from '@material-ui/core/Avatar';
import UserDefaultImg      from '../../../images/user_default_img.png';
import Dropzone            from 'react-dropzone';
import gql                 from 'graphql-tag';
import { Mutation }        from '@apollo/react-components';
import { GET_CURRENT_USER } from '../../../resolvers/queries';
import { useQuery }         from '@apollo/react-hooks';

const ADD_AVATAR = gql`
  mutation uploadAvatar($id: ID!, $avatar: Upload!) {
    avatarUpload(input: { id: $id, avatar: $avatar }) {
      midUrl
      thumbUrl
      url
      errors
      pointers
    }
  }
`;

const AvatarUploader = (props) => {
  const { classes, user } = props
  // const { loading, data, refetch } = useQuery(
  const { data } = useQuery(
    GET_CURRENT_USER, { vairables: {}, errorPolicy: 'all' }
  );
  const [image, setImage] = useState(data.currentUser.avatarUrl)

  const onCompleteUpload = (data) => {
    setImage(data.avatarUpload.url)
  }

  const onDrop = (mutator, files) => {
    mutator(
      {
        variables: {
          id: user.id,
          avatar: files
        }
      }
    )
  }

  return(
    <Mutation
      mutation={ADD_AVATAR}
      context={{ hasUpload: true }}
      onCompleted={onCompleteUpload.bind(this)}>
      {
        (mutator, { loading }) => (
          <Dropzone
            accept="image/*"
            multiple={false} // Only upload 1 file
            onDrop={onDrop.bind(this, mutator)}>
            {
              ({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Avatar alt="default_img" src={image || UserDefaultImg} className={classes.large} />
                </div>
              )
            }
          </Dropzone>
        )
      }
    </Mutation>
  )
}

export default AvatarUploader;
