import React          from 'react';
import Avatar         from '@material-ui/core/Avatar';
import UserDefaultImg from '../../../images/user_default_img.png';
import Dropzone       from 'react-dropzone';

const AvatarUploader = (props) => {
  const { classes } = props


  return(
    <Dropzone
      accept="image/*"
      multiple={false} // Only upload 1 file
      onDrop={files => {
        // updateUser({
        //   variables: {
        //     image: files[0]
        //   }
        // });
      }}>
      {({getRootProps, getInputProps}) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Avatar alt="default_img" src={UserDefaultImg} className={classes.large} />
        </div>
      )}
    </Dropzone>
  )
}

export default AvatarUploader;
