import React, {useState}                                        from 'react';
import Button                                                   from '@material-ui/core/Button';
import Dialog                                                   from '@material-ui/core/Dialog';
import DialogContent                                            from '@material-ui/core/DialogContent';
import DialogTitle                                              from '@material-ui/core/DialogTitle';
import DialogActions                                            from '@material-ui/core/DialogActions';
import Grid                                                     from '@material-ui/core/Grid';
import { styles }                                               from '../styles';
import { withStyles }                                           from '@material-ui/core/styles';
import { useMutation }                                          from '@apollo/client';
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }                    from '../queries_and_mutations/queries'
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELD }                 from '../queries_and_mutations/queries'
import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }            from '../queries_and_mutations/queries'
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }         from '../queries_and_mutations/queries'
import AddIcon                                                  from '@material-ui/icons/Add';
import Divider                                                  from '@material-ui/core/Divider';
import NewFieldName                                             from './new_field_name'
import NewFieldsGroupName                                       from './new_fields_group_name'

const ButtonsNewFieldNewFieldsGroup = ({
  currentTab,
  classes,
  ...props
}) => {

  const [open, setOpen] = useState(false);
  const [renderValue, setRenderValue] = useState();
  const [fieldName, setFieldName] = useState("");
  const [groupFieldName, setGroupFieldName] = useState("");
  const [style, setStyle] = useState("");
  const [pristine, setPristine] = useState(true);
  const [error, setError] = useState(false);
  const [addOptions, setAddOptions] = useState(false);
  const [options, setOptions] = useState([]);
  const inputsList = ["name", "style"]

  const [createProcedureTemplateTabFieldMutation] =
    useMutation(
      CREATE_PROCEDURES_TEMPLATE_TAB_FIELD,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        onCompleted(cacheData) {
          setPristine(true);
          setError(false);
          setOpen(false);
          setOptions([]);
        },
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
    if (style === "dropdown"){
      createProcedureTemplateTabFieldMutation(
        { 
          variables: 
            { name: fieldName, tabId: currentTab.id, style: style, defaultValue: options}
        }
      )
    } else {
      createProcedureTemplateTabFieldMutation(
        { 
          variables: 
            { name: fieldName, tabId: currentTab.id, style: style, defaultValue: null}
        }
      )
    }
  }

  const [createProcedureTemplateTabFieldGroupsMutation] =
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
    setOptions([])
  };

  const handleFieldNameChange = (event) => {
    setFieldName(event.target.value);
    setPristine(false)
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    setPristine(false)
    if (event.target.value === "dropdown") {
      options.push("")
    } else {
      setOptions([])
    }
  };

  const addSelectOption = () => {
    options.push("")
    setAddOptions(!addOptions)
  }

  const handleFieldGroupNameChange = (event) => {
    setGroupFieldName(event.target.value);
    setPristine(false)
  };

  const renderNewFieldAndNewFieldsGroupButton = () => {
    return(
      <>
        <Grid container  justifyContent="center" alignItems="center" direction="row" style={{paddingBottom:'20px'}}>
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={ !currentTab }
              onClick={ fieldHandleClickOpen }
            >
              Campo  <AddIcon className={ classes.addIconMargin }/>
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={ !currentTab }
              onClick={ groupHandleClickOpen }
            >
              Grupo de Campos <AddIcon className={ classes.addIconMargin }/>
            </Button>
          </Grid>
        </Grid>
        <Divider/>
      </>
    )
  }

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" className={ classes.addFieldsAndGroupsButton } >
        { currentTab && renderNewFieldAndNewFieldsGroupButton() }
      </Grid>
      <Dialog
        open={open}
        onClose={ handleClose }
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle id="simple-dialog-title">
          Rellena los campos para continuar
        </DialogTitle >
        <Divider/>
        <DialogContent>
          <Grid container alignItems="center"  >
            { renderValue ?
              <NewFieldName
                fieldName={ fieldName }
                handleFieldNameChange={ handleFieldNameChange }
                error={ error }
                style={ style }
                handleStyleChange={ handleStyleChange }
                options={ options }
                setOptions={ setOptions }
                addSelectOption={ addSelectOption }
              />
            :
              <NewFieldsGroupName
                groupFieldName={ groupFieldName }
                handleFieldGroupNameChange={ handleFieldGroupNameChange }
                error={ error }
              />
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justifyContent="flex-end">
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
