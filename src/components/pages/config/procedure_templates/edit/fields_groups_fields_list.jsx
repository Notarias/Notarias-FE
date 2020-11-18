import React                                                from 'react';
import Field                                                from './field';
import { useQuery }                                         from '@apollo/react-hooks';
import { GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS }     from '../queries_and_mutations/queries'

const FieldsGroupFieldList = (props) => {
  const { groupId } = props
  const { loading, data } = useQuery(
    GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS,
    {
      variables: {"id": groupId },
      fetchPolicy: "no-cache"
    } 
  );
  const fields = data? data.proceduresTemplateFieldsGroupFields : []

  console.log("FiGr", data, groupId)
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

export default FieldsGroupFieldList;
