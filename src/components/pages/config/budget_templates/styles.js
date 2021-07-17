import { alpha } from '@material-ui/core/styles'

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
    loadingTableCell: {
      paddingTop: "40px",
      paddingBottom: "40px"
    },
    searchLoadingIcon: {
      marginLeft: "-100px"
    },
    search: {
      marginRight: "10px",
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
    activeGreen: {
      backgroundColor: "green"
    },
    defaultIcon:{
      width:"30px", 
      height:"30px",
    },
    activeIconGreen:{
      width:"30px", 
      height:"40px",
      marginRight: "10px",
      color: "green",
    },
    linkDefault: {
      textDecoration:"none",
      width: "200px"
    },
    addTittleProcedure: {
      height: "70px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    buttonAddProcedure: {
      height: "30px",
    },
    circularProgressLoading: {
      paddingTop: "60px",
      paddingBottom: "40px"
    },
    addFieldButton: {
      marginTop: "15px",
      marginBottom: "8px",
      paddingRight: "30px"
    },
    addTaxFieldButton: {
      marginTop: "15px",
      marginBottom: "8px",
    },
    addTaxFieldButtonColor:{
      backgroundColor: "green",
      color: "white",
      '&:hover': {
        color: "black",
      },

    },
    addIconMargin: {
      marginLeft: "10px",
    },
    buttonHeight: {
      height: "30px",
    },
    buttonTab: {
      width: "100%",
      height: "70px",
      opacity: "0.7"
    },
    templateTextTittle: {
      height: "70px",
      maxWidth: "550px",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      paddingLeft: "10px"
    },
    templateTittleButton: {
      minWidth: "45px",
      minHeight: "45px",
    },
    textInputTittleName: {
      width: "350px",
      fontWeight: "bold",
      wordWrap: "break-word",
      paddingLeft: "10px"
    },
    saveTittleButton: {
      paddingTop: "10px"
    },
    statusTemplateRow: {
      boxShadow: `inset 10px 0px 0px -5px ${theme.palette.error.dark}`,
    },
    selectableListItem: {
      backgroundColor: 'inherit',
      width: "360px",
      height: "250px",
      overflowY:"scroll"
    },
    selectableProceduresListItem: {
      backgroundColor: 'inherit',
      width: "360px",
    },
    textFieldSearchInTable: {
      maxWidth: "360px",
      width: "360px",
      backgroundColor: theme.palette.background.paper,
      marginBottom: '10px',
      marginTop: '5px'
    },
    activeTab: {
      width: "100%",
      height: "70px",
      borderBottom: '2px solid #e8e8e8',
    },
    menuTabDefault: {
      opacity: "0",
    },
    tittleTab: {
      width: "100%",
      height: "70px",
    },
    inputSmall:{
      height:"50px",
    },
    activeMenuTab: {
      opacity: "1",
    },
    tittleTabMenu: {
      width: "325px",
      height: "50px",
    },
    tittleDialogWidth: {
      width: "600px",
    },
    textFieldTittleType: {
      width: "230px",
      fontFamily: "Lucida Console, Courier, monospace",
      fontWeight: "bold",
    },
    texPlainTittleName: {
      width: "250px",
      textAlign: "left",
      paddingTop: "20px",
      height: "48px",
      paddingLeft: "10px",
      wordWrap: "break-word",
    },
    textTittleType: {
      width: "230px",
      height: "56px",
      paddingTop: "15px",
      paddingRight: "18px",
      border: "1px solid",
      borderRadius: "6px",
    },
    fielPaddingBottom: {
      marginBottom: "2px"
    },
    fieldHeightRow: {
      padding: "10px",
      width: "700px",
    },    formControlPadding: {
      margin: "0px",
    },
    radioButtonActiveGreen:{
      width:"30px", 
      height:"30px",
      color: "green",
    },
    listCategoriesDisplay: {
      height:"300px"
    },
    avatarLinkedCount: {
      width: "20px",
      height: "20px",
      marginRight: "10px",
      fontSize: "12px",
      backgroundColor: theme.palette.primary.main,
    },
    avatarLinkedCountIsZero: {
      width: "20px",
      height: "20px",
      marginRight: "10px",
      fontSize: "12px",
      backgroundColor: "gray",
      border: "2px solid black"
    },
    LinkedListToShow: {
      width: "360px"
    },
    buttonToAceptLinkedTemplate: {
      width: "80px",
    },
    InputPercentage: {
      width: "80px",
      height: "40px",
      padding: "0",
      marginBottom: "10px"
    },
    InputAdornmentInPercentage: {
      marginRight: "5px"
    },
    operatorMenu: {
      width: "90px",
      marginBottom: "10px"
    },
    textFieldSearch: {
      marginBottom: "10px"
    },
    gridSearchField: {
      backgroundColor: 'inherit',
      width: "350px",
      height: "300px",
      overflowY:"scroll",
      marginTop: "10px"
    },
  })
}
