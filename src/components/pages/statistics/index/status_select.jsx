import React                        from 'react';
import Grid                         from '@material-ui/core/Grid';
import FormControl                  from '@material-ui/core/FormControl';
import InputLabel                   from '@material-ui/core/InputLabel';
import Select                       from '@material-ui/core/Select';
import MenuItem                     from '@material-ui/core/MenuItem';

const STATUSES = {
  "completed": 'Completados',
  "not_completed": 'Sin Completar'
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
