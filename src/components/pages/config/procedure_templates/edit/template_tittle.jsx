import React, { useEffect }                              from 'react';
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
  const [id, setId] = React.useState(match.id);
  const [value, setValue] = React.useState(true);
  const [name, setName] = React.useState(templateData.name)
  const [error, setError] = React.useState(false)
  // let variables = {
  //   name: name
  // }

  const inputsList = ["name"]

  const [updateProceduresTemplateMutation, updateProcessInfo] =
    useMutation(
      UPDATE_PROCEDURE_TEMPLATES,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        update(store, cacheData) {
          setError(false)
          const proceduresTemplateData = store.readQuery({
            query: GET_PROCEDURE_TEMPLATE, 
            variables: { id: id }
          });
          setValue(!value)
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
        variables: { id: id , name: name},
        // fetchPolicy: "no-cache"
      }
    )
  }

  const changeTittle = () => {
    setValue(!value)
  }

  const loadingTemplate = updateProcessInfo.loading

  const renderTittleText = () => {

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

  const renderTittleInput = () => {

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

  // useEffect(() => {
  //   refetch(variables);
  // }, [name])

  return(
    <Grid container item >
      { value ? renderTittleText() : renderTittleInput() }
    </Grid>
  )
}

export default withStyles(styles)(TemplateTittle);
