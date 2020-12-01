import React                                                from 'react';
import Field                                                from './field';
import { useQuery }                                         from '@apollo/react-hooks';
import { GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS }     from '../queries_and_mutations/queries'
import field from './field';

const FieldsGroupFieldList = (props) => {
  const { groupId } = props
  const { loading, data } = useQuery(
    GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS,
    {
      variables: {"id": groupId },
      fetchPolicy: "no-cache"
    } 
  );
  const fields = data ? data.proceduresTemplateFieldsGroupFields : []

 
  return(
    <>
      {
        fields.map(
          (field, index) => {
            console.log(field.style)
            return(
              <Field
                key={ field.id + "-fieldGroupField"}
                arrayIndex={ index }
                // removeFromList={ removeFromList }
                name={ field.name || " "}
                style={ field.style || " " }
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
