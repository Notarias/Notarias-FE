export const styles = theme => {
  return({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,

    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  floatingMessage: {
    maxWidth: `calc(100% - ${theme.spacing(6)}px)`,
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  breadcrumbsContainer: {
    flexWrap: 'wrap',
  },
  breadcrumbsPaper: {
    padding: theme.spacing(1, 2),
    borderRadius: '0',
    height: "6%",
  },
})};
