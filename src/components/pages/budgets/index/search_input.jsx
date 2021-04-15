import React, { useState }                from 'react'
import Grid                               from '@material-ui/core/Grid';
import CircularProgress                   from '@material-ui/core/CircularProgress';
import Dialog                             from '@material-ui/core/Dialog';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import DialogActions                      from '@material-ui/core/DialogActions';
import TextField                          from '@material-ui/core/TextField'
import SearchIcon                         from '@material-ui/icons/Search';
import InputBase                          from '@material-ui/core/InputBase';
import Button                             from '@material-ui/core/Button';
import { styles }                         from '../styles';
import { withStyles }                     from '@material-ui/core/styles';
import PostAddIcon                        from '@material-ui/icons/PostAdd';
import PageviewIcon                       from '@material-ui/icons/Pageview';
import { Link }             from 'react-router-dom';


const SearchInput = (props) => {
  const { classes, searchLoading } = props
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  }

  return(
    <Grid container  direction="row"  justify="flex-end"  alignItems="flex-end" >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          { 
            searchLoading ?
            <CircularProgress size={25} /> :
            <SearchIcon size={25} /> 
          }
        </div>
        <InputBase
          placeholder="Buscar…"
          // onChange={onChangeSearch}
          classes={{
            root: classes.searchInputRoot,
            input: classes.searchInputInput,
          }}
        />
      </div>
      <Button 
        variant="contained" 
        color="primary" 
        className={classes.advancedSearchButton}
        // onClick={ handleClickOpen }
      >
        <PageviewIcon/>
      </Button>
      <Button 
        variant="contained" 
        color="primary"
        className={classes.newBudgetButton}
        onClick={ handleClickOpen }
        component={Link} 
        to="/budgets/new"
      >
        <PostAddIcon/>
      </Button>
    </Grid>
  )
}

export default withStyles(styles)(SearchInput);