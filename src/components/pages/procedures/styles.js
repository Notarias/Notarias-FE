import { alpha } from '@material-ui/core/styles';

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
      backgroundColor: alpha(theme.palette.common.white, 1),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
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
    newButton: {
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
    linkDefault: {
      textDecoration:"none",
      width: "200px"
    },
    defaultIcon:{
      width:"30px", 
      height:"30px",
    },
    editPaper: {
      marginTop: '10px',
      width: "100%",
      height:"300px"
    },
    procedureRightOptionsList: {
      marginTop: '10px',
      width: "100%",
      height:"608px"
    },
    procedureTittle: {
      height:"50px"
    },
    procedureEdit : {
      height:"100px"
    },
    spaceBetwenFirstNameAndLastName: {
      marginLeft: "5px"
    },
    marginTitleProcedureName: {
      marginLeft: "20px"
    },
    procedureTabPanelFields: {
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
    gridInputAdvancedSearchHide: {
      overflow: "hidden",
      width: "0px",
      height: "0px"
    },
    gridInputAdvancedSearch: {
      overflow: "visible",
      marginTop: "20px"
    },
    advancedSearchImputs: {
      margin: "5px"
    },
    advancedSearchContainer: {
      padding: "10px"
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
    commentsProcedureGrid: {
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
      marginLeft: "22px",
      marginRight: "10px",
      marginBottom: "5px",
      height: "30px",
      width: "30px"
    },
    reporterAvatar : {
      marginLeft: "10px",
      marginRight: "10px",
      height: "30px",
      width: "30px"
    },
    aWithoutDecoration: {
      textDecoration: "none !IMPORTANT"
    },
    searchAsigneeInput: {
      marginBottom: "10px"
    },
    uditLogGrid: {
      marginTop: "5px",
      overflowY:"scroll",
      maxHeight: "530px"
    },
    showCommentGrid: {
      marginTop: "20px"
    },
    logoInInvoice: {
      width: "400px",
      height: "200px",
    },
    marginTopGridInvoice: {
      marginTop: "20px"
    },
    topMarginGrid: {
      marginTop: "10px"
    },
    messageToLeft: {
      textAlign: "left"
    },
    honorariumGrid: {
      margin: "0px"
    },
    tableRowMax: {
      wordWrap: "break-word",
      height: "50px",
      padding: "5px"
    },
    selectPayType: {
      marginTop: "35px"
    },
  })
}
