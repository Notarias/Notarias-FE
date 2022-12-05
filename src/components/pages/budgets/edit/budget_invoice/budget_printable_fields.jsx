import React, { useState, useEffect } from 'react';
import BudgetField                    from './budget_field';
import { useQuery }                   from '@apollo/client';
import { GET_BUDGETING_TEMPLATE_PRINTABLE_FIELDS } from '../../queries_and_mutations/queries'

export default (props) => {
  const { budget } = props
  const [fields, setFields] = useState()

  const { loading, data } = useQuery(
    GET_BUDGETING_TEMPLATE_PRINTABLE_FIELDS, { variables: { "budgetId": budget.budgetingTemplate.id }, fetchPolicy: 'no-cache' }
  );

  useEffect(() => {
    if (data) {
      setFields(data.budgetingTemplatePrintableFields)
    }
  }, [loading, data])

  return(
    <>
    {
      fields && fields.map((field) => {
        return(
          <React.Fragment key={`printable-budget-field-${field.id}-budget-${budget.id}`}>
            { field.active && field.printable && <BudgetField field={field} budget={budget}/> }
          </React.Fragment>
        )
      })
    }
    </>
  )
}
