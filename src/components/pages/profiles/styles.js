export default (theme) => {
  return (
      {
      columsWraper: {
        height: '100%',
        backgroundColor: "white",
        display: 'flex',
      },
      columMenu: {
        backgroundColor: "#F7F7F7",
        width: '20%',
        height: '100%',
        display: 'inline-block',
        textAlign: 'left',
        paddingLeft: '15px',
        justifyContent: 'center',
      },
      profileMenu: {
        paddingLeft: '10px',
        marginTop: '40%',
        left: '10px',
      },
      columBody: {
        width:'80%',
        height: '100%',
        display: 'inline-block',
      },
      profileForm: {
        height: "60%",
        alingItems: "centered",
      },
      positionButton: {
        textTransform: "none",
        padding: "0",
        justifyContent: 'flex-start',
      },
      positionButtonLabel: {
        paddingLeft: "5px",
        paddingRight: "40px",
        display: 'default',
        alingItems: 'left',
      },
      gritFixed: {
        height: "100%",
      },
      divFixes: {
        paddingLeft: '20px',
      },
      large: {
        width: theme.spacing(36),
        height: theme.spacing(36),
      },
      paddingPaper: {
        padding: '20px'
      },
      h2Header: {
        frontSize: '2em',
        fontWeight: 'normal',
        textAlign: 'left',
        paddingLeft: '5px'
      },
      h3Header: {
        fontWeight: 'normal',
        margin: '0px',
        textAlign: 'left',  
      }
    }
  )
}