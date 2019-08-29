export const styles = theme => ({
  main: {
    width: 'auto',
    display: 'inline-block', //it's replaced 'block' for 'inline-block' because the 'block' overflowing the information wen the window was small.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    backgroundColor: 'white',
    width: '100px',
    height: '100px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  logo: {
    maxWidth: '80%',
    maxHeight: '80%',    
    width: 'auto',
    height: 'auto',
  }
});