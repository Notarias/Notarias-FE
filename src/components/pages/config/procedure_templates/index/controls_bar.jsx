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
import { useMutation }                    from '@apollo/react-hooks';
import { GET_PROCEDURE_TEMPLATE }         from '../queries_and_mutations/queries'
import { CREATE_PROCEDURE_TEMPLATE }      from '../queries_and_mutations/queries'
import Link                         from '@material-ui/core/Link';

const styles_control_bar = (props) => {
  const { classes, searchLoading, onChangeSearch } = props;
  const [open, setOpen] = React.useState(false);
  const [templateName, setTemplateName] = React.useState(" ");
  const [pristine, setPristine] = React.useState(true)

  const [createProcedureTemplateMutation, createProcessInfo] =
  useMutation(
    CREATE_PROCEDURE_TEMPLATE,
    {
      // onError(apolloError) {
      //   setErrors(apolloError)
      // },
      update(store, cacheData) {
        // setError(false)
        const procedureTemplateData = store.readQuery({ query: GET_PROCEDURE_TEMPLATE });
        console.log(procedureTemplateData)
        // procedureTemplateData.clientAttributes.push(
        //   // cacheData.data.createClientAttribute.clientAttribute 
        // )
        // store.writeQuery({ query: GET_PROCEDURE_TEMPLATE, data: clientAttrsData });
        // setId(cacheData.data.createClientAttribute.clientAttribute.id)
       }
     }
   )

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setTemplateName(event.target.value);
    setPristine(false);
  };

  const createNewProcedureTemplate = (event) => {
    setOpen(false);
    createProcedureTemplateMutation({ variables: { name: templateName, active: true } })
  }

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
              onChange={ handleNameChange }
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
            // onClick={ createNewProcedureTemplate }
            variant="text" 
            color="primary" 
            size="small"
            disabled={ pristine }
            // component={Link} to="config/procedure_templates/${client.id}/edit"
          >                      
            <Link 
              href={ `/config/procedure_templates/9/edit` }
              color="inherit"
              underline="none"
            >
            Agregar
            </Link>
            {/* Agregar */}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
export default withStyles(styles)(styles_control_bar);
