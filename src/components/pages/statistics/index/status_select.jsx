


import React                        from 'react';
import Grid                         from '@material-ui/core/Grid';
import TextField                    from '@material-ui/core/TextField';
import Typography                   from '@material-ui/core/Typography';
import Divider                      from '@material-ui/core/Divider';
import Button                       from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { GET_STATISTICS_BUDGETING_TEMPLATES } from '../queries/queries';
import TabsSelect from './tabs_select';

const STATUSES = {
  "completed": 'Completados',
  "not_completed": 'Sin Completar',
  "all_budgets": 'Todos'
}

export default (props) => {
  const {
    graphStatus,
    changeGraphStatus
  } = props

  return(
    <>
      <Grid item container direction='column' xs>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Estado del Presupuesto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={graphStatus}
              onChange={changeGraphStatus}
            >
              {
                Object.keys(STATUSES).map(
                  (status) => (
                      <MenuItem key={`${status}-template-select-item`} value={status}>{STATUSES[status]}</MenuItem>
                  )
                )
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}