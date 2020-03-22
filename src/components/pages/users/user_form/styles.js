import green from '@material-ui/core/colors/green';

export const styles = theme => ({
    formWrapper: {
      padding: theme.spacing(3),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      flexWrap: "wrap"
    },
    barItemsWrapper: {
      display: "flex",
      width: "100%",
      maxWidth: theme.breakpoints.values.md,
      paddingBottom: theme.spacing(3),
    },
    paper: {
      width: "100%",
      maxWidth: theme.breakpoints.values.md,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  });
