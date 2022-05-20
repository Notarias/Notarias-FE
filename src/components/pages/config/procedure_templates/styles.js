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
    defaultIcon:{
      width:"30px", 
      height:"30px",
    },
    inputSmall:{
      height:"50px",
    },
    defaultMenuIcon:{
      width:"30px", 
      height:"30px",
      marginRight: "5px",
      marginTop: "10px"
    },
    activeIconGreen:{
      width:"30px", 
      height:"40px",
      marginRight: "10px",
      color: "green",
    },
    radioButtonActiveGreen:{
      width:"30px", 
      height:"30px",
      color: "green",
    },
    textIconDefault:{
      marginTop: "10px"
    },
    statusTemplateRow: {
      boxShadow: `inset 10px 0px 0px -5px ${theme.palette.error.dark}`,
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
    textInputTittleName: {
      fontWeight: "bold",
      wordWrap: "break-word",
      paddingLeft: "10px"
    },
    textFieldTittleType: {
      width: "100%",
      fontFamily: "Lucida Console, Courier, monospace",
      fontWeight: "bold",
      paddingLeft: "10px"
    },
    texPlainTittleName: {
      textAlign: "left",
      paddingLeft: "10px",
      wordWrap: "break-word",
    },
    wordWrapToTabName: {
      wordWrap: "break-word",
      maxWidth: "150px",
    },
    textPlainGoupName: {
      height: "48px",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#d7d7e6",
      paddingLeft: "8px",
      paddingRight: "8px"

    },
    inputTittleGroupName: {
      width: "100%",
      textAlign: "left",
      paddingLeft: "10px",
      wordWrap: "break-word",
    },
    editGroupNameIcon:{
      width:"30px", 
      height:"30px",
      marginTop: "10px",
    },
    saveGroupNameIcon:{
      width:"30px", 
      height:"30px",
      marginTop: "5px",
    },
    textTittleType: {
      minWidth:'150px',
      border: "1px solid",
      borderRadius: "6px",
      padding:'15px'
    },
    buttonHeight: {
      height: "30px",
    },
    inputFieldName: {
      width: "180px",
    },
    fieldHeightRow: {
      padding: "10px",
      maxWidth: "650px",
    },
    fielPaddingBottom: {
      marginBottom: "2px"
    },
    formControlPadding: {
      margin: "0px",
    },
    tittleDialogWidth: {
      width: "600px",
    },
    contentDialogPadding: {
     padding: "10px",
    },
     roundedBorderDialogSelected: {
      border: "1px solid",
      borderRadius: "6px",
      margin: "7px",
      padding: "15px 0px",
      opacity: "0.5",
      width: "260px",
      '&:hover': {
        opacity: "1",
      },
    },
    roundedBorderDialog: {
      border: "1px solid",
      borderRadius: "6px",
      width: "260px",
      margin: "7px",
      padding: "15px 0px",
    },
    roundedBorderGruop: {
      marginBottom: "10px"
    },
    buttonTab: {
      width: "100%",
      height: "70px",
      opacity: "0.7"
    },
    tittleTab: {
      width: "100%",
      height: "70px",
    },
    tabDefault: {
      width: "100%",
      height: "70px",
      opacity: "0.4",
    },
    activeTab: {
      width: "100%",
      height: "70px",
      borderBottom: '2px solid #e8e8e8',
    },
    // statusDesactivedTab:{
    //   boxShadow: `inset 10px 0px 0px -5px ${theme.palette.error.dark}`
    // },
    templateTittleButton: {
      minWidth: "45px",
      minHeight: "45px",
    },
    saveTittleButton: {
      paddingTop: "10px"
    },
    templateTextTittle: {
      height: "70px",
      maxWidth: "500px",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      paddingLeft: "10px",
    },
    circularProgressLoading: {
      paddingTop: "60px",
      paddingBottom: "40px"
    },
    tittleTabMenu: {
      width: "325px",
      height: "50px",
    },
    fieldSelect: {
      height: "80px"
    },
    addFieldsAndGroupsButton: {
      marginTop: "15px",
      marginBottom: "4px",
    },
    addIconMargin: {
      marginLeft: "10px",
    },
    menuTabDefault: {
      opacity: "0",
    },
    activeMenuTab: {
      opacity: "1",
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
    textFieldSearchInTable: {
      maxWidth: "360px",
      width: "360px",
      backgroundColor: theme.palette.background.paper,
      marginBottom: '10px',
      marginTop: '5px'
    },    
    selectableListItem: {
      backgroundColor: 'inherit',
      width: "360px",
      height: "250px",
      overflowY:"scroll"
    },
    divChange: {
      width: "360px"
    },
    DialogTittleOfListToLink: {
      width: "400px"
    },
    LinkedListToShow: {
      width: "360px"
    },
    buttonToAceptLinkedTemplate: {
      width: "80px",
    },
  })
}
