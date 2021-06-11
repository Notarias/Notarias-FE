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
      height:"600px"
    },
    budgetTittle: {
      height:"50px"
    },
    budgetEdit : {
      height:"100px"
    },
    spaceBetwenFirstNameAndLastName: {
      marginLeft: "5px"
    },
    marginTitleBudgetName: {
      marginLeft: "20px"
    },
    budgetTabPanelFields: {
      marginLeft: "20px",
      height:"70px",
    },
    titleFields: {
      marginLeft: "20px",
      height:"60px",
    },
    rootTab: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    boxContainerFields: {
      overflowY:"scroll",
      maxHeight: "390px"
    },
    fixedRow: {
      width:"200px",
    },
    avatarInDialogToAddPayment: {
      margin: "10px 10px 10px 5px",
    },
    dialogToAddPayment: {
      width:"400px",
    },
    drawerPaymentList: {
      width:'300px'
    },
    totalsGrid: {
      marginTop: "30px",
      paddingRight: "65px"
    },
    totalsGridAmount: {
      paddingLeft: "20px"
    },
    tablecellWidth: {
      maxWidth: "196px"
    },
    totalDebtInRed: {
      color: "red"
    },
    totalPaidInGreen: {
      color: "green"
    },
    GridInputAdvancedSearchHide: {
      overflow: "hidden",
      width: "0px",
      height: "0px"
    },
    GridInputAdvancedSearch: {
      overflow: "visible",
      marginTop: "20px"
    },
    inputInAdvancedSearch: {
      margin: "5px"
    },
    inputClientNameInAdvancedSearch: {
      margin: "5px",
      width: "428px"
    },
    paperAdvancedSearch: {
      width: "800px"
    },
    gridCommentsContainer: {
      maxHeight: "96px"
    },
    avatarWithoutTopMargin: {
      marginTop: "0px"
    },
    totalValuesGridContainer: {
      maxHeight: "96px"
    },
    fragmentComments: {
      marginBottom: "5px",
      marginTop: "5px"
    },
    commentsBudgetGrid: {
      marginLeft: "53px"
    },
    commentEditingInputGrid: {
      marginRight: "30px"
    },
    buttonTextComments: {
      marginRight: "18px",
      marginTop: "5px",
      marginLeft: "2px"
    },
    buttonTextCommentsDisabled: {
      marginRight: "18px",
      marginTop: "5px",
      marginLeft: "2px",
      color: "gray",
      textDecoration: "none !IMPORTANT"
    },
    avatarOfInCharge : {
      marginLeft: "10px",
      marginRight: "10px",
      marginBottom: "5px",
      height: "20px",
      width: "20px"
    },
    inChargeText: {
      height: "10px",
      marginBottom: "10px",
      marginLeft: "12px"
    }
  })
}
