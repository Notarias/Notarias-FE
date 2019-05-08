export const styles = theme => {
  return({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 8,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  floatingMessage: {
    maxWidth: `calc(100% - ${theme.spacing.unit * 6}px)`,
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
  },
  routesContainerClass: {
    paddingTop: theme.spacing.unit * 3
  }
})};
