import { fade }     from '@material-ui/core/styles/colorManipulator';

export const styles = theme => {
  return ({
    root: {
      display: "flex",
      overflow: 'auto',
      flexDirection: "column",
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
    searchLoadingIcon: {
      marginLeft: "-100px"
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
    search: {
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
    searchInputRoot: {
      color: 'inherit',
      width: '100%',
    },
    searchInputRootOnLink: {
      width: "360px",
      marginBottom: "10px"
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
    advancedSearchButton: {
      marginRight: "5px",
      marginLeft: "10px"
    },
    newBudgetButton: {
      marginLeft: "5px"
    },
    textFieldSearchInTable: {
      maxWidth: "300px",
      width: "300px",
      backgroundColor: theme.palette.background.paper,
      marginBottom: '10px',
      marginTop: '5px'
    },   
    selectableListItem: {
      backgroundColor: 'inherit',
      width: "350px",
      height: "300px",
      overflowY:"scroll"
    },
    labelLeft: {
      textAlign: "left",
    },
    ClientSearchTable: {
      backgroundColor: 'inherit',
      width: "100%",
      height: "330px",
    },
    linkDefault: {
      textDecoration:"none",
      width: "200px"
    },
    defaultIcon:{
      width:"30px", 
      height:"30px",
    },
    budgetEditPaper: {
      marginTop: '10px',
      width: "100%",
      height:"300px"
    },
    budgetRightOptionsList: {
      marginTop: '10px',
      width: "100%",
      height:"800px"
    },
    budgetTittle: {
      height:"50px"
    },
    budgetEdit : {
      height:"100px"
    },
    spaceBetwenFirstNameAndLastName: {
      marginLeft: "5px"
    }
    
  })
}