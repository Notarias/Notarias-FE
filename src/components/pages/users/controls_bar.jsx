import React from 'react'
import Grid                 from '@material-ui/core/Grid';
import CircularProgress     from '@material-ui/core/CircularProgress';
import SearchIcon           from '@material-ui/icons/Search';
import InputBase            from '@material-ui/core/InputBase';
import Button               from '@material-ui/core/Button';
import PersonAddIcon        from '@material-ui/icons/PersonAdd';
import { Link }             from 'react-router-dom';

export default (props) => {
  const { classes, searchLoading, onChangeSearch } = props;
  return(
    <Grid container  direction="row"  justify="flex-end"  alignItems="flex-end" className={classes.usersTableBarWrapper}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          { 
            searchLoading ?
            <CircularProgress className={classes.searchLoadingIcon} size={25}/> :
            <SearchIcon />
          }
        </div>
        <InputBase
          placeholder="Buscar…"
          onChange={onChangeSearch}
          inputProps={{predicate: "all_fields.cont"}}
          classes={{
            root: classes.searchInputRoot,
            input: classes.searchInputInput,
          }}
        />
      </div>
      <Button component={Link} to="/users/new" variant="contained" color="primary">
        <PersonAddIcon/>
      </Button>
    </Grid>
  )
}
