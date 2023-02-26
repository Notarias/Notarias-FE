import React, { useState, useEffect }               from 'react';
import Field                                        from './field';
import { useQuery }                                 from '@apollo/client';
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }        from '../queries_and_mutations/queries'
import { styles }                                   from '../styles';
import { withStyles }                               from '@material-ui/core/styles';

const FieldList = (props) => {
  const { currentTab } = props

  const { data } = useQuery(
    GET_PROCEDURE_TEMPLATE_TAB_FIELDS,
    {
      variables: { "id": currentTab.id }
    }
  );

  const [fields, setFields] = useState(data ? data.proceduresTemplateTabFields : [])

  useEffect(() => {
    data && setFields(data.proceduresTemplateTabFields);;
  }, [data])


  return(
    <>
      {
        fields.map(
          (field, index) => {
            return(
              <Field
                key={ field.id + "-field"}
                arrayIndex={ index }
                currentTab={ currentTab }
                name={ field.name || "" }
                printable={ field.printable || false }
                style={ field.style || "" }
                favourite={ field.favourite || false }
                id={ field.id || " " }
                active={ field.active }
                defaultValue={field.defaultValue}
              />
            )
          }
        )
      }
    </>
  )
}

export default  withStyles(styles)( FieldList);
