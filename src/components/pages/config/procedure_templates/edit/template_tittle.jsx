import React, { useEffect, useState }                              from 'react';
import TextField                          from '@material-ui/core/TextField';
import Grid                               from '@material-ui/core/Grid';
import { styles }                         from '../styles';
import { withStyles }                     from '@material-ui/core/styles';
import Typography                         from '@material-ui/core/Typography';
import Button                             from '@material-ui/core/Button';
import SaveIcon                           from '@material-ui/icons/Save';
import CreateIcon                         from '@material-ui/icons/Create';
import { useMutation }                    from '@apollo/react-hooks';
import { GET_PROCEDURE_TEMPLATE }         from '../queries_and_mutations/queries'
import { UPDATE_PROCEDURE_TEMPLATES }     from '../queries_and_mutations/queries'


const TemplateTittle = (props) => {

  const { classes, templateData, match } = props
  const [id, setId] = useState(match.id);
  const [editing, setEditing] = useState(true);
  const [name, setName] = useState(templateData.name)

  const [error, setError] = useState(false)

  const inputsList = ["name"]

  useEffect(
    () => {
      setName(templateData.name)
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
          
          //setName(cacheData.proceduresTemplate)
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
      setError(errorsList);//{name: "mensaje", style: "mensaje"} 
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


  return(
    <Grid container item >
      { editing ? renderTittleText(name) : renderTittleInput(name) }
    </Grid>
  )
}

export default withStyles(styles)(TemplateTittle);
