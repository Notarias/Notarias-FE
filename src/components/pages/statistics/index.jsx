import React, { useState, useEffect } from 'react';
import Grid                from '@material-ui/core/Grid';
import Paper               from '@material-ui/core/Paper';
import Typography          from '@material-ui/core/Typography';
import Divider             from '@material-ui/core/Divider';
import Breadcrumbs         from '../../ui/breadcrumbs';
import Graphs              from './statistics/graphs';
import Controls            from './statistics/controls';
import { useQuery }        from '@apollo/client';
import { GET_STATISTICS }  from './queries/queries.js'

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Estadísticas", path: null }
]

const getMonth = (dateObject, monthNum) => {
  var objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(monthNum-1);

  var locale = "es-mx",
      month = objDate.toLocaleString(locale, { month: "long" });

  return month;
}

const formatDate = (dateObject) => {
  let date = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  let year = dateObject.getFullYear();

  date = date < 10 ? `0${date}` : `${date}`
  month = month < 10 ? `0${month}` : `${month}`

  return(
    `${date}/${getMonth(dateObject, month)}/${year}`
  )
}

export default (props) => {

  const [initDate, setInitDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  let variables = {
    start_date: initDate.toISOString(),
    end_date: endDate.toISOString()
  }

  const { data } = useQuery(
    GET_STATISTICS, { variables: variables }
  );

  const changeStartDate = (event) => {
    setInitDate(new Date(event.target.value))
  }

  const changeEndDate = (event) => {
    setEndDate(new Date(event.target.value))
  }

  console.log(variables)

  return(
    <Grid container direction='column' alignItems="stretch" justifyContent="flex-start">
      <Grid item>
        <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      </Grid>
      <Grid container item style={{ flex: '1 1 auto' }}>
        <Grid container item xs={4} style={{ padding: '10px' }}>
          <Grid item xs>
            <Paper style={{ padding: '10px' }}>
              <Grid container direction='column'>
                <Grid item>
                  <Typography  align='left' variant='h5'>Controles</Typography>
                </Grid>
                <Divider/>
                <Grid container item xs>
                  <Controls
                    initDate={initDate}
                    endDate={endDate}
                    changeStartDate={changeStartDate}
                    changeEndDate={changeEndDate}
                    />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={8} style={{ padding: '10px' }}>
          <Grid item xs>
            <Paper style={{ padding: '10px' }}>
              <Grid container direction='column'>
                <Grid item>
                  <Typography  align='left' variant='h5'>{formatDate(new Date())} - {formatDate(new Date())}</Typography>
                </Grid>
                <Divider/>
                <Grid item xs style={{ paddingTop: "30px", paddingBottom: "30px", minHeight: '700px' }}>
                  <Graphs/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
