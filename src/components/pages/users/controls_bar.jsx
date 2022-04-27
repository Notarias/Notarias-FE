import React from 'react'
import Grid                 from '@material-ui/core/Grid';
import CircularProgress     from '@material-ui/core/CircularProgress';
import SearchIcon           from '@material-ui/icons/Search';
import InputBase            from '@material-ui/core/InputBase';
import Button               from '@material-ui/core/Button';
import PersonAddIcon        from '@material-ui/icons/PersonAdd';
import { Link }             from 'react-router-dom';

export default (props) => {
  const { searchLoading, onChangeSearch } = props;
  return(
    <Grid container item direction="row" xs={8} justifyContent="flex-end"  alignItems="center" spacing={1} style={{padding: '25px'}}>
      <Grid container item xs={1} justifyContent="flex-end">
        { 
          searchLoading ?
          <CircularProgress size={25}/> :
          <SearchIcon />
        }
      </Grid>
      
      <Grid container item xs={4} justifyContent="flex-end">
        <InputBase
          placeholder="Buscar…"
          onChange={onChangeSearch}
          inputProps={{predicate: "all_fields.cont"}}
        />
      </Grid>

      <Grid container item xs={2} justifyContent="flex-end">
        <Button component={Link} to="/users/new" variant="contained" color="primary">
          <PersonAddIcon/>
        </Button>
      </Grid>
    </Grid>
  )
}
