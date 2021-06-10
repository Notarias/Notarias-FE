import React from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid                                 from '@material-ui/core/Grid';
import Divider                              from '@material-ui/core/Divider';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography                           from '@material-ui/core/Typography';
import CommentsList from './comments_list/comments_list'


const Activities = (props) => {
  const { budgetId } = props
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const renderComments = () => {
    
  // }


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
        <MenuItem onClick={handleClose}>Comentarios</MenuItem>
        <MenuItem onClick={handleClose}>Historial</MenuItem>
        <MenuItem onClick={handleClose}>Documentos</MenuItem>
      </Menu>
    </Grid>
    <Grid>
      <CommentsList
        budgetId={budgetId}
      />
    </Grid>
    </>
  )
}

export default Activities;