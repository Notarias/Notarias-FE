export const styles = theme => {
  return({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    maxWidth: `calc(100% - ${72}px)`,
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  floatingMessage: {
    width: `calc(100% - ${theme.spacing(6) + 72}px)`,
    left: theme.spacing(3) + 72,
    top: theme.spacing(3),
    position: "fixed",
    zIndex: 1100
  }
})};
