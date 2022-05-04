import React, { useState }  from 'react'
import Grid                 from '@material-ui/core/Grid';
import Dialog               from '@material-ui/core/Dialog';
import CircularProgress     from '@material-ui/core/CircularProgress';
import SearchIcon           from '@material-ui/icons/Search';
import InputBase            from '@material-ui/core/InputBase';
import Button               from '@material-ui/core/Button';
import PersonAddIcon        from '@material-ui/icons/PersonAdd';
import UserNew              from './new';

export default (props) => {
  const { searchLoading, onChangeSearch, userQueriVariables } = props;
  
  const [createDialog, setCreateDialog] = useState(false);

  const switchCreateDialog = () => {
    setCreateDialog(!createDialog)
  }

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
