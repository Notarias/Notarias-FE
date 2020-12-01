import React                        from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';
import AddIcon                      from '@material-ui/icons/Add';
import TextField                    from '@material-ui/core/TextField';
import FieldsGroupFieldList         from './fields_groups_fields_list';
import Paper                        from '@material-ui/core/Paper';
import Divider                      from '@material-ui/core/Divider';


const FieldsGroup = (props) => {

  const { classes, group, groupName, addNewField, groupId } = props


  // const handleGroupNameChange = (event) => {
  //   setGroupName(event.target.value);
  // };

  return(
    <Paper className={ classes.roundedBorderGruop }>
      <Divider/>
      <Grid container>
        <Grid container  alignItems="center" className={ classes.buttonAddFieldInGroup }>
          <Grid container item xs={10} alignItems="flex-start">
            <TextField 
              id="filled-basic"
              label="Nombre del Grupo"
              value={ groupName } 
              variant="filled" 
              size="small" 
              // inputProps={{ 'aria-label': 'description' }}
              // onChange={ handleGroupNameChange }
            />
            { groupId }
          </Grid>
          <Grid container item xs={2} justify="flex-end">
            <Button
              onClick={ addNewField }
              variant="outlined"
              color="primary"
              size="small"
            >
              <AddIcon/>
            </Button>
          </Grid>
        </Grid>
        <FieldsGroupFieldList
          addNewField={ addNewField }
          groupId={ groupId }
          // removeFromList={ removeFromList }
        />
      </Grid>
    </Paper>
  )
}

export default  withStyles(styles)(FieldsGroup);
