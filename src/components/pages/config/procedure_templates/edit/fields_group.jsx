import React                        from 'react';
import Field                        from './field';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';
import AddBoxTwoToneIcon            from '@material-ui/icons/AddBoxTwoTone';
import TextField                    from '@material-ui/core/TextField';



const FieldsGroup = (props) => {
  const { classes } = props
  const { index } = props
  const [fieldList, setfieldList] = React.useState([])

  const addNewField = (event) => {
    setfieldList(fieldList.concat([fieldList]));
  }

  const renderFieldList = () => {
    return(
      fieldList.map(
        (field, index) => {
          return(
            <Field
              key={ index + "-fieldInGroup"}
              arrayIndex={ index }
            />
          )
        }
      )
    )
  }


  return(
    <Grid container className={ classes.roundedBorderDialog }>
      <Grid container direction="row" alignItems="flex-end" className={ classes.buttonAddFieldInGroup }>
        <Grid container item xs={8} alignItems="flex-start">
        <TextField 
          id="filled-basic" 
          defaultValue={ "Grupo 1" } 
          variant="filled" 
          size="small" 
          inputProps={{ 'aria-label': 'description' }}
        />
        </Grid>
        <Grid container item xs={4} justify="flex-end">
        <Button
          onClick={ addNewField }
        >
          <AddBoxTwoToneIcon/>
        </Button>
        </Grid>
      </Grid>
      <Field
        key={ index + "-fields"}
      />
      {
        renderFieldList()
      }
    </Grid>
    
  )
}

export default  withStyles(styles)(FieldsGroup);
