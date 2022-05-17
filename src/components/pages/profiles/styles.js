import { green } from '@material-ui/core/colors';

export default (theme) => {
  return (
      {
      large: {
        maxWidth:'320px',
        maxHeight:'320px',
        minHeight:'320px',
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