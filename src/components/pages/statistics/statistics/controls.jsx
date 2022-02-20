import React from 'react';
import Grid                         from '@material-ui/core/Grid';
import TextField                    from '@material-ui/core/TextField';
import Typography                   from '@material-ui/core/Typography';
import Divider                      from '@material-ui/core/Divider';

const formatDate = (dateObject) => {
  let date = dateObject.getUTCDate();
  let month = dateObject.getUTCMonth() + 1;
  let year = dateObject.getUTCFullYear();

  date = date < 10 ? `0${date}` : `${date}`
  month = month < 10 ? `0${month}` : `${month}`

  return (
    `${year}-${month}-${date}`
  )
}

export default (props) => {
  const { initDate, endDate, changeStartDate, changeEndDate } = props

  console.log(initDate, "----", formatDate(initDate))

  return(
    <>
      <Grid item container direction='column'>
        <Grid item xs style={{ paddingTop: '30px' }}>
          <TextField type='date' fullWidth label="Fecha Inicial" onChange={changeStartDate} value={formatDate(initDate)}/>
        </Grid>
        <Grid item xs style={{ paddingTop: '30px' }}>
          <TextField type='date' fullWidth label="Fecha Final" onChange={changeEndDate} value={formatDate(endDate)}/>
        </Grid>
      </Grid>
    </>
  )
}