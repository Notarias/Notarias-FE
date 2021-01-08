import React, { useEffect }                         from 'react';
import Field                                        from './field';
import { useQuery }                                 from '@apollo/react-hooks';
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }        from '../queries_and_mutations/queries'
import { styles }                                   from '../styles';
import { withStyles }                               from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';

const FieldList = (props) => {
  const { currentTab, classes} = props

  const { loading, data } = useQuery(
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

  const iconButtonType = () => {
    return(
      <AddBoxIcon/>
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
