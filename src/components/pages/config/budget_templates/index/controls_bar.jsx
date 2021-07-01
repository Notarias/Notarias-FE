import React, { useState }                    from 'react'
import Grid                                   from '@material-ui/core/Grid';
import CircularProgress                       from '@material-ui/core/CircularProgress';
import Dialog                                 from '@material-ui/core/Dialog';
import DialogContent                          from '@material-ui/core/DialogContent';
import DialogTitle                            from '@material-ui/core/DialogTitle';
import DialogActions                          from '@material-ui/core/DialogActions';
import TextField                              from '@material-ui/core/TextField'
import SearchIcon                             from '@material-ui/icons/Search';
import InputBase                              from '@material-ui/core/InputBase';
import Button                                 from '@material-ui/core/Button';
import { styles }                             from '../styles';
import { withStyles }                         from '@material-ui/core/styles';
import PostAddIcon                            from '@material-ui/icons/PostAdd';
import { useMutation }                        from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATES_QUICK_LIST } from '../queries_and_mutations/queries'
import { CREATE_BUDGETING_TEMPLATE }          from '../queries_and_mutations/queries'
import { Redirect }                           from 'react-router-dom';

const ControlBar = (props) => {
  const { classes, searchLoading, onChangeSearch } = props;
  const [open, setOpen] = React.useState(false);
  const [templateName, setTemplateName] = useState(" ");
  const [redirect, setRedirect] = useState(false)
  const [pristine, setPristine] = useState(true)
  const [error, setError] = useState(false)
  const inputsList = ["name"]

  const [createBudgetingTemplateMutation] =
  useMutation(
    CREATE_BUDGETING_TEMPLATE,
    {
      onError(apolloError) {
        setErrors(apolloError)
        setPristine(true)
      },
      onCompleted(cacheData) {
        setOpen(false);
        setError(false)
        const id = cacheData.createBudgetingTemplate.budgetingTemplate.id
        id && setRedirect(
          <Redirect to={{ pathname: `/config/budget_templates/${id}/edit` }} />
        )
      },
      refetchQueries: [{
        query: GET_BUDGETING_TEMPLATES_QUICK_LIST
      }],
      awaitRefetchQueries: true
    }
  )

  const setErrors = (apolloError) => {
    let errorsList = {}
    let errorTemplateList = apolloError.graphQLErrors
    for ( let i = 0; i < errorTemplateList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorTemplateList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorTemplateList[i].message
        }
      }
    }
    setError(errorsList)
  }

  const handleNameChange = (event) => {
    setTemplateName(event.target.value);
    setPristine(false);
  };

  const createNewBudgetingTemplate = (event) => {
    createBudgetingTemplateMutation({ variables: { name: templateName }})
  }

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
          Título de la plantilla de Presupuestos.
          <TextField
              autoFocus
              margin="dense"
              id="name"
              variant="filled"
              fullWidth
              onChange={ handleNameChange }
              error={ !!error["name"] && true }
              helperText={error["name"] || " "}
              errorskey={ "name" }
              name='name'
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
            onClick={ createNewBudgetingTemplate }
            variant="text"
            color="primary"
            size="small"
            disabled={ pristine }
          >
            { redirect }
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default withStyles(styles)(ControlBar);
