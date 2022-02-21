import React, { useState }          from 'react';
import Grid                         from '@material-ui/core/Grid';
import Paper                        from '@material-ui/core/Paper';
import Typography                   from '@material-ui/core/Typography';
import Divider                      from '@material-ui/core/Divider';
import CircularProgress             from '@material-ui/core/CircularProgress';
import Breadcrumbs                  from '../../ui/breadcrumbs';
import Graphs                       from './index/graphs';
import Controls                     from './index/controls';
import { useQuery }                 from '@apollo/client';
import { STATISTICS_QUERY }         from './queries/queries';


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

  return (
    `${year}-${month}-${date}`
  )
}


export default (props) => {

  const [initDate, setInitDate] = useState(formatDate(new Date()))
  const [endDate, setEndDate] = useState(formatDate(new Date()))
  const [timeFrame, setTimeFrame] = useState('day')
  const [switchIncome, setSwitchIncome] = useState(true)
  const [switchTotal, setSwitchTotal] = useState(true)
  const [switchPaid, setSwitchPaid] = useState(true)
  const [switchDebt, setSwitchDebt] = useState(true)

  const { data, loading, refetch } = useQuery(
    STATISTICS_QUERY,
    {
      variables: {
        startDate: initDate,
        endDate: endDate,
        timeFrame: timeFrame
      },
      fetchPolicy: 'cache-and-network'
    }
  )

  const changeInitDate = (e) => {
    setInitDate(e.target.value)
  }

  const changeEndDate = (e) => {
    setEndDate(e.target.value)
  }

  const changeTimeFrame = (e) => {
    setTimeFrame(e.event.target)
  }

  const triggerFiltering = (e) => {
    refetch()
  }

  const changeSwitchIncome = (event) => {
    setSwitchIncome(!!event.target.checked)
  }

  const changeSwitchTotal = (event) => {
    setSwitchTotal(!!event.target.checked)
  }

  const changeSwitchPaid = (event) => {
    setSwitchPaid(!!event.target.checked)
  }

  const changeSwitchDebt = (event) => {
    setSwitchDebt(!!event.target.checked)
  }

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
                    changeInitDate={changeInitDate}
                    changeEndDate={changeEndDate}
                    triggerFiltering={triggerFiltering}
                    switchIncome={switchIncome}
                    switchTotal={switchTotal}
                    switchPaid={switchPaid}
                    switchDebt={switchDebt}
                    changeSwitchIncome={changeSwitchIncome}
                    changeSwitchTotal={changeSwitchTotal}
                    changeSwitchPaid={changeSwitchPaid}
                    changeSwitchDebt={changeSwitchDebt}/>
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
                  { loading && <CircularProgress/> }
                  { !loading && !data && <Typography>Sin datos</Typography> }
                  {
                    !loading &&
                    data &&
                    data.statistics &&
                    <Graphs
                      data={data.statistics}
                      switchIncome={switchIncome}
                      switchTotal={switchTotal}
                      switchPaid={switchPaid}
                      switchDebt={switchDebt}/>
                  }
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
