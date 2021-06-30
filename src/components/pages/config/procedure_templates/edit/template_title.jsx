import React, { useEffect, useState }     from 'react';
import TextField                          from '@material-ui/core/TextField';
import Grid                               from '@material-ui/core/Grid';
import { styles }                         from '../styles';
import { withStyles }                     from '@material-ui/core/styles';
import Typography                         from '@material-ui/core/Typography';
import Button                             from '@material-ui/core/Button';
import SaveIcon                           from '@material-ui/icons/Save';
import CreateIcon                         from '@material-ui/icons/Create';
import { useMutation }                    from '@apollo/react-hooks';
import { UPDATE_PROCEDURE_TEMPLATES }     from '../queries_and_mutations/queries';


const TemplateTitle = (props) => {

  const { classes, templateData, match } = props
  const [active, setActive] = React.useState(templateData.active);
  const [id, ] = useState(match.id);
  const [editing, setEditing] = useState(true);
  const [name, setName] = useState(templateData.name)
  const [error, setError] = useState(false)
  const inputsList = ["name"]

  useEffect(
    () => {
      setName(templateData.name) 
      setActive(templateData.active)
    },
    [templateData]
  )

  const [updateProceduresTemplateMutation, updateProcessInfo] =
    useMutation(
      UPDATE_PROCEDURE_TEMPLATES,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        update(store, cacheData) {
          setError(false)
          setEditing(!editing)
        }
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
    setName(event.target.value);
  };

  const updateTemplate = (event) => {
    updateProceduresTemplateMutation(
      {
        variables: { id: id , name: name}
      }
    )
  }

  const changeTittle = () => {
    setEditing(!editing)
  }

  const loadingTemplate = updateProcessInfo.loading

  const renderTittleText = (name) => {
    return(
      <>
        <Grid className={ classes.templateTextTittle } onClick={ changeTittle }>
          <Typography variant="overline" >
            { name }
          </Typography>
        </Grid>
        <Button
          className={ classes.templateTittleButton }
          onClick={ changeTittle }
        >
          <CreateIcon />
        </Button>
      </>
    )
  }

  const renderTittleInput = (name) => {
    return(
      <>
        <Grid item>
          <TextField 
            id="standard-basic" 
            label="Nombre de la plantilla"
            value={ name }
            className={ classes.textInputTittle }
            onChange={ handleNameChange }
            error={ !!error["name"] && true }
            helperText={error["name"] || " "}
            errorskey={ "name" }
            name='name'
          />
        </Grid>
        <Grid item className={ classes.saveTittleButton }>
          <Button
            onClick={ updateTemplate }
            color="primary"
            disabled={ loadingTemplate }
          >
            <SaveIcon/>
          </Button>
        </Grid>
      </>
    )
  }

  const markStatus = () => {
    if(!active) {
      return  classes.statusTemplateRow 
    }
  }

  return(
    <Grid
      container 
      item
      xs={12}
      className={ markStatus() }
    >
      { editing ? renderTittleText(name) : renderTittleInput(name) }
    </Grid>
  )
}

export default withStyles(styles)(TemplateTitle);
