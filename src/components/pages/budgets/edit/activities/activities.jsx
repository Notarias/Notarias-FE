import React                from 'react'
import { withStyles }       from '@material-ui/core/styles';
import { styles }           from '../../styles';
import Button               from '@material-ui/core/Button';
import Menu                 from '@material-ui/core/Menu';
import MenuItem             from '@material-ui/core/MenuItem';
import Grid                 from '@material-ui/core/Grid';
import Divider              from '@material-ui/core/Divider';
import ArrowDropDownIcon    from '@material-ui/icons/ArrowDropDown';
import Typography           from '@material-ui/core/Typography';
import CommentsList         from './comments_list/comments_list'
import AuditLog             from './audit_log'
import AppBar from '@material-ui/core/AppBar';


const Activities = (props) => {
  const { budgetId, classes } = props
  const [activity, setActivity] = React.useState("comments")
  const [goSelected, setGoSelected] = React.useState();


  const  renderActivitiesMenu = () => {
    switch (activity) {
      case "comments" :

        return(
          <CommentsList
            budgetId={budgetId}
          />
        )
        break;
      case "historial" :

        return(
          <AuditLog
            budgetId={budgetId}
          />
        )
        break;
      case "documents" :

        return(
          "Documentos"
        )
        break
      default :
        return(
        <CommentsList
          budgetId={budgetId}
        />)
    }
  }

  const handleComments = () => {
    setActivity("comments")
    setGoSelected(0)
  }

  const handleHistorial = () => {
    setActivity("historial")
    setGoSelected(1)
  }

  const handleDocuments = () => {
    setActivity("documents")
    setGoSelected(2)
  }

  return(
    <>
      <Grid container alignItems="center" justifyContent="center">
        <AppBar position="static" color="transparent">
          <Grid container item direction="row" alignItems="center" justifyContent="center">  
            <Button
              color={goSelected === 0 ? "primary" : "inherit"} 
              onClick={handleComments}
            >
              Comentarios
            </Button>
            <Button
              color={goSelected === 1 ? "primary" : "inherit"} 
              onClick={handleHistorial}
            >
              Historial
            </Button>
            <Button
              color={goSelected === 2 ? "primary" : "inherit"} 
              onClick={handleDocuments}
            >
              Documentos
            </Button>
          </Grid> 
        </AppBar>
      </Grid>
      <Grid className={classes.showCommentGrid}>
        {renderActivitiesMenu()}
      </Grid>
    </>
  )
}

export default withStyles(styles)(Activities);
