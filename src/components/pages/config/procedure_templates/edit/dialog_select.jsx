import React                          from 'react';
import Button                         from '@material-ui/core/Button';
import Dialog                         from '@material-ui/core/Dialog';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import DialogActions                  from '@material-ui/core/DialogActions';
import Radio                          from '@material-ui/core/Radio';
import Grid                           from '@material-ui/core/Grid';
import Typography                     from '@material-ui/core/Typography';
import { styles }                     from '../styles';
import { withStyles }                 from '@material-ui/core/styles';
import { CREATE_PROCEDURES_TEMPLATE_TAB_FIELD }     from '../queries_and_mutations/queries'
import PostAddIcon                  from '@material-ui/icons/PostAdd';
import { useMutation }                              from '@apollo/react-hooks';
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }    from '../queries_and_mutations/queries'

const DialogSelect = ({
  currentTab,
  // setRefreshAll,
  ...props
}) => {

  const [createProcedureTemplateTabFieldMutation, createProcessInfo] =
    useMutation(
      CREATE_PROCEDURES_TEMPLATE_TAB_FIELD,
      {
        // onError(apolloError) {
        //   setErrors(apolloError)
        // },
        onCompleted(cacheData) {
          // setRefreshAll('RefreshFields' + cacheData.createProceduresTemplateField.proceduresTemplateField.id)
          // setError(false)
          // const proceduresTemplateTabData = store.readQuery({
          //   query: GET_PROCEDURES_TEMPLATE_TABS, 
          //   variables: { "proceduresTemplateId": proceduresTemplateId }
          // });
          // console.log("cacheData", cacheData, proceduresTemplateTabData)
          // clientAttrsData.clientAttributes.push(
          //   cacheData.data.createClientAttribute.clientAttribute 
          // )
          // store.writeQuery({ query: GET_CLIENT_ATTRIBUTE, data: clientAttrsData });
          // setId(cacheData.data.createClientAttribute.clientAttribute.id)
          // )
          // store.writeQuery({ query: GET_PROCEDURES_TEMPLATE_TABS, data: clientAttrsData });
        },
        refetchQueries: [{
          query: GET_PROCEDURE_TEMPLATE_TAB_FIELDS,
          variables: { "id": currentTab && currentTab.id },
        }],
        awaitRefetchQueries: true
      }
    )

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [fieldName, setFieldName] = React.useState("Editar nombre");

  const { classes } = props

  
  const addNewField = (event) => {
    createProcedureTemplateTabFieldMutation(
      { 
        variables: 
          { "name": fieldName, "tabId": currentTab.id },
      }
    )
    // const newTab = { name: tabName, id: proceduresTemplateId }
    // setTabList(tabList.concat([newTab]));//TODO: hacer la mutacion
    setOpen(false);
  }

  // const removeFromList = (index) => {
  //   fieldList.splice(index, 1)
  //   let newArray = fieldList.slice()
  //   setfieldList(newArray)
  // }

  const addNewFieldsGroup = (event) => {
    // setFieldsGroupList(fieldsGroupList.concat([fieldsGroupList]));
    setOpen(false);
  }

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setDisabled(false);
  };

  const radioSelect = () => {
    if (value === "field" || value === "fieldsGroup") {
      return (
        "Añadir"
      )
    } else {
      return "Elige una opcion"
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={ handleClickOpen }
        className={ classes.buttonHeight }
        disabled={ !currentTab }
      >
      <PostAddIcon/>
      </Button>
      <Dialog open={open} onClose={ handleClose }>
        <DialogTitle 
          id="simple-dialog-title"
          className={ classes.tittleDialogWidth }
        >
          Crear Campos
        </DialogTitle >
        <DialogContent>
          <Grid container alignItems="center"  >
            <Grid 
              container 
              direction="column" 
              // item xs={6} 
              justify="center" 
              alignItems="center" 
              className={ value === 'field' ?  classes.roundedBorderDialog : classes.roundedBorderDialogSelected  }
            >
            <Typography
              variant="button"
            >
              Campo
            </Typography>
            <Radio
              checked={value === 'field'}
              onChange={handleChange}
              value="field"
              name="radio-button-field"
              color="primary"
            />
            <Typography
              variant="caption"
            >
              Agrega un campo a la hoja.
            </Typography>
            </Grid>
            <Grid 
              container 
              direction="column" 
              // item xs={6} 
              justify="center" 
              alignItems="center" 
              className={ value === 'fieldsGroup' ?  classes.roundedBorderDialog : classes.roundedBorderDialogSelected }>
            <Typography
              variant="button"
            >
              Grupo de Campos
            </Typography>
            <Radio
              checked={value === 'fieldsGroup'}
              onChange={handleChange}
              value="fieldsGroup"
              name="radio-button-group"
              color="primary"
            />
            <Typography
              variant="caption"
            >
              Agrega un Grupo de campos a la hoja.
            </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="flex-end">
            <Button onClick={ handleClose } color="secondary" >
              Cancelar
            </Button>
            <Button 
              onClick={ value === 'field' ? addNewField : addNewFieldsGroup } 
              color="primary"
              variant="contained"
              disabled={ disabled }
            >
              { radioSelect() }
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default  withStyles(styles)(DialogSelect);
