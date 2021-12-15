import React, { useState }                                                    from 'react';
import { styles }                                               from '../styles';
import { withStyles }                                           from '@material-ui/core/styles';
import Grid                                                     from '@material-ui/core/Grid';
import Button                                                   from '@material-ui/core/Button';
import InputBase                                                from '@material-ui/core/InputBase';
import FieldsGroupFieldList                                     from './fields_groups_fields_list';
import Paper                                                    from '@material-ui/core/Paper';
import Divider                                                  from '@material-ui/core/Divider';
import { useMutation }                                          from '@apollo/client';
import { UPDATE_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }         from '../queries_and_mutations/queries'
import Typography                                               from '@material-ui/core/Typography';
import FieldsGroupMenu                                          from './fields_group_menu';
import SaveIcon                                                 from '@material-ui/icons/Save';
import CreateIcon                                               from '@material-ui/icons/Create'


const FieldsGroup = (props) => {

  const { classes, group, groupId, currentTab, active} = props;
  const [groupName, setGroupName] = useState(group.name);
  const [editing, setEditing] = useState(true);
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
      <Grid container item xs={12} direction="row">
        <Grid item xs={10} className={ classes.textPlainGoupName } onClick={ editFieldGroup } style={{ marginTop: "2px"}}>
          <Typography>
            { groupName }
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={ editFieldGroup } className={ classes.editGroupNameIcon }>
            <CreateIcon />
          </Button>
        </Grid>
      </Grid>
    )
  }

  const renderInputGroupName = () => {
    return(
      <>
        <Grid item xs={10} className={ classes.textPlainGoupName }>
          <InputBase 
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
            inputProps={{ 'aria-label': 'naked' }}
          />
        </Grid>
        <Grid item xs={1}>
          <Button  onClick={ updateFieldsGroup }>
            <SaveIcon color="primary" className={ classes.saveGroupNameIcon }/>
          </Button>
        </Grid>
      </>
    )
  }

  return(
    <Grid container item xs={12} alignItems="center" justifyContent="center" className={ classes.fielPaddingBottom }>
      <Paper className={ classes.roundedBorderGruop }>
        <Divider/>
        <Grid container alignItems="center" className={ classes.fieldHeightRow }>
          <Grid container item xs={11} direction="row" alignItems="flex-start" >
            { editing ? renderTextGroupName() : renderInputGroupName() }
          </Grid>
          <Grid container item xs={1} alignItems="center" justifyContent="flex-end">
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
