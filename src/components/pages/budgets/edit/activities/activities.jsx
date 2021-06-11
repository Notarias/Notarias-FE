import React                from 'react'
import Button               from '@material-ui/core/Button';
import Menu                 from '@material-ui/core/Menu';
import MenuItem             from '@material-ui/core/MenuItem';
import Grid                 from '@material-ui/core/Grid';
import Divider              from '@material-ui/core/Divider';
import ArrowDropDownIcon    from '@material-ui/icons/ArrowDropDown';
import Typography           from '@material-ui/core/Typography';
import CommentsList         from './comments_list/comments_list'
import ActivitiesHistorial  from './historial'


const Activities = (props) => {
  const { budgetId } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [activity, setActivity] = React.useState("comments")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <ActivitiesHistorial/>
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
    setAnchorEl(null)
  }

  const handleHistorial = () => {
    setActivity("historial")
    setAnchorEl(null)
  }

  const handleDocuments = () => {
    setActivity("documents")
    setAnchorEl(null)
  }


  return(
    <>
    <Grid>
      <Typography variant="h6">
        Actividades
      </Typography>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <ArrowDropDownIcon/>
      </Button>
      <Divider/>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleComments}>Comentarios</MenuItem>
        <MenuItem onClick={handleHistorial}>Historial</MenuItem>
        <MenuItem onClick={handleDocuments}>Documentos</MenuItem>
      </Menu>
    </Grid>
    <Grid>
      {renderActivitiesMenu()}
    </Grid>
    </>
  )
}

export default Activities;
