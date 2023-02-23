import React, { useState }                                      from 'react';
import { styles }                                               from '../styles';
import { withStyles }                                           from '@material-ui/core/styles';
import Grid                                                     from '@material-ui/core/Grid';
import IconButton                                               from '@material-ui/core/Button';
import TextField                                                from '@material-ui/core/TextField';
import FieldsGroupFieldList                                     from './fields_groups_fields_list';
import Paper                                                    from '@material-ui/core/Paper';
import { useMutation }                                          from '@apollo/client';
import { UPDATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }         from '../queries_and_mutations/queries'
import FieldsGroupMenu                                          from './fields_group_menu';
import SaveIcon                                                 from '@material-ui/icons/Save';
import CreateIcon                                               from '@material-ui/icons/Create';


const FieldsGroup = (props) => {

  const { group, groupId, currentTab, active} = props;
  const [groupName, setGroupName] = useState(group.name);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
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
        setEditing(false)
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

  const editNameGroup = () => {
    return(
      <TextField 
        id="filled-basic"
        value={ groupName } 
        variant="outlined"
        size="small"
        onChange={ handleGroupNameChange }
        error={ !!error["name"] && true }
        errorskey={ "name" }
        name='name'
        fullWidth
      />
    )
  }

  const lockedNameGroup = () => {
    return(
      <TextField 
        id="filled-basic"
        value={ groupName } 
        variant={ "outlined" } 
        size="small"
        onChange={ handleGroupNameChange }
        error={ !!error["name"] && true }
        errorskey={ "name" }
        name='name'
        disabled
        inputProps={{ 'aria-label': 'naked' }}
        fullWidth
      />
    )
  }

  return(
    <Grid id='group-rows' container item xs={12} direction='row' justifyContent="center" style={{padding:'5px'}}>
      <Paper style={{padding:'10px'}}>
        <Grid container item xs={12} direction='row' justifyContent="center" style={{paddingLeft:'10px'}}>
          <Grid container item xs={9} alignItems="center">
            <Grid item xs >
              { editing ? editNameGroup() : lockedNameGroup() }
            </Grid>
            <Grid item xs={1}>
              {editing ?
                <IconButton onClick={ updateFieldsGroup }>
                  <SaveIcon />
                </IconButton>
              :
                <IconButton onClick={ editFieldGroup }>
                  <CreateIcon />
                </IconButton>
              }
            </Grid>
          </Grid>
          <Grid container item xs={3} alignItems="center" justifyContent="flex-end">
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
      </Paper>
    </Grid>
  )
}

export default  withStyles(styles)(FieldsGroup);
