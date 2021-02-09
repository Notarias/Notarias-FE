import React                                                    from 'react';
import Button                                                   from '@material-ui/core/Button';
import Dialog                                                   from '@material-ui/core/Dialog';
import DialogContent                                            from '@material-ui/core/DialogContent';
import DialogTitle                                              from '@material-ui/core/DialogTitle';
import DialogActions                                            from '@material-ui/core/DialogActions';
import Grid                                                     from '@material-ui/core/Grid';
import Typography                                               from '@material-ui/core/Typography';
import { styles }                                               from '../styles';
import { withStyles }                                           from '@material-ui/core/styles';
import { useMutation }                                          from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }                    from '../queries_and_mutations/queries'
import { CREATE_BUDGETING_TEMPLATE_TAB_FIELD }                 from '../queries_and_mutations/queries'
import AddIcon                                                  from '@material-ui/icons/Add';
import Divider                                                  from '@material-ui/core/Divider';
import FormControl                                              from '@material-ui/core/FormControl';
import TextField                                                from '@material-ui/core/TextField';
import Select                                                   from '@material-ui/core/Select';
import MenuItem                                                 from '@material-ui/core/MenuItem';
import InputLabel                                               from '@material-ui/core/InputLabel';


const ButtonNewField = ({
  currentTab,
  classes,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [fieldName, setFieldName] = React.useState("");
  const [style, setStyle] = React.useState("")
  const [pristineA, setPristineA] = React.useState(true)
  const [pristineB, setPristineB] = React.useState(true)
  const [error, setError] = React.useState(false)
  const inputsList = ["name", "style"]

  const [createBudgetingTemplateTabFieldMutation, createProcessInfo] =
    useMutation(
      CREATE_BUDGETING_TEMPLATE_TAB_FIELD,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        onCompleted(cacheData) {
          setError(false)
          setOpen(false);
        },
        fetchPolicy: "no-cache",
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
      setError(errorsList);//{name: "mensaje", style: "mensaje"} 
    }

  const addNewField = (event) => {
    createBudgetingTemplateTabFieldMutation(
      { 
        variables: 
          { "name": fieldName, "tabId": currentTab.id, "style": style},
          fetchPolicy: "no-cache",
      }
    )
  }

  const fieldHandleClickOpen = (event) => {
    setOpen(true);
    setPristineA(true)
    setPristineB(true)
    setFieldName("")
    setStyle("")
  };

  const handleClose = () => {
    setOpen(false);
    setError(false)
  };

  const handleFieldNameChange = (event) => {
    setFieldName(event.target.value);
    setPristineA(false)
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    setPristineB(false)
  };

  const renderNewFieldButton = () => {
    return(
      <Grid container  justify="center" alignItems="center" direction="row" >
        <Grid item xs={4}>
          <Typography variant="button" display="block" gutterBottom>
            {<Button
              variant="contained"
              color="primary"
              size="small"
              disabled={ !currentTab }
              onClick={ fieldHandleClickOpen }
            >
              Campo  <AddIcon className={ classes.addIconMargin }/>
            </Button>}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <Grid container justify="center" alignItems="center" className={ classes.addFieldButton } >
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
                <FormControl variant="outlined" className={ classes.textFieldTittleType }>
                  <InputLabel id="label-field">Selecciona el tipo de campo</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    name='style'
                    value={ style }
                    onChange={ handleStyleChange }
                    error={ !!error["style"] && true }
                    helperText={error["style"] || " "}
                    errorskey={ "style" }
                  >
                    <MenuItem key='string' value={'string'}>Texto</MenuItem>
                    <MenuItem key='number' value={'number'}>Numerico</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
           </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="flex-end">
            <Button onClick={ handleClose } color="secondary" >
              Cancelar
            </Button>
            <Button 
              onClick={ addNewField } 
              color="primary"
              variant="contained"
              disabled={ pristineA || pristineB }
            >
              "Añadir campo"
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default  withStyles(styles)(ButtonNewField);
