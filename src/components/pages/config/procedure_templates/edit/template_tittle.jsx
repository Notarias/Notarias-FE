import React                        from 'react';
import TextField                    from '@material-ui/core/TextField';
import Grid                         from '@material-ui/core/Grid';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Typography                   from '@material-ui/core/Typography';
import Button                       from '@material-ui/core/Button';
import SaveIcon                     from '@material-ui/icons/Save';
import CreateIcon                   from '@material-ui/icons/Create';

const TemplateTittle = (props) => {

  const { classes, templateData } = props
  const [value, setValue] = React.useState(true);
  const [templateName, setTemplateName] = React.useState(templateData.name)

  const handleNameChange = (event) => {
    setTemplateName(event.target.value);
  };


  
  const changeTittle = () => {
    setValue(!value)
  }

  const renderTittleText = () => {

    return(
      <>
        <Grid alignItems="center" className={ classes.templateTextTittle } onClick={ changeTittle }>
          <Typography variant="overline" >
            { templateName }
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
            value={ templateName }
            className={ classes.textInputTittle }
            onChange={ handleNameChange }
          />
        </Grid>
        <Grid item className={ classes.saveTittleButton }>
          <Button
            onClick={ changeTittle }
            color="primary"
          >
            <SaveIcon/>
          </Button>
        </Grid>
      </>
    )
  }

  console.log("tittle", templateData.name)

  return(
    <Grid container item >
      { value ? renderTittleText() : renderTittleInput() }
    </Grid>
  )
}

export default withStyles(styles)(TemplateTittle);
