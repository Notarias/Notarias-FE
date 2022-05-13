import React, { useState }  from 'react'
import Grid                 from '@material-ui/core/Grid';
import Dialog               from '@material-ui/core/Dialog';
import CircularProgress     from '@material-ui/core/CircularProgress';
import SearchIcon           from '@material-ui/icons/Search';
import InputBase            from '@material-ui/core/InputBase';
import Button               from '@material-ui/core/Button';
import PersonAddIcon        from '@material-ui/icons/PersonAdd';
import UserNew              from './new';
import { styles }           from './styles';
import { withStyles }       from '@material-ui/core/styles';

const ControlBar = (props) => {
  const { classes, searchLoading, onChangeSearch, userQueriVariables } = props;
  
  const [createDialog, setCreateDialog] = useState(false);

  const switchCreateDialog = () => {
    setCreateDialog(!createDialog)
  }

  return(
    <Grid container item direction="row" justifyContent="flex-end"  alignItems="center" style={{padding: '25px'}}>
      <Grid container item direction="row"  justifyContent="flex-end"  alignItems="flex-end" >
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
        <Button onClick={switchCreateDialog} variant="contained" color="primary">
          <PersonAddIcon/>
        </Button>
      </Grid>
      <Dialog
        open={createDialog}
        onClose={switchCreateDialog}
        fullWidth
      >
        <UserNew
          switchCreateDialog={switchCreateDialog}
          userQueriVariables={userQueriVariables}
        />
      </Dialog>
    </Grid>
  )
}

export default withStyles(styles)(ControlBar);
