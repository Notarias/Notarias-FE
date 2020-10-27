import React                        from 'react';
import FieldsGroup                  from './fields_group';


const RenderFieldsGroupList = (props) => {

  const { currentTab, addNewField } = props
  const fieldsGroupList = currentTab.groups || []


  return(
    <>
      {
        fieldsGroupList.map(
          (fieldsGroup, index) => {
            return (
              <FieldsGroup
                key={ index + "-fieldsGroup"}
                group={ fieldsGroup }
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

export default RenderFieldsGroupList;
