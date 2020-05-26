import { fade } from '@material-ui/core/styles/colorManipulator';
import green from '@material-ui/core/colors/green';

export const styles = theme => {
  return ({
    root: {
      display: "flex",
      overflow: 'auto',
      flexDirection: "column",
      height: "100%",
      flexWrap: "nowrap",
      paddingTop: "23px",
      paddingRight: "23px"
    },
    tableWrapper: {
      display: "right",
      padding: theme.spacing(3),
      overflow: 'auto',
      flexFlow: "column wrap",
      height: "100%",
      flexWrap: "nowrap",
      paddingRight: "0px"
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
      width: theme.spacing(9),
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
      paddingTop: theme.spacing(),
      paddingRight: theme.spacing(),
      paddingBottom: theme.spacing(),
      paddingLeft: theme.spacing(10),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
      width: 120,
        '&:focus': {
          width: 200,
        },
      }
    },
    genericGridHeight: {
      height: "100%",
      overflowY: "scroll",
      backgroundColor: theme.palette.background.paper,
      borderRight: `1px solid ${theme.palette.divider}`,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    submitFormButton: {
      marginTop: "25px"
    },
    gridScrollable: {
      height: "30%",
      overflowY: "scroll"
    },
    commentsList: {
      width: "100%",
      paddingRight: "10px"
    },
    gridInputComments: {
      height: "20%",
      borderTop: `1px solid ${theme.palette.divider}`,
      width:"100%"
    },
    clientIcon: {
      width: "22px", height: "22px", marginTop: "25px"
    },
    inputContainer: {
      padding: "10px"
    },
    genericInputIcon: {
      marginTop: "20px", width: "100%"
    },
    formTextFields: {
      width: "100%"
    },
    newClientForm: {
      padding: "0 5%",
      paddingTop: "15px"
    },
    pageWrapper: {
      height: "94%",
    },
    textFieldsComments: {
      width: "100%", paddingLeft:"15px" 
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    buttonFetch: {
      paddingRight: "5%"
    }
  })
}
