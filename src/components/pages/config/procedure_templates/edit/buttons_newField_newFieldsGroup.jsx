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
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }                    from '../queries_and_mutations/queries'
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELD }                 from '../queries_and_mutations/queries'
import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }            from '../queries_and_mutations/queries'
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }         from '../queries_and_mutations/queries'
import AddIcon                                                  from '@material-ui/icons/Add';
import Divider                                                  from '@material-ui/core/Divider';
import FormControl                                              from '@material-ui/core/FormControl';
import TextField                                                from '@material-ui/core/TextField';
import Select                                                   from '@material-ui/core/Select';
import MenuItem                                                 from '@material-ui/core/MenuItem';
import InputLabel                                               from '@material-ui/core/InputLabel';


const ButtonsNewFieldNewFieldsGroup = ({
  currentTab,
  classes,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [renderValue, setRenderValue] = React.useState();
  const [fieldName, setFieldName] = React.useState("");
  const [style, setStyle] = React.useState("")
  const [groupFieldName, setGroupFieldName] = React.useState("");
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = React.useState(false)
  const inputsList = ["name", "style"]

  const [createProcedureTemplateTabFieldMutation, createProcessInfo] =
    useMutation(
      CREATE_PROCEDURES_TEMPLATE_TAB_FIELD,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        onCompleted(cacheData) {
          setPristine(true)
          setError(false)
          setOpen(false);
        },
        fetchPolicy: "no-cache",
        refetchQueries: [{
          query: GET_PROCEDURE_TEMPLATE_TAB_FIELDS,
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
    createProcedureTemplateTabFieldMutation(
      { 
        variables: 
          { "name": fieldName, "tabId": currentTab.id, "style": style},
          fetchPolicy: "no-cache",
      }
    )
  }

  const [createProcedureTemplateTabFieldGroupsMutation, createGroupProcessInfo] =
  useMutation(
    CREATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
    {
      onError(apolloError) {
        setErrors(apolloError)
      },
      onCompleted(cacheData) {
        setPristine(true)
        setError(false)
        setOpen(false);
      },
      refetchQueries: [{
        query: GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
        variables: { "id": currentTab && currentTab.id },
      }],
      awaitRefetchQueries: true
    }
  )

  const addNewFieldsGroup = (event) => {
    createProcedureTemplateTabFieldGroupsMutation(
      { 
        variables: 
          { "name": groupFieldName, "tabId": currentTab.id },
      }
    )
  }

  const fieldHandleClickOpen = (event) => {
    setOpen(true);
    setRenderValue(true);
    setPristine(true)
    setFieldName("")
    setStyle("")
  };

  const groupHandleClickOpen = (event) => {
    setOpen(true);
    setRenderValue(false)
    setPristine(true)
    setGroupFieldName("")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFieldNameChange = (event) => {
    setFieldName(event.target.value);
    setPristine(false)
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    setPristine(false)
  };

  const handleFieldGroupNameChange = (event) => {
    setGroupFieldName(event.target.value);
    setPristine(false)
  };

  const renderNewFieldAndNewFieldsGroupButton = () => {
    return(
      <Grid container  justify="center" alignItems="center" direction="row" >
        <Grid item xs={4}>
          <Typography variant="button" display="block" gutterBottom>
            {
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={ !currentTab }
                onClick={ fieldHandleClickOpen }
              >
                Campo  <AddIcon className={ classes.addIconMargin }/>
              </Button>
            }
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="button" display="block" gutterBottom>
            {
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={ !currentTab }
                onClick={ groupHandleClickOpen }
              >
                Grupo de Campos <AddIcon className={ classes.addIconMargin }/>
              </Button>
            }
          </Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <Grid container justify="center" alignItems="center" className={ classes.addFieldsAndGroupsButton } >
        { currentTab && renderNewFieldAndNewFieldsGroupButton() }
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
            {
              (renderValue)?
                (
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
                    <Grid container item xs={1}>
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
                )
              :
                (
                  <Grid>
                    <TextField 
                      id="filled-basic"
                      label="Nombre del Grupo"
                      value={ groupFieldName } 
                      variant="filled" 
                      size="small" 
                      onChange={ handleFieldGroupNameChange }
                      error={ !!error["name"] && true }
                      helperText={error["name"] || " "}
                      errorskey={ "name" }
                      name='name'
                    />
                  </Grid>
                )
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="flex-end">
            <Button onClick={ handleClose } color="secondary" >
              Cancelar
            </Button>
            <Button 
              onClick={ renderValue ? addNewField : addNewFieldsGroup } 
              color="primary"
              variant="contained"
              disabled={ pristine }
            >
              { renderValue ? "Añadir campo" : "Añadir grupo"}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default  withStyles(styles)(ButtonsNewFieldNewFieldsGroup);
