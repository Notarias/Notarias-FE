import React                from 'react'
import Grid                 from '@material-ui/core/Grid';
import CircularProgress     from '@material-ui/core/CircularProgress';
import SearchIcon           from '@material-ui/icons/Search';
import InputBase            from '@material-ui/core/InputBase';
import Button               from '@material-ui/core/Button';
import { styles }           from '../styles';
import { withStyles }       from '@material-ui/core/styles';
import PostAddIcon          from '@material-ui/icons/PostAdd';

const styles_control_bar = (props) => {
  const { classes, searchLoading, onChangeSearch } = props;
  return(
    <Grid container  direction="row"  justify="flex-end"  alignItems="flex-end" >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          { 
            searchLoading ?
            <CircularProgress size={25} /> :
            <SearchIcon /> 
          }
        </div>
        <InputBase
          placeholder="Buscar…"
          onChange={onChangeSearch}
          classes={{
            root: classes.searchInputRoot,
            input: classes.searchInputInput,
          }}
        />
      </div>
      <Button variant="contained" color="primary">
        <PostAddIcon/>
      </Button>
    </Grid>
  )
}
export default withStyles(styles)(styles_control_bar);
