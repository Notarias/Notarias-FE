import React                        from 'react';
import Field                        from './field';

const RenderFieldList = (props) => {
  const { fields } = props
    // const [fieldList, setfieldList] = React.useState(currentTab.groups.find(group => !group.id))

  console.log("props", props)
  return(
    <>
      {
        fields.map(
          (field, index) => {
            return(
              <Field
                key={ index + "-field"}
                arrayIndex={ index }
                // removeFromList={ removeFromList }
                name={ field.name || " "}
                type={ field.style || " " }
                favourite={ field.favourite || false }
                id={ field.id || " " }
              />
            )
          }
        )
      }
    </>
  )
  
}

export default RenderFieldList;