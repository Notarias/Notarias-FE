import React                              from 'react'
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

const ControlBar = (props) => {
  const { classes, searchLoading, onChangeSearch } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <Button variant="contained" color="primary" onClick={ handleClickOpen }>
        <PostAddIcon/>
      </Button>
        <Dialog open={open} onClose={ handleClose }>
        <DialogTitle>
          Se añadirá una nueva plantilla.
        </DialogTitle>
        <DialogContent>
          Título de la plantilla de trámites.
          <TextField
              autoFocus
              margin="dense"
              id="name"
              variant="filled"
              fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={ handleClose }
            variant="text" 
            size="small" 
          >
            cancelar
          </Button>
          <Button
            onClick={ handleClose }
            variant="text" 
            color="primary" 
            size="small" 
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
export default withStyles(styles)(ControlBar);
