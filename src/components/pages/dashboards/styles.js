
export const styles = theme => {
  return ({
    gridContainer: {
      paddingLeft: "4%",
      paddingTop:"4%"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: "100%",
      width: "100%"
    },
    paperComment: {
      height: "100%"
    },
    marginGridBudgets: {
      padding: `${theme.spacing(3)}px ${theme.spacing(4)}px ${theme.spacing(3)}px`,
    },
    svgProceso: {
      height: "33px",
      width: "33px",
      background: "aqua",
      borderRadius: "3px",
    },
    commentIcon:{
      width:"40px",
      height:"40px",
      color: "limegreen"
    },
    svgCheckBoxIcon:{
      height: "33px",
      width: "33px",
      background: "limegreen",
      borderRadius: "3px",
    },
    textFieldEvent:{
      width: "100px"
    },
    calendarGridColor: {
      background: "#F6F6F6",
    }
  })
}
