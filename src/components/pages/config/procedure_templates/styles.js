import { fade } from '@material-ui/core/styles/colorManipulator';

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
    defaultIcon:{
      width:"30px", 
      height:"40px",
      marginRight: "10px"
    },
    activeIconGreen:{
      width:"30px", 
      height:"40px",
      marginRight: "10px",
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
      width: "350px",
      fontWeight: "bold",
      wordWrap: "break-word",
      paddingLeft: "10px"
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
    buttonHeight: {
      height: "30px",
    },
    inputFieldName: {
      width: "180px",
    },
    fieldHeightRow: {
      padding: "10px",
      width: "700px",
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
    buttonAddFieldInGroup: {
      marginRight: "9px"
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
    templateTittleButton: {
      minWidth: "45px",
      minHeight: "45px",
    },
    saveTittleButton: {
      paddingTop: "10px"
    },
    templateTextTittle: {
      height: "70px",
      maxWidth: "550px",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
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
  })
}
