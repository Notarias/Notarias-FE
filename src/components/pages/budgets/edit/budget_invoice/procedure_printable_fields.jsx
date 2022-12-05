import React, { useState, useEffect } from 'react';
import ProcedureField                 from './procedure_field';
import { useQuery }                   from '@apollo/client';
import { GET_BUDGET_PROCEDURE_PRINTABLE_FIELDS } from '../../queries_and_mutations/queries'

export default (props) => {
  const { budget } = props
  const [fields, setFields] = useState()

  const { loading, data } = useQuery(
    GET_BUDGET_PROCEDURE_PRINTABLE_FIELDS, { variables: { "budgetId": budget.id }, fetchPolicy: 'no-cache' }
  );

  useEffect(() => {
    if (data) {
      setFields(data.budgetProcedurePrintableFields)
    }
  }, [loading, data])

  return(
    <>
    {
      fields && fields.map((field) => {
        return(
          <React.Fragment key={`printable-procedure-field-${field.id}-budget-${budget.id}`}>
            { field.active && field.printable && <ProcedureField field={field} budget={budget}/> }
          </React.Fragment>
        )
      })
    }
    </>
  )
}