import React, { useState, useEffect } from 'react';
import ProcedureField                 from './procedure_field';
import { useQuery }                   from '@apollo/client';
import { GET_BUDGET_PROCEDURE_PRINTABLE_FIELDS } from '../../queries_and_mutations/queries'

export default (props) => {
  const { budget } = props
  const [fields, setFields] = useState()

  const { loading, data, refetch } = useQuery(
    GET_BUDGET_PROCEDURE_PRINTABLE_FIELDS, { variables: { "id": budget.id } }
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
          <>
            { field.active && <ProcedureField field={field}/> }
          </>
        )
      })
    }
    </>
  )
}