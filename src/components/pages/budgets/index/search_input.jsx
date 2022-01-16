import React, { createRef }               from 'react'
import Grid                               from '@material-ui/core/Grid';
import CircularProgress                   from '@material-ui/core/CircularProgress';
import SearchIcon                         from '@material-ui/icons/Search';
import InputBase                          from '@material-ui/core/InputBase';
import Button                             from '@material-ui/core/Button';
import { styles }                         from '../styles';
import { withStyles }                     from '@material-ui/core/styles';
import PostAddIcon                        from '@material-ui/icons/PostAdd';
import PageviewIcon                       from '@material-ui/icons/Pageview';
import { Link }             from 'react-router-dom';

const SearchInput = (props) => {
  const { 
    classes, 
    searchLoading,
    onChangeSearch,
    switchAdvancedSearchClick,
    runAdvancedSearch
  } = props
  const [open, setOpen] = React.useState(false)
  const simpleSearchInputRef = createRef()

  const handleClickOpen = (event) => {
    setOpen(!open);
  };

  return(
    <Grid container  direction="row"  justifyContent="flex-end"  alignItems="flex-end" >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          { 
            searchLoading ?
            <CircularProgress size={25} /> :
            <SearchIcon size={25} /> 
          }
        </div>
        <InputBase
          disabled={open}
          placeholder={ !runAdvancedSearch ? "Buscar por cliente" : "Buscando…"}
          onChange={onChangeSearch}
          inputRef={simpleSearchInputRef}
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
        onClick={ switchAdvancedSearchClick(simpleSearchInputRef, handleClickOpen) }
      >
        <PageviewIcon/>
      </Button>
      <Button 
        variant="contained" 
        color="primary"
        className={classes.newBudgetButton}
        component={Link}
        to="/budgets/new"
      >
        <PostAddIcon/>
      </Button>
    </Grid>
  )
}

export default withStyles(styles)(SearchInput);
