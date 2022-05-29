import React, { useState }          from 'react';
import Grid                         from '@material-ui/core/Grid';
import Paper                        from '@material-ui/core/Paper';
import Typography                   from '@material-ui/core/Typography';
import Divider                      from '@material-ui/core/Divider';
import Breadcrumbs                  from '../../ui/breadcrumbs';
import GeneralGraph                 from './index/general_graph';
import TabGraph                     from './index/tab_graph';
import Controls                     from './index/controls';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Estadísticas", path: null }
]

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

  const [date, setDate] = useState(formatDate(new Date()))
  const [timeFrame, setTimeFrame] = useState('day')
  const [switchIncome, setSwitchIncome] = useState(true)
  const [switchTotal, setSwitchTotal] = useState(true)
  const [switchPaid, setSwitchPaid] = useState(true)
  const [switchDebt, setSwitchDebt] = useState(true)
  const [switchPayable, setSwitchPayable] = useState(true)
  const [templateId, setTemplateId] = useState('')
  const [templateTabsIds, setTemplateTabsIds] = useState([])
  const [graphStatus, setGraphStatus] = useState('all_budgets')
  const [userInfo, setUserInfo] = useState('')
  const [clientInfo, setClientInfo] =useState('')

  const changeDate = (e) => {
    setDate(e.target.value)
  }

  const changeTimeFrame = (e) => {
    setTimeFrame(e.event.target)
  }

  const triggerFiltering = (e) => {
    //refetch()
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

  const changeSwitchPayable = (event) => {
    setSwitchPayable(!!event.target.checked)
  }

  const changeTemplateId = (event) => {
    setTemplateId(event.target.value)
  }

  const changeTemplateTabsIds = (tabsIds) => {
    setTemplateTabsIds(tabsIds)
  }

  const changeGraphStatus = (event) => {
    setGraphStatus(event.target.value)
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
                    date={date}
                    changeDate={changeDate}
                    triggerFiltering={triggerFiltering}
                    switchIncome={switchIncome}
                    switchTotal={switchTotal}
                    switchPaid={switchPaid}
                    switchDebt={switchDebt}
                    switchPayable={switchPayable}
                    changeSwitchIncome={changeSwitchIncome}
                    changeSwitchTotal={changeSwitchTotal}
                    changeSwitchPaid={changeSwitchPaid}
                    changeSwitchDebt={changeSwitchDebt}
                    changeSwitchPayable={changeSwitchPayable}
                    templateId={templateId}
                    templateTabsIds={templateTabsIds}
                    changeTemplateId={changeTemplateId}
                    changeTemplateTabsIds={changeTemplateTabsIds}                    
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    clientInfo={clientInfo}
                    setClientInfo={setClientInfo}
                    changeTimeFrame={changeTimeFrame}
                    graphStatus={graphStatus}
                    changeGraphStatus={changeGraphStatus}/>
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
                  {
                    !!templateId && templateTabsIds.length ?
                      <TabGraph
                        switchIncome={switchIncome}
                        switchTotal={switchTotal}
                        switchPaid={switchPaid}
                        switchDebt={switchDebt}
                        switchPayable={switchPayable}
                        date={date}
                        timeFrame={timeFrame}
                        templateId={templateId}
                        templateTabsIds={templateTabsIds}
                        graphStatus={graphStatus}
                        selectUserId={userInfo.id}
                        selectClientId={clientInfo.id}
                      />
                    :
                      <GeneralGraph
                        switchIncome={switchIncome}
                        switchTotal={switchTotal}
                        switchPaid={switchPaid}
                        switchDebt={switchDebt}
                        switchPayable={switchPayable}
                        date={date}
                        timeFrame={timeFrame}
                        graphStatus={graphStatus}
                        selectUserId={userInfo.id}
                        selectClientId={clientInfo.id}
                      />
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
