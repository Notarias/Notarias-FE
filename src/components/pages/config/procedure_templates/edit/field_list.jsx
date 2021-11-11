import React, { useEffect }                         from 'react';
import Field                                        from './field';
import { useQuery }                                 from '@apollo/client';
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }        from '../queries_and_mutations/queries'
import { styles }                                   from '../styles';
import { withStyles }                               from '@material-ui/core/styles';

const FieldList = (props) => {
  const { currentTab} = props

  const { data } = useQuery(
    GET_PROCEDURE_TEMPLATE_TAB_FIELDS,
    {
      variables: { "id": currentTab.id }
    }
  );

  const [fields, setFields] = React.useState(data ? data.proceduresTemplateTabFields : [])

  useEffect(() => {
    data && setFields(data.proceduresTemplateTabFields);;
  }, [data])

  const removeFromList = (index, mutation, variables, id) => {
    id && mutation(variables)
    fields.splice(index, 1)
    let newArray = fields.slice()
    setFields(newArray)
  }

  const renderFields = () => {
    return(
      <>
        {
          fields.map(
            (field, index) => {
              return(
                <Field
                  key={ field.id + "-field"}
                  arrayIndex={ index }
                  removeFromList={ removeFromList }
                  name={ field.name || "" }
                  style={ field.style || "" }
                  favourite={ field.favourite || false }
                  id={ field.id || " " }
                  active={ field.active }
                  currentTab={ currentTab }
                />
              )
            }
          )
        }
      </>
    )
  }

  return (
    <>
      {
        renderFields()
      }
    </>
  )
}

export default  withStyles(styles)( FieldList);
