import React                                            from 'react';
import FieldsGroup                                      from './fields_group';
import { useQuery }                                     from '@apollo/react-hooks';
import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }    from '../queries_and_mutations/queries'


const FieldsGroupList = (props) => {

  const { currentTab, addNewField } = props
  const { loading, data } = useQuery(
    GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS, { variables: {"id": currentTab.id }} 
  );
  const fieldsGroupList = data ? data.proceduresTemplateTabFieldsGroups : []

  console.log("groups", data, currentTab.id)
  return(
    <>
      {
        fieldsGroupList.map(
          (fieldsGroup, index) => {
            return (
              <FieldsGroup
                key={ index + "-fieldsGroup"}
                group={ fieldsGroup }
                groupId={ fieldsGroup.id }
                groupName={ fieldsGroup.name || " " }
                // currentTab={ currentTab }
                // removeFromList={ removeFromList }
                addNewField={ addNewField }
              />
            )
          }
        )
      }
    </>
  )
}

export default FieldsGroupList;
