import React                                                    from 'react';
import { styles }                                               from '../styles';
import { withStyles }                                           from '@material-ui/core/styles';
import Grid                                                     from '@material-ui/core/Grid';
import Button                                                   from '@material-ui/core/Button';
import TextField                                                from '@material-ui/core/TextField';
import FieldsGroupFieldList                                     from './fields_groups_fields_list';
import Paper                                                    from '@material-ui/core/Paper';
import Divider                                                  from '@material-ui/core/Divider';
import { useMutation }                                          from '@apollo/react-hooks';
import { UPDATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }         from '../queries_and_mutations/queries'
import Typography                                               from '@material-ui/core/Typography';
import FieldsGroupMenu                                          from './fields_group_menu';
import SaveIcon                                                 from '@material-ui/icons/Save';
import CreateIcon                                               from '@material-ui/icons/Create'


const FieldsGroup = (props) => {

  const { classes, group, groupId, currentTab, active} = props;
  const [groupName, setGroupName] = React.useState(group.name);
  const [editing, setEditing] = React.useState(true);
  const [error, setError] = React.useState(false);
  const inputsList = ["name"];

  const [updateProceduresTemplateTabFieldsGroupMutation] =
  useMutation(
    UPDATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
    {
      onError(apolloError) {
        setErrors(apolloError)
      },
      update(store, cacheData) {
        setError(false)
        setEditing(true)
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

  const updateFieldsGroup = (event) => {
    updateProceduresTemplateTabFieldsGroupMutation({ variables: { "id": groupId, "name": groupName}})
  }

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const changeStatus = () => {
    updateProceduresTemplateTabFieldsGroupMutation({ variables: { "id": groupId, "active": !active }})
  }

  const editFieldGroup = () => {
    setEditing(!editing)
  }

  const markStatus = () => {
    if(!active) {
      return  classes.statusTemplateRow 
    }
  }

  const renderTextGroupName = () => {
    return(
      <>
        <Grid className={ classes.textPlainGoupName } onClick={ editFieldGroup }>
          <Typography variant="overline">
            { groupName }
          </Typography>
        </Grid>
          <Button onClick={ editFieldGroup } className={ classes.editGroupNameIcon }>
            <CreateIcon />
          </Button>
      </>
    )
  }

  const renderInputGroupName = () => {
    return(
      <>
        <TextField 
          id="filled-basic"
          label="Nombre del Grupo"
          value={ groupName } 
          variant="filled" 
          size="small"
          className={ classes.inputTittleGroupName }
          onChange={ handleGroupNameChange }
          error={ !!error["name"] && true }
          helperText={error["name"] || " "}
          errorskey={ "name" }
          name='name'
        />
        <Button  onClick={ updateFieldsGroup }>
          <SaveIcon color="primary" className={ classes.saveGroupNameIcon }/>
        </Button>
      </>
    )
  }

  return(
    <Paper className={ classes.roundedBorderGruop }>
      <Divider/>
      <Grid container>
        <Grid container  alignItems="center" className={ markStatus() }>
          <Grid container item xs={11} alignItems="flex-start">
            { editing ? renderTextGroupName() : renderInputGroupName() }
          </Grid>
          <Grid container item xs={1} alignItems="center" justify="flex-end">
            <FieldsGroupMenu
              groupName={ groupName }
              active={ active }
              changeStatus={ changeStatus }
              editFieldGroup={ editFieldGroup }
              currentTab={ currentTab }
              groupId={ groupId }
            />
          </Grid>
        </Grid>
        <FieldsGroupFieldList groupId={ groupId } />
      </Grid>
    </Paper>
  )
}

export default  withStyles(styles)(FieldsGroup);
