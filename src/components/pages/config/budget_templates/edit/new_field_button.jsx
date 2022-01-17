import React                                                    from 'react';
import Button                                                   from '@material-ui/core/Button';
import Dialog                                                   from '@material-ui/core/Dialog';
import DialogContent                                            from '@material-ui/core/DialogContent';
import DialogTitle                                              from '@material-ui/core/DialogTitle';
import DialogActions                                            from '@material-ui/core/DialogActions';
import Grid                                                     from '@material-ui/core/Grid';
import { styles }                                               from '../styles';
import { withStyles }                                           from '@material-ui/core/styles';
import { useMutation }                                          from '@apollo/client';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }                    from '../queries_and_mutations/queries'
import { CREATE_BUDGETING_TEMPLATE_TAB_FIELD }                  from '../queries_and_mutations/queries'
import AddIcon                                                  from '@material-ui/icons/Add';
import Divider                                                  from '@material-ui/core/Divider';
import TextField                                                from '@material-ui/core/TextField';
import { GLOBAL_MESSAGE }                                       from '../../../../../resolvers/queries';
import client                                                   from '../../../../../apollo';

const NewFieldButton = ({
  currentTab,
  classes,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [fieldName, setFieldName] = React.useState("");
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = React.useState(false)
  const inputsList = ["name", "categories"]

  const [createBudgetingTemplateTabFieldMutation] =
    useMutation(
      CREATE_BUDGETING_TEMPLATE_TAB_FIELD,
      {
        onError(apolloError) {
          setErrors(apolloError)
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Ocurrió un error",
                type: "error",
                __typename: "globalMessage"
              }
            }
          })
        },
        onCompleted(cacheData) {
          setError(false)
          setOpen(false);
        },
        refetchQueries: [{
          query: GET_BUDGETING_TEMPLATE_TAB_FIELDS,
          variables: { "id": currentTab && currentTab.id },
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
      setError(errorsList);
    }

  const addNewField = (event) => {
    createBudgetingTemplateTabFieldMutation(
      { 
        variables: 
          { "name": fieldName, "tabId": currentTab.id}
      }
    )
  }

  const addNewFieldClickOpen = (event) => {
    setOpen(true);
    setPristine(true)
    setFieldName("")
  };

  const handleClose = () => {
    setOpen(false);
    setError(false)
  };

  const handleFieldNameChange = (event) => {
    setFieldName(event.target.value);
    setPristine(false)
  };


  const renderNewFieldButton = () => {
    return(
      <Button
        variant="contained"
        color="primary"
        size="small"
        disabled={ !currentTab }
        onClick={ addNewFieldClickOpen }
      >
        Campo  <AddIcon className={ classes.addIconMargin }/>
      </Button>
    )
  }

  return (
    <>
      <Grid container item justifyContent="flex-end" alignItems="center" className={ classes.addFieldButton } xs={6} >
       { currentTab && renderNewFieldButton() }
      </Grid>
      <Dialog open={open} onClose={ handleClose }>
        <DialogTitle 
          id="simple-dialog-title"
          className={ classes.tittleDialogWidth }
        >
          Rellena los campos para continuar
        </DialogTitle >
        <Divider/>
        <DialogContent>
          <Grid container alignItems="center"  >
            <Grid container direction="row">
              <Grid container item xs={6}>
                <TextField 
                  id="fieldName" 
                  label="Editar nombre"
                  autoFocus
                  className={ classes.textInputTittleName }
                  value={ fieldName }
                  onChange={ handleFieldNameChange }
                  error={ !!error["name"] && true }
                  helperText={error["name"] || " "}
                  errorskey={ "name" }
                  name='name'
                />
              </Grid>
              <Grid container item xs={5}>
              </Grid>
            </Grid>
           </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justifyContent="flex-end">
            <Button onClick={ handleClose } color="secondary" >
              Cancelar
            </Button>
            <Button 
              onClick={ addNewField } 
              color="primary"
              variant="contained"
              disabled={ pristine }
            >
              Añadir campo
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default  withStyles(styles)(NewFieldButton);
