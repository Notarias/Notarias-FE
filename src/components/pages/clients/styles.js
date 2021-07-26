import green        from '@material-ui/core/colors/green';
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
    genericGridHeight: {
      height: "100%",
      overflowY: "scroll",
      backgroundColor: theme.palette.background.paper,
      borderRight: `1px solid ${theme.palette.divider}`,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    submitFormButton: {
      marginTop: "25px",
      width: '92%',
    },
    gridScrollable: {
      height: "30%",
      overflowY: "scroll",
      width: '100%',
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
      padding: "2% 3% 2% 2%",
      width: '50%',
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
    },
    paper_button_comments_margin: {
      margin: '5%'
    },
    buttonSeeMore: {
      paddingLeft: "2%"
    },
    linkWidthAndHeigth: {
      width: "100%",
      height: "100%"
    },
    genericPaddingLeft: {
      paddingLeft: "11px"
    },
    imgIconGeneric: {
      width: "25px",
      height: "25px"
    },
    editPaddingLeft: {
      paddingLeft: "13px"
    },
    rootEdit: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${800}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 800,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: 800,
    },
    drawerPaper: {
      width: 800,
      top: '15%',
      height: "70%",
      borderRadius: '4px',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      overflow: 'hidden',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -800,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    WindowComment: {
      width: '100%', height:" 460px"
    },
    widthWindowComment: {
      width: '100%',
      height:" 500px"
    },
    moreDetailsLink: {
      width: '100%',
      height: '40%',
      display: 'flex',
      padding: '16px 16px 16px 16px',
      flexDirection: 'column-reverse'
    },
    serialNumberText: {
      display: 'inline-block',
      width: '160px',
      textAlign: 'right'
    },
    informationText: {
      display: 'inline-block',
      width: '140px',
      textAlign: 'right'
    },
    list: {
      width: '350px',
    },
    fullList: {
      width: 'auto',
    },
    infoAndSerialBox: {
      width: '300px'
    },
    clientAtributes: {
      padding: theme.spacing(1),
    },
    paperBase: {
      minWidth:"100%",
      minHeight: "300px"
    },
    textFieldGeneralData: {
      margin: "5px"
    },
    gridDivider: {
      width: "688px",
      minHeight: "30px"
    },
    gridGenaralData: {
      margin: "10px 10px 10px 5px",
    },

  })
}
