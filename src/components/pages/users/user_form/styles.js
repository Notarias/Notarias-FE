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
      width: "50%",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing()}px ${theme.spacing()}px`,
      margin: `${theme.spacing(.2)}% ${theme.spacing(3)}% ${theme.spacing()}%`
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    fromControlMaxwidth: {
      width: '100%',
      marginTop: '10%',
      marginBottom: '10%'
    },
    editUserFormGrid: {
      width: "100%"
    },
    editUserFormSubmitButton: {
    },
    marginInputs: {
      marginButtom: "20%"
    },
    buttonMarginBottom: {
      marginBottom: "15px"
    },
    formControl: {
      width: "100%"
    },
    submitButtonWrapper: {
      paddingTop: "15px",
      paddingBottom: "15px"
    }
  });
