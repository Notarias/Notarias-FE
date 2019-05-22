import { fade } from '@material-ui/core/styles/colorManipulator';

export const styles = theme => {
  return ({
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
    lockedUserRow: {
      boxShadow: `inset 10px 0px 0px -5px ${theme.palette.error.dark}`,
    },
    search: {
      marginRight: "10px",
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 1),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 1),
      },
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchInputRoot: {
      color: 'inherit',
      width: '100%',
    },
    searchInputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      }
    }
  })
}
