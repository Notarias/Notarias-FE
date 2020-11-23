import React                                    from 'react';
import Field                                    from './field';
import { useQuery }                             from '@apollo/react-hooks';
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }    from '../queries_and_mutations/queries'

const FieldList = (props) => {
  const { currentTab } = props
  const { loading, data } = useQuery(
    GET_PROCEDURE_TEMPLATE_TAB_FIELDS,
    {
      variables: { "proceduresTemplateTabId": currentTab.id }
    } 
  );
  const fields = data ? data.proceduresTemplateTabFields : []
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

export default FieldList;
