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

  const { classes } = props
  const [value, setValue] = React.useState(true);
  const [templateName, setTemplateName] = React.useState("Nombre de la plantilla")

  const handleNameChange = (event) => {
    setTemplateName(event.target.value);
  };


  
  const changeTittle = () => {
    setValue(!value)
    console.log("running")
  }

  const renderTittleText = () => {

    return(
      <>
        <Grid item onClick={ changeTittle }>
          <Typography variant="h6" gutterBottom>
            { templateName }
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={ classes.templateTittle }
            onClick={ changeTittle }
          >
            <CreateIcon fontSize="inherit"/>
          </Button>
        </Grid>
      </>
    )
  }

  const renderTittleInput = () => {

    return(
      <>
        <Grid>
          <TextField 
            id="standard-basic" 
            label="Nombre de la plantilla"
            value={ templateName }
            className={ classes.textFieldTittle }
            onChange={ handleNameChange }
          />
        </Grid>
        <Grid>
          <Button
            onClick={ changeTittle }
          >
            <SaveIcon/>
          </Button>
        </Grid>
      </>
    )
  }



  return(
    <Grid container item>
      { value ? renderTittleText() : renderTittleInput() }
    </Grid>
  )
}

export default withStyles(styles)(TemplateTittle);
