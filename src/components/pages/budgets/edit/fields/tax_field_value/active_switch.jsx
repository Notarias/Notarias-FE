import React, { useState, useEffect } from 'react'
import { UPDATE_BUDGET_FIELD_VALUE_ACTIVE }  from '../../../queries_and_mutations/queries';
import { GET_BUDGET_FIELD_VALUE }     from '../../../queries_and_mutations/queries';
import { GET_BUDGETS_AUDITLOG }       from '../../../queries_and_mutations/queries';
import { GET_BUDGET_TOTALS }          from '../../../queries_and_mutations/queries';
import { useMutation }                from '@apollo/client';
import Switch                         from '@material-ui/core/Switch';
import FormControlLabel               from '@material-ui/core/FormControlLabel';

export default (props) => {

  const { budgetFieldValue, templateField, budget } = props

  const [active, setActive] = useState(budgetFieldValue.active)

  const [updateBudgetFieldValueActive] =
    useMutation(
      UPDATE_BUDGET_FIELD_VALUE_ACTIVE,
      {
        refetchQueries: [
          {
            query: GET_BUDGET_FIELD_VALUE,
            variables: { "budgetingTemplateFieldId": templateField.id, "budgetId": budget.id }
          },
          {
            query: GET_BUDGETS_AUDITLOG,
            variables: { "budgetId": budget.id }
          },
          {
            query: GET_BUDGET_TOTALS,
              variables: { "id": budget.id }
          }
        ],
        awaitRefetchQueries: true
      }
    )

  const handleSwitch = (e) => {
    setActive(e.target.checked)
    updateBudgetFieldValueActive({ variables: { id: budgetFieldValue.id, active: e.target.checked }})
  }

  return(
    <FormControlLabel
        control={
          <Switch color="primary" checked={active} onChange={handleSwitch} name="active"/>
        }
        label={ active ? "Desactivar" : "Activar" }
        />
  )
}