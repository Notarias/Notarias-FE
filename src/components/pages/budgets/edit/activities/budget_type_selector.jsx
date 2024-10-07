import React, { useState, useEffect }     from 'react';
import Grid                               from '@material-ui/core/Grid';
import Hidden                             from '@material-ui/core/Hidden';
import Typography                         from '@material-ui/core/Typography';
import FormControl                        from '@material-ui/core/FormControl';
import MenuItem                           from '@material-ui/core/MenuItem';
import ListItemText                       from '@material-ui/core/ListItemText';
import Select                             from '@material-ui/core/Select';
import { useMutation }                    from '@apollo/client';
import { SAVE_BUDGET_TYPE, GET_BUDGET }   from '../../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                 from '../../../../../resolvers/queries';
import client                             from '../../../../../apollo';

const BudgetTypeSelector = (props) => {
  const { budget, budgetTypeList } = props

  const [budgetTypeSelected, setBudgetTypeSelected] = useState(!!budget.budgetingBudgetType ? budget.budgetingBudgetType.id : '');

  const [saveBudgetType] =
  useMutation(
    SAVE_BUDGET_TYPE,
    {
      onError(apolloError) {
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "Ocurrió un error",
              type: "error",
              __typename: "globalMessage"
            }
          }
        })
      },
      onCompleted(cacheData) {
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "Cambio guardado con exito",
              type: "success",
              __typename: "globalMessage"
            }
          }
        })
      },
      refetchQueries: [
        {
          query: GET_BUDGET,
          variables: { id: budget.id } 
        },
      ],
      awaitRefetchQueries: true
    }
  )

  const handleChange = (event) => {
    console.log(event.target)
    setBudgetTypeSelected(event.target.value);
    saveBudgetType({
      variables:{
        "id": budget.id,
        "budgetingBudgetTipeId": event.target.value
      }
    })
  };

  return(
    <Grid container item xs={12} alignItems='center'>
      <Hidden mdDown>
        <Grid item xs={3}>
          <Typography align='left'>Tipo de Presupuesto:</Typography>
        </Grid>
      </Hidden>
      <Grid container item xs>
        <FormControl fullWidth>
          <Select
            displayEmpty
            fullWidth
            disableUnderline
            value={budgetTypeSelected}
            onChange={handleChange}
          >
            <MenuItem key={'budget-type'} value={""}>
              <ListItemText>
                <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                  <strong>Seleccione una Opcion</strong>
                </Typography>
              </ListItemText>
            </MenuItem>
            {budgetTypeList.map((type, i) => (
              <MenuItem key={`budget-type-${i}`} value={type.id}>
                <ListItemText>
                  <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                    <strong>{ type.name }</strong>
                  </Typography>
                </ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default BudgetTypeSelector;
