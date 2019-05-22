export const styles = theme => ({
    formWrapper: {
      padding: theme.spacing.unit * 3,
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
      paddingBottom: theme.spacing.unit * 3,
    },
    paper: {
      width: "100%",
      maxWidth: theme.breakpoints.values.md,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
  });