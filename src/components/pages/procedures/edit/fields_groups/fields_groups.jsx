import React, { useState, useEffect }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import { withStyles }                           from '@material-ui/core/styles';
import { styles }                               from '../../styles'
import { useQuery }                             from '@apollo/client';
import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }   from '../../queries_and_mutations/queries';
import GroupsRows                               from './groups_rows';

const FieldsGroups = (props) => {

  const { currentTab, procedure, classes } = props;
  const [currentFieldId, setCurrentFieldId] =  useState(null);
  const [scrollHeight, setScrollHeight] = useState();
  const [groups, setGroups] = useState();

  const { data } = useQuery(
    GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
    {
      variables: { "id": currentTab && currentTab.id }
    }
  );

  useEffect(() => {
    data && setGroups(data.proceduresTemplateTabFieldsGroups);;
  }, [data])
  
  const renderGroups = () => {
    return(
      <Grid item container style={{ flex: '1 1 auto' }} direction='column' alignItems="stretch" justifyContent="flex-start">
        <Grid item container style={{"padding-left": "25px", "padding-right": "25px" }}>
          {
            groups && groups.map((group) => {
              return(
                <GroupsRows key={groups.id} group={group} procedure={procedure}/>
              )
            })
          }
        </Grid>
      </Grid>
    )
  }

  return(
    renderGroups()
  )
}

export default withStyles(styles)(FieldsGroups);
