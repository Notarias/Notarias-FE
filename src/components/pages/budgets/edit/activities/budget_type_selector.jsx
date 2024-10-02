import React, { useState, useEffect }     from 'react';
import Grid                               from '@material-ui/core/Grid';
import Hidden                             from '@material-ui/core/Hidden';
import Typography                         from '@material-ui/core/Typography';
import FormControl                        from '@material-ui/core/FormControl';
import MenuItem                           from '@material-ui/core/MenuItem';
import ListItemText                       from '@material-ui/core/ListItemText';
import Select                             from '@material-ui/core/Select';
import { useQuery }                       from '@apollo/client';
import { GET_BUDGETING_BUDGET_TYPES }     from '../../queries_and_mutations/queries';

const BudgetTypeSelector = (props) => {

  const [budgetTypeList, setBudgetTypeList] = useState();
  const [budgetTypeSelected, setBudgetTypeSelected] = useState();
  
  const { data } = useQuery(
    GET_BUDGETING_BUDGET_TYPES
  );

  useEffect( () => {
    if(data && data.budgetingBudgetTypes){
      setBudgetTypeList(data && data.budgetingBudgetTypes);
  }}, [data]);

  const handleChange = (event) => {
    setBudgetTypeSelected(event.target.value);
  };

  return(
    <Grid container item xs={12} alignItems='center'>
      <Hidden mdDown>
        <Grid item xs={3}>
          <Typography align='left'>Tipo de Presupuesto:</Typography>
        </Grid>
      </Hidden>
      <Grid container item xs>
        <FormControl fullWidth inputProps={{ 'aria-label': 'naked' }}>
          <Select
            fullWidth
            value={budgetTypeSelected}
            onChange={handleChange}
          >
            <MenuItem key={'budget-type'} value={0}>
              <ListItemText>
                <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                  <strong>Seleccione una Opcion</strong>
                </Typography>
              </ListItemText>
            </MenuItem>
            { budgetTypeList && budgetTypeList.map((type, i) => (
              <MenuItem key={`budget-type-${i}`} value={type.name}>
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
