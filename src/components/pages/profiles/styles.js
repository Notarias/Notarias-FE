import { green } from '@material-ui/core/colors';

export default (theme) => {
  return (
      {
      large: {

        maxWidth:theme.spacing(40),
        maxHeight:theme.spacing(40),
        width: 'auto',
        height: 'auto',
      },
      avatarUploadProgress: {
        color: green[500],
        position: 'absolute',
        top: -2,
        left: -2,
        zIndex: 1,
      },
      avatarWrapper: {
        position: 'relative',
      }
    }
  )
}