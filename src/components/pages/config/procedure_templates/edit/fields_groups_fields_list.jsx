import React                                                from 'react';
import Field                                                from './field';
import { useQuery }                                         from '@apollo/client';
import { GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS }     from '../queries_and_mutations/queries';

const FieldsGroupFieldList = (props) => {
  const { groupId } = props
  const { data } = useQuery(
    GET_PROCEDURES_TEMPLATE_FIELDS_GROUPS_FIELDS,
    {
      variables: {"id": groupId }
    } 
  );
  const fields = data ? data.proceduresTemplateFieldsGroupFields : []

 
  return(
    <>
      {
        fields.map(
          (field, index) => {
            return(
              <Field
                key={ field.id + "-fieldGroupField"}
                arrayIndex={ index }
                name={ field.name || " "}
                style={ field.style || " " }
                favourite={ field.favourite || false }
                id={ field.id || " " }
                active={ field.active }
                groupId={ groupId }
              />
            )
          }
        )
      }
    </>
  )
  
}

export default FieldsGroupFieldList;
