import React, { useEffect }                         from 'react';
import Field                                        from './field';
import TaxField                                     from './tax_field';
import { useQuery }                                 from '@apollo/client';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }        from '../queries_and_mutations/queries'
import { styles }                                   from '../styles';
import { withStyles }                               from '@material-ui/core/styles';

const FieldList = (props) => {
  const { currentTab} = props

  const { data } = useQuery(
    GET_BUDGETING_TEMPLATE_TAB_FIELDS,
    {
      variables: { "id": currentTab.id }
    },
    {
      fetchPolicy: 'cache-and-network'
    }
  );

  const [fields, setFields] = React.useState(data ? data.budgetingTemplateTabFields : [])

  useEffect(() => {
    data && setFields(data.budgetingTemplateTabFields);;
  }, [data])

  const removeFromList = (index, mutation, variables, id) => {
    id && mutation(variables)
    fields.splice(index, 1)
    let newArray = fields.slice()
    setFields(newArray)
  }

  return (
    <>
      {
        fields.map(
          (field, index) => {
            return(
              field.fieldType === 'tax' ?
                <TaxField 
                  key={ field.id + "-field"}
                  arrayIndex={ index }
                  removeFromList={ removeFromList }
                  currentTab={ currentTab }
                  field={ field }
                />
                :
                <Field
                  key={ field.id + "-field"}
                  arrayIndex={ index }
                  removeFromList={ removeFromList }
                  name={ field.name || "" }
                  categories={ field.categories || [] }
                  id={ field.id || " " }
                  active={ field.active }
                  currentTab={ currentTab }
                  field={ field }
                />
            )
          }
        )
      }
    </>
  )
}

export default  withStyles(styles)(FieldList);
