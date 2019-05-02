export const styles = theme => ({
  root: {
    display: "flex",
    overflow: 'auto',
    flexDirection: "column",
    height: "100%",
    flexWrap: "nowrap"
  },
  tableWrapper: {
    display: "flex",
    padding: theme.spacing.unit * 3,
    overflow: 'auto',
    flexFlow: "column wrap",
    height: "100%",
    flexWrap: "nowrap"
  },
  tableGutter: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  usersTableBarWrapper: {
    paddingRight:'23px'
  },
});

