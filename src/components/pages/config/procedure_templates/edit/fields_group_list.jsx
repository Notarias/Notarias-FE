import React                                            from 'react';
import FieldsGroup                                      from './fields_group';
import { useQuery }                                     from '@apollo/react-hooks';
import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }    from '../queries_and_mutations/queries'

import { styles }                                       from '../styles';
import { withStyles }                                   from '@material-ui/core/styles';
import Typography                                       from '@material-ui/core/Typography';
import DialogSelectCopy                                 from './dialog_select_copy'
import LibraryAddIcon                                   from '@material-ui/icons/LibraryAdd';
import Grid                                             from '@material-ui/core/Button';



const FieldsGroupList = (props) => {

  const { currentTab } = props
  const { loading, data } = useQuery(
    GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
    {
      variables: {"id": currentTab.id }
    }
  );

  const fieldsGroupList = data ? data.proceduresTemplateTabFieldsGroups : []

  const renderFieldGroups = () => {
    return(
      <>
        {
          fieldsGroupList.map(
            (fieldsGroup, index) => {
              return (
                <FieldsGroup
                  key={ fieldsGroup.id + "-fieldsGroup"}
                  group={ fieldsGroup }
                  groupId={ fieldsGroup.id }
                  groupName={ fieldsGroup.name || " " }
                  // currentTab={ currentTab }
                  // removeFromList={ removeFromList }
                  // addNewField={ addNewField }
                />
              )
            }
          )
        }
      </>
    )
  }

  const iconButtonType = () => {
    return(
      <LibraryAddIcon/>
    )
  }

  return(
    <>
      <Typography variant="overline">
        Agrega un Grupo
      </Typography>
    <Grid>
      <DialogSelectCopy
        currentTab={ currentTab }
        iconButtonType={ iconButtonType }
      />
    </Grid>
      {
        renderFieldGroups()
      }
  </>
  )
}

export default FieldsGroupList;
