import React                from 'react'
import Grid                 from '@material-ui/core/Grid';
import CircularProgress     from '@material-ui/core/CircularProgress';
import SearchIcon           from '@material-ui/icons/Search';
import InputBase            from '@material-ui/core/InputBase';
import Button               from '@material-ui/core/Button';
import PersonAddIcon        from '@material-ui/icons/PersonAdd';
import { styles }           from './styles';
import { withStyles }       from '@material-ui/core/styles';

const styles_control_bar = (props) => {
  const { classes, searchLoading, onChangeSearch, newClientDialogSwitch } = props;
  return(
    <Grid container  direction="row"  justifyContent="flex-end"  alignItems="flex-end" >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          { 
            searchLoading ?
            <CircularProgress className={classes.searchLoadingIcon} size={25} /> :
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
      <Button variant="contained" color="primary" onClick={newClientDialogSwitch}>
        <PersonAddIcon/>
      </Button>
    </Grid>
  )
}
export default withStyles(styles)(styles_control_bar);
