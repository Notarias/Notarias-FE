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
    },
    addTittleProcedure: {
      height: "70px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    buttonAddProcedure: {
      height: "30px",
    },
    textFieldTittle: {
      width: "320px",
      fontFamily: "Lucida Console, Courier, monospace",
      fontWeight: "bold",
      textAling: "left",
    },
    buttonHeight: {
      height: "30px",
    },
    inputFieldName: {
      width: "200px",
    },
    fieldHeightRow: {
      padding: "10px",
    },
    formControlPadding: {
      margin: "0px",
    },
    tittleDialogWidth: {
      width: "600px",
    },
    roundedBorderDialog: {
      border: "2px solid",
      borderRadius: "8px",
    },
    buttonProcedurePage: {
      width: "100%",
      height: "70px",
    },
    tittleProcedurePage: {
      width: "100%",
      height: "70px",
      border: "2px solid",
      borderRadius: "8px",
    },
    buttonAddFieldInGroup: {
      marginRight: "9px"
    },
  })
}
