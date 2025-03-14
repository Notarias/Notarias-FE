import React                                          from 'react';
import Grid                                           from '@material-ui/core/Grid';
import FormControl                                    from '@material-ui/core/FormControl';
import InputLabel                                     from '@material-ui/core/InputLabel';
import Select                                         from '@material-ui/core/Select';
import MenuItem                                       from '@material-ui/core/MenuItem';
import { useQuery }                                   from '@apollo/client';
import { GET_STATISTICS_BUDGETING_TEMPLATES }         from '../queries/queries';
import TabsSelect                                     from './tabs_select';

export default (props) => {
  const {
    templateId,
    templateTabsIds,
    changeTemplateId,
    changeTemplateTabsIds
  } = props

  const { data } = useQuery(
    GET_STATISTICS_BUDGETING_TEMPLATES,
    {
      fetchPolicy: 'cache-and-network'
    }
  )

  return(
    <>
      <Grid item container direction='column' xs>
        <Grid item xs style={{ paddingTop: '30px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo de Presupuesto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={templateId}
              onChange={changeTemplateId}
            >
              <MenuItem value='all_budgets'>
                <em>Todos</em>
              </MenuItem>
              {
                data && data.statisticsBudgetingTemplates.map(
                  (template) => (
                      <MenuItem key={`${template.id}-template-select-item`} value={template.id}>{template.name}</MenuItem>
                  )
                )
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs style={{ paddingTop: '30px' }}>
          {
            templateId &&
              <TabsSelect
                templateId={templateId}
                templateTabsIds={templateTabsIds}
                changeTemplateTabsIds={changeTemplateTabsIds}/>
          }
        </Grid>
        <Grid container item xs style={{ paddingTop: '30px' }}>
          {/* <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={switchIncome} onChange={changeSwitchIncome} name="income" />}
                label="Ingreso"
              />
              <FormControlLabel
                control={<Checkbox checked={switchTotal} onChange={changeSwitchTotal} name="total" />}
                label="Total a pagar"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={switchPaid} onChange={changeSwitchPaid} name="pagado" />}
                label="Egreso"
              />
              <FormControlLabel
                control={<Checkbox checked={switchDebt} onChange={changeSwitchDebt} name="debt" />}
                label="Saldo"
              />
            </FormGroup>
          </Grid>
          <Grid container item xs style={{ paddingTop: '30px' }} justifyContent="flex-end">
            <Grid item>
              <Button variant='contained'  color="primary" onClick={triggerFiltering}>Filtrar</Button>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </>
  )
}